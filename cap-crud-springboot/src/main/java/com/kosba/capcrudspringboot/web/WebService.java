package com.kosba.capcrudspringboot.web;

import com.kosba.capcrudspringboot.models.Animal;
import com.kosba.capcrudspringboot.models.AnimalRepository;
import com.kosba.capcrudspringboot.models.Zoo;
import com.kosba.capcrudspringboot.models.ZooRepository;
import com.kosba.capcrudspringboot.util.MaximumResourceLimitException;
import com.kosba.capcrudspringboot.util.PlayException;
import com.kosba.capcrudspringboot.util.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WebService {

	// source help: https://springjava.com/spring-boot/response-entity-in-rest-api-crud-example-spring-boot

	@Autowired
	AnimalRepository animalRepository;

	@Autowired
	ZooRepository zooRepository;

	public List<Animal> getAllAnimals(Long zooId) {
		// find
		List<Animal> animals = this.animalRepository.findByZooId(zooId).get();
		// return
		return animals;
	}

	public Animal getAnimalById(Long animalId, Long zooId) throws ResourceNotFoundException {
		// find
		Animal animal = this.animalRepository.findById(animalId).orElseThrow(
				() -> new ResourceNotFoundException("Animal not found for this id: " + animalId)
		);
		// test
		if(animal.getZooId() != zooId) {
			throw new ResourceNotFoundException("Animal with id (" + animalId + ") was not found in zoo with id (" + zooId + ")");
		} else {
			// return
			return animal;
		}
	}

	public Animal addAnimal(Animal animal, Long zooId) throws MaximumResourceLimitException {
		// check limit 10 animals per day
		List<Animal> animalsBornToday = this.animalRepository.findByZooIdAndBirthDay(zooId, animal.getBirthDay()).get();
		if(animalsBornToday.size() >= 10)
			throw new MaximumResourceLimitException("There are already 10 animals added for this day:" + animal.getBirthDay());

		// set zoo id
		animal.setZooId(zooId);
		// set default values
		if(animal.getName().isBlank())
			animal.setName("Name");
		if(animal.getAge() == -1)
			animal.setAge(0);
		if(animal.getEnergy() == -1)
			animal.setEnergy(5);
		if(animal.getHunger() == -1)
			animal.setHunger(0);
		// note: isDead will default to false



		// save
		Animal savedAnimal = this.animalRepository.save(animal);

		// return
		return savedAnimal;
	}

	public Animal modifyAnimal(Long animalId, Animal animal, Long zooId) throws ResourceNotFoundException {
		// find
		Animal animalUpdating = this.animalRepository.findById(animalId).orElseThrow(
				() -> new ResourceNotFoundException("Animal not found for this id: " + animalId)
		);
		// test
		if(animal.getZooId() != zooId) {
			throw new ResourceNotFoundException("Animal with id (" + animalId + ") was not found for zoo with id(" + zooId +")");
		} else {

			// update only if new value was sent
			if (!animal.getName().isBlank())
				animalUpdating.setName(animal.getName());
			if (animal.getEnergy() != -1)
				animalUpdating.setEnergy(animal.getEnergy());
			if (animal.getHunger() != -1)
				animalUpdating.setHunger(animal.getHunger());
			if (animal.getAge() != -1)
				animalUpdating.setAge(animal.getAge());
			if (animal.isDead())
				animalUpdating.setDead(animal.isDead());
			// note: do not update zooId or birthDay, those will never change

			// save
			Animal updatedAnimal = this.animalRepository.save(animalUpdating);

			// return
			return updatedAnimal;
		}
	}
	private Animal incrementAnimalsDay(Animal animalUpdating) {
		int age = animalUpdating.getAge(), hunger = animalUpdating.getHunger(), energy = animalUpdating.getEnergy();
		// check if dead
		//  if at max life (10) or max hunger (5)
		if((age >= 10) || (hunger >= 5)){
			animalUpdating.setDead(true);
		}
		// else still alive
		else {
			// add age
			animalUpdating.setAge(age + 1);

			// add hunger
			animalUpdating.setHunger(hunger + 1);

			// add energy if less than max
			if(energy < 5)
				animalUpdating.setEnergy(energy + 1);
		}

		// save
		return this.animalRepository.save(animalUpdating);
	}

	public void deleteAnimalById(Long id, Long zooId) throws ResourceNotFoundException {
		// find
		Animal animalDeleting = this.animalRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Animal not found for this id: " + id)
		);
		// test
		if(animalDeleting.getZooId() != zooId) {
			throw new ResourceNotFoundException("Animal with id (" + id + ") was not found for zoo with id(" + zooId +")");
		} else {
			// delete
			this.animalRepository.deleteById(id);
		}
	}

	public void deleteAllAnimals(Long zooId) {

		// delete
		this.animalRepository.deleteAll();
	}

	//
	// //////////
	//

	public List<Zoo> getAllZoos() {
		// get
		List<Zoo> zoos = this.zooRepository.findAll();
		// return
		return zoos;
	}

	public Zoo getZooById(Long id) throws ResourceNotFoundException{
		// get
		Zoo zoo = this.zooRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No zoo found for the id: " + id));
		// return
		return zoo;
	}

	public Zoo createNewZoo(Zoo zoo) throws MaximumResourceLimitException {
		// check max number of zoos
		List<Zoo> zoos = this.zooRepository.findAll();
		if(zoos.size() >= 6)
			throw new MaximumResourceLimitException("Maximum number of zoos created");

		// set defaults
		if(zoo.getName().isBlank())
			zoo.setName("Unnamed Zoo");
		if(zoo.getCurrentDay() == 0)
			zoo.setCurrentDay(1);

		// save
		Zoo savedZoo = this.zooRepository.save(zoo);
		// return
		return savedZoo;
	}

	public Zoo modifyZoo(Long zooId, Zoo zooEdits) throws ResourceNotFoundException, PlayException {
		// find
		Zoo updatingZoo = this.zooRepository.findById(zooId).orElseThrow(() -> new  ResourceNotFoundException("No zoo found for the id: "+zooId));

		// update zoo
		if(!zooEdits.getName().isBlank())
			updatingZoo.setName(zooEdits.getName());
		if(zooEdits.getCurrentDay() > 0) {
			// check if adding more than 1 day
			if(zooEdits.getCurrentDay() != updatingZoo.getCurrentDay() + 1)
				throw new PlayException("Day was incremented by more than 1 day");
			else {
				// increment day
				updatingZoo.setCurrentDay(zooEdits.getCurrentDay());
				// update all animals in zoo
				List<Animal> animals = this.getAllAnimals(zooId);
				for (Animal a: animals) {
					this.incrementAnimalsDay(a);
				}
			}
		}

		// save
		Zoo savedZoo = this.zooRepository.save(updatingZoo);

		// return
		return savedZoo;
	}

	public void deleteZooById(Long id) {
		// delete
		this.zooRepository.deleteById(id);
	}

	public void deleteAllZoos() {
		// delete
		this.zooRepository.deleteAll();
	}

	//
	// helper functions


}

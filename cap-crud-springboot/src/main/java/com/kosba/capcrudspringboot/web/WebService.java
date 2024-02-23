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
		// get zoo
		Zoo zoo = this.zooRepository.findById(zooId).get();

		// check if birthday set
		if(animal.getBirthDay() == -1) {
			animal.setBirthDay(zoo.getCurrentDay());
		}

		// check limit 10 animals per day
		List<Animal> animalsBornToday = this.animalRepository.findByZooIdAndBirthDay(zooId, animal.getBirthDay()).get();
		if(animalsBornToday.size() >= 10)
			throw new MaximumResourceLimitException("There are already 10 animals added for this day (" + animal.getBirthDay() + ")");

		// set zoo id
		animal.setZooId(zooId);
		// set default values
		if(animal.getName().isBlank())
			animal.setName("Name");
		if(animal.getAge() == -1)
			animal.setAge(0);
		if(animal.getHappiness() == -1)
			animal.setHappiness(5);
		if(animal.getHunger() == -1)
			animal.setHunger(0);
		// note: isDead, isPetToday, isFedToday will default to false
		// note: birthDay is set above

		// save
		Animal savedAnimal = this.animalRepository.save(animal);

		// return
		return savedAnimal;
	}

	public Animal modifyAnimal(Long animalId, Animal animalEdits, Long zooId) throws ResourceNotFoundException, PlayException {
		// find animal
		Animal animalUpdating = this.animalRepository.findById(animalId).orElseThrow(
				() -> new ResourceNotFoundException("Animal not found for id (" + animalId + ")")
		);
		// if animal in zoo
		if(animalUpdating.getZooId() != zooId)
			throw new ResourceNotFoundException("Animal with id (" + animalId + ") was not found for zoo with id (" + zooId +")");

		// find zoo
		Zoo zooUpdating = this.zooRepository.findById(animalUpdating.getZooId()).get();

		// update only if new value was sent

		// if updating name
		if (!animalEdits.getName().isBlank())
			animalUpdating.setName(animalEdits.getName());

		// if petting
		if (animalEdits.isPetToday()) {
			// if already pet today
			if(animalUpdating.isPetToday())
				throw new PlayException("Animal has already been pet today");

			// if not incrementing by 1
			int diff = animalEdits.getHappiness() - animalUpdating.getHappiness();
			if(diff != 1)
				throw new PlayException("Animal cannot be pet by (" + diff + ")");

			// if no more hours left in the day
			if(zooUpdating.getCurrentHour() >= 24)
				throw new PlayException("No more time to pet animals");

			// Animal can be pet!!

			// pet animal
			if(animalUpdating.getHappiness() < 5)
				animalUpdating.setHappiness(animalEdits.getHappiness());

			// set pet today
			animalUpdating.setPetToday(true);

			// increment current hour
			zooUpdating.setCurrentHour(zooUpdating.getCurrentHour() + 1);
		}

		// if feeding
		if (animalEdits.isFedToday()) {
			// if already fed toady
			if (animalUpdating.isFedToday())
				throw new PlayException("Animal has already been fed today");

			// if not incrementing by -1
			int feedAttempt = animalEdits.getHunger() - animalUpdating.getHunger();
			if (feedAttempt != -1)
				throw new PlayException("Animal cannot be fed by (" + feedAttempt + ")");

			// if enough food
			if (zooUpdating.getFood() < feedAttempt)
				throw new PlayException("Not enough food to feed the animal");

			// Can feed animal!

			// feed animal
			if(animalUpdating.getHunger() > 0)
				animalUpdating.setHunger(animalEdits.getHunger());

			// set fed today
			animalUpdating.setFedToday(true);

			// decrease food
			zooUpdating.setFood(zooUpdating.getFood() - 1);
		}

		// save animal
		Animal updatedAnimal = this.animalRepository.save(animalUpdating);
		// save zoo
		this.zooRepository.save(zooUpdating);

		// return
		return updatedAnimal;

	}
	private Animal incrementAnimalsDay(Animal animalUpdating) {
		int age = animalUpdating.getAge(), hunger = animalUpdating.getHunger(), happiness = animalUpdating.getHappiness();
		// check if dead
		//  if at max life (10), max hunger (5), or no happiness (0)
		if((age >= 10) || (hunger >= 5) || (happiness <= 0)){
			animalUpdating.setDead(true);
		}
		// else still alive
		else {
			// add age
			animalUpdating.setAge(age + 1);

			// increase hunger
			animalUpdating.setHunger(hunger + (animalUpdating.isFedToday() ? 1 : 2));

			// decrease happiness if not pet
			if(!animalUpdating.isPetToday())
				animalUpdating.setHappiness(happiness - 1);

			// reset is fed
			animalUpdating.setFedToday(false);

			// reset pet
			animalUpdating.setPetToday(false);
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
			throw new ResourceNotFoundException("Animal with id (" + id + ") was not found for zoo with id (" + zooId +")");
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
		Zoo zoo = this.zooRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No zoo found for the id (" + id + ")"));
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
		if(zoo.getCurrentDay() == -1)
			zoo.setCurrentDay(1);
		if(zoo.getFood() == -1)
			zoo.setFood(10);
		if(zoo.getCurrentHour() == -1)
			zoo.setCurrentHour(0);


		// save
		Zoo savedZoo = this.zooRepository.save(zoo);
		// return
		return savedZoo;
	}

	public Zoo modifyZoo(Long zooId, Zoo zooEdits) throws ResourceNotFoundException, PlayException {
		// find
		Zoo updatingZoo = this.zooRepository.findById(zooId).orElseThrow(() -> new  ResourceNotFoundException("No zoo found for the id (" + zooId + ")"));

		// update zoo
		if(!zooEdits.getName().isBlank())
			updatingZoo.setName(zooEdits.getName());

		// if updating day
		if(zooEdits.getCurrentDay() > 0) {
			// check if adding more than 1 day
			if(zooEdits.getCurrentDay() != updatingZoo.getCurrentDay() + 1)
				throw new PlayException("Day was incremented by more than 1 day");

			// Can change day!

			// increment day
			updatingZoo.setCurrentDay(zooEdits.getCurrentDay());

			// update all animals in zoo
			List<Animal> animals = this.getAllAnimals(zooId);
			for (Animal a: animals) {
				this.incrementAnimalsDay(a);
			}

			// reset time
			updatingZoo.setCurrentHour(0);

			// add food
			updatingZoo.setFood(updatingZoo.getFood() + 10);

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

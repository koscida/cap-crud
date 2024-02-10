package com.kosba.capcrudspringboot.web;

import com.kosba.capcrudspringboot.models.Animal;
import com.kosba.capcrudspringboot.models.AnimalRepository;
import com.kosba.capcrudspringboot.models.Zoo;
import com.kosba.capcrudspringboot.models.ZooRepository;
import com.kosba.capcrudspringboot.util.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
		List<Animal> animals = this.animalRepository.findAll();
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

	public Animal addAnimal(Animal animal, Long zooId) {
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

	public Animal modifyAnimal(Long id, Animal animal, Long zooId) throws ResourceNotFoundException {
		// find
		Animal animalUpdating = this.animalRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Animal not found for this id: " + id)
		);
		// test
		if(animal.getZooId() != zooId) {
			throw new ResourceNotFoundException("Animal with id (" + id + ") was not found for zoo with id(" + zooId +")");
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

			// save
			Animal updatedAnimal = this.animalRepository.save(animalUpdating);

			// return
			return updatedAnimal;
		}
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

	public Zoo createNewZoo(Zoo zoo) {
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

	public Zoo modifyZoo(Long id, Zoo zooEdits) throws ResourceNotFoundException{
		// find
		Zoo updatingZoo = this.zooRepository.findById(id).orElseThrow(() -> new  ResourceNotFoundException("No zoo found for the id: "+id));

		// update zoo
		if(!zooEdits.getName().isBlank())
			updatingZoo.setName(zooEdits.getName());
		if(zooEdits.getCurrentDay() > 0)
			updatingZoo.setCurrentDay(zooEdits.getCurrentDay());

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

}

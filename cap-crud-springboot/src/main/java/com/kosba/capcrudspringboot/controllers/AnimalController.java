package com.kosba.capcrudspringboot.controllers;

import com.kosba.capcrudspringboot.models.Animal;
import com.kosba.capcrudspringboot.models.AnimalRepository;
import com.kosba.capcrudspringboot.util.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/animals")
public class AnimalController {

	@Autowired
	AnimalRepository animalRepository;

	// Read all
	@GetMapping("/")
	public ResponseEntity<List<Animal>> getAnimals() {
		// find
		List<Animal> animals = this.animalRepository.findAll();
		return ResponseEntity.ok().body(animals);
	}

	// Read 1
	@GetMapping("/{id}")
	public ResponseEntity<Animal> getAnimal(@PathVariable(name="id") long id ) throws ResourceNotFoundException {
		// find
		Animal animal = this.animalRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Animal not found for this id: " + id)
		);
		return ResponseEntity.ok().body(animal);

	}

	// Create 1
	@PostMapping("/")
	public ResponseEntity<Animal> createAnimal(@RequestBody Animal animal) {

		// default values
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
		return ResponseEntity.status(HttpStatus.CREATED).body(savedAnimal);
	}

	// Update 1
	@PutMapping("/{id}")
	public ResponseEntity<Animal> updateAnimal(@PathVariable long id, @RequestBody Animal animal) throws ResourceNotFoundException {
		// find
		Animal animalUpdating = this.animalRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Animal not found for this id: " + id)
		);

		// update only if new value was sent
		if(!animal.getName().isBlank())
			animalUpdating.setName(animal.getName());
		if(animal.getEnergy() != -1)
			animalUpdating.setEnergy(animal.getEnergy());
		if(animal.getHunger() != -1)
			animalUpdating.setHunger(animal.getHunger());
		if(animal.getAge() != -1)
			animalUpdating.setAge(animal.getAge());
		if(animal.isDead())
			animalUpdating.setDead(animal.isDead());

		// save
		Animal updatedAnimal = this.animalRepository.save(animalUpdating);
		return ResponseEntity.ok().body(updatedAnimal);
	}

	// Delete all
	@DeleteMapping("/")
	public ResponseEntity<HttpStatus> deleteAnimals() {
		this.animalRepository.deleteAll();
		return ResponseEntity.ok().build();
	}

	// Delete 1
	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> deleteAnimal(@PathVariable long id) {
		this.animalRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}

}

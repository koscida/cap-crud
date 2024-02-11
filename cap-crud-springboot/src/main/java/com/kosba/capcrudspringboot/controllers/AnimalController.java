package com.kosba.capcrudspringboot.controllers;

import com.kosba.capcrudspringboot.models.Animal;
import com.kosba.capcrudspringboot.models.AnimalRepository;
import com.kosba.capcrudspringboot.models.Zoo;
import com.kosba.capcrudspringboot.util.ResourceNotFoundException;
import com.kosba.capcrudspringboot.web.WebService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api/zoos/{zooId}/animals")
public class AnimalController {


//	AnimalRepository animalRepository;
	@Autowired
	WebService webService;


	// Read all
	@GetMapping("/")
	public ResponseEntity<?> getAnimals(@PathVariable(name="zooId") Long zooId) {
		// get zoo
		Map<String, Object> zooMap = getZoo(zooId);
		if(zooMap.get("status").toString().equals("0"))
			return new ResponseEntity<>(zooMap, HttpStatus.NOT_FOUND);
		else {
			// create
			Map<String, Object> map = new LinkedHashMap<String, Object>();
			// find
			List<Animal> animals = this.webService.getAllAnimals(zooId);
			map.put("status",1);
			map.put("data",animals);
			// return
			return new ResponseEntity<>(map, HttpStatus.OK);
		}
	}

	// Read 1
	@GetMapping("/{id}")
	public ResponseEntity<?> getAnimal(@PathVariable(name="zooId") long zooId, @PathVariable(name="id") long id ) {
		// get zoo
		Map<String, Object> zooMap = getZoo(zooId);
		if(zooMap.get("status").toString().equals("0"))
			return new ResponseEntity<>(zooMap, HttpStatus.NOT_FOUND);
		else {
			// create
			Map<String, Object> map = new LinkedHashMap<String, Object>();
			// try find animal
			try {
				// found
				Animal animal = this.webService.getAnimalById(id, zooId);
				map.put("status", 1);
				map.put("data", animal);
				// return
				return new ResponseEntity<>(map, HttpStatus.OK);
			} catch (Exception e) {
// did not find
				map.clear();
				map.put("status", 0);
				map.put("message", "No animal found with Id: " + id);
				return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
			}
		}
	}

	// Create 1
	@PostMapping("/")
	public ResponseEntity<?> createAnimal(@PathVariable(name="zooId") long zooId, @RequestBody Animal animal) {
		// get zoo
		Map<String, Object> zooMap = getZoo(zooId);
		if(zooMap.get("status").toString().equals("0"))
			return new ResponseEntity<>(zooMap, HttpStatus.NOT_FOUND);
		else {
			// create
			Map<String, Object> map = new LinkedHashMap<String, Object>();
			// try to save
			try {
				Animal savedAnimal = this.webService.addAnimal(animal, zooId);
				map.put("status", 1);
				map.put("data", savedAnimal);
				// return
				return new ResponseEntity<>(map, HttpStatus.CREATED);
			} catch (Exception e) {
				map.clear();
				map.put("status", 0);
				map.put("message", "Maximum number of animals created today");
				return new ResponseEntity<>(map, HttpStatus.NOT_ACCEPTABLE);
			}
		}
	}

	// Update 1
	@PutMapping("/{id}")
	public ResponseEntity<?> updateAnimal(@PathVariable(name="zooId") long zooId, @PathVariable long id, @RequestBody Animal animal) throws ResourceNotFoundException {
		// get zoo
		Map<String, Object> zooMap = getZoo(zooId);
		if(zooMap.get("status").toString().equals("0"))
			return new ResponseEntity<>(zooMap, HttpStatus.NOT_FOUND);
		else {
			// create
			Map<String, Object> map = new LinkedHashMap<String, Object>();
			// save
			Animal updatedAnimal = this.webService.modifyAnimal(id, animal, zooId);
			map.put("status", 1);
			map.put("data",updatedAnimal);
			// return
			return new ResponseEntity<>(map, HttpStatus.OK);
		}
	}

	// Delete 1
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteAnimal(@PathVariable(name="zooId") long zooId, @PathVariable long id) {
		// get zoo
		Map<String, Object> zooMap = getZoo(zooId);
		if(zooMap.get("status").toString().equals("0"))
			return new ResponseEntity<>(zooMap, HttpStatus.NOT_FOUND);
		else {
			// create
			Map<String, Object> map = new LinkedHashMap<String, Object>();
			// try delete
			try {
				// deleted
				this.webService.deleteAnimalById(id, zooId);
				map.put("status", 1);
				// return
				return new ResponseEntity<>(map, HttpStatus.OK);
			} catch (Exception e) {
				map.clear();
				map.put("status",0);
				map.put("message", "No animal found with Id: " + id);
				return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
			}

		}
	}

	// Delete all
	@DeleteMapping("/")
	public ResponseEntity<?> deleteAnimals(@PathVariable(name="zooId") long zooId) {
		// get zoo
		Map<String, Object> zooMap = getZoo(zooId);
		if(zooMap.get("status").toString().equals("0"))
			return new ResponseEntity<>(zooMap, HttpStatus.NOT_FOUND);
		else {
			// create
			Map<String, Object> map = new LinkedHashMap<String, Object>();
			// delete
			this.webService.deleteAllAnimals(zooId);
			map.put("status",1);
			// return
			return new ResponseEntity<>(map, HttpStatus.OK);
		}
	}

	// helper functions

	public Map<String, Object> getZoo(Long zooId) {
		// begin
		Map<String, Object> map = new LinkedHashMap<>();
		// try find
		try {
			// found
			Zoo zoo = this.webService.getZooById(zooId);
			map.put("status",1);
			map.put("data",zoo);
		} catch (Exception e) {
			map.clear();
			map.put("status",0);
			map.put("message","No zoo found with id: " + zooId);
		}
		return map;
	}


}

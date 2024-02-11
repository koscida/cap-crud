package com.kosba.capcrudspringboot.controllers;

import com.kosba.capcrudspringboot.models.Zoo;
import com.kosba.capcrudspringboot.util.ResourceNotFoundException;
import com.kosba.capcrudspringboot.web.WebService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping("/api/zoos")
public class ZooController {

	@Autowired
	WebService webService;

	// get all
	@GetMapping("/")
	public ResponseEntity<?> getZoos() {
		// begin
		Map<String, Object> map = new LinkedHashMap<>();
		// get
		List<Zoo> zoos = this.webService.getAllZoos();
		map.put("status", 1);
		map.put("data",zoos);
		// return
		return new ResponseEntity<>(map, HttpStatus.OK);
	}

	// get 1
	@GetMapping("/{id}")
	public ResponseEntity<?> getZoo(@RequestParam Long id) {
		// begin
		Map<String, Object> map = new LinkedHashMap<>();
		// try find
		try {
			// found
			Zoo zoo = this.webService.getZooById(id);
			map.put("status",1);
			map.put("data",zoo);
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			map.clear();
			map.put("status",0);
			map.put("message","No zoo found with id: " + id);
			return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
		}
	}

	// create
	@PostMapping("/")
	public ResponseEntity<?> createZoo(@RequestBody Zoo zoo) {
		// begin
		Map<String, Object> map = new LinkedHashMap<>();
		// create
		Zoo newZoo = this.webService.createNewZoo(zoo);
		map.put("status", 1);
		map.put("data",newZoo);
		// return
		return new ResponseEntity(map, HttpStatus.CREATED);
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<?> updateZoo(@RequestParam Long id, @RequestBody Zoo zoo) throws ResourceNotFoundException {
		// begin
		Map<String, Object> map = new LinkedHashMap<>();
		// update
		Zoo updatedZoo = this.webService.modifyZoo(id, zoo);
		map.put("status", 1);
		map.put("data",updatedZoo);
		// return
		return new ResponseEntity<>(map, HttpStatus.OK);
	}

	// delete 1
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteZoo(@RequestParam Long id) {
		// begin
		Map<String, Object> map = new LinkedHashMap<>();
		// delete
		this.webService.deleteZooById(id);
		map.put("status", 1);
		// return
		return new ResponseEntity<>(map, HttpStatus.OK);
	}

	// delete all
	@DeleteMapping("/")
	public ResponseEntity<?> deleteZoos() {
		// begin
		Map<String, Object> map = new LinkedHashMap<>();
		// delete
		this.webService.deleteAllZoos();
		map.put("status", 1);
		// return
		return new ResponseEntity<>(map, HttpStatus.OK);
	}
}
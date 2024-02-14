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
		map.put("status", zoos.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
		map.put("data", zoos);
		// return
		return new ResponseEntity<>(map, HttpStatus.OK);
	}

	// get 1
	@GetMapping("/{zooId}")
	public ResponseEntity<?> getZoo(@PathVariable Long zooId) {
		// begin
		Map<String, Object> map = new LinkedHashMap<>();
		// try find
		try {
			// found
			Zoo zoo = this.webService.getZooById(zooId);
			map.put("status",HttpStatus.OK);
			map.put("data",zoo);
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			map.clear();
			map.put("status",HttpStatus.NOT_FOUND);
			map.put("message","No zoo found with id: " + zooId);
			return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
		}
	}

	// create
	@PostMapping("/")
	public ResponseEntity<?> createZoo(@RequestBody Zoo zoo) {
		// begin
		Map<String, Object> map = new LinkedHashMap<>();
		// try create
		try {
			// create
			Zoo newZoo = this.webService.createNewZoo(zoo);
			map.put("status", HttpStatus.CREATED);
			map.put("data", newZoo);
			// return
			return new ResponseEntity(map, HttpStatus.CREATED);
		} catch (Exception e) {
			map.clear();
			map.put("status", HttpStatus.NOT_ACCEPTABLE);
			map.put("message", "Maximum number of zoos created");
			// return
			return new ResponseEntity<>(map, HttpStatus.NOT_ACCEPTABLE);
		}
	}

	// update
	@PutMapping("/{zooId}")
	public ResponseEntity<?> updateZoo(@PathVariable Long zooId, @RequestBody Zoo zoo) throws ResourceNotFoundException {
		// test if zooId exists
		ResponseEntity<?> zooRes = this.getZoo(zooId);
		if(zooRes.getStatusCode() == HttpStatus.NOT_FOUND) return zooRes;
		// begin
		Map<String, Object> map = new LinkedHashMap<>();
		// update
		Zoo updatedZoo = this.webService.modifyZoo(zooId, zoo);
		map.put("status", HttpStatus.OK);
		map.put("data",updatedZoo);
		// return
		return new ResponseEntity<>(map, HttpStatus.OK);
	}

	// delete 1
	@DeleteMapping("/{zooId}")
	public ResponseEntity<?> deleteZoo(@PathVariable Long zooId) {
		// test if zooId exists
		ResponseEntity<?> zooRes = this.getZoo(zooId);
		if(zooRes.getStatusCode() == HttpStatus.NOT_FOUND) return zooRes;
		// begin
		Map<String, Object> map = new LinkedHashMap<>();
		// delete
		this.webService.deleteZooById(zooId);
		map.put("status", HttpStatus.OK);
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
		map.put("status", HttpStatus.OK);
		// return
		return new ResponseEntity<>(map, HttpStatus.OK);
	}
}

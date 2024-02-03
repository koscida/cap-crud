package com.kosba.capcrudspringboot.models;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "ANIMALS")
public class Animal {

	@Id
	@Column(name = "animal_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "name")
	private String name;

	@Column(name = "hunger")
	private int hunger;

	@Column(name = "energy")
	private int energy;

	@Column(name = "age")
	private int age;

	@Column(name = "is_dead")
	private boolean isDead;


	// constructors


	public Animal() {
		this.name = "New Animal";
		this.hunger = 0;
		this.energy = 5;
		this.age = 0;
		this.isDead = false;
	}

	public Animal(String name, int hunger, int energy, int age, boolean isDead) {
		this.name = name;
		this.hunger = hunger;
		this.energy = energy;
		this.age = age;
		this.isDead = isDead;
	}


	// getters and setters

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getHunger() {
		return hunger;
	}

	public void setHunger(int hunger) {
		this.hunger = hunger;
	}

	public int getEnergy() {
		return energy;
	}

	public void setEnergy(int energy) {
		this.energy = energy;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public boolean isDead() {
		return isDead;
	}

	public void setDead(boolean dead) {
		isDead = dead;
	}

	// overrides

	@Override
	public String toString() {
		return "Animal{" +
				"id=" + id +
				", name='" + name + '\'' +
				", hunger=" + hunger +
				", energy=" + energy +
				", age=" + age +
				", isDead=" + isDead +
				'}';
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof Animal)) return false;
		Animal animal = (Animal) o;
		return id == animal.id && hunger == animal.hunger && energy == animal.energy && age == animal.age && isDead == animal.isDead && name.equals(animal.name);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name, hunger, energy, age, isDead);
	}
}

package com.kosba.capcrudspringboot.models;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "ANIMALS")
public class Animal {

	@Id
	@Column(name = "animal_id")
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private long id;

	@Column(name = "ZOO_ID")
	private long zooId;

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

	@Column(name = "birth_day")
	private int birthDay;


	// constructors

	public Animal() {
		this.name = "";
		this.zooId = -1;
		this.hunger = -1;
		this.energy = -1;
		this.age = -1;
		this.isDead = false;
		this.birthDay = -1;
	}

	public Animal(String name, int birthDay) {
		this.name = name;
		this.zooId = -1;
		this.hunger = -1;
		this.energy = -1;
		this.age = -1;
		this.isDead = false;
		this.birthDay = birthDay;
	}

	public Animal(String name, Long zooId, int hunger, int energy, int age, boolean isDead, int birthDay) {
		this.name = name;
		this.zooId = zooId;
		this.hunger = hunger;
		this.energy = energy;
		this.age = age;
		this.isDead = isDead;
		this.birthDay = birthDay;
	}


	// getters and setters

	public long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getZooId() {
		return zooId;
	}

	public void setZooId(Long zooId) { this.zooId = zooId; }

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

	public int getBirthDay() {
		return birthDay;
	}

	public void setBirthDay(int birthDay) {
		this.birthDay = birthDay;
	}

	// overrides

	@Override
	public String toString() {
		return "Animal{" +
				"id=" + id +
				", name='" + name + '\'' +
				", zooId=" + zooId +
				", hunger=" + hunger +
				", energy=" + energy +
				", age=" + age +
				", isDead=" + isDead +
				", birthDay=" + birthDay +
				'}';
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof Animal)) return false;
		Animal animal = (Animal) o;
		return id == animal.id && zooId == animal.zooId && hunger == animal.hunger && energy == animal.energy && age == animal.age && isDead == animal.isDead && name.equals(animal.name) && birthDay == animal.birthDay;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, zooId, name, hunger, energy, age, isDead, birthDay);
	}
}

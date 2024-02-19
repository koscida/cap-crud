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

	@Column(name = "happiness")
	private int happiness;

	@Column(name = "age")
	private int age;

	@Column(name = "is_dead")
	private boolean isDead;

	@Column(name = "is_fed_today")
	private boolean isFedToday;

	@Column(name = "is_pet_today")
	private boolean isPetToday;

	@Column(name = "birth_day")
	private int birthDay;


	// constructors

	public Animal() {
		this.name = "";
		this.zooId = -1;
		this.hunger = -1;
		this.happiness = -1;
		this.age = -1;
		this.isDead = false;
		this.isFedToday = false;
		this.isPetToday = false;
		this.birthDay = -1;
	}

	public Animal(String name, int birthDay) {
		this.name = name;
		this.zooId = -1;
		this.hunger = -1;
		this.happiness = -1;
		this.age = -1;
		this.isDead = false;
		this.isFedToday = false;
		this.isPetToday = false;
		this.birthDay = birthDay;
	}

	public Animal(String name, Long zooId, int hunger, int energy, int age, boolean isDead, int birthDay) {
		this.name = name;
		this.zooId = zooId;
		this.hunger = hunger;
		this.happiness = energy;
		this.age = age;
		this.isDead = isDead;
		this.isFedToday = false;
		this.isPetToday = false;
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

	public int getHappiness() {
		return happiness;
	}

	public void setHappiness(int happiness) {
		this.happiness = happiness;
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

	public boolean isFedToday() {
		return isFedToday;
	}

	public void setFedToday(boolean fedToday) {
		isFedToday = fedToday;
	}

	public boolean isPetToday() {
		return isPetToday;
	}

	public void setPetToday(boolean petToday) {
		isPetToday = petToday;
	}

	// overrides

	@Override
	public String toString() {
		return "Animal{" +
				"id=" + id +
				", name='" + name + '\'' +
				", zooId=" + zooId +
				", hunger=" + hunger +
				", energy=" + happiness +
				", age=" + age +
				", isDead=" + isDead +
				", isFedToday=" + isFedToday +
				", isPetToday=" + isPetToday +
				", birthDay=" + birthDay +
				'}';
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof Animal)) return false;
		Animal animal = (Animal) o;
		return id == animal.id && zooId == animal.zooId && hunger == animal.hunger && happiness == animal.happiness && age == animal.age && isDead == animal.isDead && isFedToday == animal.isFedToday && isPetToday == animal.isPetToday && name.equals(animal.name) && birthDay == animal.birthDay;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, zooId, name, hunger, happiness, age, isDead, isFedToday, isPetToday, birthDay);
	}
}

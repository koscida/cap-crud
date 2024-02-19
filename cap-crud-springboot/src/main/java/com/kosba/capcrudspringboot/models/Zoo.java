package com.kosba.capcrudspringboot.models;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "ZOO")
public class Zoo {
	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;

	@Column(name = "NAME")
	private String name;

	@Column(name = "CURRENT_DAY")
	private int currentDay;

	@Column(name = "FOOD")
	private int food;

	@Column(name = "CURRENT_HOUR")
	private int currentHour;

	// constructors

	public Zoo() {
		this.name = "";
		this.currentDay = -1;
		this.food = -1;
		this.currentHour = -1;
	}

	public Zoo(String name) {
		this.name = name;
		this.currentDay = -1;
		this.food = -1;
		this.currentHour = -1;
	}

	public Zoo(String name, int currentDay) {
		this.name = name;
		this.currentDay = currentDay;
		this.food = -1;
		this.currentHour = -1;
	}

	public Zoo(int currentDay) {
		this.name = "";
		this.currentDay = currentDay;
		this.food = -1;
		this.currentHour = -1;
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

	public int getCurrentDay() {
		return currentDay;
	}

	public void setCurrentDay(int currentDay) {
		this.currentDay = currentDay;
	}

	public int getFood() {
		return food;
	}

	public void setFood(int food) {
		this.food = food;
	}

	public int getCurrentHour() {
		return currentHour;
	}

	public void setCurrentHour(int currentHour) {
		this.currentHour = currentHour;
	}

	// overrides


	@Override
	public String toString() {
		return "Zoo{" +
				"id=" + id +
				", name='" + name + '\'' +
				", currentDay=" + currentDay +
				", food=" + food +
				", currentHour" + currentHour +
				'}';
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof Zoo)) return false;
		Zoo zoo = (Zoo) o;
		return id == zoo.id && currentDay == zoo.currentDay && name.equals(zoo.name) && food == zoo.food && currentHour == zoo.currentHour;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name, currentDay, food, currentHour);
	}
}

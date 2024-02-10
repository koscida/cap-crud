package com.kosba.capcrudspringboot.models;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "ZOO")
public class Zoo {
	@Id
	@Column(name = "ZOO_ID")
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long zooId;
	@Column(name = "NAME")
	private String name;
	@Column(name = "CURRENT_DAY")
	private int currentDay;

	// constructors

	public Zoo() {
		this.name = "";
		this.currentDay = 0;
	}

	public Zoo(String name) {
		this.name = name;
		this.currentDay = 0;
	}

	public Zoo(String name, int currentDay) {
		this.name = name;
		this.currentDay = currentDay;
	}

	// getters and setters


	public long getZooId() {
		return zooId;
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


	// overrides


	@Override
	public String toString() {
		return "Zoo{" +
				"zooId=" + zooId +
				", name='" + name + '\'' +
				", currentDay=" + currentDay +
				'}';
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof Zoo)) return false;
		Zoo zoo = (Zoo) o;
		return zooId == zoo.zooId && currentDay == zoo.currentDay && name.equals(zoo.name);
	}

	@Override
	public int hashCode() {
		return Objects.hash(zooId, name, currentDay);
	}
}

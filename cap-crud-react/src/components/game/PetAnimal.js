import { Button } from "@mui/material";
import React from "react";
import animalDataService from "../../services/AnimalDataService";
import { useZooContext } from "../../app/ZooContext";

const PetAnimal = ({ animal }) => {
	const { refreshZoos } = useZooContext();

	const handleClick = () => {
		const data = { happiness: animal.happiness + 1, petToday: true };

		animalDataService
			.update(animal.zooId, animal.id, data)
			.then((res) => {
				console.log(res);
				refreshZoos();
			})
			.catch((e) => console.log(e));
	};

	return (
		<Button onClick={handleClick} size="small">
			Pet
		</Button>
	);
};

export default PetAnimal;

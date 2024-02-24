import { Button } from "@mui/material";
import React from "react";
import animalDataService from "../../services/AnimalDataService";
import { useZooContext } from "../../app/ZooContext";
import { useGamePlayContext } from "../../app/GamePlayContext";

const PetAnimal = ({ animal }) => {
	const { updateAnimal } = useGamePlayContext();

	const handleClick = () => {
		// make updates
		const data = { happiness: animal.happiness + 1, petToday: true };

		// save
		updateAnimal(animal.zooId, animal.id, data);
	};

	return (
		<Button onClick={handleClick} size="small">
			Pet
		</Button>
	);
};

export default PetAnimal;

import { Button } from "@mui/material";
import React from "react";
import animalDataService from "../../services/AnimalDataService";
import { useZooContext } from "../../app/ZooContext";
import { useGamePlayContext } from "../../app/GamePlayContext";

const FeedAnimal = ({ animal }) => {
	const { updateAnimal } = useGamePlayContext();

	const handleClick = () => {
		// make updates
		const data = { hunger: animal.hunger - 1, fedToday: true };

		// save
		updateAnimal(animal.zooId, animal.id, data);
	};
	return (
		<Button size="small" onClick={handleClick}>
			Feed
		</Button>
	);
};
export default FeedAnimal;

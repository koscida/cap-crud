import { Button } from "@mui/material";
import React from "react";
import animalDataService from "../../services/AnimalDataService";
import { useZooContext } from "../../app/ZooContext";

const FeedAnimal = ({ animal }) => {
	const { refreshZoos } = useZooContext();
	const handleClick = () => {
		// make updates
		const data = { ...animal, hunger: animal.hunger - 1 };

		// update
		animalDataService
			.update(animal.zooId, animal.id, data)
			.then((res) => {
				console.log(res);
				refreshZoos();
			})
			.catch((e) => console.log(e));
	};
	return (
		<Button size="small" onClick={handleClick}>
			Feed
		</Button>
	);
};
export default FeedAnimal;

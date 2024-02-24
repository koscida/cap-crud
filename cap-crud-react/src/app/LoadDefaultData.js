import { Button } from "@mui/material";
import React from "react";
import animalDataService from "../services/AnimalDataService";
import zooDataService from "../services/ZooDataService";
import { useZooContext } from "./ZooContext";

const LoadDefaultData = () => {
	const {
		zooData: { zoos },
		refreshZoos,
	} = useZooContext();

	const handleClick = () => {
		// check if already loaded data
		const zoosToAdd = [
			{ name: "zoo 1" },
			{ name: "zoo 2" },
			{ name: "zoo 3" },
		];
		const animalsToAdd = [
			{ name: "animal 1", zooId: 1951 },
			{ name: "animal 2", zooId: 1951 },
			{ name: "animal 3", zooId: 1951 },
		];

		// call api
		callAPI(zoosToAdd, animalsToAdd);
	};

	const callAPI = (zoosToAdd, animalsToAdd) => {
		if (zoosToAdd.length > 0) {
			const newZoo = zoosToAdd[0];
			zooDataService
				.create(newZoo)
				.then((res) => {
					console.log(res);
					zoosToAdd.shift();
					callAPI(zoosToAdd, animalsToAdd);
				})
				.catch((e) => {
					console.log(e);
					console.log(newZoo);
				});
		} else if (animalsToAdd.length > 0) {
			const newAnimal = animalsToAdd[0];
			animalDataService
				.create(newAnimal.zooId, newAnimal)
				.then((res) => {
					console.log(res);
					animalsToAdd.shift();
					callAPI(zoosToAdd, animalsToAdd);
				})
				.catch((e) => {
					console.log(e);
					console.log(newAnimal);
				});
		} else {
			refreshZoos();
		}
	};

	return (
		<>
			<Button onClick={handleClick} variant="outline">
				Load Default Data
			</Button>
		</>
	);
};

export default LoadDefaultData;

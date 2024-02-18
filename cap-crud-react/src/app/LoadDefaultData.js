import { Button } from "@mui/material";
import React from "react";
import animalDataService from "../services/AnimalDataService";
import zooDataService from "../services/ZooDataService";
import { useZooContext } from "./ZooContext";

const LoadDefaultData = () => {
	const { zoos, refreshZoos } = useZooContext();

	const handleClick = () => {
		// check if already loaded data
		if (!zoos) {
			// create data
			const zoos = [
				{ name: "zoo 1" },
				{ name: "zoo 2" },
				{ name: "zoo 3" },
			];
			const animals = [
				{ name: "animals 1", zooId: 1951 },
				{ name: "animals 2", zooId: 1951 },
				{ name: "animals 3", zooId: 1951 },
			];

			// call api
			zoos.forEach((zoo) => {
				zooDataService.create(zoo).catch((e) => console.log(e));
			});
			animals.forEach((animal) => {
				animalDataService
					.create(animal.zooId, animal)
					.catch((e) => console.log(e));
			});
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

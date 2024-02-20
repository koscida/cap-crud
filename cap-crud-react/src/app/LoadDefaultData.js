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
			{ name: "animals 1", zooId: 1951 },
			{ name: "animals 2", zooId: 1951 },
			{ name: "animals 3", zooId: 1951 },
		];

		// call api
		callAPI(zoosToAdd, animalsToAdd);
	};

	const callAPI = (zoosToAdd, animalsToAdd) => {
		if (zoosToAdd.length > 0) {
			zooDataService
				.create(zoosToAdd[0])
				.then((res) => {
					console.log(res);
					zoosToAdd.shift();
					callAPI(zoosToAdd, animalsToAdd);
				})
				.catch((e) => {
					console.log(e);
					console.log(zoosToAdd[0]);
				});
		} else if (animalsToAdd.length > 0) {
			animalDataService
				.create(animalsToAdd[0].zooId, animalsToAdd[0])
				.then((res) => {
					console.log(res);
					animalsToAdd.shift();
					callAPI(zoosToAdd, animalsToAdd);
				})
				.catch((e) => {
					console.log(e);
					console.log(animalsToAdd[0]);
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

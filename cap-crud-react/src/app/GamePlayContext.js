import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import zooDataService from "../services/ZooDataService";
import useLocalStorage from "../util/useLocalStorage";
import animalDataService from "../services/AnimalDataService";
import { useZooContext } from "./ZooContext";

const GamePlayContext = createContext();

const GamePlayProvider = ({ children }) => {
	const {
		zooData: { zoos },
	} = useZooContext();

	const [gamePlayData, setGamePlayData] = useLocalStorage(
		"cap-crud-game-play-data",
		{
			contextZoo: null,
			contextAnimals: null,
		}
	);

	// on load
	useEffect(() => {
		// refreshZoos();
	}, []);

	// helpers

	const findZoo = (zoos, id) => {
		zoos.find((z) => z.id === id);
	};

	// handlers

	// set the selected zoo id
	const setContextZooId = (newZooId) => {
		console.log("--GamePlayProvider--setContextZooId--");
		// check if newZooId exists
		const contextZoo = findZoo(zoos, newZooId);
		if (contextZoo) {
			// set the contextZoo
			setGamePlayData({
				...gamePlayData,
				contextZoo,
			});
		}
	};

	// refresh all animals for zoo
	const refreshAnimals = (zooId, newZooData = null) => {
		console.log(
			"--GamePlayProvider--refreshAnimals--",
			", zooId: ",
			zooId,
			", newZooData: ",
			newZooData
		);
		animalDataService
			.getAll(zooId)
			.then((res) => {
				// console.log(res)
				const contextAnimals = res.data.data;

				// save
				if (newZooData)
					setGamePlayData({ ...newZooData, contextAnimals });
				else setGamePlayData({ ...gamePlayData, contextAnimals });
			})
			.catch((e) => {
				// print error
				console.log(e);

				// save new data
				if (newZooData) setGamePlayData(newZooData);
			});
	};

	// refresh one zoo
	const refreshZoo = (zooId) => {
		console.log("--GamePlayProvider--refreshZoo--", ", zooId: ", zooId);
		zooDataService
			.get(zooId)
			.then((res) => {
				// console.log(res);
				const newZoo = res.data.data;

				// save

				// if this is the zoo selected, save zooContext too
				if (newZoo.id === gamePlayData.contextZoo.id)
					setGamePlayData({
						...gamePlayData,
						zooContext: newZoo,
					});
			})
			.catch((e) => console.log(e));
	};

	// refresh one animal
	const refreshAnimal = (zooId, animalId) => {
		console.log(
			"--GamePlayProvider--refreshAnimal--",
			", zooId: ",
			zooId,
			", animalId: ",
			animalId
		);
		animalDataService
			.get(zooId, animalId)
			.then((res) => {
				// console.log(res)

				// get the new animal
				const newAnimal = res.data.data;

				// save animal in list of contextAnimals
				const contextAnimals = gamePlayData.contextAnimals.map((a) =>
					a.id === newAnimal.id ? newAnimal : a
				);

				// save
				setGamePlayData({ ...gamePlayData, contextAnimals });
			})
			.catch((e) => console.log(e));
	};

	// render

	console.log(
		"--GamePlayProvider--",
		", gamePlayData: ",
		gamePlayData,
		", zoos: ",
		zoos
	);
	return zoos ? (
		<GamePlayContext.Provider
			value={{
				gamePlayData,
				refreshZoo,
				refreshAnimals,
				refreshAnimal,
				setContextZooId,
			}}
		>
			{children}
		</GamePlayContext.Provider>
	) : (
		<></>
	);
};

const useGamePlayContext = () => useContext(GamePlayContext);

export { GamePlayProvider, useGamePlayContext };

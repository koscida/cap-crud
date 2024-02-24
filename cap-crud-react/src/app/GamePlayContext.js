import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import zooDataService from "../services/ZooDataService";
import useLocalStorage from "../util/useLocalStorage";
import animalDataService from "../services/AnimalDataService";
import { useZooContext } from "./ZooContext";

const GamePlayContext = createContext();

const err = (e) => console.log(`Error: ${e}\nMessage:${e.data.message}`);

const GamePlayProvider = ({ children }) => {
	const {
		zooData: { zoos },
	} = useZooContext();

	const initGamePlayData = {
		gamePlayZoo: null,
		gamePlayAnimals: null,
	};
	const [gamePlayData, setGamePlayData] = useLocalStorage(
		"cap-crud-game-play-data",
		initGamePlayData
	);

	// on load
	useEffect(() => {
		console.log("--GamePlayProvider--useEffect--");
		if (!zoos || zoos.length === 0) {
			setGamePlayData(initGamePlayData);
		} else if (zoos && zoos.length > 0) {
			loadGameData();
		} else {
			if (initGamePlayData.gamePlayZoo || initGamePlayData.gamePlayZoo) {
				setGamePlayData(initGamePlayData);
			}
		}
	}, [zoos]);

	// helpers

	const findZoo = (zoos, id) => zoos.find((z) => z.id === id);

	// handlers

	const loadGameData = () => {
		if (zoos && zoos.length > 0) {
			if (gamePlayData.gamePlayZoo) {
				if (!gamePlayData.gamePlayAnimals) {
					loadAnimals();
				}
			} else {
				loadZooAndAnimals();
			}
		}
	};

	const loadAnimals = () => {
		console.log("--GamePlayProvider--loadAnimals--");
		refreshAnimals(gamePlayData.gamePlayZoo.id);
	};

	const loadZooAndAnimals = () => {
		console.log("--GamePlayProvider--loadZooAndAnimals--");
		setGamePlayZooId(zoos[0].id);
	};

	//

	// set the selected zoo id
	const setGamePlayZooId = (newZooId) => {
		console.log(
			"--GamePlayProvider--setGamePlayZooId--",
			", newZooId: ",
			newZooId
		);
		// check if newZooId exists
		const gamePlayZoo = findZoo(zoos, newZooId);
		if (gamePlayZoo) {
			// now set animals
			refreshAnimals(gamePlayZoo.id, { gamePlayZoo });
		}
	};

	// refresh all animals for zoo
	const refreshAnimals = (zooId, newGamePlayData = null) => {
		console.log(
			"--GamePlayProvider--refreshAnimals--",
			", zooId: ",
			zooId,
			", newGamePlayData: ",
			newGamePlayData
		);
		animalDataService
			.getAll(zooId)
			.then((res) => {
				// console.log(res)
				const gamePlayAnimals = res.data.data;

				// save
				setGamePlayData({
					...(newGamePlayData ? newGamePlayData : {}),
					gamePlayAnimals,
				});
			})
			.catch((e) => {
				// print error
				console.log(e);
				// save
				if (newGamePlayData) setGamePlayData({ ...newGamePlayData });
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

				// if this is the zoo selected, save gamePlayZoo too
				if (newZoo.id === gamePlayData.gamePlayZoo.id)
					setGamePlayData({
						...gamePlayData,
						gamePlayZoo: newZoo,
					});
			})
			.catch(err);
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

				// save animal in list of gamePlayAnimals
				const gamePlayAnimals = gamePlayData.gamePlayAnimals.map((a) =>
					a.id === newAnimal.id ? newAnimal : a
				);

				// save
				setGamePlayData({ ...gamePlayData, gamePlayAnimals });
			})
			.catch(err);
	};

	//
	//

	// update one animal
	const updateAnimal = (zooId, animalId, animalData) => {
		console.log(
			"--GamePlayProvider--refreshAnimal--",
			", zooId: ",
			zooId,
			", animalId: ",
			animalId
		);
		animalDataService
			.update(zooId, animalId, animalData)
			.then((res) => {
				// console.log(res)

				// get the new animal
				const newAnimal = res.data.data;

				// save animal in list of gamePlayAnimals
				const gamePlayAnimals = gamePlayData.gamePlayAnimals.map((a) =>
					a.id === newAnimal.id ? newAnimal : a
				);

				// save
				setGamePlayData({ ...gamePlayData, gamePlayAnimals });
			})
			.catch(err);
	};

	// update one zoo
	const updateZoo = (zooId, zooData) => {
		console.log(
			"--GamePlayProvider--updateZoo--",
			", zooId: ",
			zooId,
			", zooData: ",
			zooData
		);

		zooDataService
			.update(zooId, zooData)
			.then((res) => {
				// console.log(res)

				// get the new zoo
				const gamePlayZoo = res.data.data;

				// save
				refreshAnimals(gamePlayZoo.id, { gamePlayZoo });
			})
			.catch(err);
	};

	// render

	console.log(
		"--GamePlayProvider--render--",
		", gamePlayData: ",
		gamePlayData,
		", zoos: ",
		zoos
	);
	return (
		<GamePlayContext.Provider
			value={{
				gamePlayData,

				setGamePlayZooId,

				refreshZoo,
				updateZoo,

				refreshAnimal,
				updateAnimal,
				refreshAnimals,
			}}
		>
			{children}
		</GamePlayContext.Provider>
	);
};

const useGamePlayContext = () => useContext(GamePlayContext);

export { GamePlayProvider, useGamePlayContext };

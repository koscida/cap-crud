import { createContext, useContext, useEffect, useState } from "react";
import zooDataService from "../services/ZooDataService";
import useLocalStorage from "../util/useLocalStorage";
import animalDataService from "../services/AnimalDataService";

const ZooContext = createContext();

const ZooProvider = ({ children }) => {
	const [zooData, setZooData] = useLocalStorage("cap-crud-zoo-data", {
		zoos: null,
		contextZoo: null,
		contextAnimals: null,
	});

	// on load
	useEffect(() => {
		refreshZoos();
	}, []);

	// helpers

	const findZoo = (zoos, id) => {
		zoos.find((z) => z.id === id);
	};

	// handlers

	// set the selected zoo id
	const setContextZooId = (newZooId) => {
		console.log("--ZooProvider--setContextZooId--");
		// check if newZooId exists
		const contextZoo = findZoo(zooData.zoos, newZooId);
		if (contextZoo) {
			// set the contextZoo
			setZooData({
				...zooData,
				contextZoo,
			});
		}
	};

	// refresh entire zoo list
	const refreshZoos = () => {
		console.log("--ZooProvider--refreshZoos--");
		// send
		zooDataService
			.getAll()
			.then((res) => {
				// get zoos
				// console.log(res);
				const zoos = res.data.data;

				// update contextZoo
				let contextZoo = null;
				// if zoos loaded
				if (zoos.length > 0) {
					// if contextZoo is not set OR if is set but not associated with zoo in list
					// 	then, need to update contextZooId and/or contextZoo, update to first in list
					if (
						!zooData.contextZoo ||
						(zooData.contextZoo &&
							!findZoo(zoos, zooData.contextZoo.id))
					) {
						// update contextZoo to first zoo in list
						contextZoo = zoos[0];
					}
					// if contextZoo is set (and can find id within zoos)
					else if (zooData.contextZoo) {
						// update contextZoo
						contextZoo = findZoo(zoos, zooData.contextZoo);
					}
				}

				// save values
				const newZooData = { ...zooData, zoos, contextZoo };

				// if need to update animals
				if (contextZoo) {
					refreshAnimals(contextZoo.id, newZooData);
				}
				// else, can just update itself
				else {
					// set zoo data
					setZooData(newZooData);
				}
			})
			.catch((e) => console.log(`Error: ${e}`));
	};

	// refresh all animals for zoo
	const refreshAnimals = (zooId, newZooData = null) => {
		console.log(
			"--ZooProvider--refreshAnimals--",
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
				if (newZooData) setZooData({ ...newZooData, contextAnimals });
				else setZooData({ ...zooData, contextAnimals });
			})
			.catch((e) => {
				// print error
				console.log(e);

				// save new data
				if (newZooData) setZooData(newZooData);
			});
	};

	// refresh one zoo
	const refreshZoo = (zooId) => {
		console.log("--ZooProvider--refreshZoo--", ", zooId: ", zooId);
		zooDataService
			.get(zooId)
			.then((res) => {
				// console.log(res);
				const newZoo = res.data.data;

				// replace the zoo within the current list of zoos
				const zoos = zooData.zoos.map((z) =>
					z.id === newZoo.id ? newZoo : z
				);

				// save

				// if this is the zoo selected, save zooContext too
				if (newZoo.id === zooData.contextZoo.id)
					setZooData({ ...zooData, zoos, zooContext: newZoo });
				// else, just update the list of zoos
				else setZooData({ ...zooData, zoos });
			})
			.catch((e) => console.log(e));
	};

	// refresh one animal
	const refreshAnimal = (zooId, animalId) => {
		console.log(
			"--ZooProvider--refreshAnimal--",
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
				const contextAnimals = zooData.contextAnimals.map((a) =>
					a.id === newAnimal.id ? newAnimal : a
				);

				// save
				setZooData({ ...zooData, contextAnimals });
			})
			.catch((e) => console.log(e));
	};

	// render

	console.log("--ZooProvider--", ", zooData: ", zooData);
	return (
		<ZooContext.Provider
			value={{
				zooData,
				refreshZoos,
				refreshZoo,
				refreshAnimals,
				refreshAnimal,
				setContextZooId,
			}}
		>
			{children}
		</ZooContext.Provider>
	);
};

const useZooContext = () => useContext(ZooContext);

export { ZooProvider, useZooContext };

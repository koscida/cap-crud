import { createContext, useContext, useEffect, useState } from "react";
import zooDataService from "../services/ZooDataService";
import useLocalStorage from "../util/useLocalStorage";

const ZooContext = createContext();

const ZooProvider = ({ children }) => {
	const [zooIdStored, setZooIdStored] = useLocalStorage(
		"cap-crud-zoo-context-id",
		null
	);
	const [zooData, setZooData] = useState({
		zoos: null,
		contextZoo: null,
		contextZooId: zooIdStored,
	});

	useEffect(() => {
		refreshZoos(true);
	}, []);

	const setContextZooId = (newZooId) => {
		// check if newZooId exists
		const newContextZoo = zooData.zoos.find((z) => z.id === newZooId);
		if (newContextZoo) {
			// set the contextId
			// set the contextZoo
			setZooData({
				...zooData,
				contextZooId: newZooId,
				contextZoo: newContextZoo,
			});
			// set contextZooId
			setZooIdStored(newZooId);
		}
	};

	// get list
	const refreshZoos = (init = false) => {
		// send
		zooDataService
			.getAll()
			.then((res) => {
				// get zoos
				// console.log(res);
				const zoos = res.data.data;

				// update contextZooId
				// 	if zoos and
				//		if initializing
				// 		or if selected zoo id is no longer in the list
				let contextZooId = zooIdStored;
				if (
					zoos.length > 0 &&
					(!contextZooId || !zoos.find((z) => z.id === zooIdStored))
				) {
					contextZooId = zoos[0].id;
					console.log("resetting");
					setZooIdStored(contextZooId);
				}

				// update contextZoo
				const contextZoo = zoos.find((z) => z.id === contextZooId);

				// set
				setZooData({ ...zooData, zoos, contextZooId, contextZoo });
			})
			.catch((e) => console.log(`Error: ${e}`));
	};

	console.log(
		"--ZooProvider--",
		", zooIdStored: ",
		zooIdStored,
		", zooData: ",
		zooData
	);
	return (
		<ZooContext.Provider value={{ zooData, refreshZoos, setContextZooId }}>
			{children}
		</ZooContext.Provider>
	);
};

const useZooContext = () => useContext(ZooContext);

export { ZooProvider, useZooContext };

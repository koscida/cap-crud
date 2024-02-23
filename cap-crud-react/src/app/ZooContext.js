import { createContext, useContext, useEffect } from "react";
import zooDataService from "../services/ZooDataService";
import useLocalStorage from "../util/useLocalStorage";

const ZooContext = createContext();

const ZooProvider = ({ children }) => {
	const [zooData, setZooData] = useLocalStorage("cap-crud-zoo-data", {
		zoos: null,
	});

	// on load
	useEffect(() => {
		refreshZoos();
	}, []);

	// handlers

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

				// set zoo data
				setZooData({ ...zooData, zoos });
			})
			.catch((e) => console.log(`Error: ${e}`));
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
				setZooData({ ...zooData, zoos });
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
			}}
		>
			{children}
		</ZooContext.Provider>
	);
};

const useZooContext = () => useContext(ZooContext);

export { ZooProvider, useZooContext };

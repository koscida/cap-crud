import { createContext, useContext, useEffect } from "react";
import zooDataService from "../services/ZooDataService";
import useLocalStorage from "../util/useLocalStorage";

const err = (e) => console.log(`Error: ${e}\nMessage:${e.data.message}`);

const ZooContext = createContext();

const ZooProvider = ({ children }) => {
	const [zooData, setZooData] = useLocalStorage("cap-crud-zoo-data", {
		zoos: null,
	});

	// on load
	useEffect(() => {
		console.log("--ZooProvider--useEffect--");
		loadZoos();
	}, []);

	// handlers

	const refreshZoos = () => {
		loadZoos();
	};

	// refresh entire zoo list
	const loadZoos = () => {
		console.log("--ZooProvider--loadZoos--");
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
			.catch(err);
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
			.catch(err);
	};

	// render

	console.log("--ZooProvider--render--", ", zooData: ", zooData);
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

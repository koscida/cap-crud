import React from "react";
import { Box, Button } from "@mui/material";
import { useZooContext } from "../../app/ZooContext";
import zooDataService from "../../services/ZooDataService";

const NextDay = () => {
	const {
		zooData: { contextZoo },
		refreshZoos,
	} = useZooContext();

	// handlers

	const handleNextDay = () => {
		const data = { ...contextZoo };

		// add a day
		data.currentDay++;

		zooDataService
			.update(contextZoo.id, data)
			.then((res) => {
				console.log(res);
				refreshZoos();
			})
			.catch((e) => console.log(e));
	};

	return (
		<Box>
			<Button onClick={handleNextDay} variant="contained" size="small">
				Next Day
			</Button>
		</Box>
	);
};

export default NextDay;

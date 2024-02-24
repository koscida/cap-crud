import React from "react";
import { Box, Button } from "@mui/material";
import { useZooContext } from "../../app/ZooContext";
import zooDataService from "../../services/ZooDataService";
import { useGamePlayContext } from "../../app/GamePlayContext";

const NextDay = ({ zoo }) => {
	const { updateZoo } = useGamePlayContext();

	// handlers

	const handleNextDay = () => {
		// add a day
		const data = { currentDay: zoo.currentDay + 1 };

		// save
		updateZoo(zoo.id, data);
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

import React from "react";
import AnimalNew from "./animals/AnimalNew";
import ZooNew from "./zoos/ZooNew";
import PlayView from "./game/PlayView";
import { Box } from "@mui/material";
import { useZooContext } from "../app/ZooContext";
import { useGamePlayContext } from "../app/GamePlayContext";

const Home = () => {
	const {
		gamePlayData: { gamePlayZoo },
	} = useGamePlayContext();
	return (
		<Box sx={{ mb: 3 }}>
			<PlayView />
			{gamePlayZoo ? <AnimalNew /> : <ZooNew />}
		</Box>
	);
};

export default Home;

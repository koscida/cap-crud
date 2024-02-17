import React from "react";
import AnimalList from "./animals/AnimalList";
import ZooList from "./zoos/ZooList";

import PlayView from "./common/PlayView";
import { Box } from "@mui/material";

const Home = () => {
	return (
		<Box>
			<PlayView />
			<hr />
			<h1>Animals Home</h1>
			<p>Features:</p>
			<ul>
				<li>Add, edit, delete zoos</li>
				<li>Add, edit, delete animals</li>
			</ul>
		</Box>
	);
};

export default Home;

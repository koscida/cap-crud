import React from "react";
import AnimalList from "./animals/AnimalList";
import ZooList from "./zoos/ZooList";

const Home = () => {
	return (
		<>
			<h1>Animals Home</h1>
			<p>Features:</p>
			<ul>
				<li>Add, edit, delete zoos</li>
				<li>Add, edit, delete animals</li>
			</ul>
			<ZooList />
		</>
	);
};

export default Home;

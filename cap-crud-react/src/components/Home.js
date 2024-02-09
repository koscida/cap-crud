import React from "react";
import AnimalList from "./AnimalList";

const Home = () => {
	return (
		<>
			<h1>Animals Home</h1>
			<p>Features:</p>
			<ul>
				<li>Add, edit, delete animals</li>
			</ul>
			<AnimalList />
		</>
	);
};

export default Home;

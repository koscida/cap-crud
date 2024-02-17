import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { MUIResponsiveAppBar } from "./components/MUIResponsiveAppBar";
import Home from "./components/Home";
import AnimalList from "./components/animals/AnimalList";
import AnimalNew from "./components/animals/AnimalNew";
import ZooList from "./components/zoos/ZooList";
import ZooNew from "./components/zoos/ZooNew";
import zooDataService from "./services/ZooDataService";

// app created from the following tutorial:
// https://www.bezkoder.com/react-material-ui-examples-crud/

function App() {
	const [zoos, setZoos] = useState(null);
	const [selectedZooID, setSelectedZooId] = useState(null);

	useEffect(() => {
		// if no zoos, load them
		if (!zoos) pullList();
		// console.log("--App--", " zoos: ", zoos);
	}, []);

	// get list
	const pullList = () => {
		// send
		zooDataService
			.getAll()
			.then((res) => {
				console.log(res);
				// set the list
				setZoos(res.data.data);
				// selected id
				if (!selectedZooID && res.data.data)
					setSelectedZooId(res.data.data[0]);
			})
			.catch((e) => console.log(e));
	};

	console.log("--App--", " zoos: ", zoos, ", selectedZooID: ", selectedZooID);

	return (
		<>
			<MUIResponsiveAppBar
				zoos={zoos}
				selectedZooID={selectedZooID}
				setSelectedZooId={setSelectedZooId}
			/>
			<Container>
				<Box maxWidth="xl">
					<BrowserRouter>
						<Routes>
							{/* Default Route */}
							<Route
								path="/"
								element={
									<Home zoos={zoos} pullList={pullList} />
								}
							/>

							{/* Zoo Routes */}
							<Route
								path="zoos/"
								element={
									<ZooList zoos={zoos} pullList={pullList} />
								}
							/>
							<Route
								path="zoos/:zooId"
								element={
									<ZooList zoos={zoos} pullList={pullList} />
								}
							/>
							<Route
								path="zoos/:zooId/edit"
								element={
									<ZooList
										isEditing={true}
										zoos={zoos}
										pullList={pullList}
									/>
								}
							/>
							<Route
								path="zoos/new"
								element={
									<ZooNew zoos={zoos} pullList={pullList} />
								}
							/>

							{/* Animal Routes */}
							<Route
								path="zoos/:zooId/animals"
								element={
									<AnimalList
										zoos={zoos}
										pullList={pullList}
									/>
								}
							/>
							<Route
								path="zoos/:zooId/animals/:animalId/"
								element={
									<AnimalList
										zoos={zoos}
										pullList={pullList}
									/>
								}
							/>
							<Route
								path="zoos/:zooId/animals/:animalId/edit"
								element={
									<AnimalList
										isEditing={true}
										zoos={zoos}
										pullList={pullList}
									/>
								}
							/>
							<Route
								path="zoos/:zooId/animals/new"
								element={
									<AnimalNew
										zoos={zoos}
										pullList={pullList}
									/>
								}
							/>
						</Routes>
					</BrowserRouter>
					<Outlet />
				</Box>
			</Container>
		</>
	);
}

export default App;

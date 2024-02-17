import React from "react";
import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { MUIResponsiveAppBar } from "./components/MUIResponsiveAppBar";
import Home from "./components/Home";
import AnimalList from "./components/animals/AnimalList";
import AnimalNew from "./components/animals/AnimalNew";
import ZooList from "./components/zoos/ZooList";
import ZooNew from "./components/zoos/ZooNew";
import { ZooProvider } from "./app/ZooContext";

// app created from the following tutorial:
// https://www.bezkoder.com/react-material-ui-examples-crud/

function App() {
	// console.log("--App--");

	return (
		<ZooProvider>
			<MUIResponsiveAppBar />
			<Container>
				<Box maxWidth="xl">
					<BrowserRouter>
						<Routes>
							{/* Default Route */}
							<Route path="/" element={<Home />} />

							{/* Zoo Routes */}
							<Route path="zoos/" element={<ZooList />} />
							<Route path="zoos/:zooId" element={<ZooList />} />
							<Route
								path="zoos/:zooId/edit"
								element={<ZooList isEditing={true} />}
							/>
							<Route path="zoos/new" element={<ZooNew />} />

							{/* Animal Routes */}
							<Route
								path="zoos/:zooId/animals"
								element={<AnimalList />}
							/>
							<Route
								path="zoos/:zooId/animals/:animalId/"
								element={<AnimalList />}
							/>
							<Route
								path="zoos/:zooId/animals/:animalId/edit"
								element={<AnimalList isEditing={true} />}
							/>
							<Route
								path="zoos/:zooId/animals/new"
								element={<AnimalNew />}
							/>
						</Routes>
					</BrowserRouter>
					<Outlet />
				</Box>
			</Container>
		</ZooProvider>
	);
}

export default App;

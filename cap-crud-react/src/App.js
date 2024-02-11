import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { MUIResponsiveAppBar } from "./components/MUIResponsiveAppBar";
import Home from "./components/Home";
import AnimalList from "./components/Animals/AnimalList";
import AnimalNew from "./components/Animals/AnimalNew";

// app created from the following tutorial:
// https://www.bezkoder.com/react-material-ui-examples-crud/

function App() {
	return (
		<>
			<MUIResponsiveAppBar />
			<Container>
				<Box maxWidth="xl">
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route
								path="zoos/:zooId/animals"
								element={<AnimalList />}
							/>
							<Route
								path="zoos/:zooId/animals/new"
								element={<AnimalNew />}
							/>
							<Route
								path="zoos/:zooId/animals/:id/"
								element={<AnimalList />}
							/>
							<Route
								path="zoos/:zooId/animals/:id/edit"
								element={<AnimalList isEditing={true} />}
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

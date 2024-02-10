import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { MUIResponsiveAppBar } from "./components/MUIResponsiveAppBar";
import AnimalList from "./components/Animals/AnimalList";
import Home from "./components/Home";
import AnimalNew from "./components/Animals/AnimalNew";
import AnimalView from "./components/Animals/AnimalView";
import AnimalEdit from "./components/Animals/AnimalEdit";

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
							<Route path="animals" element={<AnimalList />} />
							<Route path="animals/new" element={<AnimalNew />} />
							<Route
								path="animals/:id/"
								element={<AnimalList />}
							/>
							<Route
								path="animals/:id/edit"
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

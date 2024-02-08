import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { MUIResponsiveAppBar } from "./components/MUIResponsiveAppBar";
import AnimalList from "./components/AnimalList";
import Home from "./components/Home";
import AnimalNew from "./components/AnimalNew";
import AnimalEdit from "./components/AnimalEdit";

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
								path="animals/:id"
								element={<AnimalEdit />}
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

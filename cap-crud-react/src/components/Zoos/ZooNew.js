import React, { useEffect, useState } from "react";
import animalDataService from "../../services/AnimalDataService";
import { useParams } from "react-router-dom";

import {
	Box,
	Button,
	Grid,
	IconButton,
	Snackbar,
	TextField,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { styles } from "../../css-common";

const ZooNew = () => {
	const initName = "";
	const [name, setName] = useState(initName);
	const [isSnackbarSaveOpen, setIsSnackbarSaveOpen] = useState(false);
	const [animals, setAnimals] = useState([]);

	useEffect(() => {
		animalDataService
			.getAll()
			.then((res) => {
				console.log(res);
				setAnimals(res.data);
			})
			.catch((e) => console.log(e));
	}, []);

	const createAnimal = () => {
		// create data to send
		const data = {
			name,
		};
		console.log(data);

		// send
		animalDataService
			.create(data)
			.then((res) => {
				console.log(res);
				// clear the form
				setName(initName);
				// save
				setIsSnackbarSaveOpen(true);
			})
			.catch((e) => console.log(e));
	};

	const snackAction = (
		<>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={() => setIsSnackbarSaveOpen(false)}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</>
	);

	return (
		<>
			<Box>
				<h1>New Animal</h1>
			</Box>
			<Grid container spacing={2}>
				<Grid item="true" xs={6}>
					<Box>
						<p>Add a new animal here</p>

						<Box sx={{ padding: "1rem 0" }}>
							<TextField
								id="name"
								label="Name"
								value={name}
								variant="filled"
								onChange={(event) => {
									setName(event.target.value);
								}}
							/>
						</Box>

						<Button onClick={createAnimal} variant="contained">
							Create
						</Button>

						<Snackbar
							open={isSnackbarSaveOpen}
							autoHideDuration={1500}
							onClose={() => setIsSnackbarSaveOpen(false)}
							message="Created"
							action={snackAction}
						/>
					</Box>
				</Grid>
				<Grid item="true" xs={6}>
					<Box>
						<h3>Zoo Rules!</h3>
						<p>
							Only 10 animals can be added a day, once 10 animals
							are added, the next day will happen
						</p>
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default ZooNew;

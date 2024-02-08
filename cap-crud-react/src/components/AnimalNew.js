import React, { useEffect, useState } from "react";
import animalDataService from "../services/AnimalDataService";
import { useParams } from "react-router-dom";

import {
	Box,
	Button,
	IconButton,
	Snackbar,
	TextField,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { styles } from "../css-common";

const AnimalNew = () => {
	const initName = "";
	const [name, setName] = useState(initName);
	const [isSnackbarSaveOpen, setIsSnackbarSaveOpen] = useState(false);

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
		<Box>
			<h1>New Animal</h1>
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
	);
};

export default AnimalNew;

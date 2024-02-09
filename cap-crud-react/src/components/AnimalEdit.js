import React, { useEffect, useState } from "react";
import animalDataService from "../services/AnimalDataService";
import { useNavigate, useParams } from "react-router-dom";

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

import { styles } from "../css-common";
import AnimalList from "./AnimalList";

const AnimalEdit = () => {
	const [animal, setAnimal] = useState(null);
	const [isSnackbarSaveOpen, setIsSnackbarSaveOpen] = useState(false);
	let { id } = useParams();
	let navigate = useNavigate();

	useEffect(() => {
		animalDataService
			.get(id)
			.then((res) => {
				// console.log(`get(${id}): `, res);
				setAnimal(res.data);
			})
			.catch((e) => console.log(e));
	}, [id]);

	const cancelEditAnimal = () => {
		navigate(`/animals/${animal.id}`);
	};

	const saveAnimal = () => {
		// create data to send
		const data = {
			id,
			name: animal.name,
		};
		// console.log(data);

		// send
		animalDataService
			.update(id, data)
			.then((res) => {
				// console.log(res);
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
				<h1>Edit Animal</h1>
			</Box>
			<Grid container spacing={2}>
				<Grid item xs={8}>
					{animal ? (
						<>
							<h3>{animal.name}</h3>

							<Box sx={{ padding: "1rem 0" }}>
								<TextField
									id="name"
									label="Name"
									value={animal.name}
									variant="filled"
									onChange={(event) => {
										setAnimal({
											...animal,
											name: event.target.value,
										});
									}}
								/>
							</Box>

							<Box>
								<Button
									onClick={cancelEditAnimal}
									variant="outlined"
								>
									Cancel
								</Button>
								<Button
									onClick={saveAnimal}
									variant="contained"
								>
									Save
								</Button>
							</Box>
						</>
					) : (
						<></>
					)}

					<Snackbar
						open={isSnackbarSaveOpen}
						autoHideDuration={1500}
						onClose={() => setIsSnackbarSaveOpen(false)}
						message="Saved"
						action={snackAction}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default AnimalEdit;

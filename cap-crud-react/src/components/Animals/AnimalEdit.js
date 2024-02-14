import React, { useEffect, useState } from "react";
import animalDataService from "../../services/AnimalDataService";
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

import { styles } from "../../css-common";
import AnimalList from "./AnimalList";

const AnimalEdit = ({ animal, refreshList }) => {
	let { zooId } = useParams();

	// console.log("--AnimalEdit-- animal: ", animal);
	const [animalEdits, setAnimalEdits] = useState({ ...animal });
	const [isSnackbarSaveOpen, setIsSnackbarSaveOpen] = useState(false);
	let navigate = useNavigate();

	useEffect(() => {
		setAnimalEdits(animal);
	}, [animal]);

	const cancelEditAnimal = () => {
		navigate(`/animals/${animal.id}`);
	};

	const saveAnimal = () => {
		// create data to send
		const data = {
			id: animal.id,
			name: animalEdits.name,
		};
		// console.log(data);

		// send
		animalDataService
			.update(animal.id, data)
			.then((res) => {
				// console.log(res);
				// save
				setIsSnackbarSaveOpen(true);
				// refresh
				refreshList();
				// reload
				navigate(`/animals/${animal.id}`);
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

	// console.log("--AnimalEdit-- animalEdits: ", animalEdits);
	return (
		<>
			<Box>
				{animal && animalEdits ? (
					<>
						<h3>{animal.name}</h3>

						<Box sx={{ padding: "1rem 0" }}>
							<TextField
								id="name"
								label="Name"
								value={animalEdits.name}
								variant="filled"
								onChange={(event) => {
									setAnimalEdits({
										...animalEdits,
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
							<Button onClick={saveAnimal} variant="contained">
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
			</Box>
		</>
	);
};

export default AnimalEdit;

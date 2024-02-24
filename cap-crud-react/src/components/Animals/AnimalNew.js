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
import zooDataService from "../../services/ZooDataService";
import { useZooContext } from "../../app/ZooContext";
import { useGamePlayContext } from "../../app/GamePlayContext";

const initName = "";

const AnimalNew = () => {
	const {
		zooData: { zoos },
		refreshZoos,
	} = useZooContext();
	const {
		gamePlayData: { gamePlayZoo, gamePlayAnimals },
		createAnimal,
	} = useGamePlayContext();
	let { zooId } = useParams();

	const [name, setName] = useState(initName);
	const [isSnackbarSaveOpen, setIsSnackbarSaveOpen] = useState(false);

	const animals = zooId ? null : gamePlayAnimals;
	const zoo = zooId ? zoos.find((z) => z.id === zooId) : gamePlayZoo;

	// handlers

	const handleCreateAnimal = () => {
		// create data to send
		const data = {
			name,
			zooId: zoo.id,
			birthDay: zoo.currentDay,
		};
		// console.log("data: ", data);

		// send
		createAnimal(zoo.id, data, (res) => {
			// clear the form
			setName(initName);
			// save
			setIsSnackbarSaveOpen(true);
		});
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
				<Grid item={true} xs={6}>
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

						<Button
							onClick={handleCreateAnimal}
							variant="contained"
						>
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
				<Grid item={true} xs={6}>
					<Box>
						<h3>Zoo Rules!</h3>
						<p>Limit of 10 animals created per day</p>
					</Box>
					<Box>
						{zoo ? (
							<p>
								<strong>
									Animals added today (Day {zoo.currentDay}
									):
								</strong>
								&nbsp;
								{
									animals.filter(
										(a) => a.birthDay === zoo.currentDay
									).length
								}
							</p>
						) : (
							<></>
						)}
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default AnimalNew;

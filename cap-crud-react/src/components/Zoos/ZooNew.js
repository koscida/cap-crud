import React, { useEffect, useState } from "react";
import zooDataService from "../../services/ZooDataService";
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

import { useZooContext } from "../../app/ZooContext";
import { styles } from "../../css-common";

const ZooNew = () => {
	const {
		zooData: { zoos },
		refreshZoos,
	} = useZooContext();

	const initName = "";
	const [name, setName] = useState(initName);
	const [isSnackbarSaveOpen, setIsSnackbarSaveOpen] = useState(false);

	const createZoo = () => {
		// create data to send
		const data = {
			name,
		};
		console.log(data);

		// send
		zooDataService
			.create(data)
			.then((res) => {
				console.log(res);
				// clear the form
				setName(initName);
				// save
				setIsSnackbarSaveOpen(true);
				// re-pull
				refreshZoos();
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
				<h1>New Zoo</h1>
			</Box>
			<Grid container spacing={2}>
				<Grid item={true} xs={6}>
					<Box>
						<p>Add a new zoo here</p>

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

						<Button onClick={createZoo} variant="contained">
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
						<p>
							<strong>Zoos created:</strong>&nbsp;
							{zoos.length}
						</p>
					</Box>
					<Box>
						<h3>Zoo Rules!</h3>
						<p>Only 6 zoos per user!</p>
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default ZooNew;

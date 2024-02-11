import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import animalDataService from "../../services/AnimalDataService";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	Paper,
} from "@mui/material";
import List from "./AnimalList";

function ZooView({ animal }) {
	const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
	// const [animal, setAnimal] = useState(animal);
	// let { id } = useParams();

	let navigate = useNavigate();

	// useEffect(() => {
	// 	if(!animal)
	// 	animalDataService
	// 		.get(id)
	// 		.then((res) => {
	// 			// console.log(`get(${id}): `, res);
	// 			setAnimal(res.data);
	// 		})
	// 		.catch((e) => console.log(e));
	// }, []);

	const handleDelete = () => {
		// make delete call
		animalDataService
			.delete(animal.id)
			.then((res) => {
				console.log(res);
				// go back to the animal list
				navigate("/animals");
			})
			.catch((e) => console.log(e));

		// close dialog
		setIsDeleteAlertOpen(false);
	};

	const DeleteAlert = () => (
		<Dialog
			open={isDeleteAlertOpen}
			onClose={() => setIsDeleteAlertOpen(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{"Delete Animal?"}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Warning! Deleted items cannot be recovered!
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setIsDeleteAlertOpen(false)}>
					Cancel
				</Button>
				<Button onClick={handleDelete} autoFocus variant="contained">
					Yes, Delete
				</Button>
			</DialogActions>
		</Dialog>
	);

	return (
		<>
			<Box>
				{animal ? (
					<>
						<Paper sx={{ padding: "1rem" }}>
							<Box>
								<h2>{animal.name}</h2>
							</Box>
							<Box>
								<Box>
									<strong>Age</strong>: {animal.age}
								</Box>
								<Box>
									<strong>Energy</strong>: {animal.energy}
								</Box>
								<Box>
									<strong>Hunger</strong>: {animal.hunger}
								</Box>
							</Box>
							<Box>
								<Button
									variant="outlined"
									onClick={() =>
										navigate(`/animals/${animal.id}/edit`)
									}
									size="small"
									sx={{ margin: "0.5rem 0.5rem 0 0" }}
								>
									Edit
								</Button>
								<Button
									variant="outlined"
									onClick={() => setIsDeleteAlertOpen(true)}
									size="small"
									sx={{ margin: "0.5rem 0.5rem 0 0" }}
								>
									Delete
								</Button>
								<DeleteAlert />
							</Box>
						</Paper>
					</>
				) : (
					<></>
				)}
			</Box>
		</>
	);
}

export default ZooView;

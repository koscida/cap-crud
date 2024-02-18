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
	IconButton,
	Paper,
	Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AlertSnackbarButton from "../common/AlertSnackbarButton";
import { useZooContext } from "../../app/ZooContext";

function AnimalView({ animal }) {
	let { zooId } = useParams();
	let { refreshZoos } = useZooContext();

	let navigate = useNavigate();

	const handleDelete = () => {
		// make delete call
		animalDataService
			.delete(zooId, animal.id)
			.then((res) => {
				// console.log(res);
				// refresh list
				refreshZoos();
				// go back to the list
				navigate(`/zoos/${zooId}/animals`);
			})
			.catch((e) => console.log(e));
	};
	const buttonText = "Delete";
	const dialog = {
		title: "Delete Animal?",
		contentText: "Warning! Deleted items cannot be recovered!",
	};
	const snackMessage = "Deleted!";

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
									<strong>Birth Day</strong>:{" "}
									{animal.birthDay}
								</Box>
								<Box>
									<strong>Happiness</strong>: {animal.energy}
								</Box>
								<Box>
									<strong>Hunger</strong>: {animal.hunger}
								</Box>
								<Box>
									<strong>Dead</strong>:{" "}
									{animal.dead ? "Yes" : "No"}
								</Box>
							</Box>
							<Box>
								<Button
									variant="outlined"
									onClick={() =>
										navigate(
											`/zoos/${zooId}animals/${animal.id}/edit`
										)
									}
									size="small"
									sx={{ margin: "0.5rem 0.5rem 0 0" }}
								>
									Edit
								</Button>
								<AlertSnackbarButton
									buttonText={buttonText}
									dialog={dialog}
									snackMessage={snackMessage}
									handleAction={handleDelete}
								/>
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

export default AnimalView;

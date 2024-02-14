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

function AnimalView({ animal, refreshList }) {
	let { zooId } = useParams();

	const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
	const [isDeleteSnackbarOpen, setIsDeleteSnackbarOpen] = useState(false);

	let navigate = useNavigate();

	const handleDelete = () => {
		// make delete call
		animalDataService
			.delete(animal.id)
			.then((res) => {
				// console.log(res);
				// pop up save
				setIsDeleteSnackbarOpen(true);
				// refresh list
				refreshList();
				// go back to the list
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

	const snackDeleteAction = (
		<>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={() => setIsDeleteSnackbarOpen(false)}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</>
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

				<Snackbar
					open={isDeleteSnackbarOpen}
					autoHideDuration={1500}
					onClose={() => setIsDeleteSnackbarOpen(false)}
					message="Deleted"
					action={snackDeleteAction}
				/>
			</Box>
		</>
	);
}

export default AnimalView;

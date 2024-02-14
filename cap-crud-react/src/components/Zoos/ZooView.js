import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import zooDataService from "../../services/ZooDataService";
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

function ZooView({ zoo, refreshList }) {
	const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
	const [isDeleteSnackbarOpen, setIsDeleteSnackbarOpen] = useState(false);

	let navigate = useNavigate();

	const handleDelete = () => {
		// make delete call
		zooDataService
			.delete(zoo.id)
			.then((res) => {
				// console.log(res);
				// pop-up save
				setIsDeleteSnackbarOpen(true);
				// refresh list
				refreshList();
				// go back to the list
				navigate("/zoos");
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
			<DialogTitle id="alert-dialog-title">{`Delete ${zoo.name}?`}</DialogTitle>
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

	console.log("--ZooView--", " zoo: ", zoo);
	return (
		<>
			<Box>
				{zoo ? (
					<>
						<Paper sx={{ padding: "1rem" }}>
							<Box>
								<h2>{zoo.name}</h2>
							</Box>
							<Box>
								<Box>
									<strong>Day</strong>: {zoo.currentDay}
								</Box>
							</Box>
							<Box>
								<Button
									variant="outlined"
									onClick={() =>
										navigate(`/zoos/${zoo.id}/edit`)
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
								<Button
									variant="outlined"
									onClick={() =>
										navigate(`/zoos/${zoo.id}/animals`)
									}
									size="small"
									sx={{ margin: "0.5rem 0.5rem 0 0" }}
								>
									Animal List
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

export default ZooView;

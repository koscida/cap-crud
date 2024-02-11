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
	Paper,
} from "@mui/material";

function ZooView({ zoo }) {
	const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
	// const [zoo, setZoo] = useState(zoo);
	// let { id } = useParams();

	let navigate = useNavigate();

	const handleDelete = () => {
		// make delete call
		zooDataService
			.delete(zoo.id)
			.then((res) => {
				// console.log(res);
				// go back to the zoo list
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
			<DialogTitle id="alert-dialog-title">{"Delete Zoo?"}</DialogTitle>
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
				{zoo ? (
					<>
						<Paper sx={{ padding: "1rem" }}>
							<Box>
								<h2>{zoo.name}</h2>
							</Box>
							<Box>
								<Box>
									<strong>Age</strong>: {zoo.age}
								</Box>
								<Box>
									<strong>Energy</strong>: {zoo.energy}
								</Box>
								<Box>
									<strong>Hunger</strong>: {zoo.hunger}
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

import React, { useEffect, useState } from "react";
import zooDataService from "../../services/ZooDataService";
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

const ZooEdit = ({ zoo, refreshList }) => {
	console.log("--ZooEdit-- zoo: ", zoo);
	const [zooEdits, setZooEdits] = useState({ ...zoo });
	const [isSnackbarSaveOpen, setIsSnackbarSaveOpen] = useState(false);
	let navigate = useNavigate();

	useEffect(() => {
		setZooEdits(zoo);
	}, [zoo]);

	const cancelEditZoo = () => {
		navigate(`/zoos/${zoo.id}`);
	};

	const saveZoo = () => {
		// create data to send
		const data = {
			id: zoo.id,
			name: zooEdits.name,
		};
		// console.log(data);

		// send
		zooDataService
			.update(zoo.id, data)
			.then((res) => {
				// console.log(res);
				// save
				setIsSnackbarSaveOpen(true);
				// refresh
				refreshList();
				// reload
				navigate(`/zoos/${zoo.id}`);
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

	console.log("--ZooEdit-- zooEdits: ", zooEdits);
	return (
		<>
			<Box>
				{zoo && zooEdits ? (
					<>
						<h3>{zoo.name}</h3>

						<Box sx={{ padding: "1rem 0" }}>
							<TextField
								id="name"
								label="Name"
								value={zooEdits.name}
								variant="filled"
								onChange={(event) => {
									setZooEdits({
										...zooEdits,
										name: event.target.value,
									});
								}}
							/>
						</Box>

						<Box>
							<Button onClick={cancelEditZoo} variant="outlined">
								Cancel
							</Button>
							<Button onClick={saveZoo} variant="contained">
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

export default ZooEdit;

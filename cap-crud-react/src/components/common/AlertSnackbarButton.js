import React, { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AlertSnackbarButton = ({
	buttonText,
	dialog: { title, contentText },
	snackMessage,
	handleAction,
}) => {
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

	const handleClick = () => {
		setIsSnackbarOpen(true);
		setIsAlertOpen(false);
		handleAction();
	};

	const AlertConfirmation = () => (
		<Dialog
			open={isAlertOpen}
			onClose={() => setIsAlertOpen(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{contentText}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setIsAlertOpen(false)}>Cancel</Button>
				<Button onClick={handleClick} autoFocus variant="contained">
					Yes, confirm
				</Button>
			</DialogActions>
		</Dialog>
	);

	const snackAction = (
		<>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={() => setIsSnackbarOpen(false)}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</>
	);

	return (
		<>
			<Button
				variant="outlined"
				onClick={() => setIsAlertOpen(true)}
				size="small"
				sx={{ margin: "0.5rem 0.5rem 0 0" }}
			>
				{buttonText}
			</Button>
			<AlertConfirmation />

			<Snackbar
				open={isSnackbarOpen}
				autoHideDuration={1500}
				onClose={() => setIsSnackbarOpen(false)}
				message={snackMessage}
				action={snackAction}
			/>
		</>
	);
};

export default AlertSnackbarButton;

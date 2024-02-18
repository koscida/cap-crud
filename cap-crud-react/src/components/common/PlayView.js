import React, { useEffect, useState } from "react";
import { useZooContext } from "../../app/ZooContext";
import {
	Box,
	Button,
	Grid,
	Paper,
	Stack,
	Tooltip,
	styled,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import CakeIcon from "@mui/icons-material/Cake";
import EventIcon from "@mui/icons-material/Event";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import animalDataService from "../../services/AnimalDataService";
import zooDataService from "../../services/ZooDataService";

const PlayView = () => {
	const {
		zooData: { contextZoo },
		refreshZoos,
	} = useZooContext();

	const [animals, setAnimals] = useState(null);

	useEffect(() => {
		if (contextZoo)
			animalDataService
				.getAll(contextZoo.id)
				.then((res) => {
					console.log(res);

					// set animals
					setAnimals(res.data.data);
				})
				.catch((e) => console.log(e));
	}, [contextZoo]);

	// handlers

	const handleNextDay = () => {
		const data = { ...contextZoo };

		// add a day
		data.currentDay++;

		zooDataService
			.update(contextZoo.id, data)
			.then((res) => {
				console.log(res);
				refreshZoos();
			})
			.catch((e) => console.log(e));
	};

	// views

	const ItemRow = styled(Box)((theme) => ({
		display: "flex",
		flexDirection: "row",
		gap: "0.5rem",
		flexWrap: "wrap",
	}));
	const Item = styled(Box)(({ theme }) => ({
		padding: theme.spacing(0.25),
		textAlign: "center",
		color: theme.palette.text.secondary,
		display: "flex",
		flexDirection: "row",
		gap: "0.25rem",
	}));

	// render

	return (
		<Box>
			{contextZoo ? (
				<Box>
					<Box>
						<h1>{contextZoo.name}</h1>
					</Box>
					<Box>
						<p>Day: {contextZoo.currentDay}</p>
						<Button onClick={handleNextDay}>Next Day</Button>
					</Box>
					<h2>Animals</h2>
					<Grid container spacing={2}>
						{animals ? (
							animals.map((animal) => (
								<Grid item xs={2} key={animal.id}>
									<Paper
										sx={{
											padding: "0.25rem",
											border: animal.dead
												? "1px solid red"
												: "",
										}}
									>
										<Box sx={{}}>{animal.name}</Box>
										<ItemRow>
											<Tooltip title="Energy">
												<Item>
													<FavoriteIcon />{" "}
													{animal.energy}
												</Item>
											</Tooltip>

											<Tooltip title="Hunger">
												<Item>
													<RestaurantIcon />{" "}
													{animal.hunger}
												</Item>
											</Tooltip>

											<Tooltip title="Age">
												<Item>
													<CakeIcon /> {animal.age}
												</Item>
											</Tooltip>

											<Tooltip title="Birth Day">
												<Item>
													<EventIcon />{" "}
													{animal.birthDay}
												</Item>
											</Tooltip>
										</ItemRow>
									</Paper>
								</Grid>
							))
						) : (
							<></>
						)}
					</Grid>
				</Box>
			) : (
				<></>
			)}
		</Box>
	);
};

export default PlayView;

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
import NextDay from "./NextDay";
import FeedAnimal from "./FeedAnimal";
import PetAnimal from "./PetAnimal";
import { useGamePlayContext } from "../../app/GamePlayContext";

const PlayView = () => {
	const {
		gamePlayData: { gamePlayZoo, gamePlayAnimals },
		refreshAnimal,
	} = useGamePlayContext();

	// views

	const State = styled(Paper)(({ theme }) => ({
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: "0.5rem",
		padding: "1rem",
	}));
	const ItemRow = styled(Box)((theme) => ({
		display: "flex",
		flexDirection: "row",
		gap: "0.5rem",
		flexWrap: "wrap",
	}));
	const Stat = styled(Box)(({ theme }) => ({
		padding: theme.spacing(0.25),
		textAlign: "center",
		color: theme.palette.text.secondary,
		display: "flex",
		flexDirection: "row",
		gap: "0.25rem",
	}));

	// render

	console.log(
		"--PlayView--render--",
		", gamePlayZoo ",
		gamePlayZoo,
		", gamePlayAnimals ",
		gamePlayAnimals
	);
	return (
		<Box>
			{gamePlayZoo ? (
				<Box>
					<Box>
						<h1>{gamePlayZoo.name}</h1>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							gap: 2,
						}}
					>
						<State>
							<p>Day: {gamePlayZoo.currentDay}</p>
							<NextDay zoo={gamePlayZoo} />
						</State>
						<State>
							<p>Food: {gamePlayZoo.food}</p>
						</State>
						<State>
							<p>Time: {gamePlayZoo.currentHour}</p>
						</State>
					</Box>
					<h2>Animals</h2>
					<Grid container spacing={2}>
						{gamePlayAnimals ? (
							gamePlayAnimals.map((animal) => (
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
											<Tooltip title="Happiness">
												<Stat>
													<FavoriteIcon
														color={
															animal.petToday
																? "primary"
																: "inherit"
														}
													/>{" "}
													{animal.happiness}
													<PetAnimal
														animal={animal}
													/>
												</Stat>
											</Tooltip>

											<Tooltip title="Hunger">
												<Stat>
													<RestaurantIcon
														color={
															animal.fedToday
																? "primary"
																: "inherit"
														}
													/>{" "}
													{animal.hunger}
													<FeedAnimal
														animal={animal}
													/>
												</Stat>
											</Tooltip>

											<Tooltip title="Age">
												<Stat>
													<CakeIcon /> {animal.age}
												</Stat>
											</Tooltip>

											<Tooltip title="Birth Day">
												<Stat>
													<EventIcon />{" "}
													{animal.birthDay}
												</Stat>
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
				<Box>
					<p>No zoo selected.</p>
				</Box>
			)}
		</Box>
	);
};

export default PlayView;

import {
	Box,
	List,
	Paper,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import animalDataService from "../services/AnimalDataService";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import AnimalView from "./AnimalView";

const AnimalList = () => {
	const [animals, setAnimals] = useState([]);
	const [selectedAnimalId, setSelectedAnimalId] = useState(null);

	useEffect(() => {
		// send
		animalDataService
			.getAll()
			.then((res) => {
				console.log(res);
				// set the animal list
				setAnimals(res.data);
				// set the first selected animal
				if (res.data.length > 0) setSelectedAnimalId(res.data[0].id);
			})
			.catch((e) => console.log(e));
	}, []);

	// handlers
	const handleAnimalSelect = (event, id) => {
		setSelectedAnimalId(id);
	};

	// const Item = styled(Paper)(({ theme }) => ({
	// 	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	// 	...theme.typography.body2,
	// 	padding: theme.spacing(1),
	// 	textAlign: "center",
	// 	color: theme.palette.text.secondary,
	// }));

	return (
		<>
			<Box>
				<h1>Animal List</h1>
			</Box>
			<Grid container spacing={2}>
				<Grid xs={4}>
					<Paper>
						<List>
							{animals.map((animal) => (
								<ListItemButton
									key={animal.id}
									selected={selectedAnimalId === animal.id}
									sx={{ borderBottom: "1px solid #eee" }}
									onClick={(e) =>
										handleAnimalSelect(e, animal.id)
									}
								>
									<ListItemText primary={animal.name} />
								</ListItemButton>
							))}
						</List>
					</Paper>
				</Grid>
				<Grid xs={8}>
					{selectedAnimalId ? (
						<>
							<AnimalView
								animal={
									animals.filter(
										(animal) =>
											animal.id === selectedAnimalId
									)[0]
								}
							/>
						</>
					) : (
						<></>
					)}
				</Grid>
			</Grid>
		</>
	);
};

export default AnimalList;

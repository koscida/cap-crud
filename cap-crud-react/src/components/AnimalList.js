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
import { useNavigate, useParams } from "react-router-dom";
import animalDataService from "../services/AnimalDataService";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import AnimalView from "./AnimalView";
import AnimalEdit from "./AnimalEdit";

// helper

const findSelectedAnimal = (animals, selectedId) => {
	return animals && selectedId
		? animals.find((a) => a.id === selectedId)
		: null;
};

const AnimalList = ({ isEditing = false }) => {
	let { id } = useParams();
	const [animals, setAnimals] = useState([]);
	const [selectedId, setSelectedId] = useState(parseInt(id));

	let navigate = useNavigate();

	// on load

	useEffect(() => {
		if (!animals || animals.length === 0) pullList();
		setSelectedId(parseInt(id));
		console.log(
			"--AnimalList-- animals: ",
			animals,
			" selectedId: ",
			selectedId
		);
	}, [id, animals]);

	// get list
	const pullList = () => {
		// send
		animalDataService
			.getAll()
			.then((res) => {
				console.log(res);
				// set the animal list
				setAnimals(res.data);
			})
			.catch((e) => console.log(e));
	};

	return (
		<>
			<Box>
				<h1>Animal List</h1>
			</Box>
			<Grid container spacing={2}>
				<Grid item="true" xs={4}>
					<Paper>
						<List>
							{animals.map((animal) => (
								<ListItemButton
									key={animal.id}
									selected={selectedId === animal.id}
									sx={{ borderBottom: "1px solid #eee" }}
									onClick={(e) =>
										navigate(`/animals/${animal.id}`)
									}
								>
									<ListItemText
										primary={`${animal.name} (${animal.id})`}
									/>
								</ListItemButton>
							))}
						</List>
					</Paper>
				</Grid>

				<Grid item="true" xs={8}>
					<Box>
						{isEditing && animals ? (
							<AnimalEdit
								animal={findSelectedAnimal(animals, selectedId)}
								refreshList={pullList}
							/>
						) : (
							<AnimalView
								animal={findSelectedAnimal(animals, selectedId)}
							/>
						)}
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default AnimalList;

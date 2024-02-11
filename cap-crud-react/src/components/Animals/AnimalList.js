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
import animalDataService from "../../services/AnimalDataService";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import AnimalView from "./AnimalView";
import AnimalEdit from "./AnimalEdit";
import ListView from "../common/ListView";

// helpers

const findSelectedAnimal = (animals, selectedId) => {
	return animals && selectedId
		? animals.find((a) => a.id === selectedId)
		: null;
};

const AnimalList = ({ isEditing = false }) => {
	let { zooId, animalId } = useParams();

	const [animals, setAnimals] = useState([]);
	const [selectedAnimalId, setSelectedId] = useState(parseInt(animalId));
	const [selectedZooId, setZooId] = useState(parseInt(zooId));

	let navigate = useNavigate();

	// on load

	useEffect(() => {
		if (!animals || animals.length === 0) pullList();
		console.log(
			"--AnimalList-- animals: ",
			animals,
			" selectedId: ",
			selectedAnimalId
		);
	}, [animalId, animals]);

	// get list
	const pullList = () => {
		// send
		animalDataService
			.getAll(selectedZooId)
			.then((res) => {
				console.log(res);
				// set the animal list
				setAnimals(res.data.data);
			})
			.catch((e) => console.log(e));
	};

	return (
		<>
			<Box>
				<h1>Animal List</h1>
			</Box>
			<Grid container spacing={2}>
				<Grid item={true} xs={4}>
					<ListView
						listData={animals}
						selectedItemId={selectedAnimalId}
						handleOnClick={(clickedId) =>
							navigate(`/animals/${clickedId}`)
						}
					/>
				</Grid>

				<Grid item={true} xs={8}>
					<Box>
						{isEditing && animals ? (
							<AnimalEdit
								animal={findSelectedAnimal(
									animals,
									selectedAnimalId
								)}
								refreshList={pullList}
							/>
						) : (
							<AnimalView
								animal={findSelectedAnimal(
									animals,
									selectedAnimalId
								)}
							/>
						)}
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default AnimalList;

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

const findSelected = (list, selectedId) => {
	return list && selectedId ? list.find((a) => a.id === selectedId) : null;
};

const AnimalList = ({ isEditing = false }) => {
	let { zooId, animalId } = useParams();

	const [selectedZooId, setSelectedZooId] = useState(parseInt(zooId));
	const [selectedAnimalId, setSelectedAnimalId] = useState(
		parseInt(animalId)
	);
	const [animals, setAnimals] = useState(null);

	let navigate = useNavigate();

	// check?

	let selectedAnimal = null;
	if (zooId) selectedAnimal = findSelected(animals, selectedAnimalId);

	// on load

	useEffect(() => {
		if (!animals) {
			// send
			animalDataService
				.getAll(selectedZooId)
				.then((res) => {
					// console.log(res);
					// set the animal list
					setAnimals(res.data.data);
				})
				.catch((e) => console.log(e));
		}
		if (zooId !== selectedZooId) setSelectedZooId(parseInt(zooId));
		if (animalId !== selectedAnimalId)
			setSelectedAnimalId(parseInt(animalId));
	}, [zooId, animalId, selectedZooId, selectedAnimalId, animals]);

	console.log(
		"--AnimalList--",
		", isEditing: ",
		isEditing,
		", zooId: ",
		zooId,
		", animalId: ",
		animalId,
		", animals: ",
		animals,
		", selectedAnimalId: ",
		selectedAnimalId,
		", selectedZooId: ",
		selectedZooId
	);
	return (
		<Box>
			<Box>
				<h1>Animal List</h1>
			</Box>
			<Grid container spacing={2}>
				{animals ? (
					<Grid item="true" xs={4}>
						<ListView
							listData={animals}
							selectedItemId={selectedAnimalId}
							handleOnClick={(clickedId) =>
								navigate(`/zoos/${zooId}/animals/${clickedId}`)
							}
							handleOnNew={() =>
								navigate(`/zoos/${zooId}/animals/new`)
							}
						/>
					</Grid>
				) : (
					<></>
				)}

				{selectedAnimal ? (
					<Grid item="true" xs={8}>
						<Box>
							{isEditing ? (
								<AnimalEdit animal={selectedAnimal} />
							) : (
								<AnimalView animal={selectedAnimal} />
							)}
						</Box>
					</Grid>
				) : (
					<></>
				)}
			</Grid>
		</Box>
	);
};

export default AnimalList;

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

	const [animals, setAnimals] = useState(null);
	const [selectedAnimalId, setSelectedAnimalId] = useState(
		parseInt(animalId)
	);
	const [selectedZooId, setSelectedZooId] = useState(parseInt(zooId));

	let navigate = useNavigate();

	// on load

	useEffect(() => {
		if (!animals) pullList();
		// console.log(
		// 	"--AnimalList-- animals: ",
		// 	animals,
		// 	" selectedId: ",
		// 	selectedAnimalId
		// );
	}, [animals]);

	// get list
	const pullList = () => {
		// send
		animalDataService
			.getAll(selectedZooId)
			.then((res) => {
				// console.log(res);
				// set the animal list
				setAnimals(res.data.data);
			})
			.catch((e) => console.log(e));
	};

	return (
		<Box>
			<Box>
				<h1>Animal List</h1>
			</Box>
			<Grid container spacing={2}>
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

				<Grid item="true" xs={8}>
					<Box>
						{isEditing ? (
							<AnimalEdit
								animal={findSelected(animals, selectedAnimalId)}
							/>
						) : (
							<AnimalView
								animal={findSelected(animals, selectedAnimalId)}
							/>
						)}
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default AnimalList;

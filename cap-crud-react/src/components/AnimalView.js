import React, { useEffect, useState } from "react";
import animalDataService from "../services/AnimalDataService";
import { Box, Button, Paper } from "@mui/material";

function AnimalView({ animal }) {
	// const [animal, setAnimal] = useState({});

	// useEffect(() => {
	// 	animalDataService
	// 		.get(animalId)
	// 		.then((res) => {
	// 			console.log(res);
	// 			setAnimal(res.data);
	// 		})
	// 		.catch((e) => console.log(e));
	// }, []);

	return (
		<Box>
			{animal ? (
				<>
					<Paper sx={{ padding: "1rem" }}>
						<Box>
							<h2>{animal.name}</h2>
						</Box>
						<Box>
							<Box>
								<strong>Age</strong>: {animal.age}
							</Box>
							<Box>
								<strong>Energy</strong>: {animal.energy}
							</Box>
							<Box>
								<strong>Hunger</strong>: {animal.hunger}
							</Box>
						</Box>
						<Box>
							<Button
								variant="outlined"
								href={`/animals/${animal.id}`}
								size="small"
							>
								Edit
							</Button>
						</Box>
					</Paper>
				</>
			) : (
				<></>
			)}
		</Box>
	);
}

export default AnimalView;

import { TransitEnterexitTwoTone } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import zooDataService from "../../services/ZooDataService";
import {
	Box,
	Grid,
	List,
	ListItemButton,
	ListItemText,
	Paper,
} from "@mui/material";

const ZooList = () => {
	let { zooId } = useParams();
	let navigate = useNavigate();

	const [zoos, setZoos] = useState([]);
	const [selectedZooId, setSelectedZooId] = useState(parseInt(zooId));

	useState(() => {
		zooDataService
			.getAll(selectedZooId)
			.then((res) => {
				console.log(res);
				setZoos(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	return (
		<>
			<Box>
				<h1>Zoo List</h1>
			</Box>
			<Grid container spacing={2}>
				<Grid item="true" xs={4}>
					<Paper>
						<List>
							{zoos.map((zoo) => (
								<ListItemButton
									key={zoo.id}
									selected={selectedZooId === zoo.id}
									sx={{ borderBottom: "1px solid #eee" }}
									onClick={(e) =>
										navigate(`/zoos/${selectedZooId}`)
									}
								>
									<ListItemText
										primary={`${zoo.name} (${zoo.id})`}
									/>
								</ListItemButton>
							))}
						</List>
					</Paper>
				</Grid>
			</Grid>
		</>
	);
};

export default ZooList;

import { TransitEnterexitTwoTone } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
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
import ListView from "../common/ListView";
import ZooEdit from "./ZooEdit";
import ZooView from "./ZooView";

// helpers

const findSelected = (list, selectedId) => {
	return list && selectedId ? list.find((a) => a.id === selectedId) : null;
};

const ZooList = ({ isEditing = false }) => {
	let { zooId } = useParams();

	const [zoos, setZoos] = useState([]);
	const [selectedZooId, setSelectedZooId] = useState(parseInt(zooId));

	let navigate = useNavigate();

	// on load

	useEffect(() => {
		// if no zoos, load them
		if (!zoos || zoos.length === 0) pullList();
		// on change of zoo id, reset
		setSelectedZooId(parseInt(zooId));
		console.log(
			"--ZooList--",
			" zoos: ",
			zoos,
			" selectedZooId: ",
			selectedZooId
		);
	}, [zooId]);

	// get list
	const pullList = () => {
		// send
		zooDataService
			.getAll()
			.then((res) => {
				console.log(res);
				// set the list
				setZoos(res.data.data);
			})
			.catch((e) => console.log(e));
	};

	return (
		<>
			<Box>
				<h1>Zoo List</h1>
			</Box>
			<Grid container spacing={2}>
				<Grid item={true} xs={4}>
					<ListView
						listData={zoos}
						selectedItemId={selectedZooId}
						handleOnClick={(clickedId) =>
							navigate(`/zoos/${clickedId}`)
						}
						handleOnNew={() => navigate("/zoos/new")}
					/>
				</Grid>

				<Grid item={true} xs={8}>
					<Box>
						{isEditing && zoos ? (
							<ZooEdit
								zoo={findSelected(zoos, selectedZooId)}
								refreshList={pullList}
							/>
						) : (
							<ZooView
								zoo={findSelected(zoos, selectedZooId)}
								refreshList={pullList}
							/>
						)}
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default ZooList;

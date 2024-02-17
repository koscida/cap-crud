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

import { useZooContext } from "../../app/ZooContext";

// helpers

const findSelected = (list, selectedId) => {
	return list && selectedId ? list.find((a) => a.id === selectedId) : null;
};

const ZooList = ({ isEditing = false }) => {
	const {
		zooData: { zoos },
	} = useZooContext();
	let { zooId } = useParams();

	const [selectedZooId, setSelectedZooId] = useState(parseInt(zooId));

	let navigate = useNavigate();

	// check?

	let selectedZoo = null;
	if (zooId) selectedZoo = findSelected(zoos, selectedZooId);

	// on load, and on url change

	useEffect(() => {
		// on change of zoo id, reset
		setSelectedZooId(parseInt(zooId));
		// console.log("--ZooList--", " selectedZooId: ", selectedZooId);
	}, [zooId]);

	return (
		<Box>
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

				{selectedZoo ? (
					<Grid item={true} xs={8}>
						<Box>
							{isEditing ? (
								<ZooEdit zoo={selectedZoo} />
							) : (
								<ZooView zoo={selectedZoo} />
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

export default ZooList;

import React from "react";
import { List, ListItemButton, ListItemText, Paper } from "@mui/material";

const ListView = ({ listData, selectedItemId, handleOnClick }) => {
	return (
		<Paper>
			<List>
				{listData && listData.length > 0 ? (
					listData.map((listItem) => (
						<ListItemButton
							key={listItem.id}
							selected={selectedItemId === listItem.id}
							sx={{ borderBottom: "1px solid #eee" }}
							onClick={(e) => handleOnClick(listItem.id)}
						>
							<ListItemText
								primary={`${listItem.name} (${listItem.id})`}
							/>
						</ListItemButton>
					))
				) : (
					<></>
				)}
			</List>
		</Paper>
	);
};

export default ListView;

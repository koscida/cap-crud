import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PetsIcon from "@mui/icons-material/Pets";
import { styles } from "../css-common";
import { Chip, withStyles } from "@mui/material";
import LoadDefaultData from "../app/LoadDefaultData";
import { useZooContext } from "../app/ZooContext";
import { useGamePlayContext } from "../app/GamePlayContext";

const pageName = "ANIMALS";
const NameIcon = PetsIcon;
const userSettings = ["Profile", "Account", "Logout"];
const getPages = (zooId) => {
	const pages = [
		["Zoo List", "/zoos"],
		["New Zoo", "/zoos/new"],
	];
	if (zooId) {
		pages.push(["Animal List", `/zoos/${zooId}/animals`]);
		pages.push(["New Animal", `/zoos/${zooId}/animals/new`]);
	}
	return pages;
};

export function MUIResponsiveAppBar() {
	const {
		zooData: { zoos },
	} = useZooContext();
	const {
		gamePlayData: { gamePlayZoo },
		setGamePlayZooId,
	} = useGamePlayContext();

	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [anchorElZoo, setAnchorElZoo] = useState(null);

	const [pages, setPages] = useState(
		getPages(gamePlayZoo ? gamePlayZoo.id : null)
	);

	useEffect(() => {
		if (gamePlayZoo) setPages(getPages(gamePlayZoo.id));
	}, [gamePlayZoo]);

	// handlers

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleOpenZooMenu = (e) => {
		setAnchorElZoo(e.currentTarget);
	};
	const handleCloseZooMenu = () => {
		setAnchorElZoo(null);
	};
	const handleZooMenuClick = (newZooId) => {
		console.log(
			"--MUIResponsiveAppBar-handleZooMenuClick--",
			", newZooId: ",
			newZooId
		);
		setGamePlayZooId(newZooId);
		handleCloseZooMenu();
	};

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	// console.log(
	// 	"--MUIResponsiveAppBar--",
	// 	", zoos: ",
	// 	zoos,
	// 	", contextZooId: ",
	// 	contextZooId,
	// 	", pages: ",
	// 	pages
	// );
	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					{/* Display for large screens */}
					<NameIcon
						sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
					/>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						{pageName}
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "none" },
						}}
					>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map(([page, link]) => (
								<MenuItem
									key={page}
									onClick={handleCloseNavMenu}
									href={link}
								>
									<Typography textAlign="center">
										{page}
									</Typography>
								</MenuItem>
							))}
							<MenuItem>
								<LoadDefaultData />
							</MenuItem>
						</Menu>
					</Box>

					{/* Display for small screens */}
					<NameIcon
						sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
					/>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="#app-bar-with-responsive-menu"
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						{pageName}
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
						}}
					>
						{pages.map(([page, link]) => (
							<Button
								key={page}
								onClick={handleCloseNavMenu}
								href={link}
								sx={{
									my: 2,
									color: "white",
									display: "block",
								}}
							>
								{page}
							</Button>
						))}
						<LoadDefaultData />
					</Box>

					{/* Zoo Menu */}
					{zoos && zoos.length > 0 && gamePlayZoo ? (
						<Box sx={{ flexGrow: 0, mr: 3 }}>
							<Tooltip title="Open zoo settings">
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
									}}
								>
									<Typography sx={{ mr: 1 }}>Zoo:</Typography>
									<Chip
										sx={{ mr: 1 }}
										label={gamePlayZoo.name}
										color="info"
										onClick={handleOpenZooMenu}
									/>
									<Typography sx={{ mr: 1 }}>
										Day: {gamePlayZoo.currentDay}
									</Typography>
								</Box>
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElZoo}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElZoo)}
								onClose={handleCloseZooMenu}
							>
								{zoos.map((zoo) => (
									<MenuItem
										key={zoo.name}
										onClick={() =>
											handleZooMenuClick(zoo.id)
										}
									>
										<Typography textAlign="center">
											{zoo.name}
										</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					) : (
						<></>
					)}

					{/* Account Menu */}
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 0 }}
							>
								<Avatar
									alt="Account Icon"
									src="/static/images/avatar/2.jpg"
								/>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{userSettings.map((setting) => (
								<MenuItem
									key={setting}
									onClick={handleCloseUserMenu}
								>
									<Typography textAlign="center">
										{setting}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

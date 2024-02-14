import * as React from "react";
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
import { Link } from "react-router-dom";

const pageName = "ANIMALS";
const NameIcon = PetsIcon;
const userSettings = ["Profile", "Account", "Logout"];

export function MUIResponsiveAppBar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [anchorElZoo, setAnchorElZoo] = React.useState(null);

	const [zooSettings, setZooSettings] = React.useState([
		"Zoo 1",
		"Zoo 2",
		"Zoo 3",
	]);
	const zooId = 0;
	const pages = [
		["Animal List", `/zoos/${zooId}/animals`],
		["New Animal", `/zoos/${zooId}/animals/new`],
		["Zoo List", "/zoos"],
		["New Zoo", "/zoos/new"],
	];

	// handlers

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleOpenZooMenu = (e) => {
		setAnchorElZoo(e.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const handleCloseZooMenu = () => {
		setAnchorElZoo(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					{/* Display for small screens */}
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
								// <Link href={link}>
								<MenuItem
									key={page}
									onClick={handleCloseNavMenu}
									href={link}
								>
									<Typography textAlign="center">
										{page}
									</Typography>
								</MenuItem>
								// </Link>
							))}
						</Menu>
					</Box>

					{/* Display for Large Screens */}
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
								sx={{ my: 2, color: "white", display: "block" }}
							>
								{page}
							</Button>
						))}
					</Box>

					{/* Zoo Menu */}
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
									label="Zoo 1"
									color="info"
									onClick={handleOpenZooMenu}
								/>
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
							{zooSettings.map((setting) => (
								<MenuItem
									key={setting}
									onClick={handleCloseZooMenu}
								>
									<Typography textAlign="center">
										{setting}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>

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

import React, { useState } from "react";
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined,
} from "@mui/icons-material";
import {
    AppBar,
    Button,
    Box,
    Typography,
    IconButton,
    InputBase,
    Toolbar,
    Menu,
    MenuItem,
    useTheme,
    useMediaQuery,
} from "@mui/material";

import FlexBetween from "components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "state";
import profileImage from "assets/profile.jpg";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen, getLayoutData }) => {
    const isNonMobile = useMediaQuery("(min-width : 1000px)")
    const [searchInput, setSearchInput] = useState("")

    const dispatch = useDispatch();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        // console.log("AnchorEl is :", anchorEl);
    }
    const handleClose = () => setAnchorEl(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        getLayoutData(searchInput);
        setSearchInput("")
    }

    return (
        <AppBar
            sx={{
                position: "static",
                background: "none",
                boxShadow: "none",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* LEFT SIDE */}
                <FlexBetween>
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <MenuIcon />
                    </IconButton>
                    <FlexBetween
                        backgroundColor={theme.palette.background.alt}
                        borderRadius="7px"
                        gap="4rem"
                        p="0.1rem 0.8rem"
                    >
                        <InputBase placeholder="Search the topic..." onChange={(e) => setSearchInput(e.target.value)} value={searchInput} />
                        <IconButton onClick={handleSubmit}>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>

                {/* RIGHT SIDE */}
                <FlexBetween gap={isNonMobile ? "1.5rem" : "0.5rem"}>
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkModeOutlined sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightModeOutlined sx={{ fontSize: "25px" }} />
                        )}
                    </IconButton>
                    {/* <IconButton>
                        <SettingsOutlined sx={{ fontSize: "25px" }} />
                    </IconButton> */}

                    <FlexBetween>
                        <Button
                            onClick={handleClick}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                textTransform: "none",
                                gap: "1rem",
                            }}
                        >
                            <Box
                                component="img"
                                alt="profile"
                                src={profileImage}
                                height="32px"
                                width="32px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}
                            />
                            <Box textAlign="left">
                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.75rem"
                                    sx={{ color: theme.palette.secondary[100] }}
                                >
                                    {user.name}
                                    {/* {user.name.toString().slice(0, 12)} */}
                                </Typography>
                                <Typography
                                    fontSize="0.5rem"
                                    sx={{ color: theme.palette.secondary[200] }}
                                >
                                    {user.occupation}
                                    {/* {user.occupation.toString().slice(0, 14)} */}
                                </Typography>
                            </Box>
                            <ArrowDropDownOutlined
                                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                            />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={isOpen}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        >
                            <MenuItem onClick={handleClose}>Log Out</MenuItem>
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api";

const Layout = ({ getAppData }) => {
    const isNonMobile = useMediaQuery("(min-width: 700px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Following will make the call to 'Redux Toolkit' to fetch user info.
    const userId = useSelector((state) => state.global.userId);
    const { data } = useGetUserQuery(userId);
    // console.log(data);

    const getLayoutData = (data) => {
        // console.log("Layout data is : ", data)
        getAppData(data)
    }

    return (
        <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
            <Sidebar
                // Here we passing an empty object '{}' in case the data has not been loaded or being loaded (data will be undefined at that time ) 
                user={data || {}}
                isNonMobile={isNonMobile}
                drawerWidth="250px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <Box flexGrow={1}>
                <Navbar
                    getLayoutData={getLayoutData}
                    user={data || {}}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Outlet />
            </Box>
        </Box>
    );
};

export default Layout;

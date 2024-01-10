import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import BreakdownChart from "components/BreakdownChart";

const Topic = () => {
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="TOPIC" subtitle="Breakdown of topic wise info" />
            <Box mt="40px" height="75vh">
                <BreakdownChart />
            </Box>
        </Box>
    );
};

export default Topic;

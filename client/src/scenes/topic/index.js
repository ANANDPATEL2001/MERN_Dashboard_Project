import { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import BreakdownChart from "components/BreakdownChart";
import Header from "components/Header";
import { useGetTopicDataQuery } from "../../state/api";
import FlexBetween from "../../components/FlexBetween";

const Topic = () => {
    const { data, isLoading } = useGetTopicDataQuery();
    // console.log("Topic data is :", data);
    const [pestle, setPestle] = useState("Industries");

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="TOPIC" subtitle="Breakdown of topic wise info" />
            <Box mt="40px" height="75vh">
                <FlexBetween>
                    <Box display="flex" justifyContent="flex-end" gap="0.5rem">
                        <FormControl sx={{ mt: "1rem" }}>
                            <InputLabel>Pestle</InputLabel>
                            <Select
                                value={pestle}
                                label="Pestle"
                                onChange={(e) => setPestle(e.target.value)}
                            >
                                <MenuItem value="Industries">Industries</MenuItem>
                                <MenuItem value="Environmental">Environmental</MenuItem>
                                <MenuItem value="Economic">Economic</MenuItem>
                                <MenuItem value="Political">Political</MenuItem>
                                <MenuItem value="Technological">Technological</MenuItem>
                                <MenuItem value="Organization">Organization</MenuItem>
                                <MenuItem value="Healthcare">Healthcare</MenuItem>
                                <MenuItem value="Social">Social</MenuItem>
                                <MenuItem value="Lifestyles">Lifestyles</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </FlexBetween>
                <BreakdownChart pestle={pestle} />
            </Box>
        </Box>
    );
};

export default Topic;

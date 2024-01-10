import React, { useMemo, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";

import Header from "components/Header";
import { useGetYearDataQuery } from "state/api";
import FlexBetween from "../../components/FlexBetween";

const Yearly = () => {
    const [startYear, setStartYear] = useState("2016");
    const [endYear, setEndYear] = useState("2070");
    const [chart, setChart] = useState("relevance");

    const { data } = useGetYearDataQuery();
    console.log("Yearly Data is : ", data)
    const theme = useTheme();


    // const [formattedData] = useMemo(() => {
    const [LikelihoodLine, RelevanceLine, IntensityLine] = useMemo(() => {
        if (!data) return [];

        // const { yearlyData } = data;
        const IntensityLine = {
            id: "intensity",
            // color: theme.palette.secondary.main,
            color: "#f55549",
            data: [],
        };
        const LikelihoodLine = {
            id: "likelihood",
            color: theme.palette.secondary[600],
            data: [],
        };
        const RelevanceLine = {
            id: "relevance",
            // color: theme.palette.primary[200],
            color: "#498bf5",
            data: [],
        };

        Object.values(data.filtered_data).forEach(({ start_year, end_year, intensity, relevance, likelihood }) => {
            const yearFormatted = parseInt(end_year);
            // console.log("yearFormatted is : ", yearFormatted)
            if (yearFormatted >= parseInt(startYear) && yearFormatted <= parseInt(endYear)) {
                // const splitDate = date.substring(date.indexOf("-") + 1);
                // console.log("splitDate & typeOf", splitDate, typeof (splitDate))

                IntensityLine.data = [
                    ...IntensityLine.data,
                    { x: end_year, y: intensity },
                ];
                LikelihoodLine.data = [
                    ...LikelihoodLine.data,
                    { x: end_year, y: likelihood },
                ];
                RelevanceLine.data = [
                    ...RelevanceLine.data,
                    { x: end_year, y: relevance },
                ];
            }
        });

        IntensityLine.data.sort((a, b) => a.x - b.x);
        LikelihoodLine.data.sort((a, b) => a.x - b.x);
        RelevanceLine.data.sort((a, b) => a.x - b.x);

        const formattedData = [LikelihoodLine, RelevanceLine, IntensityLine];
        console.log("formatted data is :", formattedData)
        return [LikelihoodLine, RelevanceLine, IntensityLine];
        // return [formattedData];
    }, [data, startYear, endYear]);


    return (
        <Box m="1.5rem 2.5rem">
            <Header title="YEARLY DATA" subtitle="Chart of yearly data" />
            <Box height="75vh">
                <FlexBetween>
                    <FormControl sx={{ mt: "1rem" }}>
                        <InputLabel>Chart</InputLabel>
                        <Select
                            value={chart}
                            label="Chart"
                            onChange={(e) => setChart(e.target.value)}
                        >
                            <MenuItem value="intensity">intensity</MenuItem>
                            <MenuItem value="likelihood">likelihood</MenuItem>
                            <MenuItem value="relevance">relevance</MenuItem>
                        </Select>
                    </FormControl>
                    <Box display="flex" justifyContent="flex-end" gap="0.5rem">
                        <FormControl sx={{ mt: "1rem" }}>
                            <InputLabel>Start_Year</InputLabel>
                            <Select
                                value={startYear}
                                label="Start_Year"
                                onChange={(e) => setStartYear(e.target.value)}
                            >
                                <MenuItem value="2016">2016</MenuItem>
                                <MenuItem value="2017">2017</MenuItem>
                                <MenuItem value="2018">2018</MenuItem>
                                <MenuItem value="2020">2020</MenuItem>
                                <MenuItem value="2021">2021</MenuItem>
                                <MenuItem value="2022">2022</MenuItem>
                                <MenuItem value="2024">2024</MenuItem>
                                <MenuItem value="2026">2026</MenuItem>
                                <MenuItem value="2027">2027</MenuItem>
                                <MenuItem value="2029">2029</MenuItem>
                                <MenuItem value="2030">2030</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ mt: "1rem" }}>
                            <InputLabel>End_Year</InputLabel>
                            <Select
                                value={endYear}
                                label="End_Year"
                                onChange={(e) => setEndYear(e.target.value)}
                            >
                                <MenuItem value="2016">2016</MenuItem>
                                <MenuItem value="2017">2017</MenuItem>
                                <MenuItem value="2018">2018</MenuItem>
                                <MenuItem value="2020">2020</MenuItem>
                                <MenuItem value="2021">2021</MenuItem>
                                <MenuItem value="2022">2022</MenuItem>
                                <MenuItem value="2024">2024</MenuItem>
                                <MenuItem value="2026">2026</MenuItem>
                                <MenuItem value="2027">2027</MenuItem>
                                <MenuItem value="2029">2029</MenuItem>
                                <MenuItem value="2030">2030</MenuItem>
                                <MenuItem value="2070">2070</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </FlexBetween>

                {data ? (
                    <ResponsiveLine
                        // data={formattedData}
                        data={chart === "intensity" ? [IntensityLine] : chart === "relevance" ? [RelevanceLine] : [LikelihoodLine]}
                        theme={{
                            axis: {
                                domain: {
                                    line: {
                                        stroke: theme.palette.secondary[200],
                                    },
                                },
                                legend: {
                                    text: {
                                        fill: theme.palette.secondary[200],
                                    },
                                },
                                ticks: {
                                    line: {
                                        stroke: theme.palette.secondary[200],
                                        strokeWidth: 1,
                                    },
                                    text: {
                                        fill: theme.palette.secondary[200],
                                    },
                                },
                            },
                            legends: {
                                text: {
                                    fill: theme.palette.secondary[200],
                                },
                            },
                            tooltip: {
                                container: {
                                    // color: theme.palette.primary.main,
                                    color: "black",
                                },
                            },
                        }}
                        colors={{ datum: "color" }}
                        margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
                        xScale={{ type: "point" }}
                        yScale={{
                            type: "linear",
                            min: "auto",
                            max: "auto",
                            stacked: false,
                            reverse: false,
                        }}
                        yFormat=" >-.2f"
                        enableArea={true}
                        areaBaselineValue={1}
                        curve="catmullRom"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            orient: "bottom",
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 90,
                            legend: "End Year",
                            legendOffset: 60,
                            legendPosition: "middle",
                        }}
                        axisLeft={{
                            orient: "left",
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "Total",
                            legendOffset: -50,
                            legendPosition: "middle",
                        }}
                        enableGridX={false}
                        enableGridY={false}
                        pointSize={10}
                        pointColor={{ theme: "background" }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: "serieColor" }}
                        pointLabelYOffset={-12}
                        useMesh={true}
                        legends={[
                            {
                                anchor: "top-right",
                                direction: "column",
                                justify: false,
                                translateX: 50,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: "left-to-right",
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: "circle",
                                symbolBorderColor: "rgba(0, 0, 0, .5)",
                                effects: [
                                    {
                                        on: "hover",
                                        style: {
                                            itemBackground: "rgba(0, 0, 0, .03)",
                                            itemOpacity: 1,
                                        },
                                    },
                                ],
                            },
                        ]}
                    />
                ) : (
                    <>Loading...</>
                )}
            </Box>
        </Box>
    );
};

export default Yearly;

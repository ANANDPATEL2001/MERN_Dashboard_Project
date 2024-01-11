import React, { useMemo, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";

import Header from "components/Header";
import { useGetYearDataQuery } from "state/api";
import FlexBetween from "./FlexBetween";

const TotalIntensity = () => {
    const [startYear, setStartYear] = useState("2016");
    const [endYear, setEndYear] = useState("2090");
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
            color: "#5fff5c",
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

        let total_intensity = 0;
        let total_liklihood = 0;
        let total_relevance = 0;
        Object.values(data.filtered_data).forEach(({ start_year, end_year, intensity, relevance, likelihood }) => {
            const yearFormatted = parseInt(end_year);
            // console.log("yearFormatted is : ", yearFormatted)
            if (yearFormatted >= parseInt(startYear) && yearFormatted <= parseInt(endYear)) {
                // const splitDate = date.substring(date.indexOf("-") + 1);
                // console.log("splitDate & typeOf", splitDate, typeof (splitDate))

                total_intensity = intensity < 5 ? intensity : 0;
                total_liklihood += likelihood < 5 ? likelihood : 0;
                total_relevance += relevance < 5 ? relevance : 0;
                IntensityLine.data = [
                    ...IntensityLine.data,
                    { x: end_year, y: total_intensity },
                ];
                LikelihoodLine.data = [
                    ...LikelihoodLine.data,
                    { x: end_year, y: total_liklihood },
                ];
                RelevanceLine.data = [
                    ...RelevanceLine.data,
                    { x: end_year, y: total_relevance },
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
        <>
            {data ? (
                <ResponsiveLine
                    // data={formattedData}
                    data={[IntensityLine]}
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
                    margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
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
                        orient: "right",
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "End Year",
                        legendOffset: 35,
                        legendPosition: "middle",
                    }}
                    axisLeft={{
                        orient: "bottom",
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Total Intensity",
                        legendOffset: -60,
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
        </>
    );
};

export default TotalIntensity;

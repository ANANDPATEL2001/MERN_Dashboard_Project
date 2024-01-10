import { Box, useTheme } from "@mui/material";
import { ResponsiveRadialBar } from "@nivo/radial-bar";
// import { getAlpha3Code } from "i18n-iso-countries";

import { useGetRegionDataQuery } from "state/api";
import Header from "components/Header";
import { useMemo } from "react";

const Region = ({ isDashboard = false }) => {
    const theme = useTheme();
    const { data } = useGetRegionDataQuery();
    console.log("regionData is : ", data);


    const intensity_mp = new Map();
    const relevance_mp = new Map();
    const likelihood_mp = new Map();
    console.log(typeof (data))

    const IntensityLine = {
        id: "Intensity",
        data: []
    }

    const RelevanceLine = {
        id: "Relevance",
        data: []
    }

    const LikelihoodLine = {
        id: "Likelihood",
        data: []
    }

    const [formatted_data] = useMemo(() => {
        if (!data) return [];

        Object.entries(data).forEach((item) => {
            // console.log(item[1].topic);
            // mp.set(item[1].region, mp.get(item[1].region) == undefined ? 1 : mp.get(item[1].region) + 1);

            intensity_mp.has(item[1].region) === true ? intensity_mp.set(item[1].region, intensity_mp.get(item[1].region) + parseInt(item[1].intensity)) : intensity_mp.set(item[1].region, parseInt(item[1].intensity))

            relevance_mp.has(item[1].region) === true ? relevance_mp.set(item[1].region, relevance_mp.get(item[1].region) + parseInt(item[1].relevance)) : relevance_mp.set(item[1].region, parseInt(item[1].relevance))

            likelihood_mp.has(item[1].region) === true ? likelihood_mp.set(item[1].region, likelihood_mp.get(item[1].region) + parseInt(item[1].likelihood)) : likelihood_mp.set(item[1].region, parseInt(item[1].likelihood))
        })
        // likelihood_mp.forEach((key, value) => {
        //     console.log({ key: key, value: value });
        // })


        intensity_mp.forEach((key, value) => {
            const temp = {
                x: value,
                y: key
            }
            if (temp.y < 1000)
                IntensityLine.data.push(temp)
        })

        relevance_mp.forEach((key, value) => {
            const temp = {
                x: value,
                y: key
            }
            if (temp.y < 1000)
                RelevanceLine.data.push(temp)
        })

        likelihood_mp.forEach((key, value) => {
            const temp = {
                x: value,
                y: key
            }
            if (temp.y < 1000)
                LikelihoodLine.data.push(temp)
        })

        const formatted_data = [IntensityLine, RelevanceLine, LikelihoodLine]
        console.log(formatted_data)
        return [formatted_data]
    }, [data, IntensityLine, RelevanceLine, LikelihoodLine])

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="REGION" subtitle="Get an Insight of region wise data." />
            <Box
                mt="40px"
                height="75vh"
                border={`1px solid ${theme.palette.secondary[200]}`}
                borderRadius="4px"
            >
                {data ? (
                    <ResponsiveRadialBar
                        data={formatted_data}
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
                                    color: "black"
                                },
                            },
                        }}
                        valueFormat=">-.2f"
                        endAngle={308}
                        innerRadius={0.1}
                        margin={
                            isDashboard
                                ? { top: 20, right: 15, bottom: 60, left: 15 }
                                : { top: 40, right: 40, bottom: 40, left: 20 }
                        }
                        borderWidth={1}
                        borderColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    '1'
                                ]
                            ]
                        }}
                        radialAxisStart={{ tickSize: 0, tickPadding: 4, tickRotation: 36 }}
                        circularAxisOuter={{ tickSize: 13, tickPadding: 10, tickRotation: 4 }}
                        labelsSkipAngle={16}
                        legends={[
                            {
                                anchor: 'right',
                                direction: 'column',
                                justify: false,
                                translateX: isDashboard ? 20 : -20,
                                translateY: isDashboard ? 50 : 0,
                                itemsSpacing: 6,
                                itemDirection: 'left-to-right',
                                itemWidth: 100,
                                itemHeight: 16,
                                itemTextColor: '#999',
                                symbolSize: 16,
                                symbolShape: 'square',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000'
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                ) : (
                    <>Loading...</>
                )}
            </Box>
        </Box>
    );
};

export default Region;
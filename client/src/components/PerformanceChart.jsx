import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

import { useGetPerformanceDataQuery } from "state/api";
import { useMemo } from "react";
import { ResponsiveBar } from "@nivo/bar";

const PerformanceChart = ({ isDashboard = false, startYear, endYear, country, pestle }) => {
    const { data, isLoading } = useGetPerformanceDataQuery();
    console.log("data is :", data);
    // const isNonMobile = useMediaQuery("min-width : 1200px");
    const theme = useTheme();

    const sector_mp = new Map();
    const topic_mp = new Map();
    const formattedData = [];
    const keys = []

    const fun = useMemo(() => {
        if (!data || isLoading) return "Loading...";

        // Object.entries(data).forEach((item) => {
        //     // sector_mp.set(item[1].sector, sector_mp.get(item[1].sector) === undefined ? 1 : sector_mp.get(item[1].sector) + 1)
        //     sector_mp.set(item[1].sector, sector_mp.get(item[1].sector) === undefined ? [item[1].topic] : [...sector_mp.get(item[1].sector), item[1].topic])


        //     topic_mp.set(item[1].topic, topic_mp.get(item[1].topic) === undefined ? 1 : topic_mp.get(item[1].topic) + 1)
        // })

        // console.log("Map for sector & topic is : ", sector_mp, topic_mp)

        const colors = [
            theme.palette.primary[100],
            theme.palette.secondary[200],
            theme.palette.grey[300],
            theme.palette.secondary[500],
            theme.palette.secondary[800],
        ];

        Object.values(data).forEach(({ country, end_year, topic, sector, pestle }) => {
            const yearFormatted = parseInt(end_year);
            // console.log("yearFormatted is : ", yearFormatted)
            if (yearFormatted >= parseInt(startYear) && yearFormatted <= parseInt(endYear)) {

                sector_mp.set(sector, sector_mp.get(sector) === undefined ? [topic] : [...sector_mp.get(sector), topic])
            }
        })

        let i = 0;
        for (const key of sector_mp.keys()) {
            keys.push(key.toString());
            console.log(typeof (key), key)
            console.log(typeof (sector_mp.get(key)), sector_mp.get(key))
            // console.log(Array.from(sector_mp.keys()))
            // console.log(Array.from(sector_mp.values()))
            const new_ob = sector_mp.get(key);
            new_ob.map((item) => {
                // console.log(typeof (item), item)
                topic_mp.set(item, topic_mp.get(item) === undefined ? 1 : topic_mp.get(item) + 1)
            })

            // console.log(topic_mp.keys())
            const temp = [];
            // key = topic_name && value = count
            topic_mp.forEach((key, value) => {
                const string = `${value}Color`
                const new_temp = {
                    [value.toString()]: parseInt(key),
                    [string.toString()]: colors[i++],
                };
                temp.push(new_temp)
            })
            // console.log(temp)

            let target_object = {}
            target_object.sector = key;
            temp.map((item) => {
                target_object = Object.assign(target_object, item);
            })
            // console.log("target_object is : ", target_object);
            formattedData.push(target_object);
        }
    }, [data, startYear, endYear, country, pestle])

    console.log("formattedData is : ", formattedData)

    return (
        <>
            <Box
                height={isDashboard ? "500px" : "100%"}
                width={undefined}
                minHeight={isDashboard ? "325px" : undefined}
                minWidth={isDashboard ? "325px" : undefined}
                position="relative"
            >
                {(data && !isLoading) ?
                    <ResponsiveBar
                        data={formattedData}
                        keys={keys}
                        indexBy="sector"
                        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                        padding={0.3}
                        valueScale={{ type: 'linear' }}
                        indexScale={{ type: 'band', round: true }}
                        colors={{ scheme: 'nivo' }}
                        // defs={[
                        //     {
                        //         id: 'dots',
                        //         type: 'patternDots',
                        //         background: 'inherit',
                        //         color: '#38bcb2',
                        //         size: 4,
                        //         padding: 1,
                        //         stagger: true
                        //     },
                        //     {
                        //         id: 'lines',
                        //         type: 'patternLines',
                        //         background: 'inherit',
                        //         color: '#eed312',
                        //         rotation: -45,
                        //         lineWidth: 6,
                        //         spacing: 10
                        //     }
                        // ]}
                        // fill={[
                        //     {
                        //         match: {
                        //             id: 'fries'
                        //         },
                        //         id: 'dots'
                        //     },
                        //     {
                        //         match: {
                        //             id: 'sandwich'
                        //         },
                        //         id: 'lines'
                        //     }
                        // ]}
                        borderColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    1.6
                                ]
                            ]
                        }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'sector',
                            legendPosition: 'middle',
                            legendOffset: 32,
                            truncateTickAt: 0
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'topic',
                            legendPosition: 'middle',
                            legendOffset: -40,
                            truncateTickAt: 0
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    1.6
                                ]
                            ]
                        }}
                        legends={[
                            {
                                dataFrom: 'keys',
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 120,
                                translateY: 0,
                                itemsSpacing: 2,
                                itemWidth: 100,
                                itemHeight: 20,
                                itemDirection: 'left-to-right',
                                itemOpacity: 0.85,
                                symbolSize: 20,
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                        role="application"
                        ariaLabel="Nivo bar chart demo"
                        barAriaLabel={e => e.id + ": " + e.formattedValue + " in sector: " + e.indexValue}
                    />

                    : "Loading..."}
            </Box>
        </>
    );
};

export default PerformanceChart;

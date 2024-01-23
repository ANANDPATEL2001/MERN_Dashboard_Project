import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

import { useGetPerformanceDataQuery } from "state/api";
import { useMemo } from "react";
import { ResponsiveBar } from "@nivo/bar";

const PerformanceChart = ({ isDashboard = false, startYear, endYear, country, pestle }) => {
    const { data, isLoading } = useGetPerformanceDataQuery();
    // console.log("data is :", data);
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
            // theme.palette.primary[100],
            // theme.palette.secondary[200],
            // theme.palette.grey[300],
            // theme.palette.secondary[500],
            // theme.palette.secondary[800],
            "hsl(279, 70%, 50%)",
            "hsl(107, 70%, 50%)",
            "hsl(88, 70%, 50%)",
            "hsl(279, 70%, 50%)",
            "hsl(120, 70%, 50%)",
        ];

        Object.values(data).forEach(({ country, end_year, topic, sector, pestle }) => {
            const yearFormatted = parseInt(end_year);
            // console.log("yearFormatted is : ", yearFormatted)
            if (yearFormatted >= parseInt(startYear) && yearFormatted <= parseInt(endYear)) {

                sector_mp.set(sector, sector_mp.get(sector) === undefined ? [topic] : [...sector_mp.get(sector), topic])
            }
        })

        let i = 0;
        let target_object = {};
        const temp = [];
        for (const key of sector_mp.keys()) {
            keys.push(key.toString());
            // console.log(typeof (key), key)
            // console.log(typeof (sector_mp.get(key)), sector_mp.get(key))
            // console.log(Array.from(sector_mp.keys()))
            // console.log(Array.from(sector_mp.values()))
            const new_ob = sector_mp.get(key);
            new_ob.map((item) => {
                // console.log(typeof (item), item)
                topic_mp.set(item, topic_mp.get(item) === undefined ? 1 : topic_mp.get(item) + 1)
            })

            // console.log(topic_mp.keys())
            temp.length = 0;
            // key = topic_name && value = count
            topic_mp.forEach((key, value) => {
                const string = `${value}Color`
                const new_temp = {
                    [value.toString()]: parseInt(key),
                    [string.toString()]: colors[i++ % 5],
                };
                temp.push(new_temp)
            })
            // console.log(temp)
            topic_mp.clear();

            target_object = {};
            temp.map((item) => {
                target_object = Object.assign(target_object, item);
            })
            target_object.sector = key;
            // target_object = Object.assign({ "sector": key }, target_object);
            // console.log("target_object is : ", target_object);
            formattedData.push(target_object);
        }
    }, [data, startYear, endYear, country, pestle])

    console.log("formattedData is : ", typeof (formattedData), formattedData)
    // console.log("keys(legend) for data is : ", keys)


    const newData = [
        {
            "hot dog": 4,
            "hot dogColor": "hsl(2, 70%, 50%)",
            "burger": 11,
            "burgerColor": "hsl(41, 70%, 50%)",
            "sandwich": 9,
            "sandwichColor": "hsl(308, 70%, 50%)",
            "kebab": 67,
            "kebabColor": "hsl(48, 70%, 50%)",
            "fries": 56,
            "friesColor": "hsl(188, 70%, 50%)",
            "donut": 6,
            "donutColor": "hsl(45, 70%, 50%)",
            "country": "AD",
        },
        {
            "hot dog": 5,
            "hot dogColor": "hsl(194, 70%, 50%)",
            "burger": 36,
            "burgerColor": "hsl(222, 70%, 50%)",
            "country": "AE",
            "sandwich": 14,
            "sandwichColor": "hsl(57, 70%, 50%)",
            "kebab": 16,
            "kebabColor": "hsl(354, 70%, 50%)",
            "fries": 95,
            "friesColor": "hsl(305, 70%, 50%)",
            "donut": 61,
            "donutColor": "hsl(287, 70%, 50%)"
        },
        {
            "hot dog": 7,
            "burger": 15,
            "burgerColor": "hsl(71, 70%, 50%)",
            "sandwich": 13,
            "hot dogColor": "hsl(338, 70%, 50%)",
            "sandwichColor": "hsl(223, 70%, 50%)",
            "kebab": 14,
            "country": "AF",
            "kebabColor": "hsl(299, 70%, 50%)",
            "fries": 19,
            "friesColor": "hsl(132, 70%, 50%)",
            "donut": 10,
            "donutColor": "hsl(237, 70%, 50%)"
        },
        {
            "hot dog": 16,
            "country": "AG",
            "burgerColor": "hsl(62, 70%, 50%)",
            "sandwich": 9,
            "burger": 3,
            "sandwichColor": "hsl(9, 70%, 50%)",
            "kebab": 16,
            "kebabColor": "hsl(18, 70%, 50%)",
            "fries": 17,
            "friesColor": "hsl(102, 70%, 50%)",
            "hot dogColor": "hsl(209, 70%, 50%)",
            "donut": 43,
            "donutColor": "hsl(150, 70%, 50%)"
        },
        {
            "hot dog": 12,
            "hot dogColor": "hsl(231, 70%, 50%)",
            "burger": 14,
            "burgerColor": "hsl(269, 70%, 50%)",
            "country": "AI",
            "fries": 12,
            "sandwich": 54,
            "sandwichColor": "hsl(205, 70%, 50%)",
            "kebab": 29,
            "kebabColor": "hsl(357, 70%, 50%)",
            "friesColor": "hsl(148, 70%, 50%)",
            "donut": 71,
            "donutColor": "hsl(226, 70%, 50%)"
        },
        {
            "country": "AL",
            "hot dog": 13,
            "hot dogColor": "hsl(337, 70%, 50%)",
            "burger": 87,
            "sandwich": 19,
            "sandwichColor": "hsl(179, 70%, 50%)",
            "kebab": 26,
            "kebabColor": "hsl(89, 70%, 50%)",
            "burgerColor": "hsl(192, 70%, 50%)",
            "fries": 15,
            "friesColor": "hsl(124, 70%, 50%)",
            "donut": 70,
            "donutColor": "hsl(154, 70%, 50%)"
        },
        {
            "hot dog": 77,
            "burger": 87,
            "hot dogColor": "hsl(354, 70%, 50%)",
            "burgerColor": "hsl(13, 70%, 50%)",
            "country": "AM",
            "sandwich": 17,
            "sandwichColor": "hsl(97, 70%, 50%)",
            "kebab": 33,
            "donut": 61,
            "kebabColor": "hsl(270, 70%, 50%)",
            "fries": 11,
            "friesColor": "hsl(274, 70%, 50%)",
            "donutColor": "hsl(340, 70%, 50%)",
        }
    ]
    console.log("New data is : ", Array.from(newData.values()))
    console.log("New data is : ", Array.from(formattedData.values()))
    // for (const [key, value] of Object.entries(formattedData)) {
    //     // console.log(`${key}: ${value}`);
    //     for (const [k, v] of Object.entries(value)) {
    //         // console.log(`${k}: ${v}`);
    //         console.log({
    //             k_type: typeof (k),
    //             key: k,
    //             v_type: typeof (v),
    //             value: v
    //         })
    //     }
    // }

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
                        data={Array.from(formattedData.values())}
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
                        keys={keys}
                        indexBy="sector"
                        margin={{ top: 40, right: 100, bottom: 40, left: 50 }}
                        padding={0.2}
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
                    // role="application"
                    // ariaLabel="Nivo bar chart demo"
                    // barAriaLabel={e => e.id + ": " + e.formattedValue + " in sector: " + e.indexValue}
                    />

                    : "Loading..."}

                {(data && !isLoading) ?
                    <ResponsiveBar
                        data={Array.from(newData.values())}
                        keys={[
                            'hot dog',
                            'burger',
                            'sandwich',
                            'kebab',
                            'fries',
                            'donut'
                        ]}
                        indexBy="country"
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
                            legend: 'country',
                            legendPosition: 'middle',
                            legendOffset: 32,
                            truncateTickAt: 0
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'food',
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
                    // role="application"
                    // ariaLabel="Nivo bar chart demo"
                    // barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
                    />

                    : "Loading..."}

            </Box>
        </>
    );
};

export default PerformanceChart;

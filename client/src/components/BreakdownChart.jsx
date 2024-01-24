import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

import { useGetTopicDataQuery } from "state/api";

const BreakdownChart = ({ isDashboard = false, pestle }) => {
  const { data, isLoading } = useGetTopicDataQuery();
  // console.log("Topic data is :", data);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  console.log("isNonMedia value  is : ", isNonMobile)
  const theme = useTheme();

  if (!data || isLoading) return "Loading...";

  const mp = new Map();
  // console.log(typeof (data.filtered_data))
  Object.entries(data.filtered_data).forEach((item) => {
    if (item[1].pestle === pestle) {
      // console.log(item[1].topic);
      mp.set(item[1].topic, mp.get(item[1].topic) == undefined ? 1 : mp.get(item[1].topic) + 1);
    }
  })

  console.log("Map is : ", mp)

  const colors = [
    theme.palette.primary[100],
    theme.palette.secondary[200],
    theme.palette.grey[300],
    theme.palette.secondary[500],
    theme.palette.secondary[800],
  ];

  let total = 0;
  let i = 0;
  const formattedData = [];
  mp.forEach(
    (category, value) => {
      total += category;
      if (category >= 30)
        return
      const temp = {
        id: value,
        label: value,
        value: category,
        color: colors[(i++) % 5],
      }
      formattedData.push(temp)
    }
  );

  console.log(formattedData)

  return (
    <>
      <Box
        gridColumn="span 12"
        marginBottom={isDashboard ? "-3rem" : undefined}
        marginTop={isDashboard ? "-1.5rem" : undefined}
        height={isDashboard ? "100%" : "75vh"}
        width={undefined}
        minHeight={isDashboard ? "300px" : undefined}
        minWidth={isDashboard ? "300px" : undefined}
        position="relative"
      >
        <ResponsivePie
          data={formattedData}
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
          colors={{ datum: "data.color" }}
          margin={
            isDashboard
              ? { top: 20, right: 15, bottom: 60, left: 15 }
              : { top: 40, right: 80, bottom: 80, left: 40 }
          }
          sortByValue={true}
          innerRadius={0.45}
          activeOuterRadiusOffset={8}
          arcLinkLabelsDiagonalLength={isNonMobile ? 25 : 10}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          enableArcLinkLabels={!isDashboard}
          arcLinkLabelsTextColor={theme.palette.secondary[200]}
          arcLinkLabelsThickness={3}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          legends={!isDashboard ? isNonMobile ? [
            {
              anchor: "top-right",
              direction: "column",
              justify: false,
              translateX: isDashboard ? 20 : 70,
              translateY: isDashboard ? 50 : 0,
              itemsSpacing: 5,
              itemWidth: 85,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: theme.palette.primary[200],
                  },
                },
              ],
            },
          ] : [] : []}
        />
        <Box
          position="absolute"
          top="49%"
          left="48%"
          color={theme.palette.secondary[400]}
          textAlign="center"
          pointerEvents="none"
          sx={{
            transform: isDashboard
              ? "translate(-35%, -120%)"
              : "translate(-50%, -100%)",
          }}
        >
          <Typography variant="h6">
            {!isDashboard && "Total:"} {total}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default BreakdownChart;

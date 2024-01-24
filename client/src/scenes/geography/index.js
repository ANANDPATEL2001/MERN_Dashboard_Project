import { Box, useMediaQuery, useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
// import { getAlpha3Code } from "i18n-iso-countries";

import { useGetGeoDataQuery } from "state/api";
import Header from "components/Header";
import { geoData } from "state/geoData";
import { useMemo } from "react";

const Geography = () => {
  const theme = useTheme();
  const { data } = useGetGeoDataQuery();
  const isNonMedium = useMediaQuery("(min-width: 1000px)");
  const isNonMobile = useMediaQuery("(min-width: 720px)");
  // console.log("geoData is : ", data);



  const mp = new Map();
  const [formatted_data] = useMemo(() => {
    if (!data) return [];

    Object.entries(data).forEach((item) => {
      // console.log(item[1].topic);
      mp.set(item[1].country, mp.get(item[1].country) === undefined ? 1 : mp.get(item[1].country) + 1);
    })
    // console.log("Map is : ", mp)

    const formatted_data = [];
    mp.forEach((key, value) => {
      const temp = {
        id: value,
        value: key
      }
      formatted_data.push(temp)
    })

    return [formatted_data]
  }, [data, mp])

  return (
    <Box
      m="1.5rem 2.5rem"
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      // gridAutoRows="160px"
      gap="20px"
    // sx={{
    //     "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
    // }}
    >
      <Header gridColumn="span 12" title="GEOGRAPHY" subtitle="Find where major summit happened." />
      <Box
        gridColumn="span 12"
        // gridRow="auto"
        mt="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        {data ? (
          <ResponsiveChoropleth
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
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            domain={[0, 120]}
            colors="spectral"
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={isNonMobile ? 150 : 100}
            projectionTranslation={[0.50, 0.65]}
            projectionRotation={[0, 0, 0]}
            borderWidth={1.3}
            borderColor={theme.palette.grey[900]}
            legends={isNonMedium ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: theme.palette.background.alt,
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ] : []}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Geography;

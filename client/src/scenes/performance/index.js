import { useEffect, useMemo, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, useTheme } from "@mui/material";

import Header from "components/Header";
import FlexBetween from "../../components/FlexBetween";
import PerformanceChart from "../../components/PerformanceChart";
import { useGetPerformanceDataQuery } from "state/api";

const Performance = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetPerformanceDataQuery();
  // console.log("data is :", data, typeof (data));

  const [startYear, setStartYear] = useState("2016")
  const [endYear, setEndYear] = useState("2070")
  const [country, setCountry] = useState("USA")
  const [pestle, setPestle] = useState("Industries")

  const country_mp = new Map();
  const pestle_mp = new Map();
  const fun = useMemo(() => {
    if (!data || isLoading) return "Loading...";

    Object.entries(data).forEach((item) => {
      country_mp.set(item[1].country, country_mp.get(item[1].country) === undefined ? 1 : country_mp.get(item[1].country) + 1)
      pestle_mp.set(item[1].pestle, pestle_mp.get(item[1].pestle) === undefined ? 1 : pestle_mp.get(item[1].pestle) + 1)
    })

    // console.log("map for country & pestle is : ", country_mp, pestle_mp)
  }, [data]);

  // const option = () => {
  //   mp.forEach((key, value) => {
  //     return <MenuItem value={key}>{key}</MenuItem>;
  //   });
  // }

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="PERFORMANCE"
        subtitle="Track your Affiliate Sales Performance Here"
      />
      <Box height="75vh">
        <FlexBetween>
          <Box display="flex" justifyContent="flex-end" gap="0.5rem">
            <FormControl sx={{ mt: "1rem" }}>
              <InputLabel>Country</InputLabel>
              <Select
                value={country}
                label="Country"
                onChange={(e) => setCountry(e.target.value)}
              >
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="LBY">LBY</MenuItem>
                <MenuItem value="IND">IND</MenuItem>
                <MenuItem value="SAU">SAU</MenuItem>
                <MenuItem value="CHN">CHN</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ mt: "1rem" }}>
              <InputLabel>Pestle</InputLabel>
              <Select
                value={pestle}
                label="Pestle"
                onChange={(e) => setPestle(e.target.value)}
              >
                <MenuItem value="Industries">Industries</MenuItem>
                <MenuItem value="Economic">Economic</MenuItem>
                <MenuItem value="Political">Political</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
        <PerformanceChart startYear={startYear} endYear={endYear} country={country} pestle={pestle} />
      </Box>
    </Box>
  );
};

export default Performance;

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

import FlexBetween from "./FlexBetween";

const StatBox = ({ title, value, increase, icon, description }) => {
  const theme = useTheme();
  const isNonMediumScreen = useMediaQuery("(min-width : 1200px)")

  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      backgroundColor={theme.palette.background.alt}
      borderRadius="0.55rem"
    >
      <FlexBetween>
        <Typography
          fontSize={isNonMediumScreen ? "13px" : "17px"}
          variant="h6"
          sx={{ color: theme.palette.secondary[100] }}>
          {title}
        </Typography>
        {icon}
      </FlexBetween>

      <Typography
        variant="h3"
        fontWeight="600"
        sx={{ color: theme.palette.secondary[200] }}
      >
        {value}
      </Typography>
      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.secondary.light }}
        >
          {increase}
        </Typography>
        <Typography
          fontSize={isNonMediumScreen ? "11px" : "15px"}
        >{description}</Typography>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;

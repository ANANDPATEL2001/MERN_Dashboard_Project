import { Box, Link, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Image } from "@mui/icons-material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { useGetOverviewDataQuery } from "state/api";
import Header from "components/Header";
import { useState } from "react";

const OverviewChart = ({ isDashboard = false, view }) => {
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    TITLE: false
  });

  const theme = useTheme();
  const { data, isLoading } = useGetOverviewDataQuery();
  // console.log("Sales data is : ", data);

  const isNonMobile = useMediaQuery("(min-width: 720px)");
  console.log("IsNonMobile value is : ", isNonMobile)

  const columns = [
    {
      field: "country",
      headerName: "COUNTRY",
      flex: 0.4,
      renderCell: (params) => {
        return <img style={{ borderRadius: "100%", width: isNonMobile ? "50px" : "35px" }} src={`https://flagcdn.com/48x36/${params.value}.png`} alt="..." />
      },
      sortable: false
    },
    {
      field: "added",
      headerName: "ADDED",
      flex: 0.6,
      renderCell: (params) => {
        return params.value.slice(0, 17);
      },
    },
    // (isNonMobile ? (
    //   {
    //     field: "title",
    //     headerName: "TITLE",
    //     flex: 1,
    //     sortable: false
    //   },
    //   {
    //     field: "topic",
    //     headerName: "TOPIC",
    //     flex: 0.5,
    //   }
    // ) : ({
    //   field: "topic",
    //   headerName: "TOPIC",
    //   flex: 0.5,
    // })),
    {
      field: "title",
      headerName: "TITLE",
      flex: 1,
      sortable: false
    },
    {
      field: "topic",
      headerName: "TOPIC",
      flex: 0.5,
    },
    {
      field: "region",
      headerName: "REGION",
      flex: 0.6,
    },
    {
      field: "sector",
      headerName: "SECTOR",
      flex: 0.6,
    },
    {
      field: "intensity",
      headerName: "INTENSITY",
      flex: 0.4,
    },
    {
      field: "likelihood",
      headerName: "LIKELIHOOD",
      flex: 0.4,
    },
    // {
    //   field: "relevance",
    //   headerName: "RELEVANCE",
    //   flex: 0.4,
    // },
    {
      field: "url",
      headerName: "LINK",
      flex: 0.4,
      renderCell: (params) => {
        return <Link href={`${params.value}`} target="_blank" color={theme.palette.primary[100]}>< OpenInNewIcon /></Link>
      },
      sortable: false
    },
  ];

  if (!data || isLoading) return "Loading...";

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        // gridAutoRows="160px"
        gap="20px"
        // sx={{
        //     "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        // }}
        m="1.5rem 1.5rem">
        {/* <Header title="OVERVIEW" subtitle="List of all Major Summit & their insight" /> */}
        <Box
          gridColumn="span 12"
          mt="40px"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              // backgroundColor: theme.palette.background.alt,
              backgroundColor: theme.palette.primary[1200],
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              // backgroundColor: theme.palette.background.alt,
              backgroundColor: theme.palette.primary[1200],
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={data || []}
            columns={columns}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) =>
              setColumnVisibilityModel(newModel)}
            checkboxSelection={isNonMobile ? true : false}
          />
        </Box>
      </Box>
    </>
  );
};

export default OverviewChart;

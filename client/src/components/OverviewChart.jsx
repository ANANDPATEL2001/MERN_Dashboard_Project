import { Box, Link, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useGetOverviewDataQuery } from "state/api";
import Header from "components/Header";

const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetOverviewDataQuery();
  console.log("Sales data is : ", data);

  const columns = [
    {
      field: "added",
      headerName: "ADDED",
      flex: 0.6,
      renderCell: (params) => {
        return params.value.slice(0, 17);
      },
    },
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
        return <Link href={`${params.value}`} target="_blank" color={theme.palette.primary[100]}>Link</Link>
      },
      sortable: false
    },
  ];

  if (!data || isLoading) return "Loading...";

  return (
    <>
      <Box m="1.5rem 2.5rem">
        {/* <Header title="OVERVIEW" subtitle="List of all Major Summit & their insight" /> */}
        <Box
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
            checkboxSelection
          />
        </Box>
      </Box>
    </>
  );
};

export default OverviewChart;

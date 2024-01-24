import {
    DownloadOutlined,
    Email,
    PointOfSale,
    PersonAdd,
    Traffic,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Typography,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ForumIcon from '@mui/icons-material/Forum';
import AddHomeIcon from '@mui/icons-material/AddHome';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import ClearAllIcon from '@mui/icons-material/ClearAll';

import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetDashboardQuery, useGetOverviewDataQuery } from "state/api";
import StatBox from "components/StatBox";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { useMemo } from "react";
import TotalIntensity from "../../components/TotalIntensity";

const Dashboard = () => {
    const theme = useTheme();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

    const { data, isLoading } = useGetDashboardQuery();
    const newData = useGetOverviewDataQuery();
    console.log("New Summit data is :", newData.data)

    let count = 0;
    let relevance = 0;
    let intensity = 0;
    let country = 0;
    const fun = useMemo(() => {
        if (!newData.data || newData.isLoading) return "Loading...";

        Object.entries(newData.data).forEach((item) => {
            // console.log("New data item is : ", item)
            relevance += item[1].relevance;
            intensity += item[1].intensity;
            if (item[1].country != null && item[1].country != "")
                country++;
            count++;
        })

    }, [newData.data])

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
        {
            field: "relevance",
            headerName: "RELEVANCE",
            flex: 0.4,
        },
    ];

    return (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

                <Box>
                    <Button
                        sx={{
                            backgroundColor: theme.palette.secondary.light,
                            color: theme.palette.background.alt,
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <DownloadOutlined sx={{ mr: "10px" }} />
                        Download Reports
                    </Button>
                </Box>
            </FlexBetween>

            <Box
                mt="20px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="160px"
                gap="20px"
                sx={{
                    "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
                }}
            >
                {/* ROW 1 */}
                <StatBox
                    title="Total Summits"
                    value={count}
                    increase="+14%"
                    description="Since last month"
                    icon={
                        <ForumIcon
                            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                        />
                    }
                />
                <StatBox
                    title="Relevance Today"
                    value={relevance > 10 ^ 5 ? "Million+" : relevance}
                    increase="+21%"
                    description="Since last month"
                    icon={
                        <AddHomeIcon
                            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                        />
                    }
                />
                <Box
                    gridColumn="span 8"
                    gridRow="span 2"
                    backgroundColor={theme.palette.background.alt}
                    p="0.5rem"
                    borderRadius="0.55rem"
                >
                    {/* <OverviewChart view="sales" isDashboard={true} /> */}
                    <TotalIntensity />
                </Box>
                <StatBox
                    title="Times countries Explored"
                    value={country}
                    increase="+5%"
                    description="Since last month"
                    icon={
                        <AssuredWorkloadIcon
                            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                        />
                    }
                />
                <StatBox
                    title="Updated Intensity"
                    value={intensity > 10 ^ 5 ? "Million+" : intensity}
                    increase="+43%"
                    description="Since last month"
                    icon={
                        <ClearAllIcon
                            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                        />
                    }
                />

                {/* ROW 2 */}
                <Box
                    gridColumn="span 8"
                    gridRow="span 3"
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
                        loading={newData.isLoading || !newData.data}
                        getRowId={(row) => row._id}
                        rows={newData.data || []}
                        columns={columns}
                    />
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 3"
                    backgroundColor={theme.palette.background.alt}
                    // p="1.5rem"
                    borderRadius="0.55rem"
                >
                    <Typography p="1.5rem" variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                        Topic Stats over Regional Informatiion
                    </Typography>
                    <BreakdownChart isDashboard={true} pestle="Technological" />
                    <Typography
                        p="0 0.4rem"
                        fontSize="0.8rem"
                        m="10px 0"
                        sx={{
                            color: theme.palette.secondary[200]
                        }}
                    >
                        Breakdown of overall stats and information via region b/w 2016 & 2070 year duration.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;

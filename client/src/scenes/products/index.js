import React, { useMemo, useState } from "react";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    // Rating,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";

import Header from "components/Header";
import { useGetOverviewDataQuery } from "state/api";

const Product = ({
    _id,
    topic,
    title,
    sector,
    intensity,
    region,
    source,
    relevance,
}) => {
    const theme = useTheme()
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <Card
            sx={{
                backgroundImage: "none",
                backgroundColor: theme.palette.background.alt,
                borderRadius: "0.55rem",
            }}
        >
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color={theme.palette.mode === "dark" ? theme.palette.secondary[700] : theme.palette.primary[900]}
                    // Below the 'gutterBottom' is used to give a small bottom margin
                    gutterBottom
                >
                    {region.toUpperCase()}
                </Typography>
                <Typography variant="h5" component="div">
                    {topic.toUpperCase()}
                </Typography>
                <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
                    {sector}
                </Typography>
                {/* <Rating value={intensity} readOnly /> */}

                <Typography variant="body2">{title.length > 150 ? `${title.slice(0, 120)}...` : title}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="primary"
                    size="small"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    See More
                </Button>
            </CardActions>
            <Collapse
                in={isExpanded}
                timeout="auto"
                unmountOnExit
                sx={{
                    color: theme.palette.neutral[300],
                }}
            >
                <CardContent>
                    <Typography>id : {_id}</Typography>
                    <Typography>Source : {source}</Typography>
                    <Typography>
                        Relevance : {relevance}
                    </Typography>
                    <Typography>
                        Intensity : {intensity}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

const Products = ({ task }) => {
    // Here, 'data' & 'isLoading' are the return values/parameters in 'redux-toolkit query'
    const { data, isLoading } = useGetOverviewDataQuery();
    console.log("products data is :", data);

    const isNonMobile = useMediaQuery("(min-width: 1200px)");
    const theme = useTheme();
    // console.log(theme)

    let newData = []
    useMemo(() => {
        if (!data || isLoading) return "Loading...";
        Object.entries(data).map((item) => {
            if (item[1].topic === task) {
                newData.push(item[1])
            }
            return;
        })
    }, [data, task])

    console.log("NewData is : ", newData)

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="SUMMITS" subtitle="See the most Hot topics today." />
            {data || !isLoading ? (
                <Box
                    // class="MuiBox-root css-qdqrml"
                    mt="20px"
                    display="grid"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    justifyContent="space-between"
                    rowGap="20px"
                    columnGap="1.33%"
                    sx={{
                        // Below "& > div" is used to target the immediate 'div' element i.e.(first 'div' element encountered after the parent ('Box') element)
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                >
                    {!(newData.length) ? data.map(
                        ({
                            _id,
                            topic,
                            title,
                            sector,
                            intensity,
                            region,
                            source,
                            relevance,
                        }) => (
                            <Product
                                key={_id}
                                _id={_id}
                                topic={topic}
                                title={title}
                                sector={sector}
                                intensity={intensity}
                                region={region}
                                source={source}
                                relevance={relevance}
                            />
                        )
                    ) : newData.map(
                        ({
                            _id,
                            topic,
                            title,
                            sector,
                            intensity,
                            region,
                            source,
                            relevance,
                        }) => (
                            <Product
                                key={_id}
                                _id={_id}
                                topic={topic}
                                title={title}
                                sector={sector}
                                intensity={intensity}
                                region={region}
                                source={source}
                                relevance={relevance}
                            />
                        )
                    )}
                </Box>
            ) : (
                <>Loading...</>
            )}
        </Box>
    );
};

export default Products;

import OverallStat from "../models/OverallStat.js";
import lookup from "country-code-lookup"

export const getStatData = async (req, res) => {
    try {
        // let end_year = [];
        const overAllData = await OverallStat.find();

        const filtered_data = overAllData.filter((stats) => {
            if (
                stats.topic != null && stats.topic != "" &&
                stats.region != null && stats.region != "" &&
                stats.sector != null && stats.sector != "" &&
                stats.source != null && stats.source != "" &&
                stats.intensity != null && stats.intensity != "" &&
                stats.relevance != null && stats.relevance != "" &&
                stats.likelihood != null && stats.likelihood != ""
            ) {
                // end_year.push(stats)
                return { ...stats }
            }
        });

        // const mp = new Map();
        // filtered_data.map((item) => {
        //     mp.set(item.region, mp.get(item.region) == undefined ? 0 : 1);
        // })

        // console.log(mp.size);


        res.status(200).json(filtered_data)
        // res.status(200).json(lookup.countries)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getPerformanceData = async (req, res) => {
    try {
        // let end_year = [];
        const overAllData = await OverallStat.find();

        const filtered_data = overAllData.filter((stats) => {
            if (
                stats.topic != null && stats.topic != "" &&
                stats.sector != null && stats.sector != "" &&
                stats.country != null && stats.country != "" &&
                stats.pestle != null && stats.pestle != "" &&

                stats.start_year != null && stats.start_year != "" &&
                stats.end_year != null && stats.end_year != "" &&

                stats.intensity != null && stats.intensity != "" &&
                stats.relevance != null && stats.relevance != "" &&
                stats.likelihood != null && stats.likelihood != ""
            ) {
                // end_year.push(stats)
                return { ...stats }
            }
        });

        // const mp = new Map();
        // filtered_data.map((item) => {
        //     mp.set(item.region, mp.get(item.region) == undefined ? 0 : 1);
        // })

        filtered_data.forEach((item) => {
            if (item.country == "United States of America")
                item.country = "USA"
            else {
                const temp = lookup.byCountry(item.country)
                item.country = temp.iso3
            }
        })

        // console.log(mp.size);


        res.status(200).json(filtered_data)
        // res.status(200).json(lookup.countries)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

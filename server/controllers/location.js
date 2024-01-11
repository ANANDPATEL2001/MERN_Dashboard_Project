import OverallStat from "../models/OverallStat.js";
import lookup from 'country-code-lookup';

export const getGeoData = async (req, res) => {
    try {
        // let end_year = [];
        const overAllData = await OverallStat.find();

        const filtered_data = overAllData.filter((stats) => {
            if (
                stats.country != null && stats.country != "" &&
                stats.intensity != null && stats.intensity != "" &&
                stats.relevance != null && stats.relevance != "" &&
                stats.likelihood != null && stats.likelihood != ""
            ) {
                // end_year.push(stats)
                return { ...stats }
            }
        });


        let count = 0;
        filtered_data.forEach((item) => {
            const temp = lookup.byCountry(item.country);
            // console.log("temp is : ", temp)
            if (temp) {
                // console.log("item -> country is : ", item.country, temp.iso3)
                item.country = temp.iso3;
            }
            else {
                item.country = 'USA';
                count++;
            }
        })

        // console.log(lookup.byCountry('United States of America'))
        // console.log(count)



        res.status(200).json(filtered_data)
        // res.status(200).json(lookup.countries)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getRegionData = async (req, res) => {
    try {
        // let end_year = [];
        const overAllData = await OverallStat.find();

        const filtered_data = overAllData.filter((stats) => {
            if (
                stats.region != null && stats.region != "" &&
                stats.source != null && stats.source != "" &&
                stats.intensity != null && stats.intensity != "" &&
                stats.relevance != null && stats.relevance != "" &&
                stats.likelihood != null && stats.likelihood != ""
            ) {
                // end_year.push(stats)
                return { ...stats }
            }
        });

        const mp = new Map();
        filtered_data.map((item) => {
            mp.set(item.source, mp.get(item.source) == undefined ? 0 : mp.get(item.source) + 1);
        })

        let i = 0;
        console.log(mp.size);
        mp.forEach((key, value) => {
            console.log({ key: key, value: value })
        })


        res.status(200).json(filtered_data)
        // res.status(200).json(lookup.countries)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


import Overallstat from "../models/OverallStat.js";
import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const getDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    /* Recent Transactions */
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    /* Overall Stats */
    const overallStat = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const getYearData = async (req, res) => {
  try {
    // let end_year = [];
    const overAllData = await Overallstat.find();

    const filtered_data = overAllData.filter((stats) => {
      if (
        stats.end_year != null && stats.end_year != "" &&
        stats.intensity != null && stats.intensity != "" &&
        stats.start_year != null && stats.start_year != "" &&
        stats.relevance != null && stats.relevance != "" &&
        stats.likelihood != null && stats.likelihood != ""
      ) {
        // end_year.push(stats)
        return { ...stats }
      }
    });

    res.status(200).json({ filtered_data })
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


export const getData = async (req, res) => {
  try {
    // let end_year = [];
    const overAllData = await Overallstat.find();

    const filtered_data = overAllData.filter((stats) => {
      if (
        stats.end_year != null && stats.end_year != "" &&
        stats.intensity != null && stats.intensity != "" &&
        stats.sector != null && stats.sector != "" &&
        stats.topic != null && stats.topic != "" &&
        stats.region != null && stats.region != "" &&
        stats.start_year != null && stats.start_year != "" &&
        stats.impact != null && stats.impact != "" &&
        stats.published != null && stats.published != "" &&
        stats.country != null && stats.country != "" &&
        stats.relevance != null && stats.relevance != "" &&
        stats.pestle != null && stats.pestle != "" &&
        stats.source != null && stats.source != "" &&
        stats.likelihood != null && stats.likelihood != ""
      ) {
        // end_year.push(stats)
        return { ...stats }
      }
    });

    res.status(200).json({ filtered_data })
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


export const getTopicData = async (req, res) => {
  try {
    // let end_year = [];
    const overAllData = await Overallstat.find();

    const filtered_data = overAllData.filter((stats) => {
      if (
        stats.topic != null && stats.topic != "" &&
        stats.intensity != null && stats.intensity != "" &&
        stats.relevance != null && stats.relevance != "" &&
        stats.likelihood != null && stats.likelihood != ""
      ) {
        // end_year.push(stats)
        return { ...stats }
      }
    });

    res.status(200).json({ filtered_data })
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
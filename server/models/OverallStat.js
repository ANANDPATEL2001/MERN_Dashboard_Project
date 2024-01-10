import mongoose from "mongoose";

const OverallStatSchema = new mongoose.Schema(
  {
    "end_year": {
      type: String,
      required: false
    },
    "intensity": {
      type: String,
      required: false
    },
    "sector": {
      type: String,
      required: false
    },
    "topic": {
      type: String,
      required: false
    },
    "insight": {
      type: String,
      required: true
    },
    "url": {
      type: String,
      required: true
    },
    "region": {
      type: String,
      required: false
    },
    "start_year": {
      type: String,
      required: false
    },
    "impact": {
      type: String,
      required: false
    },
    "added": {
      type: String,
      required: true
    },
    "published": {
      type: String,
      required: false
    },
    "country": {
      type: String,
      required: false
    },
    "relevance": {
      type: String,
      required: false
    },
    "pestle": {
      type: String,
      required: false
    },
    "source": {
      type: String,
      required: false
    },
    "title": {
      type: String,
      required: true
    },
    "likelihood": {
      type: String,
      required: false
    },
  },
  { timestamps: true }
);

const OverallStat = mongoose.model("OverallStat", OverallStatSchema);
export default OverallStat;

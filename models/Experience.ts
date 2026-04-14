import { Schema, model, models } from "mongoose";

const ExperienceSchema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  abbrev: { type: String, required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date },
  isCurrent: { type: Boolean, default: false },
  shortDesc: String,
  bgImage: String,
  location: String,
}, { timestamps: true });

const ExperienceModel = models.Experience || model("Experience", ExperienceSchema);
export default ExperienceModel;

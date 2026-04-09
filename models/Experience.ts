import { Schema, model, models } from "mongoose";

const ExperienceSchema = new Schema({
  title: String,
  company: String,
  fromDate: { type: Date, required: true },
  toDate: { type: Date },
  isCurrent: { type: Boolean, default: false },
  shortDesc: String,
  bgImage: String,
});

const ExperienceModel = models.Experience || model("Experience", ExperienceSchema);

export default ExperienceModel;

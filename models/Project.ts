import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    image: String,
    tags: [String],
    link: String,
  },
  { timestamps: true },
);

const Project = models.Project || model("Project", ProjectSchema);

export default Project;

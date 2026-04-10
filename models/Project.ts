import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
    {
        title: { type: String, required: true },
        category: { type: String, required: true },
        type: { type: String, required: true },
        source: String,
        experienceId: {
            type: Schema.Types.ObjectId,
            ref: "Experience",
        },
        size: {
            type: String,
            enum: ["large", "small"],
            default: "small",
        },
        image: { type: String },
        tech: [String],
        github: String,
        link: String,
        description: String,
    },
    { timestamps: true }
);

const ProjectModel = models.Project || model("Project", ProjectSchema);

export default ProjectModel;

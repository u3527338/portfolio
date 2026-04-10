import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    iconName: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: Number, required: true },
});

export default mongoose.models.Skill || mongoose.model("Skill", SkillSchema);

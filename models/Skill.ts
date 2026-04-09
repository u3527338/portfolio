import { Schema, model, models } from "mongoose";

const SkillItemSchema = new Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  iconName: { type: String, required: true },
});

const SkillGroupSchema = new Schema(
  {
    category: { type: String, required: true },
    skills: [SkillItemSchema], // 嵌套陣列
  },
  {
    timestamps: true,
  },
);

const SkillModel = models.SkillGroup || model("SkillGroup", SkillGroupSchema);

export default SkillModel;

import mongoose, { Document, Schema } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  level: number;
  category: string;
}

const SkillSchema = new Schema<ISkill>({
  name: { type: String, required: true },
  level: { type: Number, required: true, min: 1, max: 100 },
  category: { type: String, required: true, default: 'Other' },
}, { timestamps: true });

export default mongoose.model<ISkill>('Skill', SkillSchema);

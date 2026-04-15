import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
  featured: boolean;
  order: number;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  github: { type: String, default: '' },
  live: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema);

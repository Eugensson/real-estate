import { Document, model, models, Schema } from "mongoose";

export interface IAgent extends Document {
  _id: string;
  image: string;
  name: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

const agentSchema = new Schema<IAgent>(
  {
    image: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const Agent = models.Agent || model<IAgent>("Agent", agentSchema);

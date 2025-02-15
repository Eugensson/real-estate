import slugify from "slugify";
import { Document, model, models, Schema } from "mongoose";

import { IPropertyInput } from "@/types";

export interface IProperty extends Document, IPropertyInput {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const propertySchema = new Schema<IProperty>(
  {
    type: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, trim: true },
    image: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    surface: { type: Number, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    agent: {
      type: Schema.Types.ObjectId as unknown as typeof String,
      ref: "Agent",
    },
  },
  { timestamps: true, versionKey: false }
);

propertySchema.pre<IProperty>("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true }) + "-" + Date.now();
  }
  next();
});

export const Property =
  models.Property || model<IProperty>("Property", propertySchema);

import * as mongoose from 'mongoose';
import 'mongoose-geojson-schema';
import { types as needTypes } from './types';

const { Schema } = mongoose;

const { ObjectId, Point } = Schema.Types;

export const NeedSchema = new Schema(
  {
    title: String,
    recipient: ObjectId,
    volunteer: ObjectId,
    location: {
      address: String,
      point: Point,
    },
    notes: String,
    date: Date,
    needType: {
      type: String,
      required: true,
      enum: needTypes,
    },
  },
  {
    timestamps: true,
  },
);

NeedSchema.index({ 'location.point': '2dsphere' });

import * as mongoose from 'mongoose';
import { types as needTypes } from '../../needs/schemas/types';

const { Schema } = mongoose;

const { ObjectId } = Schema.Types;

export const ChildcareDetailSchema = new Schema(
  {
    needType: {
      type: String,
      default: 'CHILDCARE',
    },
    age: {
      type: [{ type: String, enum: needTypes }],
      required: true,
    },
    need: {
      type: ObjectId,
      ref: 'Need',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

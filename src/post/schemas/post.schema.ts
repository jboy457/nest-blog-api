import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 4,
    },
    body: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
    },
  },
  {
    timestamps: true,
  },
);

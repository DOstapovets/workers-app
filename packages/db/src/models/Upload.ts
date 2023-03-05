import { Upload } from 'app-types';
import { Schema, model } from 'mongoose';

const uploadSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    meta: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  },
);

const UploadModel = model<Upload>('upload', uploadSchema);

export { UploadModel, uploadSchema };

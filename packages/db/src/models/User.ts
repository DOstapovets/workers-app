import { Schema, model } from 'mongoose';

import type { User } from 'app-types';

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    avatar: {
      ref: 'upload',
      type: Schema.Types.ObjectId,
    },
    cover: {
      ref: 'upload',
      type: Schema.Types.ObjectId,
    },
    fullName: {
      type: String,
      require: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = model<User>('user', userSchema);

export { UserModel, userSchema };

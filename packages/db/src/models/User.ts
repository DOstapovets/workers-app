import { Schema, model } from 'mongoose';

import type { User } from 'app-types';

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  passHash: {
    type: String,
  },
});

const UserModel = model<User>('user', userSchema);

export { UserModel, userSchema };

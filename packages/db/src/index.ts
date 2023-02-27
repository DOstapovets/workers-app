import mongoose from 'mongoose';

import { mongoURI } from 'app-config';
import loggerFactory from 'app-logger';

const log = loggerFactory('DB');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect(mongoURI, {});

    log.info('Successfully connected to DB');

    return mongoose.connection;
  } catch (err) {
    log.error(err);
    throw err;
  }
};

export default connectDB;

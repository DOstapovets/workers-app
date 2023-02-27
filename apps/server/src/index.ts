import connectDB from 'app-db';

import startServer from './server';

connectDB().then(() => startServer());

const { PORT = 8001, NODE_ENV } = process.env;

export default {
  port: PORT,
  isProd: NODE_ENV === 'production',
};

const { PORT = 8000, NODE_ENV } = process.env;

export default {
  port: PORT,
  isProd: NODE_ENV === 'production',
};

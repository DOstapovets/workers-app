import http from './http';

export default {
  async check() {
    const { data } = await http.get('/health');
    return data;
  },
};

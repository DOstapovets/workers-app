import http from './http';

export default {
  async run() {
    const { data } = await http.post('/worker');

    return data;
  },
};

import { HealthApi } from './core/api';
import socket from './core/ws/client';

socket.on('connect', () => {
  HealthApi.check().then((data) => {
    console.log(data);
  });
});

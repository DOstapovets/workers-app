import { HealthApi } from './core/api';
import socket from './core/ws/client';
import App from './lib/app';

socket.on('connect', () => {
  HealthApi.check().then((data) => {
    console.log({ data });
  });
  new App().run();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

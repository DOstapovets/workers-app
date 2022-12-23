import { WorkerApi } from '../core/api';
import Chart from '../core/chart';
import socket from '../core/ws/client';

// interface ChartData {
//   x: number;
//   y: number;
// }

export default class App {
  chart: Chart;

  run() {
    const $canvas = document.getElementById('chart1') as HTMLCanvasElement;
    const $resetZoomBtn = document.getElementById('resetZoom');
    const $addWorkerBtn = document.getElementById('addWorker');

    this.chart = new Chart($canvas, {
      type: 'scatter',
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        scales: {},
        plugins: {
          zoom: {
            pan: {
              enabled: true,
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: 'xy',
            },
          },
        },
      },
    });

    $resetZoomBtn.addEventListener('click', () => {
      this.chart.resetZoom();
    });
    $addWorkerBtn.addEventListener('click', async () => {
      const { jobId }: { jobId: string } = await WorkerApi.run();

      this.chart.data.datasets.push({
        label: jobId,
        data: [],
        showLine: false,
        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
          16,
        )}`,
      });
      this.chart.update();
    });
    this.subscribeOnData();
  }

  private subscribeOnData() {
    socket.on('message', ({ jobId, data: { x, y } }) => {
      const dataset = this.chart.data.datasets.find(
        ({ label }) => jobId === label,
      );
      if (dataset) {
        this.chart.data.labels.push(y);
        dataset?.data.push(x);
        this.chart.update();
      }
    });
  }
}

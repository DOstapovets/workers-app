import Chart from '../core/chart';
import socket from '../core/ws/client';

interface ChartData {
  x: number;
  y: number;
}

export default class App {
  data: ChartData[] = [];

  chart: Chart;

  run() {
    const $canvas = document.getElementById('chart1') as HTMLCanvasElement;
    const $resetZoomBtn = document.getElementById('resetZoom');

    this.chart = new Chart($canvas, {
      type: 'line',
      data: {
        labels: this.data.map((row) => row?.y),
        datasets: [
          {
            label: 'Worker1',
            data: this.data.map((row) => row.x),
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'second',
              parser: null,
            },
          },
        },
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
    this.subscribeOnData();
  }

  private subscribeOnData() {
    socket.on('message', ({ x, y }) => {
      this.chart.data.labels.push(y);
      this.chart.data.datasets.forEach((dataset) => {
        dataset.data.push(x);
      });
      this.chart.update();
    });
  }
}

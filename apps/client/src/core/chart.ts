import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-moment';

Chart.register(zoomPlugin);

export default Chart;

import drawChartPie from './chart-pie';
import drawChartTeams, { redrawChartTeams } from './chart-teams';
import drawChartGoals, { redrawChartGoals } from './chart-goals';
import helpers from './helpers';
import '../css/index.css';

const CHART_PIE_WIDTH = 250;
const CHART_PIE_HEIGHT = 250;

drawChartPie(CHART_PIE_WIDTH, CHART_PIE_HEIGHT, 'champion');
drawChartPie(CHART_PIE_WIDTH, CHART_PIE_HEIGHT, 'continent');
drawChartTeams();
drawChartGoals();

const redrawCharts = () => {
  redrawChartTeams();
  redrawChartGoals();
}

window.addEventListener('resize', helpers.throttle(redrawCharts, 100));

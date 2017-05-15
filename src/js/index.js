import drawChartPie from './chart-pie';
import drawChartTeams, { redrawChartTeams } from './chart-teams';
import drawChartGoals, { redrawChartGoals } from './chart-goals';
import drawMap from './map';
import helpers from './helpers';

const CHART_PIE_WIDTH = 250;
const CHART_PIE_HEIGHT = 250;
const MAP_WIDTH = 1500;
const MAP_HEIGHT = 600;

drawChartPie(CHART_PIE_WIDTH, CHART_PIE_HEIGHT, 'champion');
drawChartPie(CHART_PIE_WIDTH, CHART_PIE_HEIGHT, 'continent');
drawChartTeams();
drawChartGoals();
drawMap(MAP_WIDTH, MAP_HEIGHT);

const redrawCharts = () => {
  redrawChartTeams();
  redrawChartGoals();
}

window.addEventListener('resize', helpers.throttle(redrawCharts, 100));

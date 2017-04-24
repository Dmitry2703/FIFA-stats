import drawChartTeams from './chart-teams';
import drawChartPie from './chart-pie';

const drawCharts = () => {
  let chartPieWidth = 220;
  let chartPieHeight = 220;

  let chartTeamsWidth = 750;
  let chartTeamsHeight = 300;

  if (window.innerWidth >= 1024) {
    chartPieWidth = 350;
    chartPieHeight = 350;

    chartTeamsWidth = 900;
    chartTeamsHeight = 400;
  }

  drawChartTeams(chartTeamsWidth, chartTeamsHeight);
  drawChartPie(chartPieWidth, chartPieHeight, 'champion');
  drawChartPie(chartPieWidth, chartPieHeight, 'continent');
}

drawCharts();
window.addEventListener('resize', drawCharts)

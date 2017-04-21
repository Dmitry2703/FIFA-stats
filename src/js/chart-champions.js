import * as d3 from 'd3';
import data from '../data.json';

const getChampions = (data) => {
  const champions = data.reduce((result, item) => {
    if (!result[item.champion]) {
      result[item.champion] = 0;
    }
    result[item.champion]++;
    return result;
  }, {});

  const dataForChart = Object.keys(champions).map(key => ({
    country: key,
    times: champions[key],
  }));

  return dataForChart;
};

export default (width, height) => {
  const chartData = getChampions(data);
  const chart = d3.select('#chart-champions')
    .append('svg')
      .attr('class', 'charts__svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${width} ${height}`);

  const radius = height / 2;

  const getColor = i => `hsl(${i * 50}, 75%, 50%)`;

  const colors = chartData.map((item, i) => getColor(i));

  const color = d3.scaleOrdinal()
    .range(colors);

  const group = chart.append('g')
    .attr('transform', `translate(${width / 2}, ${radius})`);

  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

  const pie = d3.pie()
    .value(d => d.times);

  const arcs = group.selectAll('.arc')
    .data(pie(chartData))
  .enter().append('g')
    .attr('class', 'arc');

  arcs.append('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data.country));

  arcs.append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .attr('font-size', '1.5em')
    .text(d => d.data.country);
}

console.log(getChampions(data));

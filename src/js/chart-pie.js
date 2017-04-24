import * as d3 from 'd3';
import data from '../data.json';
import { getEntities, getColor } from './helpers';

export default (width, height, entity) => {
  const chartData = getEntities(data, entity);
  const chart = d3.select(`#chart-${entity}s`)
    .append('svg')
      .attr('class', 'charts__svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${width} ${height}`);

  const radius = height / 2;

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
    .attr('fill', d => color(d.data.entity));

  arcs.append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .attr('font-size', '1.5em')
    .text(d => `${d.data.entity}, ${d.value} times`);
}

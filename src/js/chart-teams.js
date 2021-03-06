import * as d3 from 'd3';
import d3Tip from "d3-tip";
import data from '../data.json';
import helpers from './helpers';

d3.tip = d3Tip;

const {
  width,
  height,
  innerWidth,
  innerHeight,
  margin,
} = helpers.setChartDimensions(d3.select('#chart-teams'));

// for ordinal (not quantitative) data use scaleBand()
const xScale = d3.scaleBand()
  .domain(data.map(d => d.year))
  .range([0, innerWidth])
  .padding(0.2);

// for quantitative data use scaleLinear()
const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.teams)])
  .range([innerHeight, 0]);

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

const chart = d3.select('#chart-teams')
  .append('svg')
    .attr('class', 'charts__svg')
    .attr('width', width)
    .attr('height', height);

const inner = chart.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

const tip = d3.tip()
  .attr('class', 'd3-tip with-triangle')
  .offset([-20, 0])
  .html(d => {
    return `<ul>
        <li>${d.teams} teams</li>
        <li>Country: <strong>${d.country}</strong></li>
        <li>Champion: <strong>${d.champion}</strong></li>
      </ul>`;
  });

chart.call(tip);

export default () => {
  // x axis
  inner.append('g')
    .attr('class', 'axis axis-x')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(xAxis);

  // y axis
  inner.append('g')
    .attr('class', 'axis axis-y')
    .call(yAxis);

  const bar = inner.selectAll('.bar')
    .data(data)
    .enter().append('g')
      .attr('class', 'bar')
      .attr('transform', d => `translate(${xScale(d.year)}, 0)`);

  bar.append('rect')
    .attr('y', d => yScale(d.teams))
    .attr('width', xScale.bandwidth())
    .attr('height', d => innerHeight - yScale(d.teams))
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);
}

export const redrawChartTeams = () => {
  const {
    width,
    height,
    innerWidth,
    innerHeight,
  } = helpers.setChartDimensions(d3.select('#chart-teams'));

  xScale.range([0, innerWidth]);
  yScale.range([innerHeight, 0]);

  d3.select('#chart-teams svg')
    .attr('width', width)
    .attr('height', height);

  chart.selectAll('.bar')
    .attr('transform', d => `translate(${xScale(d.year)}, 0)`);

  chart.selectAll('rect')
    .attr('y', d => yScale(d.teams))
    .attr('width', xScale.bandwidth())
    .attr('height', d => innerHeight - yScale(d.teams));

  chart.select('.axis-x')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(xAxis);
  chart.select('.axis-y').call(yAxis);
}

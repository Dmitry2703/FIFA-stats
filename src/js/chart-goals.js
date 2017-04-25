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
} = helpers.setChartDimensions(d3.select('#chart-goals'));

// for ordinal (not quantitative) data use scaleBand()
const xScale = d3.scaleBand()
  .domain(data.map(d => d.year))
  .range([0, innerWidth])
  .padding(1);

// for quantitative data use scaleLinear()
const yScale = d3.scaleLinear()
  .domain([d3.min(data, d => +d.goals) - 10, d3.max(data, d => +d.goals)])
  .range([innerHeight, 0]);

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

const line = d3.line()
  .x(d => xScale(d.year))
  .y(d => yScale(d.goals));

const chart = d3.select('#chart-goals')
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
    return `<strong>${d.year}:</strong>
      <ul>
        <li>Goals: ${d.goals}</li>
        <li>Per game: ${parseFloat(d.goals / d.games).toFixed(2)}</li>
      </ul>`
  });

chart.call(tip);

export default () => {
  inner.append('path')
    .attr('class', 'line')
    .attr('d', line(data));

  inner.selectAll('.dot')
      .data(data)
    .enter().append('circle')
      .attr('class', 'dot')
      .attr('r', 5)
      .attr('cx', d => xScale(d.year))
      .attr('cy', d => yScale(d.goals))
      .on('mouseover', function(d) {
        d3.select(this)
          .transition(300)
          .attr('r', 7);

        tip.show(d);
      })
      .on('mouseout', function(d) {
        d3.select(this)
          .transition(300)
          .attr('r', 5);

        tip.hide(d);
      });

  // x axis
  inner.append('g')
    .attr('class', 'axis axis-x')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(xAxis);

  // y axis
  inner.append('g')
    .attr('class', 'axis axis-y')
    .call(yAxis);
}

export const redrawChartGoals = () => {
  const {
    width,
    height,
    innerWidth,
    innerHeight,
  } = helpers.setChartDimensions(d3.select('#chart-goals'));

  xScale.range([0, innerWidth]);
  yScale.range([innerHeight, 0]);

  d3.select('#chart-goals svg')
    .attr('width', width)
    .attr('height', height);

  line
    .x(d => xScale(d.year))
    .y(d => yScale(d.goals));

  d3.select('.line')
    .attr('d', line(data));

  chart.selectAll('.dot')
    .attr('cx', d => xScale(d.year))
    .attr('cy', d => yScale(d.goals));

  chart.select('.axis-x')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(xAxis);
  chart.select('.axis-y').call(yAxis);
}

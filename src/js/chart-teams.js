import * as d3 from 'd3';
import d3Tip from "d3-tip";
import data from '../data.json';

d3.tip = d3Tip;

const getWindowWidth = () => window.innerWidth;

const setHeight = bp => getWindowWidth() < bp ? 320 : 400;

const setWidth = (bpMin, bpMax) => {
  if (getWindowWidth() < bpMin) return 768;
  if (getWindowWidth() > bpMin - 1 && getWindowWidth() < bpMax) return parseInt(d3.select('#chart-teams').style('width'), 10);
  if (getWindowWidth() > bpMax - 1) return 1200;
};

export default () => {
  let width = setWidth(768, 1300);
  let height = setHeight(1024);

  // need margins for axis
  const margin = {
    top: 20,
    right: 0,
    bottom: 30,
    left: 40,
  };

  let innerWidth = width - margin.left - margin.right;
  let innerHeight = height - margin.top - margin.bottom;

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
    .html(d => `${d.teams} teams`);

  chart.call(tip);

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

  let resizeTimeout;

  const resizeChart = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      width = setWidth(768, 1300);
      height = setHeight(1024);
      innerWidth = width - margin.left - margin.right;
      innerHeight = height - margin.top - margin.bottom;

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

      chart.selectAll('.bar text')
        .attr('x', xScale.bandwidth() / 2)
        .attr('y', d => yScale(d.teams) + 3);

      chart.select('.axis-x')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(xAxis);
      chart.select('.axis-y').call(yAxis);
    }, 100);
  };

  d3.select(window).on('resize', resizeChart);
}

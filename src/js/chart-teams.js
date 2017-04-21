import * as d3 from 'd3';
import data from '../data.json';

export default (width, height) => {
  // need margins for axis
  const margin = {
    top: 20,
    right: 0,
    bottom: 30,
    left: 40,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // for ordinal (not quantitative) data use scaleBand()
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.year))
    .range([0, innerWidth])
    .padding(0.2);

  // for quantitative data use scaleLinear()
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.teams)])
    .range([innerHeight, 0]);

  const chart = d3.select('#chart-teams')
    .append('svg')
      .attr('class', 'charts__svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${width} ${height}`);

  const inner = chart.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const xAxisTicks = data.map(d => d.year).filter((year, i) => i % 2 === 0);

  // x axis
  inner.append('g')
    .attr('class', 'axis axis-x')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale).tickValues(xAxisTicks));

  // y axis
  inner.append('g')
    .attr('class', 'axis axis-y')
    .call(d3.axisLeft(yScale));

  const bar = inner.selectAll('.bar')
    .data(data)
    .enter().append('g')
      .attr('class', 'bar')
      .attr('transform', d => `translate(${xScale(d.year)}, 0)`);

  bar.append('rect')
    .attr('y', d => yScale(d.teams))
    .attr('width', xScale.bandwidth())
    .attr('height', d => innerHeight - yScale(d.teams));

  bar.append('text')
    .attr('x', xScale.bandwidth() / 2)
    .attr('y', d => yScale(d.teams) + 3)
    .attr('dy', '-10px')
    .text(d => d.teams);
};

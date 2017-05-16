import * as d3 from 'd3';
import * as topojson from "topojson-client";
import world from '../world-topo-min.json';
import data from '../data.json';
import helpers from './helpers';

export default (width, height) => {
  const map = d3.select('#map')
    .append('svg')
      .attr('class', 'charts__svg')
      .attr('width', width)
      .attr('height', height);

  const projection = d3.geoMercator()
    .scale(200)
    .translate([width / 2, height - 200]);

  const path = d3.geoPath()
    .projection(projection);

  // tooltip
  const tip = d3.select('body')
    .append('div')
      .attr('class', 'd3-tip')
      .style('opacity', 0);

  const g = map.append('g');
  g.selectAll('path')
    .data(topojson.feature(world, world.objects.countries).features)
    .enter().append('path')
      .attr('d', path)
      .attr('fill', d => (
        helpers.didCountryHaveWorldCup(data, d.properties.name)
          ? '#bf360c'
          : '#254e77'
      ))
      .on('mouseover', d => {
        if (helpers.didCountryHaveWorldCup(data, d.properties.name)) {
          tip.transition()
            .duration(200)
            .style('opacity', 1);
          tip
            .html(
              `<strong>
                ${d.properties.name}:
              </strong>
              <ul>
                ${helpers.getWorldCupYears(data, d.properties.name).map(year =>
                  (`<li>${year}</li>`)
                ).join('')}
              </ul>`
            )
            .style('left', `${d3.event.pageX}px`)
            .style('top', `${d3.event.pageY}px`);
        }
      })
      .on('mouseout', () => {
        tip
          .style('opacity', 0);
      });

  map.call(d3.zoom().on('zoom', () => g.attr('transform', d3.event.transform)));
}

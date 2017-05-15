import * as d3 from 'd3';
import * as topojson from "topojson-client";
import data from '../world-topo-min.json';

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

  const g = map.append('g');
  g.selectAll('path')
    .data(topojson.feature(data, data.objects.countries).features)
    .enter().append('path')
      .attr('d', path);

  map.call(d3.zoom().on('zoom', () => g.attr('transform', d3.event.transform)));
}

const dataEducationUrl =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';
const dataCountyUrl =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';

const w = 800;
const h = 500;
const padding = 60;

d3.select('body')
  .append('h1')
  .attr('id', 'title')
  .text('United States Educational Attainment');

d3.select('body')
  .append('h3')
  .attr('id', 'description')
  .text(
    "Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)"
  );

const svg = d3
  .select('body')
  .append('div')
  .attr('class', 'container')
  .append('svg')
  .attr('viewBox', `0 0 ${w} ${h}`)
  .attr('preserveAspectRatio', 'xMidYMid meet');

const tooltip = d3
  .select('body')
  .append('div')
  .attr('id', 'tooltip')
  .style('opacity', 0)
  .style('position', 'absolute')
  .style('pointer-events', 'none')
  .style('z-index', 10);

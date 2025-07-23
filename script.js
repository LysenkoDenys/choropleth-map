const dataEducationUrl =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';
const dataCountyUrl =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';

const w = 1000;
const h = 600;
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

const getData = async () => {
  try {
    const [educationData, countyData] = await Promise.all([
      d3.json(dataEducationUrl),
      d3.json(dataCountyUrl),
    ]);

    // Create a map of fips -> education object:
    const educationMap = new Map(educationData.map((d) => [d.fips, d]));

    // Convert TopoJSON to GeoJSON:
    const counties = topojson.feature(
      countyData,
      countyData.objects.counties
    ).features;

    // Create a color scale:
    const color = d3
      .scaleThreshold()
      .domain([0, 10, 20, 30, 40, 50])
      .range([
        '#fef0d9',
        '#fddbc7',
        '#f4a582',
        '#d6604d',
        '#b2182b',
        '#67001f',
      ]);

    // Draw counties
    svg
      .selectAll('path')
      .data(counties)
      .join('path')
      .attr('class', 'county')
      .attr('d', d3.geoPath())
      .attr('fill', (d) => {
        const county = educationMap.get(d.id);
        return county ? color(county.bachelorsOrHigher) : '#ccc';
      })
      .attr('data-fips', (d) => d.id)
      .attr('data-education', (d) => {
        const county = educationMap.get(d.id);
        return county ? county.bachelorsOrHigher : 0;
      });
    drawLegend(svg, w, color);
  } catch (error) {
    console.error('Failed to load data:', error);
  }
};
getData();

const drawLegend = (svg, w, color) => {
  const legendWidth = 200;
  const legendHeight = 10;
  const boxWidth = legendWidth / color.range().length;
  const legendX = (w - legendWidth) / 2;
  const legendY = 15;

  const legend = svg
    .append('g')
    .attr('id', 'legend')
    .attr('transform', `translate(${legendX}, ${legendY})`);

  const x = d3
    .scaleLinear()
    .domain([color.domain()[0], color.domain()[color.domain().length - 1]])
    .range([0, legendWidth]);

  legend
    .selectAll('rect')
    .data(color.range())
    .enter()
    .append('rect')
    .attr('x', (d) => {
      const [x0, _] = color.invertExtent(d);
      return x(x0);
    })
    .attr('width', (d) => {
      const [x0, x1] = color.invertExtent(d);
      return x(x1) - x(x0);
    })
    .attr('height', legendHeight)
    .attr('fill', (d) => d)
    .attr('stroke', '#ccc');

  const xScaleLegend = d3
    .scaleLinear()
    .domain([color.domain()[0], color.domain()[color.domain().length - 1]])
    .range([0, legendWidth]);

  const legendThresholds = [0, ...color.domain()];

  const xAxisLegend = d3
    .axisBottom(xScaleLegend)
    .tickValues(legendThresholds)
    .tickFormat((d) => `${d}%`);

  legend
    .append('g')
    .attr('id', 'x-axis-legend')
    .attr('transform', `translate(0, ${legendHeight})`)
    .call(xAxisLegend);
};

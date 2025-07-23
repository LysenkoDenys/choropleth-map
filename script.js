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
      .domain([10, 20, 30, 40])
      .range(d3.schemeReds[5]);

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
  } catch (error) {
    console.error('Failed to load data:', error);
  }
};
getData();

// [
//   {
//     "fips": 1001,
//     "state": "AL",
//     "area_name": "Autauga County",
//     "bachelorsOrHigher": 21.9
//   },
//   {
//     "fips": 1003,
//     "state": "AL",
//     "area_name": "Baldwin County",
//     "bachelorsOrHigher": 28.6
//   },

// {
// "type": "Topology",
// "objects": {
//   "counties": {
//     "type": "GeometryCollection",
//     "geometries": [
//       {
//         "type": "Polygon",
//         "id": 5089,
//         "arcs": [
//           [
//             0,
//             1,
//             2,
//             3,
//             4
//           ]
//         ]
//       },
//       {
//         "type": "Polygon",
//         "id": 6079,
//         "arcs": [
//           [
//             5,
//             6,
//             7,
//             8,
//             9
//           ]
//         ]
//       },
//       {
//         "type": "Polygon",
//         "id": 17111,
//         "arcs": [
//           [
//             10,
//             11,
//             12,
//             13,
//             14,
//             15,
//             16
//           ]
//         ]
//       },

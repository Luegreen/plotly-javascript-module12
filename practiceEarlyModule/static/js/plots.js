var sortedCities = cityGrowths.sort((a,b) => a.Increase_from_2016 - b.Increase_from_2016).reverse();
var topFiveCities = sortedCities.slice(0,5);

console.log(cityGrowths);
console.log(sortedCities);
console.log(topFiveCities);

var topFiveCityNames = topFiveCities.map(city => city.City);
var topFiveCityGrowths = topFiveCities.map(city => parseInt(city.Increase_from_2016));

console.log(topFiveCityNames);
console.log(topFiveCityGrowths);


var trace = {
    x: topFiveCityNames,
    y: topFiveCityGrowths,
    type: "bar"
};
data = [trace];
var layout = {
    title: "Most Rapidly Growing Cities",
    xaxis: { title: "City" },
    yaxis: { title: "Population Growth, 2016-2017"}
  };

Plotly.newPlot("bar-plot", data, layout);

var sortedPopCities = cityGrowths.sort((a,b) => a.population - b.population).reverse();
var topSevenCities = sortedPopCities.slice(0,7);
var topSevenCityNames = topSevenCities.map(city => city.City);
var topSevenCityGrowths = topSevenCities.map(city => parseInt(city.population));

var trace = {
    x: topSevenCityNames,
    y: topSevenCityGrowths,
    type: "bar"
};
data = [trace];
var layout = {
    title: "Largest Cities",
    xaxis: { title: "City" },
    yaxis: { title: "City Size"}
};

Plotly.newPlot("bar-plot-pop", data, layout);
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    //console.log("sampleNames", sampleNames)

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sampleid) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampleArray = samples.filter(sampleObj => sampleObj.id == sampleid);
    //  5. Create a variable that holds the first sample in the array.
    var sample = sampleArray[0];
    console.log("samples", samples);
   //console.log("sampleArray", sampleArray);
  
 
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    //exampleFromSpaceXJS: var MapSites = d3.json(url).then(funconction(data){
                  //latLong = data.map(place => console.log(place.location.latitude))});
    //d3.json("samples.json").then((data) => {
     // console.log(data);
    //  ids = data.map(data => console.log(data.samples.id))};
    var otu_ids = sample.otu_ids;
    var otu_labels = sample.otu_labels; 
    var sample_values = sample.sample_values;
    console.log("otu_ids", otu_ids);
    //console.log("otu_labels", otu_labels);
    //console.log("sample_values", sample_values);
   
    
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    //exampleFromPlotsPracticeEarlyModule: var sortedCities = cityGrowths.sort((a,b) => a.Increase_from_2016 - b.Increase_from_2016).reverse();
    //example: var topFiveCities = sortedCities.slice(0,5);  

    var sorted_otu_ids = otu_ids.sort((a,b) => a.sample_values - b.sample_values).reverse();
    var top_ten_otus = sorted_otu_ids.slice(0,10);
    var top_ten_otus = String(top_ten_otus);
    console.log("sorted_otu_ids", sorted_otu_ids);
    console.log("top_ten_otus", top_ten_otus);

  
    // 8. Create the trace for the bar chart. 
    var trace1 = {
      x : sample_values,
      y : top_ten_otus, 
      hovertext: (otu_ids + otu_labels),
      type : "bar",
      orientation:'h'
    };
  
    var plotData = [trace1];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
        title: "Top 10 Bacteria Found",
        barmode: 'stack',
        ylabel: "otu_labels", 
        //xaxis: { title: "Drinks"},
        //yaxis: { title: "OTU Id"}

    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", plotData, barLayout);
  })
  };
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  //Roger: When I look at the structure of the samples.json file, It begins with names. Then I call it 'data' without assigning it. Can I do this for every data set?
  //Roger: d3.json is using d3 as a way to load the data, only. So first load data, then...for 'data' in samples do 'this'. Correct?
  //Roger: like in build metadata, I look for 'sample' as the variable and then say for data -> do this. 
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
//Roger: where is newSample declared or maybe this is one of the cases the the logic is: for newSample, do this. But still, how does it know what newSample is?
//Roger: when do we use forEach vs just a ->


//Roger: why do we need init twice?
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
    //Roger: below, same question: calling sampleObj: naming arbitrary?
    //Roger: naming variables within a function, not universal, can only be used in an function, correct?
    var sampleArray = samples.filter(sampleObj => sampleObj.id == sampleid);
    //  5. Create a variable that holds the first sample in the array.
    var sample = sampleArray[0];
  //console.log("samples", samples);
   //console.log("sampleArray", sampleArray);
  
 
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.

    var otu_ids = sample.otu_ids;
    var otu_labels = sample.otu_labels; 
    var sample_values = sample.sample_values;
    //console.log("otu_ids", otu_ids);
    //console.log("otu_labels", otu_labels);
    //console.log("sample_values", sample_values);
   
    
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    //exampleFromPlotsPracticeEarlyModule: var sortedCities = cityGrowths.sort((a,b) => a.Increase_from_2016 - b.Increase_from_2016).reverse();
    //example: var topFiveCities = sortedCities.slice(0,5);  
    console.log("out_ids", otu_ids)
    console.log("out_ids type", typeof otu_ids)
    console.log("otu_id zero #$%^", otu_ids[0])

    //var sorted_testList_v2_rev = testList.sort((a,b) => a - b).reverse();
    var sorted_sample_values = sample_values.sort((a,b) => a-b).reverse();
    var sample_values_top_ten = sorted_sample_values.slice(0,10).reverse();
    var otu_ids_top_ten = otu_ids.slice(0,10).reverse();
    var top_ten_otus = String(otu_ids_top_ten);
    //console.log(typeof 42);
    //var top_ten_otus = ["1167", "384", "9829"]
    console.log("sorted_sample_values", sorted_sample_values);
    console.log("sorted_value_top_ten", sample_values_top_ten);
    console.log("type top_ten_otus", typeof top_ten_otus);
  
    // 8. Create the trace for the bar chart. 
    var trace1 = [{
      x : sample_values_top_ten,
      y : top_ten_otus, 
      hovertext: (otu_labels),
      type : "bar",
      orientation:'h',
    }];
  

    // 9. Create the layout for the bar chart. 
    //Roger, x axis labels should be otu_ids but are not showing. 
    var barLayout = {
        title:{ 
          text: "Top 10 Bacteria Found"
        },
        yaxis: {
          title:{
            text: "Top Ten OTUs",
            font: {
              family: 'Courier New, monospace',
              size: 18,
              color: '#7f7f7f'
            }
          },
          
          //y top ten otu as labels are not showing up
          yticks:{
            label: top_ten_otus
          }
        }
        

    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", trace1, barLayout);
  

  // bubble chart   
  
  // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    //var samples = data.samples;
    //var sampleArray = samples.filter(sampleObj => sampleObj.id == sampleid);
    // Create a variable that holds the first sample in the array.
    //var sample = sampleArray[0];
    // 2. Create a variable that holds the first sample in the metadata array.
    var metadata = data.metadata;
    var wfreqArray = metadata.filter(sampleObj => sampleObj.id == sampleid);
    var wfreqResult = wfreqArray[0];
    console.log("wfreqResult", wfreqResult);
    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    
    // 3. Create a variable that holds the washing frequency.
    var wfreq = wfreqResult.wfreq;
    console.log("wfreq", wfreq);

    // Create the yticks for the bar chart.
    var trace2 = [{
      x : otu_ids,
      y : sample_values, 
      text: (otu_labels),
      mode: 'markers',
      marker:{
        color: ["blue", "green", "limegreen", "green", "brown", "tan"],
        size: sample_values
      }
      //type : "bubble",
    }];

    var bubbleLayout = {
      title:{ 
        text: "Bubbles!"
      },
      xaxis: otu_ids,
      yaxis: sample_values,
      showlegend: false,
      height: 600,
      width: 600  
    }

    //guage chart

    //create variable that converts the washing frequency to a floating point number.
    var wfreq_flt = 10 - wfreq;



    var trace3 = [{
      domain: {x: [0, 1], y:[0, 1]},
      value: wfreq,
      title: { text: "Washing Frequency Gauge"},
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 10] },
        bar: {color: "black"},
    
        steps: [
          {range: [0, 2], color: "red" },
          {range: [2, 4], color: "orange" },
          {range: [4, 6], color: "yellow" },
          {range: [6, 8], color: "limegreen" },
          {range: [8, 10], color: "green" },
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: 490
        }
      }
    
  

    }];

    var gaugeLayout = {
      height: 600,
      width: 600 
  
    };

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot("bar", trace1, barLayout);
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot("bubble", trace2, bubbleLayout );

    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot("gauge", trace3, gaugeLayout );
   
  }) 
  
};


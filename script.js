const apiUrl = "https://labradorserver.herokuapp.com";

// setTimeout("location.reload(true);", 10000);

function makeChart(canvasID, xValues, yValues, yValues2, min, max){
  new Chart(canvasID, {
    type: "line",
    data: {
      labels: xValues,
      datasets: [
        {
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: yValues,
        },{
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,255,0,1.0)",
          borderColor: "rgba(0,255,0,0.5)",
          data: yValues2,
        },
      ],
    },
    options: {
      legend: { display: false },
      scales: {
        yAxes: [{ ticks: { min: min, max: max } }],
      },
    },
  });
}

async function update() {

  const foreCastResonse = await fetch(apiUrl + "/forecasts/11");
  var foreData = await foreCastResonse.json();

  //get data from backend
  const telemetrResponse = await fetch(apiUrl + "/latestTelemetry");
  const tempResponse = await fetch(apiUrl + "/chartData/temperature/11");
  const pHResponse = await fetch(apiUrl + "/chartData/pH/11");
  const humiResponse = await fetch(apiUrl + "/chartData/humidity/11");

  //convert data
  var telemetryData = await telemetrResponse.json();
  var tempData = await tempResponse.json();
  var pHData = await pHResponse.json();
  var humiData = await humiResponse.json();

  //update telemetry table
  document.getElementById("UVAValue").innerHTML = telemetryData[0].UVA;
  document.getElementById("UVBValue").innerHTML = telemetryData[0].UVB;
  document.getElementById("CO2Value").innerHTML = telemetryData[0].CO2;
  document.getElementById("TVOCValue").innerHTML = telemetryData[0].TVOC;
  document.getElementById("airTempValue").innerHTML = telemetryData[0].temperature;
  document.getElementById("airHumValue").innerHTML = telemetryData[0].humidity;
  document.getElementById("phValue").innerHTML = telemetryData[0].pH;
  document.getElementById("soilTempValue").innerHTML = telemetryData[0].soilTemperature;
  document.getElementById("soilHumValue").innerHTML = telemetryData[0].soilHumidity;

  var xValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  var yValues = [];
  var yValuesPred = [,,,,,,,foreData[0].pHForecast,foreData[1].pHForecast,foreData[2].pHForecast, foreData[3].pHForecast];
  
  //pH graph
  for(let i = 0; i < 8; i++)
    yValues[i] = pHData[i].pH;
  makeChart(pH,xValues, yValues, yValuesPred, 0, 14);

  var yValuesPred = [,,,,,,,foreData[0].airHumForecast,foreData[1].airHumForecast,foreData[2].airHumForecast, foreData[3].airHumForecast];
  //humidity graph
  for(let i = 0; i < 8; i++)
    yValues[i] = humiData[i].humidity;
  makeChart(humidity,xValues, yValues, yValuesPred, 0, 100);


  // //temperature graph
  // for(let i = 0; i < 11; i++)
  //   yValues[i] = tempData[i].temperature;
  // makeChart(temperature,xValues, yValues, 0, 60);

}

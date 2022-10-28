const apiUrl = "https://labradorserver.herokuapp.com";

setTimeout("location.reload(true);", 10000);

async function update() {
  const response = await fetch(apiUrl + "/latestTelemetry");

  var data = await response.json();
  console.log(data);

  document.getElementById("UVAValue").innerHTML = data[0].UVA;
  document.getElementById("UVBValue").innerHTML = data[0].UVB;
  document.getElementById("UVIValue").innerHTML = data[0].UVI;
  document.getElementById("CO2Value").innerHTML = data[0].CO2;
  document.getElementById("TVOCValue").innerHTML = data[0].TVOC;
  document.getElementById("airTempValue").innerHTML = data[0].temperature;
  document.getElementById("airHumValue").innerHTML = data[0].humidity;
  document.getElementById("pressureValue").innerHTML = data[0].pressure;
  document.getElementById("phValue").innerHTML = data[0].pH;
  document.getElementById("soilTempValue").innerHTML = data[0].soilTemperature;
  document.getElementById("soilHumValue").innerHTML = data[0].soilHumidity;
}

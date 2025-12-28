const Btn = document.querySelector("#btn");
const textInput = document.querySelector("#placename");
const load = document.querySelector("#loader");
const weather = document.querySelector("#weatherapi");

function Valid() {
  if (textInput.value == "") {
    alert("please enter City Name");
    return;
  } else {
    fetchURL();
  }
}

const fetchURL = async function () {
  try {
    // loader show untill fetch the URL
    load.style.display = "block";

    const apiKey = "af203f27ae734387ac825218251412";
    let areaName = textInput.value;
    const URL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${areaName}&aqi=yes`;
    let res = await fetch(URL);
    let data = await res.json();

    // Add Icon and convert block element ...
    document.querySelector("#icon").src =
      "https:" + data.current.condition.icon;
    document.querySelector("#icon").style.display = "block";

    // Add city and Country name ...
    document.querySelector("#name").innerText =
      data.location.name + " , " + data.location.country;

    // Add Temparature ...
    document.querySelector("#temp").innerText =
      "Temparature: " + data.current.temp_c + " °C";

    // Add region ...
    document.querySelector("#region").innerText =
      "Region: " + data.location.region;

    // Add Humidity(dew) ...
    document.querySelector("#humidity").innerText =
      "Humidity: " + data.current.humidity + "%";

    // Add Condition ...
    document.querySelector("#cdn").innerText =
      "Condition: " + data.current.condition.text;

    // Add Wind in kph ...
    document.querySelector("#wind").innerText =
      "Wind: " + data.current.wind_kph + " Km/h";
  } catch (e) {
    alert("City not Found X");
    document.querySelector("#icon").style.display = "none";
  } finally {
    load.style.display = "none";
  }
};
weather.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop page reload
  Valid();
});

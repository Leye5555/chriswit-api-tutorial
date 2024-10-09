// Get, Post, Put, Patch, Delete ==> HTTP Request Methods

const payloadTag = document.querySelector(".payload");

// fetch is a promise;

const sleep = () =>
  new Promise((resolve, reject) => {
    console.log("started sleeping");
    setTimeout(() => resolve("I am awake"), 3000); // 3000 ms || 3 s
  });

async function makeApiCall() {
  const data = await sleep(); // api call

  //   console.log("test");
  //   console.log(data);
}

makeApiCall();

async function getWeatherData(city) {
  const apiKey = "";
  const res = await fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&limit=1&appid=" +
      apiKey
  );
  if (!res.ok) return;
  const data = await res.json(); // simple usable json;

  console.log({ res });
  const { lon, lat } = data[0]; // object destructuring

  console.log(lon, lat);
  const res2 = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      apiKey
  );

  const data2 = await res2.json();

  // temp, humidity, wind speed, description

  console.log({ data2 });
  document.getElementById("temp").textContent = data2.main.temp;
  document.getElementById("pressure").textContent = data2.main.pressure;
  document.getElementById("wind").textContent = data2.wind.speed;
  document.getElementById("desc").textContent = data2.weather[0].description;
  document.getElementById("state").textContent = data[0].state;
}

const handleSubmit = (e) => {
  const city = document.getElementById("search").value;

  getWeatherData(city);
};

document.getElementById("submit").onclick = handleSubmit;

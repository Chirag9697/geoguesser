let audio = new Audio("./clicksound.wav");
let mapOptions2 = {
  center: [51.958, 9.141],
  zoom: 10,
};

const actualcenter = [18.5204, 73.8567];
let latitude = null;
let longitude = null;
const guessingbutton = document.querySelector(".guessingbutton");

let map2 = new L.map("map", mapOptions2);

let layer = new L.TileLayer(
  "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
);
map2.addLayer(layer);

let marker = null;
L.marker([actualcenter[0], actualcenter[1]])
  .addTo(map2)
  .bindPopup("I am a actual place");
map2.on("click", (event) => {
  audio.play();
  guessingbutton.style.display = "block";
  if (marker !== null) {
    map2.removeLayer(marker);
  }

  marker = L.marker([event.latlng.lat, event.latlng.lng]).addTo(map2);
  latitude = event.latlng.lat;
  longitude = event.latlng.lng;
});
require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/Basemap",
  "esri/layers/TileLayer",
  "esri/geometry/Extent",
], function (esriConfig, Map, MapView, Basemap, TileLayer, Extent) {
  esriConfig.apiKey =
    "AAPK5f78ebaec9374c53b7b1c895e1717d88ieojdyoyhcAg-PhVj4wLXUcxMdYDge209t7yxeIAoGDziw7uHeR72rMvXfQsNhSH";

  const imageTileLayer = new TileLayer({
    portalItem: {
      id: "10df2279f9684e4a9f6a7f08febac2a9", // https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9
    },
  });

  const basemap = new Basemap({
    baseLayers: [imageTileLayer],
  });

  const map = new Map({
    basemap: basemap,
    showAttribution: false,
  });

  const maxExtent = new Extent({
    xmin: 73.85,
    ymin: 18.52,
    xmax: 73.86,
    ymax: 18.521,
    spatialReference: {
      wkid: 4326, // Assuming the spatial reference is WGS 1984 (Lat/Long)
    },
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 14,
    center: [actualcenter[1], actualcenter[0]],
    constraints: {
      minZoom: 12,
      geometry: maxExtent,
    },
    navigation: {
      enableMouseWheelZoom: true,
      enableDoubleClickZoom: true,
      enablePinchZoom: true,
      enablePan: true,
    },
  });

  view.on("click", function (event) {
    event.stopPropagation();
  });
});

const time = document.getElementById("timeremaining");
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const body=document.getElementById("bodycontainer");
var span = document.getElementsByClassName("close")[0];
const nextround = document.querySelector(".nextround");
const noofrounds = document.querySelector(".noofroundstext");

let round = 1;
console.log(nextround);
function distance(lat1, lon1, lat2, lon2) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
  }
  return dist;
}

function settimer() {
  let timevaluemin = 0;
  let timevaluesecond = 5;
  const myinterval = setInterval(() => {
    if (timevaluemin == 0) {
      time.style.color = "red";
    }
    timevaluesecond--;
    time.innerText = `${timevaluemin}` + ":" + `${timevaluesecond}`;
    if (timevaluemin == 0 && timevaluesecond ==0) {
      time.innerText = `${timevaluemin}` + ":" + `${timevaluesecond}`;
      clearInterval(myinterval);
      modal.style.display = "block";
    }
    if (timevaluesecond == -1) {
      timevaluemin--;
      timevaluesecond = 60;
    }
  }, 1000);
}
settimer();

nextround.addEventListener("click", () => {
  latitude = null;
  longitude = null;
  // map2.removeLayer(marker);
  round++;
  if (round<1) {
    modal.style.display = "none";
    noofrounds.innerText = `${round}/6`;
    settimer();
  } else {
    console.log("gameover");
    body.innerHTML=`<div class="bordercontainer">
    <img class="border" src="./images//borders.png" alt="">
    <div class="congotextcontainer">
        <p class="congotext">CONGRATULATIONS !!</p>
    </div>
    <div class="upperrectange" id="upperrectsvg">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="100" viewBox="0 0 165 124" fill="none">
            <path d="M0 122.701L121.897 0.372797L164.967 0.99979L40.1388 123.285L0 122.701Z" fill="white"/>
        </svg>
        <svg class="rectsvg" xmlns="http://www.w3.org/2000/svg" width="25" height="100" viewBox="0 0 165 124" fill="none">
            <path d="M0 122.701L121.897 0.372797L164.967 0.99979L40.1388 123.285L0 122.701Z" fill="white"/>
        </svg>
        <svg class="rectsvg" xmlns="http://www.w3.org/2000/svg" width="25" height="100" viewBox="0 0 165 124" fill="none">
            <path d="M0 122.701L121.897 0.372797L164.967 0.99979L40.1388 123.285L0 122.701Z" fill="white"/>
        </svg>
        <svg class="rectsvg" xmlns="http://www.w3.org/2000/svg" width="25" height="100" viewBox="0 0 165 124" fill="none">
            <path d="M0 122.701L121.897 0.372797L164.967 0.99979L40.1388 123.285L0 122.701Z" fill="white"/>
        </svg>
        <svg class="rectsvg" xmlns="http://www.w3.org/2000/svg" width="25" height="100" viewBox="0 0 165 124" fill="none">
            <path d="M0 122.701L121.897 0.372797L164.967 0.99979L40.1388 123.285L0 122.701Z" fill="white"/>
        </svg>
    </div>
    <div class="lowerrectange">
        <svg class="rectbotsvg" xmlns="http://www.w3.org/2000/svg" width="25" height="124" viewBox="0 0 165 124" fill="none">
            <path d="M0 122.701L121.897 0.372797L164.967 0.99979L40.1388 123.285L0 122.701Z" fill="white"/>
        </svg>
        <svg class="rectbotsvg" xmlns="http://www.w3.org/2000/svg" width="25" height="124" viewBox="0 0 165 124" fill="none">
            <path d="M0 122.701L121.897 0.372797L164.967 0.99979L40.1388 123.285L0 122.701Z" fill="white"/>
        </svg>
        <svg class="rectbotsvg" xmlns="http://www.w3.org/2000/svg" width="25" height="124" viewBox="0 0 165 124" fill="none">
            <path d="M0 122.701L121.897 0.372797L164.967 0.99979L40.1388 123.285L0 122.701Z" fill="white"/>
        </svg>
        <svg class="rectbotsvg" xmlns="http://www.w3.org/2000/svg" width="25" height="124" viewBox="0 0 165 124" fill="none">
            <path d="M0 122.701L121.897 0.372797L164.967 0.99979L40.1388 123.285L0 122.701Z" fill="white"/>
        </svg>
        <svg  xmlns="http://www.w3.org/2000/svg" width="25" height="124" viewBox="0 0 165 124" fill="none">
            <path d="M0 122.701L121.897 0.372797L164.967 0.99979L40.1388 123.285L0 122.701Z" fill="white"/>
        </svg>
     
    </div>
    <div class="harrycontainer2">
        <img class="harryimage2" src="../images/harryimage.png" alt="" />
        <div class="svgcontainer2">
          <div class="topsvg2">
            <svg
              width="15"
              height="42"
              viewBox="0 0 29 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="Vector 6"
                d="M5 41.4663L5 5.00013L28.5604 5.00013"
                stroke="#4BC06A"
                stroke-width="10"
              />
            </svg>
            <svg
              width="15"
              height="42"
              viewBox="0 0 29 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="Vector 7"
                d="M0.439453 5L23.9998 5L23.9998 41.4662"
                stroke="#4BC06A"
                stroke-width="10"
              />
            </svg>
          </div>
          <div class="bottomsvg2">
            <svg
              width="15"
              height="42"
              viewBox="0 0 29 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="Vector 9"
                d="M28.5605 37L5.00019 37L5.00019 0.53382"
                stroke="#4BC06A"
                stroke-width="10"
              />
            </svg>

            <svg
              width="15"
              height="42"
              viewBox="0 0 29 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="Vector 8"
                d="M24 0.533691L24 36.9999L0.439643 36.9999"
                stroke="#4BC06A"
                stroke-width="10"
              />
            </svg>
          </div>
        </div>
        <p class="harryname2">A.I. HARRY</p>
        <div class="questcompletedcontainer">
            <p class="questtext">QUEST</p>
            <p class="completedtext">COMPLETED</p>
        </div>
    </div>
    <div class="roundcompletedcontainer">
        <div class="individualroundcontainer">
            <p class="roundnumbertext">ROUND 1-</p>
            <p class="roundscoretext">100</p>
        </div>
        <div class="individualroundcontainer">
            <p class="roundnumbertext">ROUND 2-</p>
            <p class="roundscoretext">100</p>
        </div>
        <div class="individualroundcontainer">
            <p class="roundnumbertext">ROUND 3-</p>
            <p class="roundscoretext">100</p>
        </div>
        <div class="individualroundcontainer">
            <p class="roundnumbertext">ROUND 4-</p>
            <p class="roundscoretext">100</p>
        </div>
        <div class="individualroundcontainer">
            <p class="roundnumbertext">ROUND 5-</p>
            <p class="roundscoretext">100</p>
        </div>
    </div>
    <div class="navigationcontainer">
        <div class="pilotdetails">
            <p class="maintitle">PILOT NAME</p>
            <p class="maincontent">LUZ WINTHEISER</p>
        </div>
        <div class="corporationdetails">
            <div class="maintitle">CORPORATION</div>
            <div class="maincontent">LEGACY.IO</div>
        </div>
        <div class="occupationdetails">
            <div class="maintitle">OCCUPATION</div>
            <div class="maincontent">ASTRONAUT</div>
        </div>
        <Button class="backtohomenavigationcontainer">
        <a href="index.html">
        <p class="backtohomenavigationtext">BACK TO HOME</p>
        </a>
        </Button>
    </div>
</div>`
  }
});

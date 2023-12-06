let audio=new Audio("./clicksound.wav")
let mapOptions2 = {
  center:[51.958, 9.141],
  zoom:10
}

const actualcenter=[73.313,18.112];
let latitude=null;
let longitude=null;
const guessingbutton=document.querySelector(".guessingbutton");

let map2 = new L.map('map' , mapOptions2);

let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map2.addLayer(layer);


let marker = null;
L.marker([actualcenter[0] , actualcenter[1]]).addTo(map2).bindPopup("I am a actual place");
map2.on('click', (event)=> {
  audio.play();
  guessingbutton.style.display="block";
  if(marker !== null){
      map2.removeLayer(marker);
  }

  marker = L.marker([event.latlng.lat , event.latlng.lng]).addTo(map2);
  latitude=event.latlng.lat;
  longitude=event.latlng.lng;
})
require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/Basemap",
    "esri/layers/TileLayer",
    "esri/geometry/Extent"
  ], function (esriConfig, Map, MapView, Basemap, TileLayer, Extent) {

    esriConfig.apiKey = "AAPK5f78ebaec9374c53b7b1c895e1717d88ieojdyoyhcAg-PhVj4wLXUcxMdYDge209t7yxeIAoGDziw7uHeR72rMvXfQsNhSH";

    const imageTileLayer = new TileLayer({
      portalItem: {
        id: "10df2279f9684e4a9f6a7f08febac2a9" // https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9
      }
    });

    const basemap = new Basemap({
      baseLayers: [
        imageTileLayer
      ]
    });

    const map = new Map({
      basemap: basemap,
       showAttribution: false ,

    });

    const maxExtent = new Extent({
      xmin: 73.85,
      ymin: 18.52,
      xmax: 73.86,
      ymax: 18.521,
      spatialReference: {
        wkid: 4326 // Assuming the spatial reference is WGS 1984 (Lat/Long)
      }
    });
    


    const view = new MapView({
      container: "viewDiv",
      map: map,
      zoom: 14,
      center: [actualcenter[0], actualcenter[1]],
      constraints: {
        minZoom: 12,
        geometry: maxExtent
        },
        navigation: {
            enableMouseWheelZoom: true,
            enableDoubleClickZoom: true,
            enablePinchZoom: true,
            enablePan: true
          }
    });
    
    view.on("click", function (event) {
      event.stopPropagation();
    });

   

  });

  const time=document.getElementById("timeremaining");
  // Get the modal
  var modal = document.getElementById("myModal");
  
  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");
  
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  const nextround=document.querySelector(".nextround");
  const noofrounds=document.querySelector(".noofroundstext");
  
  let round=1;
  console.log(nextround);
  function distance(lat1, lon1, lat2, lon2) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344 
    }
      return dist;
    
  }
  
  function settimer(){
    let timevaluemin=2;
    let timevaluesecond=30;
    const myinterval=setInterval(()=>{
      if(timevaluemin==0){
          time.style.color="red";
      }
      time.innerText=`${timevaluemin}`+":"+`${timevaluesecond}`;
      timevaluesecond--;
      if(timevaluemin==0 && timevaluesecond==-1){
          time.innerText=`${timevaluemin}`+":"+`${timevaluesecond}`;
          clearInterval(myinterval);
          alert(distance(actualcenter[0],actualcenter[1],latitude,longitude));
          if(round<6){
            modal.style.display = "block";
          }
            // alert("timeover")
        }
        if(timevaluesecond==-1){
          timevaluemin--;
          timevaluesecond=60;
        }
      },1000)
    }
    settimer();
    
  nextround.addEventListener("click",()=>{
    modal.style.display = "none";
    console.log("hello");
    latitude=null;
    longitude=null;
    map2.removeLayer(marker);
    round++;
    if(round<7){

      noofrounds.innerText=`${round}/6`;
      
      settimer();
    }
    else{
      alert("gameover");
    }
  })
  
 
  
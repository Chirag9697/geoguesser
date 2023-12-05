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
      center: [76.855, 18.5205],
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
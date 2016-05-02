// Here is the javascript setup for a basic map:

// Enter your mapbox map id here to reference it for the base layer,
// this one references the ugly green map that I made.
var mapId = 'ssimpkin.019hod38';

// And this is my access token, use yours.
var accessToken = 'pk.eyJ1Ijoic3NpbXBraW4iLCJhIjoiRF8yYUhmMCJ9.PzuhZjB-ss1tB-TKfX069w';

// Create the map object with your mapId and token,
// referencing the DOM element where you want the map to go.
L.mapbox.accessToken = accessToken;
var map = L.mapbox.map('map', mapId);

// Set the initial view of the map to the whole US
map.setView([39, -96], 4);

// Great, now we have a basic web map!


// Reference to the data we want to show
var dataFileToAdd = 'data/restaurants.geojson';

// Create a feature layer - construction function that creates it for us
var featureLayer = L.mapbox.featureLayer();
	featureLayer.loadURL(dataFileToAdd); // calls on file
	featureLayer.addTo(map); // adds file as a layer

featureLayer.on('ready', function(){ // need to run through each feature and note their style
	this.eachLayer(function(layer){
      layer.setIcon(L.mapbox.marker.icon({
      	"marker-color": "#8834bb",
        "marker-size": "large",
       	"marker-symbol": "restaurant"
       }))
      
    })
    map.fitBounds(featureLayer.getBounds());
})

featureLayer.on('ready', function(){
 this.eachLayer(function(layer){
  layer.bindPopup('Welcome to ' + layer.feature.properties.name) 
 })
})
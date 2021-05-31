var map;
currentMarkers = [];
countryMarkers = [];
var currentVisual = '';

const tfcColor = [[0, '#afacac'],
                    [1, '#006A0C'],
                    [2, '#009A11'],
                    [3, '#00BC15'],
                    [4, '#02DE1A'],
                    [5, '#08FF23']]
const renewableColor = [[0, '#afacac'],
                  [1, '#508F00'],
                  [2, '#64B200'],
                  [3, '#73CD00'],
                  [4, '#90F312'],
                  [5, '#B9FF61']]

const co2Color = [[0, '#afacac'],
                  [1, '#37304A'],
                  [2, '#5A5174'],
                  [3, '#776D94'],
                  [4, '#998FB6'],
                  [5, '#C2B8DF']]                  
mapboxgl.accessToken = 'pk.eyJ1IjoiY29kZXJsZWUxMjMiLCJhIjoiY2ttN3ZyNXRoMGoycDJubnVvZXVrOWplZSJ9.xq_e59PlJXCWyQjl3cqx7g';
map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/coderlee123/ckn9bhd2401pq17pplr5te1ri',
  center: [53.646240234375, 32.42023333541568], // starting position [lng, lat]
  center: [-100.486052, 37.830348],
  zoom: 2,
  maxZoom: 4,
  minZoom: 2
});
TFC();


function TFC() {
  currentVisual = 'TFC';
  document.getElementById("countryData").innerHTML = "";
  var layer = map.getLayer('countries');
  if (layer !== undefined) {
    map.removeLayer('country-fills');
    map.removeLayer('countries');
    map.removeSource('countries');
    map.addSource('countries', {
      'type': 'geojson',
      'data': tfc,
    });
    map.addLayer({
      'id': 'country-fills',
      'type': 'fill',
      'source': 'countries',
      'layout': {},
      'paint': {
        'fill-color': {
          property: 'ID', // this will be your density property form you geojson
          stops: tfcColor
        }
      }
    });
    map.addLayer({
      'id': 'countries',
      'type': 'line',
      'source': 'countries',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#412f2f',
        'line-width': 0.2
      }
    });
  }
  document.getElementById("descriptionModalLabel").innerHTML = "Total Energy Consumption"
  document.getElementById("descriptionModalBody").innerHTML = "<p style='font-size:17px'>The total energy consumption of a single country is obtained by aggregating the energy consumed by different sectors within that country from 1990 to 2018 and find its average from the aggregated value. The different sectors are: </p><ul><li>Transport</li><li>Industry</li><li>Residential</li><li>Commercial and Public Services</li><li>Agriculture/forestry</li><li>Non-energy use</li><li>Non-specified</li></ul><br><i style='font-size: 15px'><a href='https://www.iea.org/data-and-statistics?country=USA&fuel=Energy%20consumption&indicator=TFCShareBySector' target='_blank'>Data source</a></i>"
  openDescriptionModal();

  legend.innerHTML = ""
  var colors = ['#006382', '#0088B4', '#009DCE', '#00B6F0', '#37CFFF', '#afacac'];
  for (i = 0; i < colors.length; i++) {
    var color = colors[i];
    var item = document.createElement('div');
    var key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    var value = document.createElement('span');
    if (i == 0) {
      value.innerHTML = "Highest";
    }
    if (i == 4) {
      value.innerHTML = "Lowest";
    }
    if (i == 5) {
      value.innerHTML = "No Data";
    }
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
  }
  loadMap(mapData);
}

function CO2() {
  currentVisual = 'CO2'
  document.getElementById("countryData").innerHTML = "";
  map.removeLayer('country-fills');
  map.removeLayer('countries');
  map.removeSource('countries');
  map.addSource('countries', {
    'type': 'geojson',
    'data': data_CO2
  });
  map.addLayer({
    'id': 'country-fills',
    'type': 'fill',
    'source': 'countries',
    'layout': {},
    'paint': {
      'fill-color': {
        property: 'ID', // this will be your density property form you geojson
        stops: co2Color
      }
    }
  });
  map.addLayer({
    'id': 'countries',
    'type': 'line',
    'source': 'countries',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#412f2f',
      'line-width': 0.2
    }
  });

  document.getElementById("descriptionModalLabel").innerHTML = "Carbon Emission"
  document.getElementById("descriptionModalBody").innerHTML = "<p style='font-size:17px'>The CO2 emission of a single country is obtained by aggregating the CO2 emission per capita of a country from 1990 to 2018 and finding its average from the aggregated value<br><br><i style='font-size: 15px'><a href='https://www.iea.org/data-and-statistics?country=USA&fuel=CO2%20emissions&indicator=CO2PerCap' target='_blank'>Data source</a></i>"
  openDescriptionModal();
  // map = new mapboxgl.Map({
  //   container: 'map',
  //   style: 'mapbox://styles/coderlee123/ckn9bhd2401pq17pplr5te1ri',
  //   center: [53.646240234375, 32.42023333541568], // starting position [lng, lat]
  //   center: [-100.486052, 37.830348],
  //   zoom: 2,
  //   maxZoom: 4,
  //   minZoom: 2
  // });
  // map = new mapboxgl.Map({
  //   container: 'map', // container id
  //   style: 'mapbox://styles/coderlee123/ckmooxvkg0ayz17pqrmfjek7p', // style URL
  //   center: [53.646240234375, 32.42023333541568], // starting position [lng, lat]
  //   zoom: 2, // starting zoom
  //   maxZoom: 4,
  //   minZoom: 2
  // });
  legend.innerHTML = ""
  var colors = ['#c5cc00', '#dde500', '#f6ff00', '#f3fa4a', '#fcffad', '#afacac'];
  for (i = 0; i < colors.length; i++) {
    var color = colors[i];
    var item = document.createElement('div');
    var key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    var value = document.createElement('span');
    if (i == 0) {
      value.innerHTML = "Highest";
    }
    if (i == 4) {
      value.innerHTML = "Lowest";
    }
    if (i == 5) {
      value.innerHTML = "No Data";
    }

    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
  }
}

function Renewable() {
  currentVisual = 'Renewable'
  document.getElementById("countryData").innerHTML = "";
  map.removeLayer('country-fills');
  map.removeLayer('countries');
  map.removeSource('countries');
  map.addSource('countries', {
    'type': 'geojson',
    'data': data_countries
  });
  map.addLayer({
    'id': 'country-fills',
    'type': 'fill',
    'source': 'countries',
    'layout': {},
    'paint': {
      'fill-color': {
        property: 'ID', // this will be your density property form you geojson
        stops: renewableColor
      }
    }
  });
  map.addLayer({
    'id': 'countries',
    'type': 'line',
    'source': 'countries',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#412f2f',
      'line-width': 0.2
    }
  });
  document.getElementById("descriptionModalLabel").innerHTML = "Renewable Energy"
  document.getElementById("descriptionModalBody").innerHTML = "<p style='font-size:17px'>The renewable energy of a single country is obtained by aggregating the renewable share of a country in their final energy consumption from 1990 to 2018 and finding its average from the aggregated value<br><br><i style='font-size: 15px'><a href='https://www.iea.org/data-and-statistics?country=USA&fuel=Renewables%20and%20waste&indicator=SDG72' target='_blank'>Data source</a></i>"
  openDescriptionModal();
  // map = new mapboxgl.Map({
  //   container: 'map',
  //   style: 'mapbox://styles/coderlee123/ckn9bhd2401pq17pplr5te1ri',
  //   center: [53.646240234375, 32.42023333541568], // starting position [lng, lat]
  //   center: [-100.486052, 37.830348],
  //   zoom: 2,
  //   maxZoom: 4,
  //   minZoom: 2
  // });
  // map = new mapboxgl.Map({
  //   container: 'map', // container id
  //   style: 'mapbox://styles/coderlee123/ckmqfbd1g0z8t17qtp0dwz325', // style URL
  //   center: [53.646240234375, 32.42023333541568], // starting position [lng, lat]
  //   zoom: 2, // starting zoom
  //   maxZoom: 4,
  //   minZoom: 2
  // });
  legend.innerHTML = ""
  var colors = ['#006A0C', '#009A11', '#00BC15', '#02DE1A', '#08FF23', '#afacac'];
  for (i = 0; i < colors.length; i++) {
    var color = colors[i];
    var item = document.createElement('div');
    var key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    var value = document.createElement('span');
    if (i == 0) {
      value.innerHTML = "Highest";
    }
    if (i == 4) {
      value.innerHTML = "Lowest";
    }
    if (i == 5) {
      value.innerHTML = "No Data";
    }

    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
  }
}

function loadMap(sourceData) {
  map.on('load', function () {
    map.addSource('countries', {
      'type': 'geojson',
      'data': sourceData
    });
    //TFC
    map.addLayer({
      'id': 'country-fills',
      'type': 'fill',
      'source': 'countries',
      'layout': {},
      'paint': {
        'fill-color': {
          property: 'ID', // this will be your density property form you geojson
          stops: [
            [0, '#afacac'],
            [1, '#383636'],
            [2, '#5A5555'],
            [3, '#7A7373'],
            [4, '#9E9898'],
            [5, '#C5BEBE'],
          ]
        }
      }
    });
    map.addLayer({
      'id': 'countries',
      'type': 'line',
      'source': 'countries',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#412f2f',
        'line-width': 0.2
      }
    });
    map.on('click', 'country-fills', function (e) {
      var states = map.queryRenderedFeatures(e.point, {
        layers: ['country-fills']
      });
      console.log(e.lngLat);
      if (states.length > 0) {
        var polygon = new L.Polygon(states[0].geometry.coordinates)
        var bounds = polygon.getBounds();
        var center = bounds.getCenter();
        map.flyTo({
          center: [center.lat, center.lng],
          zoom: 4,
          essential: true
        });
        if (currentVisual.localeCompare('TFC') == 0) {
          document.getElementById("countryData").innerHTML = '<h4>' + states[0].properties.ADMIN + '</h4><b>Total Final Energy Consumption: </b>' + Math.round(states[0].properties.val * 1000) / 1000 + '<br>Transport: ' + Math.round(states[0].properties.transport * 1000) / 1000 + '<br>Industry: ' + Math.round(states[0].properties.industry * 1000) / 1000 + '<br>Residential: ' + Math.round(states[0].properties.residential * 1000) / 1000 + '<br>Commercial and Public Services: ' + Math.round(states[0].properties.commercial * 1000) / 1000 + '<br>Agriculture/forestry: ' + Math.round(states[0].properties.agriculture * 1000) / 1000 + '<br>Non-energy use: ' + Math.round(states[0].properties.nonEnergy * 1000) / 1000 + '<br>Non-specified: ' + Math.round(states[0].properties.nonSpecified * 1000) / 1000
        } else if (currentVisual.localeCompare('CO2') == 0) {
          document.getElementById("countryData").innerHTML = '<h4>' + states[0].properties.ADMIN + '</h4><b>Carbon Emission Per Capita: </b>' + Math.round(states[0].properties.val * 1000) / 1000;
        } else {
          document.getElementById("countryData").innerHTML = '<h4>' + states[0].properties.ADMIN + '</h4><b>Renewable share in final consumption: </b>' + Math.round(states[0].properties.val * 1000) / 1000;
        }
      }
      console.log(map.getZoom());
    });

    var lastZoom = map.getZoom();
    map.on('zoom', () => {
      const currentZoom = map.getZoom();
      if (currentZoom != 4) {
        deleteMarkers();
        addCountryMarkers()
      } else {
        addMarkers();
      }
      lastZoom = currentZoom;
    });
    addCountryMarkers();
  });
}

function deleteMarkers() {
  while (currentMarkers.length > 0) {
    currentMarkers[0].remove();
    currentMarkers.shift();
  }
}

function openDescriptionModal() {
  // document.getElementById("backdrop").style.display = "block"
  document.getElementById("descriptionModal").style.display = "block"
  document.getElementById("descriptionModal").className += "show"
}

function closeDescriptionModal() {
  // document.getElementById("backdrop").style.display = "none"
  document.getElementById("descriptionModal").style.display = "none"
  document.getElementById("descriptionModal").className += document.getElementById("descriptionModal").className.replace("show", "")
}

function addMarkers() {
  var berkeley = document.createElement('button');
  berkeley.setAttribute("class", "marker");
  berkeley.setAttribute("data-toggle", "modal");
  berkeley.setAttribute("data-target", "#gameModal");
  berkeley.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>ENERGY CHICKENS</h4><h5>Berkeley, California</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p><b>Who Played: </b>Emploees in an office setting</p><p>Energy Chickens is an online game for buildings where a reduction in enery positively affects a virtual farm of chickens where as, an increase in eneergy harms the health of the chickens. Keep your chickens healthy by reducing your energy!</p><p><b>Player Scale: </b>Building</p><p><b>Impact Scale: </b>People, Building</p>"
    document.getElementById("gameModalLink").style.visibility = "visible";
    document.getElementById("gameModalLink").href = "http://energychickens.weebly.com/";
  }
  var curr = new mapboxgl.Marker(berkeley)
    .setLngLat([-121.57563791616394, 36.97811012914602])
    .addTo(map);
  currentMarkers.push(curr);

  var pasadena = document.createElement('button');
  pasadena.setAttribute("class", "marker");
  pasadena.setAttribute("data-toggle", "modal");
  pasadena.setAttribute("data-target", "#gameModal");
  pasadena.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>OFFSET!</h4><h5>Pasadena, California</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>Online game where a single player must balance the amount of CO2 in the Earth's atmosphere by offsetting the CO2 emissions using CO2 'sinks'. Block the CO2 from entering the atmosphere!</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "visible";
    document.getElementById("gameModalLink").href = "https://climatekids.nasa.gov/menu/play/";
  }
  curr = new mapboxgl.Marker(pasadena)
    .setLngLat([-118.31795030810143, 34.76642549885892])
    .addTo(map);
  currentMarkers.push(curr);

  var walnut = document.createElement('button');
  walnut.setAttribute("data-toggle", "modal");
  walnut.setAttribute("data-target", "#gameModal");
  walnut.setAttribute("class", "marker");
  walnut.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>ENERGY SOURCES</h4><h5>Walnut, California</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>Online, single player game where the player must match the correct word to the picture of energy sources and earn points by matching vocabulary on their first attempt. <i>(Subscription Required)</i></p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>Player</p>"
    document.getElementById("gameModalLink").style.visibility = "visible";
    document.getElementById("gameModalLink").href = "https://www.neok12.com/diagram/Energy-Sources-01.htm";
  }
  curr = new mapboxgl.Marker(walnut)
    .setLngLat([-117.11425781249935, 33.9370888399862])
    .addTo(map);
  currentMarkers.push(curr);

  var bellevue = document.createElement('button');
  bellevue.setAttribute("data-toggle", "modal");
  bellevue.setAttribute("data-target", "#gameModal");
  bellevue.setAttribute("class", "marker");
  bellevue.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>LUDWIG</h4><h5>Bellevue, Washington</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>An online, single player game where players follow a robot named Ludwig and a storyline where humans have depleted all resources on earth. Follow Ludwig around and help him look for new forms of energy</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "visible";
    document.getElementById("gameModalLink").href = "https://store.steampowered.com/app/263120/Ludwig/";
  }
  curr = new mapboxgl.Marker(bellevue)
    .setLngLat([-122.47558593749939, 46.94510196652902])
    .addTo(map);
  currentMarkers.push(curr);

  var calgary = document.createElement('button');
  calgary.setAttribute("data-toggle", "modal");
  calgary.setAttribute("data-target", "#gameModal");
  calgary.setAttribute("class", "marker");
  calgary.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>SAVE THE WORLD</h4><h5>Calgary, Alberta</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>Online, single player game where it's up to he player to save the world from an energy supply crisis. This game will teach you all about different power sources, alternative energy, and how we generatte electricity to power our lives.</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "visible";
    document.getElementById("gameModalLink").href = "https://wonderville.org/asset/save-the-world";
  }
  curr = new mapboxgl.Marker(calgary)
    .setLngLat([-111.41714779961313, 53.991718362517815])
    .addTo(map);
  currentMarkers.push(curr);

  var fargo = document.createElement('button');
  fargo.setAttribute("data-toggle", "modal");
  fargo.setAttribute("data-target", "#gameModal");
  fargo.setAttribute("class", "marker");
  fargo.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>EFARGO GAME</h4><h5>Fargo, North Dakota</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>Online, single player game or multiplayer game that asks questions about your current energy saving strategies. Earn Points by completing real-world energy saving tasks in your own home and community. Do the tasks individually, with friends, or your family! Win by reaching the top tier and deeat Waste-a-Watt</p><p><b>Player Scale: </b>Individual, Small Groups</p><p><b>Impact Scale: </b>People, building, neighborhood, city</p>"
    document.getElementById("gameModalLink").style.visibility = "visible";
    document.getElementById("gameModalLink").href = "http://www.efargo.org/game/";
  }
  curr = new mapboxgl.Marker(fargo)
    .setLngLat([-97.39985654586394, 46.14472845077884])
    .addTo(map);
  currentMarkers.push(curr);

  var minneapolis = document.createElement('button');
  minneapolis.setAttribute("data-toggle", "modal");
  minneapolis.setAttribute("data-target", "#gameModal");
  minneapolis.setAttribute("class", "marker");
  minneapolis.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>ENERGY CRISIS</h4><h5>Minneapolis, Minnesota</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>A multiplayer board game where players roll and move in order to insulate their house, convert to solar energy and conserve tour energy units</p><p><b>Player Scale: </b>Small Groups</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(minneapolis)
    .setLngLat([-92.57080078125013, 44.95417396459766])
    .addTo(map);
  currentMarkers.push(curr);

  var madison = document.createElement('button');
  madison.setAttribute("data-toggle", "modal");
  madison.setAttribute("data-target", "#gameModal");
  madison.setAttribute("class", "marker");
  madison.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>I-CHOOSE GAME</h4><h5>Madison, Wisconsin</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p><b>Who Played: </b>Employees in an office setting</p><p>A multiplayer team game where employees earned points for themselves and their teams by taking sustainable actions in their personal lives. Participants received a deck of cards each month describing possible actions with designated point values; plauers reported their actions on a weekly basis, either by turning in cards or using an online system</p><p><b>Player Scale: </b>Individual, Small Groups, Building</p><p><b>Impact Scale: </b>People, building, neighborhood, city</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(madison)
    .setLngLat([-89.29002720640452, 43.40611714402061])
    .addTo(map);
  currentMarkers.push(curr);

  var florida = document.createElement('button');
  florida.setAttribute("data-toggle", "modal");
  florida.setAttribute("data-target", "#gameModal");
  florida.setAttribute("class", "marker");
  florida.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>ENERGIZE</h4><h5>Orlanda, Florida</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>Energize is an online game that challenges you to provide electricity to a growing community while keeping pollution minimized. You must use a conbination of energy sources to achieve the best balance between economic nees and environmental concerns for the city</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(florida)
    .setLngLat([-82.1534339433577, 28.93858968604546])
    .addTo(map);
  currentMarkers.push(curr);

  var atlanta = document.createElement('button');
  atlanta.setAttribute("data-toggle", "modal");
  atlanta.setAttribute("data-target", "#gameModal");
  atlanta.setAttribute("class", "marker");
  atlanta.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>WINDFALL</h4><h5>Atlanta, Georgia</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>An online single player game where you must design windmill farms and consider location, size and profit margins hile learning about social issues of NMBYism (Not in My Back Yard)</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "visible";
    document.getElementById("gameModalLink").href = "http://persuasivegames.com/games/game.aspx?game=windfall";
  }
  curr = new mapboxgl.Marker(atlanta)
    .setLngLat([-84.40133649908728, 33.74579091455608])
    .addTo(map);
  currentMarkers.push(curr);

  var columbia = document.createElement('button');
  columbia.setAttribute("data-toggle", "modal");
  columbia.setAttribute("data-target", "#gameModal");
  columbia.setAttribute("class", "marker");
  columbia.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>ENERGY QUEST: ELCON PRODUCTIONS</h4><h5>Columbia, South Carolina</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>Multiplayer board game where each player is the president of their own energy corporation, developing energy srouces to sell. Win the game by collecting the most KwH receipts by landing on your own power sites</p><p><b>Player Scale: </b>Small groups</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(columbia)
    .setLngLat([-81.0736904416978, 33.992899986725604])
    .addTo(map);
  currentMarkers.push(curr);

  var fortMill = document.createElement('button');
  fortMill.setAttribute("data-toggle", "modal");
  fortMill.setAttribute("data-target", "#gameModal");
  fortMill.setAttribute("class", "marker");
  fortMill.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>NICO THE NINJA</h4><h5>Fort Mills, South Carolina</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>An online, workbook where Nico the Ninha teaches you about energy saving strategies through a series of games and activities</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "visible";
    document.getElementById("gameModalLink").href = "https://www.saveonenergy.com/kids-learning-center/saving-energy/";
  }
  curr = new mapboxgl.Marker(fortMill)
    .setLngLat([-80.9452244219753, 35.007135809196015])
    .addTo(map);
  currentMarkers.push(curr);

  var lexington = document.createElement('button');
  lexington.setAttribute("data-toggle", "modal");
  lexington.setAttribute("data-target", "#gameModal");
  lexington.setAttribute("class", "marker");
  lexington.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>GAME OF ENERGY</h4><h5>Lexington, Kentucky</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>A single of multiplayer board game where the world is plumetting into turmoil and resources are depleting. Players take on the role of captains of industry and your goal is to combat the energy crisis by employing optimum uses of their resources and energy.</p><p><b>Player Scale: </b>Individual, Small group</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "visible";
    document.getElementById("gameModalLink").href = "https://www.kickstarter.com/projects/379986539/game-of-energy-board-game";
  }
  curr = new mapboxgl.Marker(lexington)
    .setLngLat([-84.5014705082113, 38.04409121218319])
    .addTo(map);
  currentMarkers.push(curr);

  var columbus = document.createElement('button');
  columbus.setAttribute("data-toggle", "modal");
  columbus.setAttribute("data-target", "#gameModal");
  columbus.setAttribute("class", "marker");
  columbus.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>FIND THE POWER BANDIT</h4><h5>Columbus, Ohio</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>An online, single player game where players must watch three cards closely as the Power Bandit gets shuffled around. Pick the card that has the Power Bandit behind it</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "visible";
    document.getElementById("gameModalLink").href = "http://www.aep.electricuniverse.com/find-the-power-bandit.html";
  }
  curr = new mapboxgl.Marker(columbus)
    .setLngLat([-83.00281574183151, 39.96175074966075])
    .addTo(map);
  currentMarkers.push(curr);

  var clintonCounty = document.createElement('button');
  clintonCounty.setAttribute("data-toggle", "modal");
  clintonCounty.setAttribute("data-target", "#gameModal");
  clintonCounty.setAttribute("class", "marker");
  clintonCounty.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>DROPOLY</h4><h5>Clinton County, Ohio</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>An interactive energy-saving tool disgused as a game, Dropoly aims to help its players reduce their energy usage, thereby saving money and reducing their carbon footprint at the same time. This gamified energy audit could make it much simpler for people to get the information they need to make effective energy savings changes in their homes.</p><p><b>Player Scale: </b>Individual, Small Group, Med Group, Large Group, neighborhood</p><p><b>Impact Scale: </b>People, neighborhood, city</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(clintonCounty)
    .setLngLat([-84.09389832665391, 39.27066585748955])
    .addTo(map);
  currentMarkers.push(curr);

  var washingtondc = document.createElement('button');
  washingtondc.setAttribute("data-toggle", "modal");
  washingtondc.setAttribute("data-target", "#gameModal");
  washingtondc.setAttribute("class", "marker");
  washingtondc.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>JOIN THE LORAX</h4><h5>Washingon DC</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>An online, individual game where players can play as Super Sleuths finding Energy Star appliances, complete a word search or color the stars of the Lorax!</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "visible";
    document.getElementById("gameModalLink").href = "https://www.energystar.gov/about/pub_catalog?f0=im_field_pub_catalog_audience:1781";
  }
  curr = new mapboxgl.Marker(washingtondc)
    .setLngLat([-77.03805102826425, 38.89034528436255])
    .addTo(map);
  currentMarkers.push(curr);

  var philadelphia = document.createElement('button');
  philadelphia.setAttribute("data-toggle", "modal");
  philadelphia.setAttribute("data-target", "#gameModal");
  philadelphia.setAttribute("class", "marker");
  philadelphia.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>ERG: THE ENERGY RESOURCE GAME</h4><h5>Philadelphia, Pennsylvania</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>A multiplayer, computer-based role playing simulator allows players to formulate small groups that work together as an organization to tackle environmental issues through the decision making process</p><p><b>Player Scale: </b>Individual, Small groups, Medium groups, Large groups</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(philadelphia)
    .setLngLat([-75.17022911237996, 39.95155846473688])
    .addTo(map);
  currentMarkers.push(curr);

  var bethesda = document.createElement('button');
  bethesda.setAttribute("data-toggle", "modal");
  bethesda.setAttribute("data-target", "#gameModal");
  bethesda.setAttribute("class", "marker");
  bethesda.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>CARBON FOOTPRINT REDUCTION GAME</h4><h5>Bethesda, Maryland</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p><b>Who Played: </b>Employees at Lockheed Martin</p><p>An energy game where employees score points, linked to the company's benefits and reward scheme, for installing energy-efficient light bulbs at home, for learning how to set a central heating thermostat more efficiently, and for watching educational videos on how to save energy.</p><p><b>Player Scale: </b>Individual, Building</p><p><b>Impact Scale: </b>People, Building</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(bethesda)
    .setLngLat([-77.97315046730836, 39.167150106479966])
    .addTo(map);
  currentMarkers.push(curr);

  var rochester = document.createElement('button');
  rochester.setAttribute("data-toggle", "modal");
  rochester.setAttribute("data-target", "#gameModal");
  rochester.setAttribute("class", "marker");
  rochester.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>ERG: THE ENERGY RESOURCE GAME (J. TAYLOR)</h4><h5>Rochester, New York</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>Multiplayer card game where players are educated about the transport and use of renewable nad non-renewable resources. Players must overcome natural disasters, depleted resources, and conservation efforts</p><p><b>Player Scale: </b>Small groups</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(rochester)
    .setLngLat([-77.61151717676097, 43.15698306795062])
    .addTo(map);
  currentMarkers.push(curr);

  var dartmouth = document.createElement('button');
  dartmouth.setAttribute("data-toggle", "modal");
  dartmouth.setAttribute("data-target", "#gameModal");
  dartmouth.setAttribute("class", "marker");
  dartmouth.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>SUPER EDDIE ENVIRO GAMES</h4><h5>Dartmouth, Nova Scotia</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>A fun, interactive and educational online, single player game designed to teach young children all about the air they breathe</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "visible";
    document.getElementById("gameModalLink").href = "https://clean.ns.ca/super-eddie-game/";
  }
  curr = new mapboxgl.Marker(dartmouth)
    .setLngLat([-63.57408241792103, 44.6674812397728])
    .addTo(map);
  currentMarkers.push(curr);

  var honolulu = document.createElement('button');
  honolulu.setAttribute("data-toggle", "modal");
  honolulu.setAttribute("data-target", "#gameModal");
  honolulu.setAttribute("class", "marker");
  honolulu.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>THE KUKUI CUP</h4><h5>Honolulu, Hawaii</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>A defining feature of Kukui Cup challenges is a blend of real world and online activities, all utilizing game mechanics. In the real world, players participate in workshops and excursions, win prizes, and most importantly, learn about their current lifestyle and its impact on energy consumption. In the online world of the Kukui Cup web application, players earn points, achieve badfes, increase their sustainability 'literacy' through readin and videos, and use social networking mechanisms to engage with friends and family about the issues raised</p><p><b>Player Scale: </b>Large groups</p><p><b>Impact Scale: </b>People, Building, Neighborhood</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(honolulu)
    .setLngLat([-157.8568516785772, 21.303155822374862])
    .addTo(map);
  currentMarkers.push(curr);

  var saopaulo = document.createElement('button');
  saopaulo.setAttribute("data-toggle", "modal");
  saopaulo.setAttribute("data-target", "#gameModal");
  saopaulo.setAttribute("class", "marker");
  saopaulo.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>UNTITLED (MESQUITA ET AL)</h4><h5>Sao Paulo</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p><b>Who played: </b>junior high public school in the state of Sao Paulo; 43 students</p><p>Virtual board game where participants choose a car that starts the path and reaches the same final goal, going through a number of track steps defined in terms of a dice that each player rools in turn. The car moves if the participant is able to correctly answer a question that is randomly generated by the software. The objective of the game is to answer questions related to energy efficiency promoting a healthy and attractive learning process for participants on concepts related to energy efficiency</p><p><b>Player Scale: </b>Small groups, Medium groups</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(saopaulo)
    .setLngLat([-46.64259552971521, -23.553333648478713])
    .addTo(map);
  currentMarkers.push(curr);

  var capetown = document.createElement('button');
  capetown.setAttribute("data-toggle", "modal");
  capetown.setAttribute("data-target", "#gameModal");
  capetown.setAttribute("class", "marker");
  capetown.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>EXKOM ENERGY PLANNER</h4><h5>Cape Town, South Africa</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>The game allows the player to take custody of a virtual city's power plan and seek a balance between the most efficient technologies currently available and the most environmentally friendly ones. Players must also consider the varying costs of production and face the challenge of maintaining an economically viable mix of these elements.</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "visible";
    document.getElementById("gameModalLink").href = "https://prezi.com/url/?target=https%3A%2F%2Fwww.schoolgen.co.nz%2Fteachers%2Fonline-games%2F";
  }
  curr = new mapboxgl.Marker(capetown)
    .setLngLat([18.413797566466997, -33.951760736656])
    .addTo(map);
  currentMarkers.push(curr);

  var newZealand = document.createElement('button');
  newZealand.setAttribute("data-toggle", "modal");
  newZealand.setAttribute("data-target", "#gameModal");
  newZealand.setAttribute("class", "marker");
  newZealand.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>CRUNCH TIME 2.0</h4><h5>New Zealand</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>Crunch Time is an online game with fun interactive quizzes aimed at kids of all ages - with questions about energy, science and sustainability. The game can be played individually or set up so whole classes can play against each other.</p><p><b>Player Scale: </b>Individual, Small groups, Medium groups</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(newZealand)
    .setLngLat([171.7637804353643, -41.86509165972005])
    .addTo(map);
  currentMarkers.push(curr);

  var melbourne = document.createElement('button');
  melbourne.setAttribute("data-toggle", "modal");
  melbourne.setAttribute("data-target", "#gameModal");
  melbourne.setAttribute("class", "marker");
  melbourne.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>ENERGY SAVING ONLINE GAME</h4><h5>Suburb of Melbourne | Camberwell</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>An online game where players must see if the ycan answer all the questions about reducing energy in the house and make the energy usage meter go down.</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "visible";
    document.getElementById("gameModalLink").href = "http://www.olliesworld.com/adventure/onlinegames/energy-saving-game.htm";
  }
  curr = new mapboxgl.Marker(melbourne)
    .setLngLat([144.9776128072392, -37.87235646365515])
    .addTo(map);
  currentMarkers.push(curr);

  var sydney = document.createElement('button');
  sydney.setAttribute("data-toggle", "modal");
  sydney.setAttribute("data-target", "#gameModal");
  sydney.setAttribute("class", "marker");
  sydney.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>THE DAY AMY SAVED THE WORLD</h4><h5>Sydney, Australia</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>Amy's online resources are integral components to learning about how to help the environment. These activities are designed to increase children's awareness of how to reduce energy consumption and costs. Through completing the activities, children will gain an understanding of ways that they can help reduce energy consumption and the concept that this can help to protect the environment.</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "visible";
    document.getElementById("gameModalLink").href = "https://web.archive.org/web/20180313132014/http://www.amysenergysave.com.au/index.html";
  }
  curr = new mapboxgl.Marker(sydney)
    .setLngLat([151.21757869742692, -33.857108778525465])
    .addTo(map);
  currentMarkers.push(curr);

  var australia = document.createElement('button');
  australia.setAttribute("data-toggle", "modal");
  australia.setAttribute("data-target", "#gameModal");
  australia.setAttribute("class", "marker");
  australia.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>LET'S MAKE IT GO</h4><h5>Australia</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>An online, single player game where players connect machines and devices with the energy sources that make them work. Look around different places to identify what powers things such as a car, wind chimes, solor water heater, barbecue or torch. Choose from energy sources such as Sun, wind, water, batteries, electricity, gas or petrol. This learning object is a combination of threee objects in the same series.</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "visible";
    document.getElementById("gameModalLink").href = "http://fuse.education.vic.gov.au/Resource/ByPin?Pin=SEFFN8&SearchScope=All";
  }
  curr = new mapboxgl.Marker(australia)
    .setLngLat([134.45787282899494, -25.779183532671354])
    .addTo(map);
  currentMarkers.push(curr);

  var india = document.createElement('button');
  india.setAttribute("data-toggle", "modal");
  india.setAttribute("data-target", "#gameModal");
  india.setAttribute("class", "marker");
  india.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>MISSING LIGHTING</h4><h5>India</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>An online, single player game where players are on a mission to enlighten the world by spreading eco-friendly lighting. Spread awareness about climate change and motivate people to use CLF lamps and adopt smarter energy consumption.</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(india)
    .setLngLat([78.68226384504555, 22.383660395640675])
    .addTo(map);
  currentMarkers.push(curr);

  var tianjin = document.createElement('button');
  tianjin.setAttribute("data-toggle", "modal");
  tianjin.setAttribute("data-target", "#gameModal");
  tianjin.setAttribute("class", "marker");
  tianjin.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>BIM (BUILDING INFORMATION MODELING) GAME</h4><h5>Tianjin</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>The BIM board game is a learning tool to teach non-experts about decision-making and critical thinking. Based on 3 game elements (1) space, (2) object, (3) behavior, the gola of the game is to enable non experts to interpret design solution, enhance the awareness of energy decision-making, and encourage behavior change later in life.</p><p><b>Player Scale: </b>Small groups</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(tianjin)
    .setLngLat([117.20832948905229, 39.12093142978992])
    .addTo(map);
  currentMarkers.push(curr);

  var bhutan = document.createElement('button');
  bhutan.setAttribute("data-toggle", "modal");
  bhutan.setAttribute("data-target", "#gameModal");
  bhutan.setAttribute("class", "marker");
  bhutan.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>RESIDENCE ENERGY SAVING (RES) - BATTLE</h4><h5>Bhutan</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p><b>Who Played: </b>129 10th grade students</p><p>This game uncovers gender differences in learning achievements and energy-saving awareness through a digital game based on inquiry-bsed learning called Residence Energy Saving Battle (RES-battle). The results from 129 students indicate that the RE-battle can decrease the difference between female and male achievements reasonably and energy-saving awareness</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(bhutan)
    .setLngLat([90.46481730045514, 27.404074035145896])
    .addTo(map);
  currentMarkers.push(curr);

  var taiwan = document.createElement('button');
  taiwan.setAttribute("data-toggle", "modal");
  taiwan.setAttribute("data-target", "#gameModal");
  taiwan.setAttribute("class", "marker");
  taiwan.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>SUPER DELIVERY</h4><h5>Taiwan</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p><b>Who Played: </b>8 6th grade students</p><p>Super Delivery targets knowledge about saving electricity, and conducted case studies of eight sixth-grade students using this game to explore the factors influencing the effectiveness of students' knowledge acquisition in digital game-based learning</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(taiwan)
    .setLngLat([120.99276661307306, 25.682360376434374])
    .addTo(map);
  currentMarkers.push(curr);

  var philippines = document.createElement('button');
  philippines.setAttribute("data-toggle", "modal");
  philippines.setAttribute("data-target", "#gameModal");
  philippines.setAttribute("class", "marker");
  philippines.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>THE BIG SWITCH (EX ENERGY SUPERSTAR: BID, SAVE, WIN!)</h4><h5>Philippines</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>The Big Switch is a board game with a real0time bidding and tile0flipping dexterity game about energy conservation. In each round, players try to outbid each other in 20-second auctions to buy efficient appliances for their homes, while simultaneously doing energy saving habits.</p><p><b>Player Scale: </b>Small groups</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(philippines)
    .setLngLat([122.76581514841337, 13.189061243675425])
    .addTo(map);
  currentMarkers.push(curr);

  var copenhagen = document.createElement('button');
  copenhagen.setAttribute("data-toggle", "modal");
  copenhagen.setAttribute("data-target", "#gameModal");
  copenhagen.setAttribute("class", "marker");
  copenhagen.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>COPENHAGEN CHALLENGE</h4><h5>Copenhagen, Denmark</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p></p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(copenhagen)
    .setLngLat([12.572122715751448, 55.684332219889455])
    .addTo(map);
  currentMarkers.push(curr);

  var helsinki = document.createElement('button');
  helsinki.setAttribute("data-toggle", "modal");
  helsinki.setAttribute("data-target", "#gameModal");
  helsinki.setAttribute("class", "marker");
  helsinki.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>CITYOPT</h4><h5>Helsinki, Finland</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p><b>Who Played: </b>140 households in Nice</p><p>CityOPT is a planning tool for energy experts to optimize energy planning for large-scale urban and regional systems and was piloted in Helsinki and Vienna. A tablet game was created for households. The app awarded points to users who manage to lower or shift theur energy consumption during peak time, which can then be passed on to local charities, whom the energy companies donate too accordingly</p><p><b>Player Scale: </b>Individual, City</p><p><b>Impact Scale: </b>Building, Neighborhood, City</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(helsinki)
    .setLngLat([24.940453449953225, 60.16816912546852])
    .addTo(map);
  currentMarkers.push(curr);

  var finland = document.createElement('button');
  finland.setAttribute("data-toggle", "modal");
  finland.setAttribute("data-target", "#gameModal");
  finland.setAttribute("class", "marker");
  finland.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>ENERGY LIFE</h4><h5>Finland</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>We present Energy Life a asystem utilizing wireless sensors, mobile and ambient interfaces that turn energy consumers into active players. Energy Life participants play through different levels collecting scores in savings and through advice tip reading and quizzes.</p><p><b>Player Scale: </b>Individual, Small groups, Building</p><p><b>Impact Scale: </b>People, Building, Neighborhood</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(finland)
    .setLngLat([27.036897501246813, 62.6796465130777])
    .addTo(map);
  currentMarkers.push(curr);

  var stockholm = document.createElement('button');
  stockholm.setAttribute("data-toggle", "modal");
  stockholm.setAttribute("data-target", "#gameModal");
  stockholm.setAttribute("class", "marker");
  stockholm.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>AGENTS AGAINST POWER</h4><h5>Stockholm, Sweden</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p><b>Who Played: </b>200 - 300 teenagers</p><p>A mobile phone game and field experiment where players play as a secret agent hunting down wasteful energy use. However, as the power agent, you become an energy sleuth in your own home as the game tracks your own home electricity waste!</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People, Building</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(stockholm)
    .setLngLat([18.064788304287276, 59.32175646906683])
    .addTo(map);
  currentMarkers.push(curr);

  var sweden = document.createElement('button');
  sweden.setAttribute("data-toggle", "modal");
  sweden.setAttribute("data-target", "#gameModal");
  sweden.setAttribute("class", "marker");
  sweden.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>POWER AGENT</h4><h5>Sweden</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>Power Agent is a pervasive game designed to encourage teenagers and their families to reduce energy consumption in the home. The idea behind this mobile phone-based game was twofold; to transform the home environment and its devices into a learning rena for hands on experience with electricity usage and to promote engagement by means of a team competition scheme</p><p><b>Player Scale: </b>Individual, Small groups</p><p><b>Impact Scale: </b>People, Building</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(sweden)
    .setLngLat([17.71056606382251, 64.96788753526852])
    .addTo(map);
  currentMarkers.push(curr);

  var wroclaw = document.createElement('button');
  wroclaw.setAttribute("data-toggle", "modal");
  wroclaw.setAttribute("data-target", "#gameModal");
  wroclaw.setAttribute("class", "marker");
  wroclaw.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>THE GREAT GREEN WEB</h4><h5>Wroclaw, Poland</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>Great Green Web Game is a quiz game aimed at testing knowledge about how consumers choices affect environment</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(wroclaw)
    .setLngLat([17.027121799638053, 51.109503123135454])
    .addTo(map);
  currentMarkers.push(curr);

  var poland = document.createElement('button');
  poland.setAttribute("data-toggle", "modal");
  poland.setAttribute("data-target", "#gameModal");
  poland.setAttribute("class", "marker");
  poland.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>ENERGY TRANSITION GAME</h4><h5>Poland</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>A multi-player, role-playing, simulation board game that allows players to experience the challenges when transitioning from fossil fuels to renewable energy sources. Become an energy producer, energy provider, technology start-up, one of the government departments or civil society organizations and create new solutions for the energy system!</p><p><b>Player Scale: </b>Medium groups, Large groups</p><p><b>Impact Scale: </b>People, Neighborhood, City</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(poland)
    .setLngLat([19.430183417161516, 52.16635195104297])
    .addTo(map);
  currentMarkers.push(curr);

  var vienna = document.createElement('button');
  vienna.setAttribute("data-toggle", "modal");
  vienna.setAttribute("data-target", "#gameModal");
  vienna.setAttribute("class", "marker");
  vienna.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>ENERGY SAFARI</h4><h5>Vienna, Austria</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>This multi-player game seeks to explore how game mechanics can be used to engage the actor group of young adults to make informed decisions that have an impact on their respective urban carbon footprints investigating both existing games and novel game-based approaches, the project partners endeavor to create a tested game mechanics toolbox that can serve as a resource for participatory, game-based urban development scenarios.</p><p><b>Player Scale: </b>Medium groups, Large groups</p><p><b>Impact Scale: </b>Neighborhood, City</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(vienna)
    .setLngLat([16.395127879115307, 48.397750080903904])
    .addTo(map);
  currentMarkers.push(curr);

  var switzerland = document.createElement('button');
  switzerland.setAttribute("data-toggle", "modal");
  switzerland.setAttribute("data-target", "#gameModal");
  switzerland.setAttribute("class", "marker");
  switzerland.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>MISSION POSSIBLE</h4><h5>Switzerland</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>Mission Impossible is an educational game that challenged people's perceptions of their energy consumption in their lives. Do you think you're a responsible citizen when it comes to your energy consumption? Find out!</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "visible";
    document.getElementById("gameModalLink").href = "https://1830.ch/portfolio/mission-possible/";
  }
  curr = new mapboxgl.Marker(switzerland)
    .setLngLat([8.204612025109896, 46.788651869007765])
    .addTo(map);
  currentMarkers.push(curr);

  var bonn = document.createElement('button');
  bonn.setAttribute("data-toggle", "modal");
  bonn.setAttribute("data-target", "#gameModal");
  bonn.setAttribute("class", "marker");
  bonn.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>MOBILITY</h4><h5>Bonn, Germany</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>This game focuses on mobility, and transportation infrastructure. Construct traffic related buildings for the people in your city while keep emissions and energy consumption low and your people mobile.</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(bonn)
    .setLngLat([7.1011524922967055, 50.736803694059574])
    .addTo(map);
  currentMarkers.push(curr);

  var munich = document.createElement('button');
  munich.setAttribute("data-toggle", "modal");
  munich.setAttribute("data-target", "#gameModal");
  munich.setAttribute("class", "marker");
  munich.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>GHOST HUNTER</h4><h5>Munich, Germany</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>An interactive family game that engages parents and children in seeking out hidden sources of energy consumption in their homes. Our system combines an electro-magnetic field (EMF) etector with a mobile tablet computer. Bringing Ghost Hunter within range of an electrical current activates the detector. Through the Ghost Hunter design we attempted to evoke the cultural form of hide-and-seek as a way to help children and parents structure their activity</p><p><b>Player Scale: </b>Small groups ,Building</p><p><b>Impact Scale: </b>People, Building</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(munich)
    .setLngLat([11.587937771332008, 48.12780957944972])
    .addTo(map);
  currentMarkers.push(curr);

  var germany = document.createElement('button');
  germany.setAttribute("data-toggle", "modal");
  germany.setAttribute("data-target", "#gameModal");
  germany.setAttribute("class", "marker");
  germany.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>ENERGETIKA</h4><h5>Germany</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>In the game, players control the destiny of the fictitious state Energetika over a 40-year period. The goal is to influence the country energy matrix in a way that the energy supply is ensured. At the same time, players must keep track of social, economic and ecological impact, balancing all the different stakes for a sustainable resource management. <i>Game is not available in English</i></p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People, Neighborhood</p>"
    document.getElementById("gameModalLink").style.visibility = "visible";
    document.getElementById("gameModalLink").href = "http://www.wir-ernten-was-wir-saeen.de/game-new/";
  }
  curr = new mapboxgl.Marker(germany)
    .setLngLat([10.006594120604177, 51.17331868086802])
    .addTo(map);
  currentMarkers.push(curr);

  var paris = document.createElement('button');
  paris.setAttribute("data-toggle", "modal");
  paris.setAttribute("data-target", "#gameModal");
  paris.setAttribute("class", "marker");
  paris.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>2020 ENERGY</h4><h5>Paris, France</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>An online, single player game where players must take on nine missions while learning how to make the best decisions about energy consumption in our day to day lives</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "visible";
    document.getElementById("gameModalLink").href = "http://www.2020energy.eu/en";
  }
  curr = new mapboxgl.Marker(paris)
    .setLngLat([2.359490820787755, 49.25692630904214])
    .addTo(map);
  currentMarkers.push(curr);

  var bidart = document.createElement('button');
  bidart.setAttribute("data-toggle", "modal");
  bidart.setAttribute("data-target", "#gameModal");
  bidart.setAttribute("class", "marker");
  bidart.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>THE GREENPLAY PROJECT</h4><h5>Bidart, France</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p><b>Who Played: </b>France, Spain, Hungary</p><p>Players can introduce some of their house energy consumption parameters to go into the game on multiple platforms such as, a pc, mobile phone and tablets, so that players will be able to participate from anywhere whenever you want. These data will have a direct impact on the course of the game allowing the players to buy items or get bonuses.</p><p><b>Player Scale: </b>Individual, Building</p><p><b>Impact Scale: </b>People, Building, Neighborhood, City</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(bidart)
    .setLngLat([-1.5917313634590755, 43.438842444989774])
    .addTo(map);
  currentMarkers.push(curr);

  var france = document.createElement('button');
  france.setAttribute("data-toggle", "modal");
  france.setAttribute("data-target", "#gameModal");
  france.setAttribute("class", "marker");
  france.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>GENIUS</h4><h5>France</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p><b>Who Played: </b>145 high schools, 265 classrooms</p><p>Genius was a team based game/contest for high school students to compete in a serious energy game where they take on the role of Energy Minister of Geniusland to manage the energy mix</p><p><b>Player Scale: </b>Small groups, Medium groups</p><p><b>Impact Scale: </b>People, Neighborhood, City</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(france)
    .setLngLat([2.5293000007867477, 47.856420952230934])
    .addTo(map);
  currentMarkers.push(curr);

  var amsterdam = document.createElement('button');
  amsterdam.setAttribute("data-toggle", "modal");
  amsterdam.setAttribute("data-target", "#gameModal");
  amsterdam.setAttribute("class", "marker");
  amsterdam.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>AGE OF ENERGY</h4><h5>Amsterdam, Netherlands</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>An online, single player game where players must rebuild society in a post-apocalyptic world. Build structures and gather resources to keep your society running!</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(amsterdam)
    .setLngLat([4.901255207893314, 52.36975845917314])
    .addTo(map);
  currentMarkers.push(curr);

  var groningen = document.createElement('button');
  groningen.setAttribute("data-toggle", "modal");
  groningen.setAttribute("data-target", "#gameModal");
  groningen.setAttribute("class", "marker");
  groningen.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>WE-ENERGY GAME</h4><h5>Groningen, Netherlands</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>The We Energy Game provides insights about the provision of affordable energy from revewable sources for an entire town or city. By playing the game, it soon becomes clear that there is not a single solution, but many! And that sustainability is not just a technical issue, but a social one as well.</p><p><b>Player Scale: </b>Small groups, Medium groups</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(groningen)
    .setLngLat([6.5763411649307955, 53.21669623684386])
    .addTo(map);
  currentMarkers.push(curr);

  var netherlands = document.createElement('button');
  netherlands.setAttribute("data-toggle", "modal");
  netherlands.setAttribute("data-target", "#gameModal");
  netherlands.setAttribute("class", "marker");
  netherlands.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>NEXUS! CHALLENGE</h4><h5>Netherlands</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>The stress nexus! challenge is a board game, but one with emergent rules, In a mere hour, you will move from an outide observer of the stress nexus to one of its key actors. You may play a company, seeking a secure market for your production. You may play a country desperately short of water. You will face lang shortages, real or imagined. Innovation, boycotts, partnerships, price fluctuations, free trade, bad harvests, turbulence: it's all in the game. Or is it just a game?</p><p><b>Player Scale: </b>Medium groups</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(netherlands)
    .setLngLat([6.5763411649307955, 53.21669623684386])
    .addTo(map);
  currentMarkers.push(curr);

  var brussels = document.createElement('button');
  brussels.setAttribute("data-toggle", "modal");
  brussels.setAttribute("data-target", "#gameModal");
  brussels.setAttribute("class", "marker");
  brussels.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>GO GOALS!</h4><h5>Brussels, Belgium</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>A multi-player board game where players The Sustainable Development Goals are 17 priority goals that cover a number of important issues for the world, including: ending extreme poverty, ensuring all children receive a good education, achieving equal opportunities for all, and promoting better practices for consumption and production that will help make the planet cleaner and healthier.</p><p><b>Player Scale: </b>Small groups</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(brussels)
    .setLngLat([4.344711279222338, 50.844051515853835])
    .addTo(map);
  currentMarkers.push(curr);

  var glasgow = document.createElement('button');
  glasgow.setAttribute("data-toggle", "modal");
  glasgow.setAttribute("data-target", "#gameModal");
  glasgow.setAttribute("class", "marker");
  glasgow.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>MYSUSTHOUSE</h4><h5>Glasgow, Scotland</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>My Sust House is a Glaswegian approach to sustainable education, exposing kids and teenagers to issues of sustainability in desgin and planning through an accessible outlet: the Internet. This interactive game explores what sustainability means and how it relates to the home</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "visible";
    document.getElementById("gameModalLink").href = "https://inhabitat.com/my-sust-house-interactive-game-for-eco-minded-kids/";
  }
  curr = new mapboxgl.Marker(glasgow)
    .setLngLat([-4.2329538185173305, 55.8519114321885])
    .addTo(map);
  currentMarkers.push(curr);

  var manchester = document.createElement('button');
  manchester.setAttribute("data-toggle", "modal");
  manchester.setAttribute("data-target", "#gameModal");
  manchester.setAttribute("class", "marker");
  manchester.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>INTERACTIVE HOUSE</h4><h5>Manchester, England</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>Interactive house is an online, single player game where players must use clues and click around the interactive house to find 26 ways to help the environment.</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "visible";
    document.getElementById("gameModalLink").href = "https://prezi.com/url/?target=https%3A%2F%2Fwww.childrensuniversity.manchester.ac.uk%2Flearning-activities%2Fscience%2Fenergy-and-the-environment%2Finteractive-house%2F";
  }
  curr = new mapboxgl.Marker(manchester)
    .setLngLat([-2.2431854428051565, 53.4778852787494])
    .addTo(map);
  currentMarkers.push(curr);

  var london = document.createElement('button');
  london.setAttribute("data-toggle", "modal");
  london.setAttribute("data-target", "#gameModal");
  london.setAttribute("class", "marker");
  london.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>ENERGY NINJAS</h4><h5>London, England</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>A single player, online energy game where players must help the Energy Ninjas investigate the town. The Energy Ninjas have noticed an alarming trend in Co2 emissions. As the player you must help the Energy Ninjas get the Co2 gauge down to acceptable levels</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "visible";
    document.getElementById("gameModalLink").href = "https://webarchive.nationalarchives.gov.uk/20100507031411tf_/http://www.sciencemuseum.org.uk/Activate/Home_page/our_products/Games/Energy%20Ninjas.aspx";
  }
  curr = new mapboxgl.Marker(london)
    .setLngLat([0.8393703110514252, 51.81088701397533])
    .addTo(map);
  currentMarkers.push(curr);

  var england = document.createElement('button');
  england.setAttribute("data-toggle", "modal");
  england.setAttribute("data-target", "#gameModal");
  england.setAttribute("class", "marker");
  england.onclick = function () {
    document.getElementById("gameModalLabel").innerHTML = "<h4>LOLLY VS. THE ENERGY MONKEYS</h4><h5>England</h5>";
    document.getElementById("gameModalBody").innerHTML = "<p>An online, single player game where Earthling Lolly, the monkey, learns to conserve energy in order to keep the alien Energy Monkeys at bay.</p><p><b>Player Scale: </b>Individual</p><p><b>Impact Scale: </b>People</p>"
    document.getElementById("gameModalLink").style.visibility = "hidden";
  }
  curr = new mapboxgl.Marker(england)
    .setLngLat([-0.6895645482155714, 52.36328596348923])
    .addTo(map);
  currentMarkers.push(curr);

  console.log(currentMarkers[0]._element.onclick);
}

function addCountryMarkers() {
  var USMarker = document.createElement('div');
  USMarker.setAttribute("class", "marker");
  curr = new mapboxgl.Marker(USMarker)
    .setLngLat([-98.08680222147046, 39.285792446456384])
    .addTo(map);
  countryMarkers.push(curr);

  var canadaMarker = document.createElement('div');
  canadaMarker.setAttribute("class", "marker");
  curr = new mapboxgl.Marker(canadaMarker)
    .setLngLat([-105.74297608238186, 55.628146333037364])
    .addTo(map);
  countryMarkers.push(curr);

  var brazilMarker = document.createElement('div');
  brazilMarker.setAttribute("class", "marker");
  curr = new mapboxgl.Marker(brazilMarker)
    .setLngLat([-51.508297086267135, -9.787057498327812])
    .addTo(map);
  countryMarkers.push(curr);

  var australiaMarker = document.createElement('div');
  australiaMarker.setAttribute("class", "marker");
  curr = new mapboxgl.Marker(australiaMarker)
    .setLngLat([134.04566763837738, -25.308720540513107])
    .addTo(map);
  countryMarkers.push(curr);

  var nzMarker = document.createElement('div');
  nzMarker.setAttribute("class", "marker");
  curr = new mapboxgl.Marker(nzMarker)
    .setLngLat([172.44494043268594, -41.937710638608415])
    .addTo(map);
  countryMarkers.push(curr);

  var nzMarker = document.createElement('div');
  nzMarker.setAttribute("class", "marker");
  curr = new mapboxgl.Marker(nzMarker)
    .setLngLat([172.44494043268594, -41.937710638608415])
    .addTo(map);
  countryMarkers.push(curr);

  var southafricaMarker = document.createElement('div');
  southafricaMarker.setAttribute("class", "marker");
  curr = new mapboxgl.Marker(southafricaMarker)
    .setLngLat([24.064202505728872, -28.39242591194757])
    .addTo(map);
  countryMarkers.push(curr);

  var indiaMarker = document.createElement('div');
  indiaMarker.setAttribute("class", "marker");
  curr = new mapboxgl.Marker(indiaMarker)
    .setLngLat([78.46499731927713, 22.28664654463431])
    .addTo(map);
  countryMarkers.push(curr);

  var bhutanMarker = document.createElement('div');
  bhutanMarker.setAttribute("class", "marker");
  curr = new mapboxgl.Marker(bhutanMarker)
    .setLngLat([90.59042276372838, 27.396517078498164])
    .addTo(map);
  countryMarkers.push(curr);

  var chinaMarker = document.createElement('div');
  chinaMarker.setAttribute("class", "marker");
  curr = new mapboxgl.Marker(chinaMarker)
    .setLngLat([110.90067573434828, 28.952297679269748])
    .addTo(map);
  countryMarkers.push(curr);

  var taiwanMarker = document.createElement('div');
  taiwanMarker.setAttribute("class", "marker");
  curr = new mapboxgl.Marker(taiwanMarker)
    .setLngLat([120.72203743476359, 23.902409747242714])
    .addTo(map);
  countryMarkers.push(curr);

  var philippineMarker = document.createElement('div');
  philippineMarker.setAttribute("class", "marker");
  curr = new mapboxgl.Marker(philippineMarker)
    .setLngLat([122.76581514841337, 13.189061243675425])
    .addTo(map);
  countryMarkers.push(curr);

  var denmarkMarker = document.createElement('div');
  denmarkMarker.setAttribute("class", "marker");
  curr = new mapboxgl.Marker(denmarkMarker)
    .setLngLat([9.915042660134873, 55.97915161489951])
    .addTo(map);
  countryMarkers.push(curr);

  var finlandMarker = document.createElement('div');
  finlandMarker.setAttribute("class", "marker");
  curr = new mapboxgl.Marker(finlandMarker)
    .setLngLat([27.036897501246813, 62.6796465130777])
    .addTo(map);
  countryMarkers.push(curr);

  var swedenMarker = document.createElement('div');
  swedenMarker.setAttribute("class", "marker");
  curr = new mapboxgl.Marker(swedenMarker)
    .setLngLat([17.71056606382251, 64.96788753526852])
    .addTo(map);
  countryMarkers.push(curr);

  var polandMarker = document.createElement('div');
  polandMarker.setAttribute("class", "marker");
  curr = new mapboxgl.Marker(polandMarker)
    .setLngLat([19.430183417161516, 52.16635195104297])
    .addTo(map);
  countryMarkers.push(curr);

  var austriaMarker = document.createElement('div');
  austriaMarker.setAttribute("class", "marker");
  curr = new mapboxgl.Marker(austriaMarker)
    .setLngLat([14.441563280857167, 47.35422048861096])
    .addTo(map);
  countryMarkers.push(curr);

  var switzerlandMarker = document.createElement('div');
  switzerlandMarker.setAttribute("class", "marker");
  curr = new mapboxgl.Marker(switzerlandMarker)
    .setLngLat([8.204612025109896, 46.788651869007765])
    .addTo(map);
  countryMarkers.push(curr);

  var germanyMarker = document.createElement('div');
  germanyMarker.setAttribute("class", "marker");
  curr = new mapboxgl.Marker(germanyMarker)
    .setLngLat([10.006594120604177, 51.17331868086802])
    .addTo(map);
  countryMarkers.push(curr);

  var franceMarker = document.createElement('div');
  franceMarker.setAttribute("class", "marker");
  curr = new mapboxgl.Marker(franceMarker)
    .setLngLat([2.5293000007867477, 47.856420952230934])
    .addTo(map);
  countryMarkers.push(curr);

  var UKMarker = document.createElement('div');
  UKMarker.setAttribute("class", "marker");
  curr = new mapboxgl.Marker(UKMarker)
    .setLngLat([-2.6277155383284025, 54.322913536976586])
    .addTo(map);
  countryMarkers.push(curr);

  var belgiumMarker = document.createElement('div');
  belgiumMarker.setAttribute("class", "marker");
  curr = new mapboxgl.Marker(belgiumMarker)
    .setLngLat([4.734357611568498, 50.466081161565086])
    .addTo(map);
  countryMarkers.push(curr);

  var netherlandsMarker = document.createElement('div');
  netherlandsMarker.setAttribute("class", "marker");
  curr = new mapboxgl.Marker(netherlandsMarker)
    .setLngLat([5.353000531850512, 52.02195377703737])
    .addTo(map);
  countryMarkers.push(curr);
}

function deleteCountryMarkers() {
  while (countryMarkers.length > 0) {
    countryMarkers[0].remove();
    countryMarkers.shift();
  }
}
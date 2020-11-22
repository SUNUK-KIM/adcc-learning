

var data, map;

var colorScale = {
  'cluster_1': '#B6A6CA',
  'cluster_0': '#6D98BA',
};


function initMap() {
  map = L.map('map');
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).
    addTo(map);

  map.setView([37.5, 127], 11);
}
function getData() {
  d3.csv('https://storage.googleapis.com/sunuk_data/price.csv')
    .then(function (csv) {
      data = csv;
      addMarkers();

    });
}

function getTooltipContent(d) {
  var content = '';
  content += '<h4>' + d.name + '</h4>';
  content += '<div>Cluster: ' + d.Cluster + '</div>';
  content += '<div>price(만): ' + d.Price + '</div>';
  content += '<div>Transportation charges :' + d.fee + '</div>';
  content += '<div>Time taken: ' + d.time + '</div>';
  content += '<div>Bus(count): ' + d.bus + '</div>';
  content += '<div>sub(m): ' + d.sub + '</div>';

  return content;
}

function addMarkers() {
  data.forEach(function (d) {
    var marker = L.circleMarker([+d.latitude, +d.longitude]);
    marker.isMarker = true;
    var inService = d.Cluster === 'cluster_1';
    var color = colorScale[d.Cluster] || '#aaa';

    if (inService) {
      marker.setStyle({
        fillOpacity: 1,
        fillColor: "Tomato",
        color: '#ddd',
        radius: 8,
        weight: 0.25
      });

    }
    else {
      marker.setStyle({
        fillOpacity: 0.5,
        fillColor: 'Greenyellow',
        color: '#777',
        radius: 8,
        weight: 1
      });

    }


    marker.bindTooltip(getTooltipContent(d));

    marker.addTo(map);
  });
}


initMap();
getData();
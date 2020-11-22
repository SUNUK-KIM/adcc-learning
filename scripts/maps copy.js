

var data, map;

var colorScale = {
  'cluster_1': '#B6A6CA',
  'cluster_0': '#6D98BA',
};



function getTooltipContent2(dd) {
  var content = '';
  content += '<h4>' + dd.apt + '</h4>';
  // content += '<div>Cluster: ' + dd.Cluster + '</div>';
  content += '<div>price(만원): ' + dd.Price + '</div>';
  content += '<div>predict(만원): ' + dd.predict00 + '</div>';
  content += '<div>주거 면적: ' + dd.Residentialarea + '</div>';
  content += '<div>문화시설 개수 :' + dd.culture + '</div>';
  content += '<div>체육시설 개수: ' + dd.sports + '</div>';
  content += '<div>버스정류장 수: ' + dd.bus + '</div>';
  content += '<div>지하철역 거리(m): ' + dd.subm + '</div>';

  return content;
}

function addMarkers2(price_list) {
  price_list.forEach(function (dd) {
    var marker = L.circleMarker([+dd.X, +dd.Y]);
    marker.isMarker = true;
    var inService = dd.Price > 0;
    var color = colorScale[dd.Price] || '#aaa';

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


    marker.bindTooltip(getTooltipContent2(dd));

    marker.addTo(map);
  });
}

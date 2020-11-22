

var data, map;

var colorScale = {
    'cluster_1': '#B6A6CA',
    'cluster_0': '#6D98BA',
};

// MapBox (Requires API Key)
// -----------------------//
// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}', {
//     attribution: " &copy;  <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> &copy;  <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
//     maxZoom: 18,
//     id: 'mapbox.streets',
//     accessToken: 'ACCESS_TOKEN'
// }).addTo(map);

function initMap() {
    map = L.map('map');
    L.tileLayer('https://api.mapbox.com/styles/v1/kimsunuk/ckam100r54d8m1iscssj0qys0.html?fresh=true&title=view&access_token=pk.eyJ1Ijoia2ltc3VudWsiLCJhIjoiY2p3cTJmajQ5MmpvMzQ5cDc5aWYxZHNkcyJ9.skJW_L-Wvdf7ubFTZm597g}', {
        attribution: " &copy;  <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> &copy;  <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
        accessToken: 'pk.eyJ1Ijoia2ltc3VudWsiLCJhIjoiY2p3cTJmajQ5MmpvMzQ5cDc5aWYxZHNkcyJ9.skJW_L-Wvdf7ubFTZm597g'
    }).addTo(map);

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
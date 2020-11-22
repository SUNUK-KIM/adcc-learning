
/* ----------------- Start Document ----------------- */
$(document).ready(function () {
	if (document.getElementById("map") !== null) {

		// Touch Gestures
		if ($('#map').attr('data-map-scroll') == 'true' || $(window).width() < 992) {
			var scrollEnabled = false;
		} else {
			var scrollEnabled = true;
		}

		var mapOptions = {
			gestureHandling: scrollEnabled,
		}

		// Map Init
		window.map = L.map('map', mapOptions);
		$('#scrollEnabling').hide();


		// ----------------------------------------------- //
		// Popup Output
		// ----------------------------------------------- //
		function locationData(locationURL, locationImg, locationTitle, locationAddress, locationRating, locationRatingCounter) {
			return ('' +
				'<a href="' + locationURL + '" class="leaflet-listing-img-container">' +
				'<div class="infoBox-close"><i class="fa fa-times"></i></div>' +
				'<img src="' + locationImg + '" alt="">' +

				'<div class="leaflet-listing-item-content">' +
				'<h3>' + locationTitle + '</h3>' +
				'<span>' + locationAddress + '</span>' +
				'</div>' +

				'</a>' +

				'<div class="leaflet-listing-content">' +
				'<div class="leaflet-listing-title">' +
				'<div class="' + infoBox_ratingType + '" data-rating="' + locationRating + '"><div class="rating-counter">(' + locationRatingCounter + ' reviews)</div></div>' +
				'</div>' +
				'</div>')
		}


		// Listing rating on popup (star-rating or numerical-rating)
		var infoBox_ratingType = 'star-rating';

		map.on('popupopen', function () {
			if (infoBox_ratingType = 'numerical-rating') {
				numericalRating('.leaflet-popup .' + infoBox_ratingType + '');
			}
			if (infoBox_ratingType = 'star-rating') {
				starRating('.leaflet-popup .' + infoBox_ratingType + '');
			}
		});


		// ----------------------------------------------- //
		// Locations
		// ----------------------------------------------- //
		var locations = [
			[locationData('https://new.land.naver.com/complexes/3269?ms=37.57364,127.053352,17&a=APT:ABYG:JGC&e=RETAIL', 'images/01.jpg', "답십리대우", '서울시 동대문구 답십리로41길 33', '3.5', '12'), 37.573660, 127.053362, 1, '<i class="im im-icon-Home-3"></i>'],
			[locationData('https://new.land.naver.com/complexes/8828?ms=37.568831,127.043633,17&a=APT:ABYG:JGC&e=RETAIL', 'images/마장신성미소지움.jpg', '마장신성미소지움', '서울시 성동구 마장로39길 43', '5.0', '23'), 37.569440, 127.043841, 2, '<i class="im im-icon-Building"></i>'],
			[locationData('https://new.land.naver.com/complexes/112462?ms=37.563586,127.039093,17&a=APT:ABYG:JGC&e=RETAIL', 'images/삼성홈타운.jpg', '삼성홈타운', '서울시 성동구 마조로15길 23', '2.0', '17'), 37.563659, 127.039060, 3, '<i class="im im-icon-Home-2"></i>'],
			[locationData('https://new.land.naver.com/complexes/3276?ms=37.576932,127.060522,17&a=APT:ABYG:JGC&e=RETAIL', 'images/전농SK.jpg', '전농SK', '서울시 동대문구 사가정로 148', '5.0', '31'), 37.577113, 127.061261, 4, '<i class="im im-icon-Home-2"></i>'],
			[locationData('https://new.land.naver.com/complexes/22692?ms=37.567307,127.031268,17&a=APT:ABYG:JGC&e=RETAIL', 'images/청계대주파크빌.jpg', '청계대주파크빌', '서울시 성동구 무학로12길 11', '3.5', '46'), 37.567562, 127.031473, 5, '<i class="im im-icon-Office"></i>'],
			[locationData('https://new.land.naver.com/complexes/107610?ms=37.6055433,126.9239487,16&a=APT:ABYG:JGC&e=RETAIL', 'images/북한산푸르지오.jpg', '북한산푸르지오', '서울시 은평구 통일로 660', '3.5', '46'), 37.606533, 126.936878, 5, '<i class="im im-icon-Home-2"></i>'],

		];


		// ----------------------------------------------- //
		// Map Provider
		// ----------------------------------------------- //

		// Open Street Map 
		// -----------------------//
		L.tileLayer(
			'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> Contributors',
			maxZoom: 18,
		}).addTo(map);


		// MapBox (Requires API Key)
		// -----------------------//
		// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}', {
		//     attribution: " &copy;  <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> &copy;  <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
		//     maxZoom: 18,
		//     id: 'mapbox.streets',
		//     accessToken: 'ACCESS_TOKEN'
		// }).addTo(map);


		// ThunderForest (Requires API Key)
		// -----------------------//
		// var ThunderForest_API_Key = 'API_KEY';
		// var tileUrl = 'https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey='+ThunderForest_API_Key,
		// layer = new L.TileLayer(tileUrl, {maxZoom: 18});
		// map.addLayer(layer);


		// ----------------------------------------------- //
		// Markers
		// ----------------------------------------------- //
		markers = L.markerClusterGroup({
			spiderfyOnMaxZoom: true,
			showCoverageOnHover: false,
		});

		for (var i = 0; i < locations.length; i++) {

			var listeoIcon = L.divIcon({
				iconAnchor: [20, 51], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -51],
				className: 'listeo-marker-icon',
				html: '<div class="marker-container">' +
					'<div class="marker-card">' +
					'<div class="front face">' + locations[i][4] + '</div>' +
					'<div class="back face">' + locations[i][4] + '</div>' +
					'<div class="marker-arrow"></div>' +
					'</div>' +
					'</div>'
			}
			);

			var popupOptions =
			{
				'maxWidth': '270',
				'className': 'leaflet-infoBox'
			}
			var markerArray = [];
			marker = new L.marker([locations[i][1], locations[i][2]], {
				icon: listeoIcon,

			})
				.bindPopup(locations[i][0], popupOptions);
			//.addTo(map);
			marker.on('click', function (e) {

				// L.DomUtil.addClass(marker._icon, 'clicked');
			});
			map.on('popupopen', function (e) {
				//   L.DomUtil.addClass(e.popup._source._icon, 'clicked');


				// }).on('popupclose', function (e) {
				//   if(e.popup){
				//     L.DomUtil.removeClass(e.popup._source._icon, 'clicked');  
				//   }

			});
			markers.addLayer(marker);
		}
		map.addLayer(markers);


		markerArray.push(markers);
		if (markerArray.length > 0) {
			map.fitBounds(L.featureGroup(markerArray).getBounds().pad(0.2));
		}


		// Custom Zoom Control
		map.removeControl(map.zoomControl);

		var zoomOptions = {
			zoomInText: '<i class="fa fa-plus" aria-hidden="true"></i>',
			zoomOutText: '<i class="fa fa-minus" aria-hidden="true"></i>',
		};

		// Creating zoom control
		var zoom = L.control.zoom(zoomOptions);
		zoom.addTo(map);

	}


	// ----------------------------------------------- //
	// Single Listing Map
	// ----------------------------------------------- //
	function singleListingMap() {

		var lng = parseFloat($('#singleListingMap').data('longitude'));
		var lat = parseFloat($('#singleListingMap').data('latitude'));
		var singleMapIco = "<i class='" + $('#singleListingMap').data('map-icon') + "'></i>";

		var listeoIcon = L.divIcon({
			iconAnchor: [20, 51], // point of the icon which will correspond to marker's location
			popupAnchor: [0, -51],
			className: 'listeo-marker-icon',
			html: '<div class="marker-container no-marker-icon ">' +
				'<div class="marker-card">' +
				'<div class="front face">' + singleMapIco + '</div>' +
				'<div class="back face">' + singleMapIco + '</div>' +
				'<div class="marker-arrow"></div>' +
				'</div>' +
				'</div>'

		}
		);

		var mapOptions = {
			center: [lat, lng],
			zoom: 13,
			zoomControl: false,
			gestureHandling: true
		}

		var map_single = L.map('singleListingMap', mapOptions);
		var zoomOptions = {
			zoomInText: '<i class="fa fa-plus" aria-hidden="true"></i>',
			zoomOutText: '<i class="fa fa-minus" aria-hidden="true"></i>',
		};

		// Zoom Control
		var zoom = L.control.zoom(zoomOptions);
		zoom.addTo(map_single);

		map_single.scrollWheelZoom.disable();

		marker = new L.marker([lat, lng], {
			icon: listeoIcon,
		}).addTo(map_single);

		// Open Street Map 
		// -----------------------//
		L.tileLayer(
			'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> Contributors',
			maxZoom: 18,
		}).addTo(map_single);


		// MapBox (Requires API Key)
		// -----------------------//
		// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}', {
		//     attribution: " &copy;  <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> &copy;  <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
		//     maxZoom: 18,
		//     id: 'mapbox.streets',
		//     accessToken: 'ACCESS_TOKEN'
		// }).addTo(map_single);


		// Street View Button URL
		$('a#streetView').attr({
			href: 'https://www.google.com/maps/search/?api=1&query=' + lat + ',' + lng + '',
			target: '_blank'
		});
	}

	// Single Listing Map Init
	if (document.getElementById("singleListingMap") !== null) {
		singleListingMap();
	}


});
///// MAPS /////

/*** Function to add comma to string numbers ***/
String.prototype.commafy = function() {
    return this.replace(/(^|[^\w.])(\d{4,})/g, function($0, $1, $2) {
        return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
    });
};

var mapSpreadsheetID = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ/1'
var mapUrl = 'https://spreadsheets.google.com/feeds/list/' + mapSpreadsheetID + '/public/full?alt=json';
var tab1Data = "./data/tab_1.json";

/// BUBBLE CASE MAP
$.getJSON(tab1Data, function(data) {
    var output = data.feed.entry;
    var countyCoordinates = {
        'type': 'FeatureCollection',
        'features': []
    };
    console.log(output);

    for (i = 0; i < output.length; i++) {
        var longitude = (output[i].gsx$longitude.$t);
        var latitude = (output[i].gsx$latitude.$t);
        var coordinates = JSON.parse('[' + longitude + ', ' + latitude + ']');

        countyCoordinates.features.push({
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': coordinates
            },
            'properties': {
                'name': output[i].gsx$county.$t,
                'number_of_cases': output[i].gsx$numberofcases.$t,
                'number_of_deaths': output[i].gsx$numberofdeaths.$t,
            }
        });
    }

    var map = L.map('map', {
        center: [39.001, -105.7821],
        zoom: 7,
        minZoom: 5,
        maxZoom: 10,
        scrollWheelZoom: false,
        preferCanvas: true
    });

    var basemap = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
        subdomains: "abcd",
        maxZoom: 19
    });
    basemap.addTo(map);

    /// COUNTY LAYER
    var countyStyle = {
        "color": "#ccc",
        "weight": .5,
        "fillOpacity": 0
    };

    var countyJsonLayer = new L.GeoJSON.AJAX('./scripts/colorado_county_boundaries.json', { style: countyStyle }).addTo(map);

    /// CIRCLE LAYERS
    var casesLayer = L.geoJSON(countyCoordinates, {
        pointToLayer: function(feature, latlng) {
            var circleRadius;
            var circleBorder;

            if (feature.properties.number_of_cases > 0) {
                casesCircleRadius = (Math.sqrt(feature.properties.number_of_cases) * .2)
            } else {
                casesCircleRadius = 0
            };

            var casesCircle = {
                radius: casesCircleRadius,
                fillColor: "blue",
                color: "#000",
                weight: 0,
                opacity: .75,
                fillOpacity: .35
            };

            var popupText = '<h3 class="popup-header">' + feature.properties.name + ' County</h3><hr><div class="popup-container">Confirmed cases: <strong>' + (feature.properties.number_of_cases).commafy() + '</strong><br>Deaths: <strong>' + feature.properties.number_of_deaths + '</strong><br><br><a href="https://www.denverpost.com/tag/coronavirus-colorado/" target="_blank"><em>Read the latest coronavirus stories</em></a></div>';

            if (feature.properties.number_of_cases != '') {
                return L.circleMarker(latlng, casesCircle).bindPopup(popupText)
            }
        }
    }).addTo(map);

    var deathsLayer = L.geoJSON(countyCoordinates, {
        pointToLayer: function(feature, latlng) {
            var circleRadius;
            var circleBorder;

            if (feature.properties.number_of_deaths > 0) {
                deathsCircleRadius = (Math.sqrt(feature.properties.number_of_deaths) * .2)
            } else {
                deathsCircleRadius = 0
            };

            var deathsCircle = {
                radius: deathsCircleRadius,
                fillColor: "red",
                color: "#000",
                weight: 0,
                opacity: 0,
                fillOpacity: .75
            };

            var popupText = '<h3 class="popup-header">' + feature.properties.name + ' County</h3><hr><div class="popup-container">Confirmed cases: <strong>' + feature.properties.number_of_cases + '</strong><br>Deaths: <strong>' + feature.properties.number_of_deaths + '</strong><br><br><a href="https://www.denverpost.com/tag/coronavirus-colorado/" target="_blank"><em>Read the latest coronavirus stories</em></a></div>';

            if (feature.properties.number_of_deaths != 0) {
                return L.circleMarker(latlng, deathsCircle).bindPopup(popupText)
            }
        }
    }).addTo(map);

    /// CHOROPLETH RATE MAP
    var geojsonCounties = {
        'type': 'FeatureCollection',
        'features': []
    };

    for (i = 0; i < output.length; i++) {
        var coords = JSON.parse(output[i].gsx$geometry.$t);

        geojsonCounties.features.push({
            'type': 'Feature',
            'geometry': {
                'type': 'MultiPolygon',
                'coordinates': coords
            },
            'properties': {
                'name': output[i].gsx$county.$t,
                'number_of_cases': output[i].gsx$numberofcases.$t,
                'number_of_deaths': output[i].gsx$numberofdeaths.$t,
                'population': output[i].gsx$population.$t,
                'all_vaccinated_pct': output[i].gsx$allvaccinatedpct.$t,
                'teen_vaccinated_pct': output[i].gsx$teenvaccinatedpct.$t,
                'elderly_vaccinated_pct': output[i].gsx$elderlyvaccinatedpct.$t
            }
        });
    }

    var rateMap = L.map('rate-map', {
        center: [39.001, -105.7821],
        zoom: 7,
        minZoom: 5,
        maxZoom: 10,
        scrollWheelZoom: false,
        preferCanvas: true
    });

    var vaccinationMap = L.map('vaccination-map', {
        center: [39.001, -105.7821],
        zoom: 7,
        minZoom: 5,
        maxZoom: 10,
        scrollWheelZoom: false,
        preferCanvas: true
    });

    let vaccinationBaseMap = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
        subdomains: "abcd",
        maxZoom: 19
    });
    let rateBaseMap = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
        subdomains: "abcd",
        maxZoom: 19
    });
    vaccinationBaseMap.addTo(vaccinationMap);
    rateBaseMap.addTo(rateMap);


    L.geoJSON(geojsonCounties, {
        style: function(feature) {
            var cases = feature.properties.number_of_cases;
            var population = feature.properties.population;
            var rate = ((cases / population) * 100000);
            var fillColor;
            var borderColor;
            // Green color ramp (light to dark): ['#f7fbff','#deebf7','#c6dbef','#9ecae1','#6baed6','#4292c6','#2171b5','#08519c','#08306b']
            if (rate > 9000) fillColor = '#08306b';
            else if (rate > 6000) fillColor = '#2171b5';
            else if (rate > 3000) fillColor = '#6baed6';
            else if (rate > 0) fillColor = '#c6dbef';
            else fillColor = '#ccc';
            return {
                color: '#000000',
                opacity: .33,
                weight: 2,
                fillColor: fillColor,
                fillOpacity: .66
            }
        },

        onEachFeature: function(feature, layer) {
            var cases = feature.properties.number_of_cases;
            var population = feature.properties.population;
            var rate = ((cases / population) * 100000).toFixed(1);
            var rateText;

            if (cases <= 5) {
                rateText = '*'
            } else rateText = rate.commafy();

            var popupText;
            if (cases == '') {
                popupText = '<h3 class="popup-header">' + feature.properties.name + ' County</h3><hr><div class="popup-container"><em>No cases reported</em></div>';
            } else popupText = '<h3 class="popup-header">' + feature.properties.name + ' County</h3><hr><div class="popup-container">Confirmed cases: <strong>' + cases.commafy() + '</strong><br>Case rate: <strong>' + rateText + '</strong><br>Deaths: <strong>' + feature.properties.number_of_deaths + '</strong><br><br><a href="https://www.denverpost.com/tag/coronavirus-colorado/" target="_blank"><em>Read the latest coronavirus stories</em></a></div>';
            layer.bindPopup(
                popupText
            )
        }
    }).addTo(rateMap)

    L.geoJSON(geojsonCounties, {
        style: function(feature) {
            var vaccinatedPct = feature.properties.all_vaccinated_pct;
            //var population = feature.properties.population;
            //var rate = ((cases / population) * 100000);
            var fillColor;
            var borderColor;
            // Breen color ramp (light to dark): ['#edf8e9','#bae4b3','#74c476','#238b45']
            if (vaccinatedPct > 75) fillColor = '#238b45';
            else if (vaccinatedPct > 50) fillColor = '#74c476';
            else if (vaccinatedPct > 25) fillColor = '#bae4b3';
            else if (vaccinatedPct > 0) fillColor = '#edf8e9';
            else fillColor = '#ccc';
            return {
                color: '#000000',
                opacity: .33,
                weight: 2,
                fillColor: fillColor,
                fillOpacity: .77
            }
        },

        onEachFeature: function(feature, layer) {

            var popupText;
            popupText = '<h3 class="popup-header">' + feature.properties.name + ' County</h3><hr><div class="popup-container">Total vaccinated: <strong>' + feature.properties.all_vaccinated_pct + '%</strong><br>Age 18+ vaccinated: <strong>' + feature.properties.teen_vaccinated_pct + '%</strong><br>Age 65+ vaccinated: <strong>' + feature.properties.elderly_vaccinated_pct + '%</strong><br><br><a href="https://www.denverpost.com/tag/coronavirus-colorado/" target="_blank"><em>Read the latest coronavirus stories</em></a></div>';
            layer.bindPopup(
                popupText
            )
        }
    }).addTo(vaccinationMap)
});
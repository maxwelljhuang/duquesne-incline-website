/*
Citations for Google Maps embed:
https://developers.google.com/maps/documentation/javascript/adding-a-google-map
https://www.w3schools.com/jsref/api_web.asp
https://www.w3schools.com/js/js_api_intro.asp
*/

function initMap() {
    const lowerStation = { lat: 40.4419, lng: -80.0227 };
    
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: lowerStation,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        navigationControl: true,
        scrollwheel: false,
        streetViewControl: true,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        }
    });
    
    const lowerMarker = new google.maps.Marker({
        position: lowerStation,
        map: map,
        title: 'Duquesne Incline Lower Station',
        animation: google.maps.Animation.DROP,
        icon: {
            url: '../static/images/marker-red.png',
            scaledSize: new google.maps.Size(30, 40)
        }
    });
    
    const upperStation = { lat: 40.4417, lng: -80.0205 };
    
    const upperMarker = new google.maps.Marker({
        position: upperStation,
        map: map,
        title: 'Duquesne Incline Upper Station',
        animation: google.maps.Animation.DROP,
        icon: {
            url: '../static/images/marker-red.png',
            scaledSize: new google.maps.Size(30, 40)
        }
    });
    
    const lowerInfoContent = `
        <div class="map-info-window">
            <h3>Duquesne Incline Lower Station</h3>
            <p>1197 West Carson Street<br>Pittsburgh, PA 15219</p>
            <p><strong>Hours:</strong><br>
               Monday-Saturday: 5:30 AM - 12:30 AM<br>
               Sunday: 7:00 AM - 12:30 AM</p>
            <p><a href="https://maps.google.com/maps?daddr=40.4419,-80.0227" target="_blank">Get Directions</a></p>
        </div>
    `;
    
    const upperInfoContent = `
        <div class="map-info-window">
            <h3>Duquesne Incline Upper Station</h3>
            <p>1220 Grandview Avenue<br>Pittsburgh, PA 15211</p>
            <p><strong>Features:</strong> Observation Deck, Museum, Gift Shop</p>
            <p><a href="https://maps.google.com/maps?daddr=40.4417,-80.0205" target="_blank">Get Directions</a></p>
        </div>
    `;
    
    const lowerInfoWindow = new google.maps.InfoWindow({
        content: lowerInfoContent,
        maxWidth: 300
    });
    
    const upperInfoWindow = new google.maps.InfoWindow({
        content: upperInfoContent,
        maxWidth: 300
    });
    
    lowerMarker.addListener('click', function() {
        upperInfoWindow.close(); 
        lowerInfoWindow.open(map, lowerMarker);
    });
    
    upperMarker.addListener('click', function() {
        lowerInfoWindow.close(); 
        upperInfoWindow.open(map, upperMarker);
    });
    
    const inclinePath = new google.maps.Polyline({
        path: [lowerStation, upperStation],
        geodesic: true,
        strokeColor: '#A41C1C',
        strokeOpacity: 1.0,
        strokeWeight: 4
    });
    
    inclinePath.setMap(map);
    
    google.maps.event.addDomListener(window, 'resize', function() {
        const center = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
    });
    
    lowerInfoWindow.open(map, lowerMarker);
    
    const styledMapType = new google.maps.StyledMapType(
        [
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [{"saturation": "-100"}]
            },
            {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {"saturation": -100},
                    {"lightness": 65},
                    {"visibility": "on"}
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {"saturation": -100},
                    {"lightness": 50},
                    {"visibility": "simplified"}
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{"saturation": "-100"}]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{"visibility": "simplified"}]
            },
            {
                "featureType": "road.arterial",
                "elementType": "all",
                "stylers": [{"lightness": "30"}]
            },
            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [{"lightness": "40"}]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {"saturation": -100},
                    {"visibility": "simplified"}
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {"hue": "#ffff00"},
                    {"lightness": -25},
                    {"saturation": -97}
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [
                    {"lightness": -25},
                    {"saturation": -100}
                ]
            }
        ],
        {name: 'Styled Map'}
    );
    
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
}

function loadGoogleMaps() {
    const mapElement = document.getElementById('map');
    
    if (mapElement) {
        const placeholder = mapElement.querySelector('.map-placeholder');
        if (placeholder) {
            placeholder.style.display = 'none';
        }
        
        const script = document.createElement('script');
        
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAZ35ve5zvZ0_haXPndHHHVqKzc-VGHDnk&callback=initMap';
        script.async = true;
        script.defer = true;
        
        script.onerror = function() {
            console.error('Failed to load Google Maps API');
            if (placeholder) {
                placeholder.style.display = 'flex';
                placeholder.innerHTML = '<p>Sorry, we\'re having trouble loading the map. Please try again later.</p>';
            }
        };
        
        document.head.appendChild(script);
    }
}

function addMapStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .map-info-window {
            font-family: 'Open Sans', Arial, sans-serif;
            padding: 5px;
        }
        .map-info-window h3 {
            color: #A41C1C;
            margin-top: 0;
            margin-bottom: 10px;
            font-size: 16px;
        }
        .map-info-window p {
            margin: 5px 0;
            font-size: 14px;
        }
        .map-info-window a {
            color: #A41C1C;
            text-decoration: none;
            font-weight: 600;
        }
        .map-info-window a:hover {
            text-decoration: underline;
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', function() {
    addMapStyles();
    
    loadGoogleMaps();
});
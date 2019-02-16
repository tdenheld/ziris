// google maps
// ------------------------------------------------------------------
// ------------------------------------------------------------------

function initMap() {
    var utrecht = {
        lat: 52.1158442,
        lng: 5.1082969
    };
    var map = new google.maps.Map(document.getElementById('js-map'), {
        zoom: 13,
        center: utrecht,
        disableDefaultUI: true,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f0f0f0"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#780080"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            }
        ]
    });

    // custom zoom buttons
    // ----------------------------
    $('.js-zoom-in').click(function () {
        map.setZoom(map.getZoom() + 1);
    });

    $('.js-zoom-out').click(function () {
        map.setZoom(map.getZoom() - 1);
    });
};

if ($("#js-map")[0]) {
    initMap();
};
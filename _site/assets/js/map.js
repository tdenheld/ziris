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
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "all",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
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
                "stylers": [{
                    "color": "#f0f0f0"
                }]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                        "visibility": "on"
                    },
                    {
                        "color": "#882290"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{
                    "visibility": "simplified"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }
        ]
    });


    // marker
    // ----------------------------
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(52.120997, 5.1079942),
        icon: {
            url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='56' viewBox='0 0 80 56'%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill:%23780080;%7D.b%7Bfill:%23fff;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3Emarker%3C/title%3E%3Cpath class='a' d='M78,46H43.969L40,56,35.988,46H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0H78a2,2,0,0,1,2,2V44A2,2,0,0,1,78,46Z'/%3E%3Cpath class='b' d='M23.419,31.163H12.236l6.186-9.1H12.986V19.4H23.557l-6.115,9.1h5.97v2.664Z'/%3E%3Cpath class='b' d='M28.152,31.163V19.4h3.38V31.163Z'/%3E%3Cpath class='b' d='M40.663,22.434a5.406,5.406,0,0,1,1.474-2.569,3.45,3.45,0,0,1,2.367-.852,7.876,7.876,0,0,1,1.061.115l.213.034-.514,3.664a4.464,4.464,0,0,0-.77-.223,4.374,4.374,0,0,0-.815-.074,2.8,2.8,0,0,0-2.231.794,4.05,4.05,0,0,0-.676,2.657v5.179H37.391V19.4h3.333Z'/%3E%3Crect class='b' x='49.872' y='19.398' width='3.381' height='11.765'/%3E%3Cpath class='b' d='M58,29.118l2.6-1.353a1.633,1.633,0,0,0,.7,1.075,2.848,2.848,0,0,0,2.729.088.952.952,0,0,0,.476-.845q0-.852-1.69-1.426c-.349-.12-.627-.22-.832-.3a8.378,8.378,0,0,1-2.853-1.572,2.658,2.658,0,0,1-.791-1.958,3.408,3.408,0,0,1,1.352-2.8,6.262,6.262,0,0,1,6.248-.432,3.794,3.794,0,0,1,1.67,1.8L65.139,22.64a1.808,1.808,0,0,0-.7-1.014,2.152,2.152,0,0,0-1.244-.338,2.128,2.128,0,0,0-1.207.311.949.949,0,0,0-.463.815q0,.876,2.309,1.633l.416.132a6.525,6.525,0,0,1,2.7,1.48,2.98,2.98,0,0,1,.808,2.15,3.324,3.324,0,0,1-1.352,2.783,5.9,5.9,0,0,1-3.627,1.014A6.547,6.547,0,0,1,59.7,30.93,3.38,3.38,0,0,1,58,29.118Z'/%3E%3Ccircle class='b' cx='51.562' cy='14.63' r='2.239'/%3E%3Ccircle class='b' cx='29.842' cy='14.63' r='2.239'/%3E%3C/svg%3E",
            anchor: new google.maps.Point(40, 56),
        },
        map: map,
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
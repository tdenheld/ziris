// google maps
// ------------------------------------------------------------------
// ------------------------------------------------------------------

'use strict';

(() => {
    if (!exists('#js-map')) return;

    const ziris = {
        lat: 52.120997,
        lng: 5.1079942
    }

    const mapCenter = {
        lat: 52.112,
        lng: 5.1079942
    }

    const map = new google.maps.Map(document.getElementById('js-map'), {
        zoom: 13,
        center: mapCenter,
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
                        "color": "#9835A0"
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
    const marker = new google.maps.Marker({
        position: new google.maps.LatLng(ziris.lat, ziris.lng),
        icon: {
            url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='66' height='43' viewBox='0 0 66 43'%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill:%23780080;%7D.b%7Bfill:%23fff;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3Emarker%3C/title%3E%3Cpath class='a' d='M64.5,33H36.969L33,43,28.988,33H1.5A1.5,1.5,0,0,1,0,31.5V1.5A1.5,1.5,0,0,1,1.5,0h63A1.5,1.5,0,0,1,66,1.5v30A1.5,1.5,0,0,1,64.5,33Z'/%3E%3Cpath class='b' d='M18.667,22.921H9l5.348-7.867h-4.7v-2.3h9.138L13.5,20.618h5.161v2.3Z'/%3E%3Cpath class='b' d='M22.758,22.921V12.751H25.68v10.17Z'/%3E%3Cpath class='b' d='M33.573,15.375a4.677,4.677,0,0,1,1.275-2.221,2.98,2.98,0,0,1,2.045-.736,6.744,6.744,0,0,1,.918.1l.184.029-.444,3.168a3.856,3.856,0,0,0-.667-.193,3.778,3.778,0,0,0-.7-.064,2.419,2.419,0,0,0-1.929.687,3.508,3.508,0,0,0-.584,2.3v4.477H30.745V12.748h2.881Z'/%3E%3Crect class='b' x='41.534' y='12.751' width='2.922' height='10.17'/%3E%3Cpath class='b' d='M48.562,21.153l2.247-1.169a1.413,1.413,0,0,0,.608.929,2.463,2.463,0,0,0,2.358.076.825.825,0,0,0,.412-.731q0-.736-1.461-1.233-.453-.154-.719-.26a7.228,7.228,0,0,1-2.466-1.359,2.294,2.294,0,0,1-.684-1.692A2.941,2.941,0,0,1,50.026,13.3a5.412,5.412,0,0,1,5.4-.375,3.276,3.276,0,0,1,1.444,1.552l-2.139,1.079a1.561,1.561,0,0,0-.605-.877,1.86,1.86,0,0,0-1.076-.292,1.833,1.833,0,0,0-1.043.268.819.819,0,0,0-.4.705q0,.756,2,1.411l.359.114a5.646,5.646,0,0,1,2.338,1.28,2.581,2.581,0,0,1,.7,1.859,2.873,2.873,0,0,1-1.169,2.405,5.106,5.106,0,0,1-3.135.876,5.653,5.653,0,0,1-2.668-.584A2.925,2.925,0,0,1,48.562,21.153Z'/%3E%3Ccircle class='b' cx='42.995' cy='8.629' r='1.935'/%3E%3Ccircle class='b' cx='24.219' cy='8.629' r='1.935'/%3E%3C/svg%3E",
            anchor: new google.maps.Point(33, 43),
        },
        map: map,
    });

    // custom zoom buttons
    // ----------------------------
    document.querySelector('.js-zoom-in').onclick = () => map.setZoom(map.getZoom() + 1);
    document.querySelector('.js-zoom-out').onclick = () => map.setZoom(map.getZoom() - 1);

})()
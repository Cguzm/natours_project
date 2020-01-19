/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiY2d1em0iLCJhIjoiY2p6bG4yOXR4MDFuNDNobGN4c2dodW1oOSJ9.ytttzHMLE90vtGPM0iHrWA';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/cguzm/ck37f0opa0nvd1cmue2f7ffs6',
    //   center: [-118.113491, 34.111745],
    //   zoom: 7,
    scrollZoom: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    //Create marker
    const el = document.createElement('div');
    el.className = 'marker';
    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extends map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};

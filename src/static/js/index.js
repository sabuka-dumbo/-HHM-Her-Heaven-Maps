mapboxgl.accessToken = 'pk.eyJ1IjoiaWFqYWlhbmkiLCJhIjoiY20yN2N2YmhqMHNpazJqczY1aHh1amozNyJ9.McX0Sqvz-XPteiB4gOpquA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.5, 40],
    zoom: 9
});
const marker = new mapboxgl.Marker()
    .setLngLat([-74.5, 40])
    .addTo(map);
map.on('click', (event) => {
    const coordinates = event.lngLat;
    alert(`You clicked on: ${coordinates}`);
});
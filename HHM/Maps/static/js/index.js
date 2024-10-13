const rating_div = document.getElementById("rating_div");
let Longitude = '';
let Latitude = '';

// Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiaWFqYWlhbmkiLCJhIjoiY20yNmlwM3UwMTQyZzJrc2R3anJyNWxtbyJ9.FEmpcyUrij-5j8VVlJwXzg'; // Replace with your Mapbox access token

const map = new mapboxgl.Map({
    container: 'map', // Container ID
    style: 'mapbox://styles/mapbox/streets-v12', // Map style to use
    center: [41.6369, 41.6168], // Starting position [lng, lat] (Batumi, Georgia)
    zoom: 13 // Starting zoom level
});

// Event listener for click (left click)
map.on('click', (e) => {
    const lngLat = e.lngLat; // Get the coordinates of the click

    rating_div.style.display = "block";
    Longitude = lngLat.lng.toFixed(4);
    Latitude = lngLat.lat.toFixed(4)
    console.log(Longitude, " da ", Latitude)
});


const burgermenu = document.getElementById("burgermenu");
const span1 = document.getElementById("span1");
const span2 = document.getElementById("span2");
const span3 = document.getElementById("span3");
const bar = document.getElementById("search");

let opened = false;
let cooldown = false;

function handleAnimationEnd() {
    bar.style.animation = '';
    span1.style.animation = '';
    span2.style.animation = '';
    span3.style.animation = '';

    if (opened) {
        bar.style.left = "-300px";
        bar.style.display = "none";
        span1.style.rotate = "0deg";
        span1.style.top = "0vw";
        span2.style.opacity = "1";
        span3.style.rotate = "0deg";
        span3.style.top = "0vw";
        opened = false;
    } else {
        bar.style.left = "100px";
        span1.style.rotate = "45deg";
        span1.style.top = "3.5vw";
        span2.style.opacity = "0";
        span3.style.rotate = "-45deg";
        span3.style.top = "-3.5vw";
        opened = true;
    }

    cooldown = false;
    span1.removeEventListener("animationend", handleAnimationEnd);
}

burgermenu.addEventListener("click", function() {
    if (!cooldown) {
        cooldown = true;
        if (!opened) {
            bar.style.animation = "ease 1s bar_open";
            bar.style.display = "block";
            span1.style.animation = "ease 1s span1_open";
            span2.style.animation = "ease 1s span2_open";
            span3.style.animation = "ease 1s span3_open";
        } else {
            bar.style.animation = "ease 1s bar_close";
            span1.style.animation = "ease 1s span1_close";
            span2.style.animation = "ease 1s span2_close";
            span3.style.animation = "ease 1s span3_close";
        }

        span1.addEventListener("animationend", handleAnimationEnd);
    }
});


const star1 = document.getElementById("star1");
const star2 = document.getElementById("star2");
const star3 = document.getElementById("star3");
const star4 = document.getElementById("star4");
const star5 = document.getElementById("star5");
const back_rate = document.getElementById("rate_back");
const front_rate = document.getElementById("rate_front");
const textarea_rate = document.getElementById("textarea_rate");
const submit = document.getElementById("submit_rate");

back_rate.addEventListener("click", function() {
    rating_div.style.display = "none";
    textarea_rate.value = '';
    star1.style.color = "orange";
    star2.style.color = "gray";
    star3.style.color = "gray";
    star4.style.color = "gray";
    star5.style.color = "gray";
})

star1.addEventListener("click", function() {
    star1.style.color = "orange";
    star2.style.color = "gray";
    star3.style.color = "gray";
    star4.style.color = "gray";
    star5.style.color = "gray";
})

star2.addEventListener("click", function() {
    star1.style.color = "orange";
    star2.style.color = "orange";
    star3.style.color = "gray";
    star4.style.color = "gray";
    star5.style.color = "gray";
})

star3.addEventListener("click", function() {
    star1.style.color = "orange";
    star2.style.color = "orange";
    star3.style.color = "orange";
    star4.style.color = "gray";
    star5.style.color = "gray";
})

star4.addEventListener("click", function() {
    star1.style.color = "orange";
    star2.style.color = "orange";
    star3.style.color = "orange";
    star4.style.color = "orange";
    star5.style.color = "gray";
})

star5.addEventListener("click", function() {
    star1.style.color = "orange";
    star2.style.color = "orange";
    star3.style.color = "orange";
    star4.style.color = "orange";
    star5.style.color = "orange";
})

submit.addEventListener("click", function() {
    fetch("/info/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({  }),
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
        console.error('Error:', error);
    });
})
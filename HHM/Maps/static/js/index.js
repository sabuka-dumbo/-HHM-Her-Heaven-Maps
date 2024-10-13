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
    let rate = 0
    if (star1.style.color == "orange") {
        rate++;
    }
    if (star2.style.color == "orange") {
        rate++;
    }
    if (star3.style.color == "orange") {
        rate++;
    }
    if (star4.style.color == "orange") {
        rate++;
    }
    if (star5.style.color == "orange") {
        rate++;
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    
    const csrftoken = getCookie('csrftoken');
    
    fetch("/rate/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({ 
            Long: Longitude, 
            Lang: Latitude, 
            reason: textarea_rate.value, 
            rate: rate 
        }),
    })
    .then(response => response.json())
    .then(data => {
        rating_div.style.display = "none";
        textarea_rate.value = '';
        star1.style.color = "orange";
        star2.style.color = "gray";
        star3.style.color = "gray";
        star4.style.color = "gray";
        star5.style.color = "gray";
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
})

const reason_div = document.getElementById("reason_div");
const reason_text = document.getElementById("reason_text");

function showLocation(one, two, text, user, current) {
    console.log(one, two)

    new mapboxgl.Marker()
        .setLngLat([one, two])
        .addTo(map); 

    map.flyTo({
        center: [one, two],
        essential: true 
    });

    if (text < 1) {
        text = 'No additional comment!'
    }

    if (user == current) {
        reason_div.innerHTML = `
            <h1 class="reason_text" id="reason_text">${text}</h1>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill reason_icon" viewBox="0 0 16 16">
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
            </svg>
        `;
    } else {
        reason_div.innerHTML = `
        <h1 class="reason_text" id="reason_text">${text}</h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill reason_icon" viewBox="0 0 16 16" onclick="favorite('${one}', '${two}', ${user})">>
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
    `; 
    }


    reason_div.style.animation = "open_reason ease 1s";
    reason_div.style.display = "block";

    reason_div.addEventListener("animationend", function() {
        reason_div.style.animation = '';
        reason_div.style.top = "0px";
        reason_div.style.display = "block"

        setInterval(function() {
            reason_div.style.animation = "ease 1s close_reason";

            reason_div.addEventListener('animationend', function() {
                reason_div.style.animation = '';
                reason_div.style.display = "none";
            })
        }, 10000);
    })
}

function favorite(one, two, user) {
    console.log(one,two,user)
}
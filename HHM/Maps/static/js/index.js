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

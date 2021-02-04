//Hash Lookup
//To be implemented
var HOME_HASH = ""
var HASH2URL  = {};

//Content Serving
async function fetchHtmlAsText(url) {
    return await (await fetch(url)).text();
}

async function loadtext(url) {
    const contentDiv = document.getElementById("content-index");
    contentDiv.innerHTML = await fetchHtmlAsText(url);
}

function loadPage(hash) {
    if (hash !== '') {
        loadtext(hash.concat(".html"));
    } else {
        loadtext("home".concat(".html"));
    }
}

//Routing Hash Function
window.onhashchange = function() { //Must assign a function to onhashchange
    hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
    loadPage(hash);
}
window.onhashchange();
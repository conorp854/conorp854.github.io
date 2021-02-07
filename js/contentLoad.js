//Hash Lookup
//To be implemented
var HOME_HASH = ""
var HASH2URL  = {};
var HASH2FUNC = {
    "projects/projects_quant_cnot" : cnot_init
};

//Content Serving
async function fetchAsText(url) {
    return await (await fetch(url)).text();
}

async function loadtext(url,script_init) {
    const contentDiv = document.getElementById("content-index");
    contentDiv.innerHTML = await fetchAsText(url);
    if(script_init){
        console.log("running script")
        script_init()
    }
    //renderMathInElement(document.body);
}

function loadPage(hash,script_init) {
    if (hash !== '') {
        loadtext(hash.concat(".html"),script_init);
    } else {
        loadtext("home".concat(".html"),script_init);
    }
}

//Routing Hash Function
window.onhashchange = function() { //Must assign a function to onhashchange
    hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
    script_init = HASH2FUNC[hash];
    loadPage(hash,script_init);
}
window.onhashchange();
renderMathInElement(document.body);//Load math on page
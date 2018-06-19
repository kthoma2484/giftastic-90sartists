$(document).ready(function() {

let place = {};

// URL to search Giphy for the destination added
let queryURL = "https://api.giphy.com/v1/gifs/search?"
+ place + "&api_key=HMBc7lp8ehd8TN5zb2kiFunqqIjMvfEU&q=&limit=10";

// make ajax GET request
$.ajax({
    url: queryURL,
    method: "GET"
}).then (function(response) {
    // store an array of results in results variable
    let results = ".....";

    // loop over every result item
    for (let i=0; i < results.length; i++) {

        // only include gifs with appropriate rating
        if (results[i].rating !== "r") {

            // create element for each gif
            let gifElem = $("<div class='item'>");

            
        }
    }
})

});
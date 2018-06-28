$(function () {

    let artistList = ["Janet Jackson", "R.Kelly", "Mariah Carey", "Boyz II Men", "TLC", "Monica", "Mary J Blige", "LL Cool J", "Tupac"]
    console.log(artistList)
    // store an array of response.data in response.data variable
    let gifButtons = [];
    let rating = "";
    let uniqueId = "";
    let imgStill = "";
    let imgMove = "";
    let title = "";
    let artistGif = "";
 
    function ajaxCall() {
        console.log(artistGif + "this is search term")
        let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HMBc7lp8ehd8TN5zb2kiFunqqIjMvfEU&q=";

        $.ajax({
            // make ajax GET request
            url: queryURL + encodeURIComponent(artistGif),
            method: "GET"
        })
        .then(function (response) {
        
            console.log(response)
            for (let i = 0; i < 10; i++) {

                // store the result item's rating, image, and title
                rating = response.data[i].rating;
                uniqueId = response.data[i].id;
                imageSrc = response.data[i].images.fixed_height_still.url;
                imgStill = response.data[i].images.fixed_height_still.url;
                imgMove = response.data[i].images.fixed_height.url;
                title = response.data[i].title;
    
                // only include gifs with appropriate rating
                if (response.data[i].rating !== "r") {
                        
                    // create a card for each gif
                    let gifCard = $("<div class='card gifCard' style='width: 18rem;margin:10px'>");
                    gifCard.attr("data-name", uniqueId);
                    console.log(i + " + was created")
    
                    // create an image tag with src property and response result
                    let gifImage = $("<img class='card-img-top gif-here'>");
                    gifImage.attr("src", imageSrc);
                    gifImage.attr("data-still", imgStill);
                    gifImage.attr("data-animate", imgMove);
                    gifImage.attr("data-state", 'still')

                    // Create a heading tag with the result item's rating
                    let p = $("<p>")
                    p.text("Rating: " + rating);
    
                    // Create a title for the gif
                    let h5 = $("<h5 class='title'>")
                    h5.text("Title: " + title);
                    
                    // prepend the gifCard to the card-body div in html
                    $("#gif-add").prepend(gifCard);
    
                    // append the rating header and image to the gifElem
                    $("[data-name='" + uniqueId + "']").append(gifImage);
                    $("[data-name='" + uniqueId + "']").append(h5);
                    $("[data-name='" + uniqueId + "']").append(p);

                }

            }
            // unbind/clear prior click target events and free up DOM
            $(".gif-here").unbind();
            // start and pause gif animation 
            $(".gif-here").on("click", function () {
                console.log('gif was clicked');
                let state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                  } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                  }
            });
            // add new search to artist array for button pop pull only if not in index
            if (artistList.indexOf(artistGif) === -1) {
                artistList.push(artistGif);
            }
            // populate buttons on page load with new search button
            popList();
        });
    }

    // run search for new input value
    function gifSearch() {
        artistGif = $("#artist").val().trim();
        ajaxCall();
    }

    // see above
    function popList () {
        $("#buttons-here").html("");
        for (var i = 0; i < artistList.length; i++) {
            
            uniqueId = artistList[i];

            // create search button
            var a = $("<button>");
            
            // Adding a class of gif-btn to our button
            a.addClass("gif-btn");
          
            // Providing the gif-btn text
            a.text(artistList[i]);

            // Adding a data-attribute
            a.attr("data-name", uniqueId);

            // Add the button to the buttons-here div
            $("#buttons-here").append(a);

    }
    $(".gif-btn").unbind();
    // empty prior gif searches and search button specific gifs
    $(".gif-btn").on("click", function(target) {
        $("#gif-add").empty();
        artistGif = $(this).attr("data-name");
        console.log(artistGif);
        ajaxCall();
    });
}
// populate buttons on page load
 popList();

    // This function handles events when a gif button is clicked
    $("#target").submit(function(event) {
        event.preventDefault();
    
        //  Get the input from the textbox
        artistGif = $("#artist").val().trim();

        // Call function to display gifs
        gifSearch();

        // clear gif display section for new search of all prior search gifs
        $("#gif-add").empty();

    });

});
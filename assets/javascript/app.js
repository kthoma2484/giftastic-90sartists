$(function () {

    let artistList = ["SWV", "Boys 2 Men", "Escape", "Mint Condition", "LL Cool J", "Tupac"]

    // store an array of response.data in response.data variable
    let gifButtons = [];
    let rating = "";
    let uniqueId = "";
    let imgStill = "";
    let imgMove = "";
    let title = "";
    let artistGif = "";
 
    function gifSearch() {
        
        artistGif = $("#artist").val().trim();

        console.log(artistGif + "this is search term")
        let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HMBc7lp8ehd8TN5zb2kiFunqqIjMvfEU&q=";

        $.ajax({
            // make ajax GET request
            url: queryURL + encodeURIComponent(artistGif),
            method: "GET"
        })
        .then(function (response) {
         //   responseArray.push(response.data);
          //  console.log(responseArray);
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
                    gifCard.attr("data-number", uniqueId);
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
                    
                    // create a favorites star
                    let fav = $("<div class='fav-star'>" + "&#x2605;" + " favorite "+ "</div>")
                    // prepend the gifCard to the card-body div in html
                    $("#gif-add").prepend(gifCard);
    
                    // append the rating header and image to the gifElem
                    $("[data-number='" + uniqueId + "']").append(gifImage);
                    $("[data-number='" + uniqueId + "']").append(h5);
                    $("[data-number='" + uniqueId + "']").append(p);
                    $("[data-number='" + uniqueId + "']").append(fav)

                }

            }

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

        });
    }

    function popList () {
        for (var i = 0; i < artistList.length; i++) {
            // create search button
            var a = $("<button>");
            
            // Adding a class of gif-btn to our button
            a.addClass("gif-btn");
            
            // Adding a data-attribute
            a.attr("data-name", uniqueId);
          
            // Providing the gif-btn text
            a.text(artistList[i]);

            // Add the button to the buttons-here div
            $("#buttons-here").append(a);

    }
}
 popList();

    // Function for displaying movie data
    function renderButtons() {

        artistGif = $("#artist").val().trim();
        uniqueId = i.val()+artistGif

        // Looping through the array of button created
        for (var i = 0; i < artistList.length; i++) {

            if (artistList.indexOf(artistGif) === -1) {
            // create search button
            var a = $("<button>");
            
            // Adding a class of gif-btn to our button
            a.addClass("gif-btn");
            
            // Adding a data-attribute
            a.attr("data-number", uniqueId);
          
            // Providing the gif-btn text
            a.text(artistGif);

            // Add the button to the buttons-here div
            $("#buttons-here").append(a);

            artistList.push(artistGif)
            }
        }
    }

    // This function handles events where a gif button is clicked
    $("#target").submit(function(event) {
        event.preventDefault();
    
        //  Get the input from the textbox
        artistGif = $("#artist").val().trim();

        // Call function to display gifs
        gifSearch();

        // Add artist from the textbox to our array
        artistList.push(artist);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });



});
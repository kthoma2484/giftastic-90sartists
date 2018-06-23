$(function () {

    let artists = [{
        name: "SWV",
        rating: "",
        image: "",
        title: ""
    }]
    let artistButton = $("<button>");


    // store an array of results in results variable
    let response = {};
    let responseArray = [];
    let results = {};
    let rating = "";
    let uniqueId = "";
    let imgStill = "";
    let imgMove = "";
    let title = "";


    $("#target").submit(function (event) {
        console.log("submit worked")
        event.preventDefault();
        
        let artistGif = $("input");

        // URL to search Giphy for the destination added
        let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HMBc7lp8ehd8TN5zb2kiFunqqIjMvfEU&limit=10&q=";

        $.ajax({
                // make ajax GET request
                url: queryURL + artistGif,
                method: "GET"
            })
            .then(function (response) {
                console.log(response.data);
                responseArray.push(response.data);
                console.log(responseArray);
                gifShow(response.data);
            });
    })

    let gifShow = function (results) {
        // loop over every result item
        for (let i = 0; i < 10; i++) {

            // store the result item's rating, image, and title
            rating = results[i].rating;
            uniqueId = results[i].id;
            imgStill = results[i].images.original_still.url;
            imgMove = results[i].images.fixed_height.url;
            title = results[i].title;

            // only include gifs with appropriate rating
            if (results[i].rating !== "r") {

                // create a card for each gif
                let gifCard = $("<div class='card gifCard' style='width: 18rem;margin:10px'>");
                gifCard.attr("data-number", uniqueId);
                console.log(i + " + was created")

                // create an image tag with src property and response result
                let gifImage = $("<img class='card-img-top'>");
                gifImage.attr("src", imgStill);

                // Create a heading tag with the result item's rating
                let p = $("<p>")
                p.text("Rating: " + rating);

                // Create a title for the gif
                let h5 = $("<h5>")
                h5.text("Title: " + title);


                // prepend the gifCard to the card-body div in html
                $("#gif-add").prepend(gifCard);

                // append the rating header and image to the gifElem
                $("[data-number='" + uniqueId + "']").append(gifImage);
                $("[data-number='" + uniqueId + "']").append(h5);
                $("[data-number='" + uniqueId + "']").append(p);

                console.log(artists)
            }
        }
    }

    $(".card-img-top").on("click", function (event) {
        console.log('gif was clicked');
        if ($(this).val("imgStill")) {
            $(this).replaceWith(imgMove);
            console.log('moving img added');
        } else if ($(this).hasClass("imgMove")) {
            $(this).replaceWith(imgStill);
            console.log('still img added');
        }
    });

});
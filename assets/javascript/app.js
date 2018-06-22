$(function () {

    /*
    let artist = {
        1: {name:"SWV", rating: "", image: "", title: ""},
        2: {name:"Boys 2 Men", rating: "", image: "", title: ""},
        3: {name:"Mint Condition", rating: "", image: "", title: ""},
        4: {name:"TLC", rating: "", image: "", title: ""},
        5: {name:"En Vogue", rating: "", image: "", title: ""},
        6: {name:"Blackstreet", rating: "", image: "", title: ""},
        7: {name:"Aaliyah", rating: "", image: "", title: ""},
        8: {name:"Mariah Carey", rating: "", image: "", title: ""},
        9: {name:"Dru Hill", rating: "", image: "", title: ""},
        10: {name:"Monica", rating: "", image: "", title: ""}
    }

    for (let i=0; i < artists.length; i++) {

        let artistButton = $("<button>");


        
    }
    */

    $("#target").submit(function (event) {
        console.log("submit worked")
        event.preventDefault();

        let artistGif = $("form");

        // URL to search Giphy for the destination added
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            artistGif + "&api_key=HMBc7lp8ehd8TN5zb2kiFunqqIjMvfEU&limit=20";

        // make ajax GET request
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                console.log(response)
                // store an array of results in results variable
                let results = response.data;

                // loop over every result item
                for (let i = 0; i < 11; i++) {

                    // store the result item's rating, image, and title
                    let rating = results[i].rating;
                    let imagery = results[i].images.original_still.url;
                    let imagery2 = results[i].images.fixed_height.url;
                    let title = results[i].title;
                    
                    // only include gifs with appropriate rating
                    if (results[i].rating !== "r") {

                        // create a card for each gif
                        let gifCard = $("<div class='card gifCard' style='width: 18rem;margin:10px'>");
                        gifCard.attr("data-number", i);
                        console.log(i + " + was created")

                        // create an image tag with src property and response result
                        let gifImage = $("<img class='card-img-top imgcard imgstill' src='" + imagery + "'>");
                        console.log("gifImage is logging")

                        let gifImage2 = $("<img class='card-img-top imgcard imgmove' src='" + imagery2 + "'>");
                        console.log("gifImage2 is logging")

                        // Create a heading tag with the result item's rating
                        let p = $("<p>")
                        p.text("Rating: " + rating);
                        console.log("rating is logging")

                        // Create a title for the gif
                        let h5 = $("<h5>")
                        h5.text("Title: " + title);
                        console.log(title)


                        // prepend the gifCard to the card-body div in html
                        $("#gif-add").prepend(gifCard);
                        console.log('gif added')

                        // append the rating header and image to the gifElem
                        $("[data-number='" + i + "']").append(gifImage);
                        $("[data-number='" + i + "']").append(h5);
                        $("[data-number='" + i + "']").append(p);
                        console.log("image/title/rating was added")
                    }

                    $(".imgcard").on("click", function () {
                        console.log('gif was clicked');


                        if ($(this).hasClass("imgstill")) {
                            $(this).replaceWith(gifImage2);
                            console.log('moving img added');
                        }
                        if ($(this).hasClass("imgmove")) {
                            $(this).replaceWith(gifImage1);
                            console.log('still img added');
                        }
                    });

                }



            })

    })



});
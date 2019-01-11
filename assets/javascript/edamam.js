$(document).ready(function () {
    $('#search-term').submit(function (event) {
        event.preventDefault();
        var searchTerm = $('#query').val();
        getRequest(searchTerm);


        // search term. Check Edamam page if we look to filter even further
        var queryURL = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=8c4edf85&app_key=658de4f65177123c991d45cf851c94cd";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {


            // clear recipe card box
            $("#recipeCards").empty();

            // here we're console logging the full response from the user input search term. Then we're testing paths down to just ingredients, etc.

            console.log(response.hits);
            console.log(response.hits[0].recipe.ingredients);


            let recipeCount = response.hits;


            // we start a for loop to create 10 cards worth of recipes


            for (var i = 0; i < recipeCount.length; i++) {
                console.log("For loop ran");

                let image = response.hits[i].recipe.image;

                let recipeName = response.hits[i].recipe.label;
                console.log(recipeName);



                // Build individual cards for each recipe displaying recipe photo, title, and "more info" button for  viewing..
                // ..full ingredient list and link to recipe


                let showDiv = $("<div>");
                let showImage = $("<img>");
                let showTitle = $("<p>").text(recipeName);
                let showFooter = $("<div>").text(" View Ingredients...");

                showDiv.attr("class", "card col-md-3 d-inline-flex animated fadeInUp");
                showDiv.attr("style", "max-width: 11rem;");
                showImage.attr("class", "card-img-top");
                showImage.attr("src", image);
                showTitle.attr("class", "cardTitle");
                showFooter.attr("class", "card-footer text-muted");

                showFooter.attr("data-count", i);
                showFooter.attr("data-target", "#modal-" + i);
                showFooter.attr("data-toggle", "modal");

                showTitle.attr("class", "card-title");
                showDiv.prepend(showFooter);
                showDiv.prepend(showTitle);
                showDiv.prepend(showImage);

                $("#recipeCards").append(showDiv);

                let modalRecipe = response.hits[i].recipe.ingredients;

                console.log(modalRecipe);

                let modalLink = response.hits[i].recipe.url;


                // Building the Modal. Using this ugly mess so I don't have to build a modal piece by piece

                $("#recipeCards").append('<div class="modal fade" id="modal-' + i + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="modalTitle">' + recipeName + '</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body" id="modalBody"><ul class="modalList-' + [i] + '"></ul></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button><a class="btn btn-outline-success" href="' + modalLink + '" role="button" target="_blank">View Recipe</a></div></div></div></div>');


                $(".modalList").empty();

                // Trying to create a loop to show all ingredients. THIS IS WHERE I'm having trouble
                // Have it so it's spitting out ingredients... but it may be listing every single recipe's ingredients on each card
                for (let j = 0; j < modalRecipe.length; j++) {


                    console.log("for loop ran");
                    let modalIngredients = modalRecipe[j].text;
                    console.log(modalIngredients);
                    let modalList = $("<li>").text(modalIngredients);


                    $(".modalList-" + [i]).append(modalList)


                }


                $("#recipeCards").append(showDiv);

                //commented out 97- djj
                //let modalRecipe = response.hits[i].recipe.ingredients;                

                console.log(modalRecipe);



            }


        });


    });




});
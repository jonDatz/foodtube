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

            // here we're appending to a box. Edit this to create multiple cards isntead
            for (var i = 0; i < recipeCount.length; i++) {
                console.log("For loop ran");

                let image = response.hits[i].recipe.image;
                
                let recipeName = response.hits[i].recipe.label;
                console.log(recipeName);

                let showDiv = $("<div>");
                let showImage = $("<img>");
                let showTitle = $("<p>").text(recipeName);
                let showFooter = $("<div>").text(" View full recipe..");

                showDiv.attr("class", "card col-md-3 d-inline-flex");
                showDiv.attr("style", "max-width: 11rem;");
                showImage.attr("class", "card-img-top");
                showImage.attr("src", image);
                showTitle.attr("class", "cardTitle");
                showFooter.attr("class","card-footer text-muted");
                showTitle.attr("class", "card-title");
                showDiv.prepend(showFooter);
                showDiv.prepend(showTitle);
                showDiv.prepend(showImage);


                $("#recipeCards").append(showDiv);




            }

        });


    });




});
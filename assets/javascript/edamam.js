$(document).ready(function () {
    $('#search-term').submit(function (event) {
        event.preventDefault();
        var searchTerm = $('#query').val();
        getRequest(searchTerm);

    var queryURL = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=8c4edf85&app_key=658de4f65177123c991d45cf851c94cd";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.hits[0].recipe.ingredients)
        var ingredients = response.hits[0].recipe.ingredients;
        for (var i=0; i < ingredients.length; i++){
            $("#movie-info").append(ingredients[i].text);
        }
        
    });










    });




});
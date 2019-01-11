$(document).ready(function () {

    $("#videos").hide();



    $('#search-term').submit(function (event) {
        event.preventDefault();
        var searchTerm = $('#query').val();
        getRequest(searchTerm);
        console.log(searchTerm);

        $("#videos").show();
    });
});

function getRequest(searchTerm) {
    var url = 'https://www.googleapis.com/youtube/v3/search';
    var params = {
        part: 'snippet',
        key: 'AIzaSyBoeAORrZ6eh2-ayyufG7OVOu24CKb_Ww8',
        type: 'video',
        videoEmbeddable: 'true',
        order: "viewCount",
        q: searchTerm + "recipe"

    };

    $.getJSON(url, params, showResults);
}

function showResults(results) {
    var html = "";
    var entries = results.items;

    $.each(entries, function (index, value) {
        var video = results.items[index].id.videoId;
        var title = value.snippet.title;
        var thumbnail = value.snippet.thumbnails.default.url;
        html += '<p id=link-' + index +  '>' + title + '</p>';
        html += '<a target="_blank" href="https://www.youtube.com/embed/' + video + '"><img src="' + thumbnail + '"></a>';
        console.log(video)

    });

    console.log(results)
    $('#soundtrack-info').html(html);



    // *** BELOW IS ATTEMPTING TO GET MAIN VIDEO IN AN EMBEDDED PLAYER *** //



    let video = results.items['0'].id.videoId;
    console.log(video);


    $(".mainVid").empty();

    let showIframe = $("<iframe>");
    showIframe.attr("width", "560");
    showIframe.attr("height", "315");
    showIframe.attr("src", "https://www.youtube.com/embed/" + video);
    showIframe.attr("frameborder", "0");
    showIframe.attr("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");

    $(".mainVid").append(showIframe);






}


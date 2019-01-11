$(document).ready(function () {

    $("#videos").hide();

    $('#search-term').submit(function (event) {
        event.preventDefault();
        var searchTerm = $('#query').val();
        getRequest(searchTerm);
        console.log(searchTerm);

        $("#videos").show();
        $("#videos").addClass("animated fadeInUp");
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
        html += '<a target="_blank" href="https://www.youtube.com/embed/' + video + '"><img src="' + thumbnail + '"></a>';
        html += '<a target="_blank" href="https://www.youtube.com/embed/' + video + '"><p class="youtubelink" id=link-' + index + '>' + title + '</p></a>'
        console.log(video)

    });
    
$('#video-info').html(html);






 


   






}


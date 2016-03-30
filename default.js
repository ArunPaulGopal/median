$(document).ready(function() {
    $('#enter').click(function(){
        $('#timeline').toggleClass("hide");
        $('#welcome').toggleClass("hide");
        $('#navbar').toggleClass("hide");
        var xhr = new XMLHttpRequest();
        xhr.open('GET','/blogs');
        xhr.send(null);
        xhr.addEventListener('load',function(){
            var myData = JSON.parse(xhr.responseText);
            blogBuilder(myData);
        })
    });

    var blogBuilder = function(array){
        for (i=0; i<array.length; i++){
            var title = array[i].blogtitle;
            var content = array[i].blogcontent;
            var imagesrc = array[i].blogimage;
            var media = document.createElement('div');
            var medialeft = document.createElement('div');
            var mediabody = document.createElement('div');
            var panel = document.createElement('div');
            var panelhead = document.createElement('div');
            var panelbody = document.createElement('div');
            var panelfooter = document.createElement('div');
            var image = document.createElement('img');
            image.setAttribute('src',imagesrc);
            $(image).addClass('img-rounded thumbnail');
            $(media).addClass('media');
            $(mediabody).addClass('media-body');
            $(medialeft).addClass('media-left');
            $(panel).addClass('panel panel-success');
            $(panelhead).addClass('panel panel-heading');
            $(panelbody).addClass('panel panel-body');
            $(panelfooter).addClass('panel panel-footer');
            $(medialeft).append(image);
            $(panelhead).append(title);
            $(mediabody).append(content);
            $(media).append(medialeft);
            $(media).append(mediabody);
            $(panelbody).append(media);
            $(panel).append(panelhead);
            $(panel).append(panelbody);
            $('#blogresults').append(panel);
        }
    }
});

$('#blogsbutton').click(function(){
    $('#timeline').toggleClass("hide");
    $('#timelinebutton').toggleClass("hide");

    $('#yourblogs').toggleClass("hide");

    var xhr = new XMLHttpRequest();
    xhr.open('GET','/yourblogs');
    xhr.send(null);
    xhr.addEventListener('load',function(){
        var myData = JSON.parse(xhr.responseText);

    })
    $('#blogsbutton').toggleClass("hide");
});

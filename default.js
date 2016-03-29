$(document).ready(function() {
    $('#enter').click(function(){
        $('#timeline').toggleClass("hide");
        $('#welcome').toggleClass("hide");
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
            var panel = document.createElement('div');
            var panelbody = document.createElement('div');
            var panelfooter = document.createElement('div');
            $(panel).addClass('panel panel-primary');
            $(panelbody).addClass('panel panel-body');
            $(panelfooter).addClass('panel panel-footer');
            $(panelbody).append(title);
            $(panelbody).append(content);
            $(panel).append(panelbody);
            $('#blogresults').append(panelbody);
        }
    }
});




     
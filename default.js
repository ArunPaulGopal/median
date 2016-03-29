$(document).ready(function() {
    $('#enter').click(function(){
        $('#timeline').toggleClass("hide");
        $('#welcome').toggleClass("hide");
        var xhr = new XMLHttpRequest();
        xhr.open('GET','/blogs');
        xhr.send(null);
        xhr.addEventListener('load',function(){
            var myData = JSON.parse(xhr.responseText);
            console.log(myData);
        })
    })

    var blogBuilder = function(){

    }
});
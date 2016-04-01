$(document).ready(function() {

    $('#enter').click(function(){
        $('#timeline').toggleClass("hide");
        $('#welcome').toggleClass("hide");
        $('#navbar').toggleClass("hide");
        var xhr = new XMLHttpRequest();
        xhr.open('GET','/quotes');
        xhr.send(null);
        xhr.addEventListener('load',function(){
            var myData = JSON.parse(xhr.responseText);
            quoteBuilder(myData);
        })
        $('#timelinebutton').addClass("btn-primary");
    });

    var quoteBuilder = function(array){
        for (i=0; i<array.length; i++){
            var title = array[i].quotetitle;
            var content = array[i].quotecontent;
            var imagesrc = array[i].quoteimage;
            var button = document.createElement('button');
            var buttontext = document.createTextNode('Read More!');
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
            $(button).addClass('btn btn-success center-block');
            $(media).addClass('media');
            $(mediabody).addClass('media-body');
            $(medialeft).addClass('media-left');
            $(panel).addClass('panel panel-success');
            $(panelhead).addClass('panel-heading');
            $(panelbody).addClass('panel-body');
            $(panelfooter).addClass('panel-footer');
            $(medialeft).append(image);
            $(panelhead).append(title);
            $(button).append(buttontext);
            $(panelfooter).append(button);
            $(mediabody).append(content);
            $(media).append(medialeft);
            $(media).append(mediabody);
            $(panelbody).append(media);
            $(panel).append(panelhead);
            $(panel).append(panelbody);
            $(panel).append(panelfooter);
            $('#quoteresults').append(panel);
        }
    }

    $('#quotesbutton').click(function(){
        $('#timeline').addClass("hide");
        $('#writequotes').addClass("hide");
        $('#yourquotes').removeClass("hide");
        $('#yourquoteresults').empty();
        var xhr = new XMLHttpRequest();
        xhr.open('GET','/yourquotes');
        xhr.send(null);
        xhr.addEventListener('load',function(){
            var myData = JSON.parse(xhr.responseText);
            myquotes(myData);
        })
        $('#quotesbutton').addClass("btn-primary");
        $('#timelinebutton').removeClass("btn-primary");
        $('#writebutton').removeClass("btn-primary");
    });

    var myquotes = function(array){
        for (i=0; i<array.length; i++){
            var title = array[i].quotetitle;
            var content = array[i].quotecontent;
            var imagesrc = array[i].quoteimage;
            var button = document.createElement('button');
            var buttontext = document.createTextNode('Read More!');
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
            $(button).addClass('btn btn-success center-block');
            $(media).addClass('media');
            $(mediabody).addClass('media-body');
            $(medialeft).addClass('media-left');
            $(panel).addClass('panel panel-success');
            $(panelhead).addClass('panel-heading');
            $(panelbody).addClass('panel-body');
            $(panelfooter).addClass('panel-footer');
            $(medialeft).append(image);
            $(panelhead).append(title);
            $(button).append(buttontext);
            $(panelfooter).append(button);
            $(mediabody).append(content);
            $(media).append(medialeft);
            $(media).append(mediabody);
            $(panelbody).append(media);
            $(panel).append(panelhead);
            $(panel).append(panelbody);
            $(panel).append(panelfooter);
            $('#yourquoteresults').append(panel);
        }
    }

    $('#timelinebutton').click(function(){
        $('#timeline').removeClass("hide");
        $('#yourquotes').addClass("hide");
        $('#writequotes').addClass("hide");
        $('#quoteresults').empty();
        var xhr = new XMLHttpRequest();
        xhr.open('GET','/quotes');
        xhr.send(null);
        xhr.addEventListener('load',function(){
            var myData = JSON.parse(xhr.responseText);
            quoteBuilder(myData);
        })
        $('#timelinebutton').addClass("btn-primary");
        $('#quotesbutton').removeClass("btn-primary");
        $('#writebutton').removeClass("btn-primary");
    });

    $('#writebutton').click(function(){
        $('#timeline').addClass("hide");
        $('#yourquotes').addClass("hide");
        $('#writequotes').removeClass("hide");
        $('#timelinebutton').removeClass("btn-primary");
        $('#quotesbutton').removeClass("btn-primary");
        $('#writebutton').addClass("btn-primary");
    });

    $('#writequote').click(function(){
      var content = $('#quotecontent').val();
      var title = $('#quotetitle').val();
      var myData = {
        quotetitle:title,
        quoteimage:"quote.jpeg",
        quotecontent:content,
        tag:"something"
      };
      console.log(myData);
      var payload = JSON.stringify(myData);
      console.log(payload);
      var xhr = new XMLHttpRequest();
      xhr.open('POST','/writequotes');
      xhr.setRequestHeader("Content-Type","application/json");
      xhr.send(payload);
      xhr.addEventListener('load',function(){
          $('#temporaryresults').append("SUCCESS! ADD ANOTHER quote OR GO TO YOUR quoteS TO SEE!");
      })
    });
});

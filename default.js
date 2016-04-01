$(document).ready(function() {
//LOAD UP TIMELINE UPON ENTRY OF WEBSITE
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

// Search SECTION
    $('#searchbutton').click(function(){
        $('#timeline').addClass("hide");
        $('#yourquotes').addClass("hide");
        $('#writequotes').addClass("hide");
        $('#searchquotes').removeClass("hide");
        $('#timelinebutton').removeClass("btn-primary");
        $('#quotesbutton').removeClass("btn-primary");
        $('#writebutton').removeClass("btn-primary");
        $('#searchbutton').addClass("btn-primary");
    });

    $('#startsearch').click(function(){
      var content = $('#searchstring').val();
      var mySearch = {
        search:content
      };
      console.log(mySearch);
      var payload = JSON.stringify(mySearch);
      console.log(payload);
      var xhr = new XMLHttpRequest();
      xhr.open('POST','/searchquotes');
      xhr.setRequestHeader("Content-Type","application/json");
      xhr.send(payload);
      xhr.addEventListener('load',function(){
          var myData = JSON.parse(xhr.responseText);
          $('#searchresults').empty();
          if (myData.length > 0) {
            searchBuilder(myData)
          }
          else {
            //APPEND FAILURE MESSAGE
          }

      })
    });

    var searchBuilder = function(array){
        for (i=0; i<array.length; i++){
            var title = array[i].quotetitle;
            var content = array[i].quotecontent;
            var imagesrc = array[i].quoteimage;
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
            $(panelhead).addClass('panel-heading');
            $(panelbody).addClass('panel-body');
            $(panelfooter).addClass('panel-footer');
            $(medialeft).append(image);
            $(panelhead).append(title);
            $(mediabody).append(content);
            $(media).append(medialeft);
            $(media).append(mediabody);
            $(panelbody).append(media);
            $(panel).append(panelhead);
            $(panel).append(panelbody);
            $('#searchresults').append(panel);
        }
    }
//MY QUOTES SECTION
    $('#quotesbutton').click(function(){
        $('#timeline').addClass("hide");
        $('#writequotes').addClass("hide");
        $('#searchquotes').addClass("hide");
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
        $('#searchbutton').removeClass("btn-primary");
    });

    var myquotes = function(array){
        for (i=0; i<array.length; i++){
            var title = array[i].quotetitle;
            var content = array[i].quotecontent;
            var imagesrc = array[i].quoteimage;
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
            $(panelhead).addClass('panel-heading');
            $(panelbody).addClass('panel-body');
            $(panelfooter).addClass('panel-footer');
            $(medialeft).append(image);
            $(panelhead).append(title);
            $(mediabody).append(content);
            $(media).append(medialeft);
            $(media).append(mediabody);
            $(panelbody).append(media);
            $(panel).append(panelhead);
            $(panel).append(panelbody);
            $('#yourquoteresults').append(panel);
        }
    }
//TIMELINE SECTION
    $('#timelinebutton').click(function(){
        $('#timeline').removeClass("hide");
        $('#yourquotes').addClass("hide");
        $('#writequotes').addClass("hide");
        $('#searchquotes').addClass("hide");
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
        $('#searchbutton').removeClass("btn-primary");
    });

    var quoteBuilder = function(array){
        for (i=0; i<array.length; i++){
            var title = array[i].quotetitle;
            var content = array[i].quotecontent;
            var imagesrc = array[i].quoteimage;
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
            $(panelhead).addClass('panel-heading');
            $(panelbody).addClass('panel-body');
            $(panelfooter).addClass('panel-footer');
            $(medialeft).append(image);
            $(panelhead).append(title);
            $(mediabody).append(content);
            $(media).append(medialeft);
            $(media).append(mediabody);
            $(panelbody).append(media);
            $(panel).append(panelhead);
            $(panel).append(panelbody);
            $('#quoteresults').append(panel);
        }
    }
//WRITE QUOTE SECTION    
    $('#writebutton').click(function(){
        $('#timeline').addClass("hide");
        $('#yourquotes').addClass("hide");
        $('#writequotes').removeClass("hide");
        $('#searchquotes').addClass("hide");
        $('#timelinebutton').removeClass("btn-primary");
        $('#quotesbutton').removeClass("btn-primary");
        $('#writebutton').addClass("btn-primary");
        $('#searchbutton').removeClass("btn-primary");
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

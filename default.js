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
        $('#timelinebutton').addClass("btn-success");
    });
// Search SECTION
    $('#searchbutton').click(function(){
        $('#timeline').addClass("hide");
        $('#yourquotes').addClass("hide");
        $('#writequotes').addClass("hide");
        $('#favoritequotes').addClass("hide");
        $('#searchquotes').removeClass("hide");
        $('#timelinebutton').removeClass("btn-success");
        $('#quotesbutton').removeClass("btn-success");
        $('#favoritebutton').removeClass("btn-success");
        $('#writebutton').removeClass("btn-success");
        $('#searchbutton').addClass("btn-success");
        $('#searchresults').empty();
        $('#searchstring').val('');
    });

    $('#startsearch').click(function(){
      var content = $('#searchstring').val();
      var mySearch = {
        search:content
      };
      var payload = JSON.stringify(mySearch);
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
            $('#searchresults').append("<h1 class='text-center text-danger'>Please use a better search term to find videos!(Hint: Common words like 'the' will work!)</h1>");
            $('#searchresults').append("<img src='404.jpg' class='center-block'>");
          }
      })
    });

    var searchBuilder = function(array){
        for (i=0; i<array.length; i++){
          var title = array[i].quoteauthor;
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
          var icon = document.createElement('i');
          icon.setAttribute('id',array[i].quoteid);
          $(image).addClass('img-rounded thumbnail');
          image.setAttribute('src',imagesrc);
          $(media).addClass('media');
          $(mediabody).addClass('media-body text-center');
          $(medialeft).addClass('media-left');
          $(panel).addClass('panel panel-success');
          $(panelhead).addClass('panel-heading text-center');
          $(panelbody).addClass('panel-body');
          $(panelfooter).addClass('panel-footer text-center');
          $(medialeft).append(image);
          $(panelhead).append(title);
          $(mediabody).append(content);
          //$(media).append(medialeft);
          $(media).append(mediabody);
          $(panelbody).append(media);
          $(panel).append(panelhead);
          $(panel).append(panelbody);
          if(array[i].fav == false){
            $(icon).addClass('fa fa-heart-o fa-2x favorite');
            $(panelfooter).append(icon);
            $(panel).append(panelfooter);
            $('#searchresults').append(panel);
          }
          else {
            $(icon).addClass('fa fa-heart fa-2x favorite');
            $(panelfooter).append(icon);
            $(panel).append(panelfooter);
            $('#searchresults').append(panel);
          }
        }
        $('.favorite').click(function(){
          if($(this).hasClass("fa-heart-o")){
            $(this).addClass("fa-heart");
            $(this).removeClass("fa-heart-o");
          }
          else{
            $(this).addClass("fa-heart-o");
            $(this).removeClass("fa-heart");
          }
          var xhr = new XMLHttpRequest();
          var thisID = $(this).attr('id');
          var myData = {
            favid : thisID
          };
          var payload =JSON.stringify(myData);
          xhr.open('POST','/favquotes');
          xhr.setRequestHeader("Content-Type","application/json");
          xhr.send(payload);
          xhr.addEventListener('load',function(){
          });
      });
    }
//MY QUOTES SECTION
    $('#quotesbutton').click(function(){
        $('#timeline').addClass("hide");
        $('#writequotes').addClass("hide");
        $('#searchquotes').addClass("hide");
        $('#favoritequotes').addClass("hide");
        $('#yourquotes').removeClass("hide");
        $('#yourquoteresults').empty();
        var xhr = new XMLHttpRequest();
        xhr.open('GET','/yourquotes');
        xhr.send(null);
        xhr.addEventListener('load',function(){
            var myData = JSON.parse(xhr.responseText);
            myquotes(myData);
        })
        $('#quotesbutton').addClass("btn-success");
        $('#timelinebutton').removeClass("btn-success");
        $('#writebutton').removeClass("btn-success");
        $('#searchbutton').removeClass("btn-success");
        $('#favoritebutton').removeClass("btn-success");
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
            var time = array[i].quotetime
            image.setAttribute('src',imagesrc);
            $(image).addClass('img-rounded thumbnail');
            $(media).addClass('media');
            $(mediabody).addClass('media-body text-center');
            $(medialeft).addClass('media-left');
            $(panel).addClass('panel panel-success');
            $(panelhead).addClass('panel-heading text-center');
            $(panelbody).addClass('panel-body');
            $(panelfooter).addClass('panel-footer text-center');
            $(medialeft).append(image);
            $(panelhead).append(title);
            $(mediabody).append(content);
            //$(media).append(medialeft);
            $(media).append(mediabody);
            $(panelbody).append(media);
            $(panel).append(panelhead);
            $(panel).append(panelbody);
            $(panelfooter).append(time);
            $(panel).append(panelfooter);
            $('#yourquoteresults').append(panel);
        }
    }
    //FAVORITES SECTION
        $('#favoritebutton').click(function(){
            $('#timeline').addClass("hide");
            $('#writequotes').addClass("hide");
            $('#searchquotes').addClass("hide");
            $('#favoritequotes').removeClass("hide");
            $('#yourquotes').addClass("hide");
            $('#favoritequoteresults').empty();
            var xhr = new XMLHttpRequest();
            xhr.open('POST','/favbuild');
            xhr.send(null);
            xhr.addEventListener('load',function(){
                var myData = JSON.parse(xhr.responseText);
                favQuotes(myData);
            })
            $('#quotesbutton').removeClass("btn-success");
            $('#timelinebutton').removeClass("btn-success");
            $('#writebutton').removeClass("btn-success");
            $('#searchbutton').removeClass("btn-success");
            $('#favoritebutton').addClass("btn-success");
        });

        var favQuotes = function(array){
            for (i=0; i<array.length; i++){
                var title = array[i].quoteauthor;
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
                $(mediabody).addClass('media-body text-center');
                $(medialeft).addClass('media-left');
                $(panel).addClass('panel panel-success');
                $(panelhead).addClass('panel-heading text-center');
                $(panelbody).addClass('panel-body');
                $(panelfooter).addClass('panel-footer');
                $(medialeft).append(image);
                $(panelhead).append(title);
                $(mediabody).append(content);
                //$(media).append(medialeft);
                $(media).append(mediabody);
                $(panelbody).append(media);
                $(panel).append(panelhead);
                $(panel).append(panelbody);
                $('#favoritequoteresults').append(panel);
            }
        }
//TIMELINE SECTION
    $('#timelinebutton').click(function(){
        $('#timeline').removeClass("hide");
        $('#yourquotes').addClass("hide");
        $('#writequotes').addClass("hide");
        $('#favoritequotes').addClass("hide");
        $('#searchquotes').addClass("hide");
        $('#quoteresults').empty();
        var xhr = new XMLHttpRequest();
        xhr.open('GET','/quotes');
        xhr.send(null);
        xhr.addEventListener('load',function(){
            var myData = JSON.parse(xhr.responseText);
            quoteBuilder(myData);
        })
        $('#timelinebutton').addClass("btn-success");
        $('#quotesbutton').removeClass("btn-success");
        $('#favoritebutton').removeClass("btn-success");
        $('#writebutton').removeClass("btn-success");
        $('#searchbutton').removeClass("btn-success");
    });

    var quoteBuilder = function(array){
        for (i=0; i<array.length; i++){
          var title = array[i].quoteauthor;
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
          var icon = document.createElement('i');
          var attribute = document.createElement('a');
          icon.setAttribute('id',array[i].quoteid);
          $(image).addClass('img-rounded thumbnail');
          image.setAttribute('src',imagesrc);
          $(media).addClass('media');
          $(mediabody).addClass('media-body text-center');
          $(medialeft).addClass('media-left');
          $(panel).addClass('panel panel-success');
          $(panelhead).addClass('panel-heading text-center');
          $(panelbody).addClass('panel-body');
          $(panelfooter).addClass('panel-footer text-center');
          $(medialeft).append(image);
          $(panelhead).append(title);
          $(mediabody).append(content);
          //$(media).append(medialeft);
          $(media).append(mediabody);
          $(panelbody).append(media);
          $(panel).append(panelhead);
          $(panel).append(panelbody);
          if(array[i].fav == false){
            $(icon).addClass('fa fa-heart-o fa-2x favorite');
            $(panelfooter).append(icon);
            $(panel).append(panelfooter);
            $('#quoteresults').append(panel);
          }
          else {
            $(icon).addClass('fa fa-heart fa-2x favorite');
            $(panelfooter).append(icon);
            $(panel).append(panelfooter);
            $('#quoteresults').append(panel);
          }
        }
        $('.favorite').click(function(){
          if($(this).hasClass("fa-heart-o")){
            $(this).addClass("fa-heart");
            $(this).removeClass("fa-heart-o");
          }
          else{
            $(this).addClass("fa-heart-o");
            $(this).removeClass("fa-heart");
          }
          var xhr = new XMLHttpRequest();
          var thisID = $(this).attr('id');
          var myData = {
            favid : thisID
          };
          var payload =JSON.stringify(myData);
          xhr.open('POST','/favquotes');
          xhr.setRequestHeader("Content-Type","application/json");
          xhr.send(payload);
          xhr.addEventListener('load',function(){
          });
      });
    }
//WRITE QUOTE SECTION
    $('#writebutton').click(function(){
        $('#timeline').addClass("hide");
        $('#yourquotes').addClass("hide");
        $('#writequotes').removeClass("hide");
        $('#favoritequotes').addClass("hide");
        $('#searchquotes').addClass("hide");
        $('#timelinebutton').removeClass("btn-success");
        $('#quotesbutton').removeClass("btn-success");
        $('#favoritebutton').removeClass("btn-success");
        $('#writebutton').addClass("btn-success");
        $('#searchbutton').removeClass("btn-success");
    });

    $('#writequote').click(function(){
      var content = $('#quotecontent').val();
      var title = $('#quotetitle').val();
      var date = new Date();
      var currentDate = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      var myData = {
        quotetime: currentDate + "/" + month + "/" + year,
        quotetitle:title,
        quoteimage:"quote.jpeg",
        quotecontent:content,
        tag:"something"
      };
      var payload = JSON.stringify(myData);
      var xhr = new XMLHttpRequest();
      xhr.open('POST','/writequotes');
      xhr.setRequestHeader("Content-Type","application/json");
      xhr.send(payload);
      xhr.addEventListener('load',function(){
          alert('Your quote has been added! Please go to "My Quotes" to see your quote or write another!');
          $('#quotetitle').val('');
          $('#quotecontent').val('');
      })
    });
});

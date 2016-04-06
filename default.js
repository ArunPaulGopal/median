$(document).ready(function() {
//SIGN UP FEATURE
    $('#signup').click(function(){
      $('#loginarea').addClass("hide");
      $('#signuparea').removeClass("hide");
      //Progress bar is reset if creating multiple accounts
      $("#bar").attr('style','width: 0%');
      $("#bar").attr('aria-valuenow','0');
    })
    $('#setup').click(function(){
      var username = $('#setupusername').val();
      var password = $('#setuppassword').val();
      var xhr = new XMLHttpRequest();
      xhr.open('POST','/signup');
      xhr.setRequestHeader("Content-Type","application/json");
      var myData = {
        password:password,
        username:username
      };
      var payload = JSON.stringify(myData);
      xhr.send(payload);
      xhr.addEventListener('load',function(){
        //User/pw is reset if creating another account
        $('#setupusername').val('');
        $('#setuppassword').val('');
      })
      $('#loginarea').removeClass("hide");
      $('#signuparea').addClass("hide");
    })
    //PASSWORD STRENGTH FEATURE
    //As user types into the password field, keyup ensures latest password is being checked
    $('#setuppassword').keyup(function(){
      var password = $(this).val();
      var xhr = new XMLHttpRequest();
      xhr.open('POST','/password');
      xhr.setRequestHeader("Content-Type","application/json");
      var myData = {
        password:password
      };
      var payload = JSON.stringify(myData);
      xhr.send(payload);
      xhr.addEventListener('load',function(){
        $("#bar").attr('aria-valuenow','0');
        $("#bar").attr('style','width: 0%');
        var scoredata = JSON.parse(xhr.responseText);
        //As the score from the zxcvbn module changes, progress bar reflects score
        //Submit account button is only available at password scores of 3 or 4
        if(scoredata == 0) {
          $('#bar').attr('class','progress-bar progress-bar-danger');
          $('#bar').attr('aria-valuenow','10');
          $('#bar').attr('style','width: 10%');
          $('#setup').addClass('hide');
          $('#weakpass').removeClass('hide');
        }
          else if(scoredata == 1) {
            $('#bar').attr('class','progress-bar progress-bar-danger');
            $('#bar').attr('aria-valuenow','25');
            $('#bar').attr('style','width: 25%');
            $('#setup').addClass('hide');
            $('#weakpass').removeClass('hide');
          }
          else if(scoredata == 2) {
            $('#bar').attr('class','progress-bar progress-bar-warning');
            $('#bar').attr('aria-valuenow','50');
            $('#bar').attr('style','width: 50%');
            $('#setup').addClass('hide');
            $('#weakpass').removeClass('hide');
          }
          else if(scoredata == 3) {
            $('#bar').attr('class','progress-bar progress-bar-info');
            $('#bar').attr('aria-valuenow','75');
            $('#bar').attr('style','width: 75%');
            $('#setup').removeClass('hide');
            $('#weakpass').addClass('hide');
          }
          else if(scoredata == 4) {
            $('#bar').attr('class','progress-bar progress-bar-success');
            $('#bar').attr('aria-valuenow','100');
            $('#bar').attr('style','width: 100%');
            $('#setup').removeClass('hide');
            $('#weakpass').addClass('hide');
          }
      })
    });
//LOGIN FEATURE
    $('#login').click(function(){
        var username = $('#username').val();
        var password = $('#password').val();
        var myData = {
          username: username,
          password: password
        }
        var payload = JSON.stringify(myData);
        var xhr = new XMLHttpRequest();
        xhr.open('POST','/login');
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(payload);
        xhr.addEventListener('load',function(){
            var newdata = JSON.parse(xhr.responseText);
            //The only possible value for newdata will be 1, if there is a match in the login post route.
            if (newdata[0] == 1) {
              //Set Cookie to ensure new quotes that are written will be appended to the correct user object
              Cookies.remove('username');
              Cookies.set('username',username);
              $('#searchquotes').toggleClass("hide");
              $('.welcome').toggleClass("hide");
              $('#navbar').toggleClass("hide");
              $('.navbar-btn').removeClass("btn-success");
              $('#searchbutton').addClass("btn-success");
            }
            else{
              alert("Please try another PW attempt");
            }
        })
    });
//LOGOUT: COOKIE RESET ALREADY HANDLED ABOVE,ALLOWS NEW USER TO LOGIN
    $('#logout').click(function(){
        $('#username').val('');
        $('#password').val('');
        $('.pagecontent').addClass("hide");
        $('.welcome').removeClass("hide");
    });
// SEARCH SECTION
  //Change appearance of DOM and buttons
    $('#searchbutton').click(function(){
        $('#timeline').addClass("hide");
        $('#yourquotes').addClass("hide");
        $('#writequotes').addClass("hide");
        $('#favoritequotes').addClass("hide");
        $('#searchquotes').removeClass("hide");
        $('.navbar-btn').removeClass("btn-success");
        $(this).addClass("btn-success");
        $('#searchresults').empty();
        $('#searchstring').val('');
    });
  //When search button is clicked, check all quote content for any match. If none, append image and message
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
            $('#searchresults').append("<img src='images/404.jpg' class='center-block'>");
          }
      })
    });
    //Function to build search results upon success
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
          $(mediabody).addClass('media-body text-center custom');
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
            $(icon).addClass('fa fa-heart-o fa-2x favorite red');
            $(panelfooter).append(icon);
            $(panel).append(panelfooter);
            $('#searchresults').append(panel);
          }
          else {
            $(icon).addClass('fa fa-heart fa-2x favorite red');
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
        var myData = {
          username: Cookies.get('username')
        }
        var payload = JSON.stringify(myData);
        var xhr = new XMLHttpRequest();
        xhr.open('POST','/yourquotes');
        xhr.setRequestHeader("Content-type","application/json");
        xhr.send(payload);
        xhr.addEventListener('load',function(){
            var myData = JSON.parse(xhr.responseText);
            myquotes(myData);
        })
        $('.navbar-btn').removeClass("btn-success");
        $(this).addClass("btn-success");
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
            $(mediabody).addClass('media-body text-center custom');
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
            $('.navbar-btn').removeClass("btn-success");
            $(this).addClass("btn-success");
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
                $(mediabody).addClass('media-body text-center custom');
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
        $('.navbar-btn').removeClass("btn-success");
        $(this).addClass("btn-success");
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
          $(mediabody).addClass('media-body text-center custom');
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
            $(icon).addClass('fa fa-heart-o fa-2x favorite red');
            $(panelfooter).append(icon);
            $(panel).append(panelfooter);
            $('#quoteresults').append(panel);
          }
          else {
            $(icon).addClass('fa fa-heart fa-2x favorite red');
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
        $('.navbar-btn').removeClass("btn-success");
        $(this).addClass("btn-success");
    });

    $('#writequote').click(function(){
      var content = $('#quotecontent').val();
      var title = $('#quotetitle').val();
      var date = new Date();
      var currentDate = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      var myData = {
        username: Cookies.get('username'),
        quotetitle:title,
        quotecontent:content,
        quotetime: currentDate + "/" + month + "/" + year,
      };
      var payload = JSON.stringify(myData);
      var xhr = new XMLHttpRequest();
      xhr.open('POST','/writequotes');
      xhr.setRequestHeader("Content-Type","application/json");
      xhr.send(payload);
      xhr.addEventListener('load',function(){
          $('#quotetitle').val('');
          $('#quotecontent').val('');
      });
    });
// THE TAG SECTION
    $('.tag').click(function(){
      $('.tag').removeClass("green");
      $(this).addClass("green");
      var tagID = $(this).attr('id');
      var myData = {
        tagid : tagID
      };
      var payload =JSON.stringify(myData);
      var xhr = new XMLHttpRequest();
      xhr.open('POST','/tagquotes');
      xhr.setRequestHeader("Content-Type","application/json");
      xhr.send(payload);
      xhr.addEventListener('load',function(){
        var data = JSON.parse(xhr.responseText);
        $('#quoteresults').empty()
        quoteBuilder(data);
      });
    })
});

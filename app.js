var express = require('express');
var app = express();
var jsonParser = require('body-parser').json();

app.use(express.static("./"));

app.get('/quotes', function(req, res) {
  res.json(allquotes);
});

app.post('/login', jsonParser, function(req, res) {
  var status =[];
  userCheck(userinfo,req.body.username,req.body.password,status);
  console.log(status);
  res.json(status);
});

app.post('/yourquotes', jsonParser, function(req, res) {
  var quoteArray =[];
  userBuild(userquotes,req.body.username,quoteArray);
  res.json(quoteArray);
});

app.post('/writequotes', jsonParser, function(req, res) {
  userquotes.push(req.body);
  res.json();
});

app.post('/searchquotes', jsonParser, function(req, res) {
  var results =[];
  var search = req.body.search.toLowerCase();
  searchQuery(allquotes,search,results);
  res.json(results);
});

app.post('/favquotes', jsonParser, function(req, res) {
  favToggle(allquotes,req.body.favid);
  res.json();
});

app.post('/favbuild', jsonParser, function(req, res) {
  var favArray =[];
  favBuild(allquotes,favArray);
  res.json(favArray);
});

app.post('/tagquotes', jsonParser, function(req, res) {
  var tagArray =[];
  tagBuild(allquotes,req.body.tagid,tagArray);
  res.json(tagArray);
});

app.listen(8080);

var userCheck = function (object,user,pw,myArray) {
  for (var i=0; i<object.length; i++) {
      var username = object[i].username;
      var password = object[i].password;
      if(username === user & password ===pw) {
        myArray.push("1");
      }
  };
}


var userBuild = function (object,toSearch,myArray) {
  for (var i=0; i<object.length; i++) {
      var username = object[i].username;
      if(username.indexOf(toSearch) != -1) {
        myArray.push(object[i]);
      }
  };
}

var tagBuild = function (object,toSearch,myArray) {
  for (var i=0; i<object.length; i++) {
      var tags  = object[i].tags;
      if(tags.indexOf(toSearch) != -1) {
        myArray.push(object[i]);
      }
  };
}

var searchQuery = function (object,toSearch,myArray) {
  for (var i=0; i<object.length; i++) {
      var content = object[i].quotecontent;
      var goodcontent = content.toLowerCase();
      if(goodcontent.indexOf(toSearch) != -1) {
        myArray.push(object[i]);
      }
  };
};

var favBuild = function (object,myArray) {
  for (var i=0; i<object.length; i++) {
      var favstatus = object[i].fav;
      if(favstatus == true) {
        myArray.push(object[i]);
      }
  };
};

var favToggle = function (object,idtarget) {
  for (var i=0; i<object.length; i++) {
    var objectid = object[i].quoteid;
    var objectfav = object[i].fav;
    if(objectid == idtarget) {
      if(objectfav == true) {
        object[i].fav = false;
      }
      if(objectfav == false){
        object[i].fav = true;
      }
    };
  };
};

var allquotes = [
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "We are what we repeatedly do. Excellence, therefore, is not an act but a habit.",
                quoteauthor: "Aristotle",
                quoteid:1,
                fav:false,
                tags: ["tagA","tagB"]
            },
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "Take calculated risks. That is quite different from being rash.",
                quoteauthor: "George S. Patton",
                quoteid:2,
                fav:false,
                tags: ["tagA","tagB"]
            },
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "The best way out is always through.",
                quoteauthor: "Robert Frost",
                quoteid:3,
                fav:false,
                tags: ["tagA","tagB"]
            },
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "Life consists not in holding good cards, but in playing those you hold well.",
                quoteauthor: "Josh Billings",
                quoteid:4,
                fav:false,
                tags: ["tagA","tagB"]
            },
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "Hope is like the sun, which, as we journey toward it, casts the shadow of our burden behind us.",
                quoteauthor: "Samuel Smiles",
                quoteid:5,
                fav:false,
                tags: ["tagA","tagB"]
            },
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "Work spares us from three evils: boredom, vice, and need.",
                quoteauthor: "Voltaire",
                quoteid:6,
                fav:false,
                tags: ["tagA","tagB"]
            },
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "We are still masters of our fate. We are still captains of our souls.",
                quoteauthor: "Winston Churchill",
                quoteid:7,
                fav:false,
                tags: ["tagA","tagB","tagC"]
            },
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "The wise man should be prepared for everything that does not lie within his control.",
                quoteauthor: "Pythagoras",
                quoteid:8,
                fav:false,
                tags: ["tagA","tagB"]
            },
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "Approach the game with no preset agendas and you'll probably come away surprised at your overall efforts.",
                quoteauthor: "Phil Jackson",
                quoteid:9,
                fav:false,
                tags: ["tagA","tagB","tagC"]
            },
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "Don't cry because it's over, smile because it happened.",
                quoteauthor: "Dr. Seuss",
                quoteid:10,
                fav:false,
                tags: ["tagA","tagB","tagG"]
            },
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "Be yourself; everyone else is already taken.",
                quoteauthor: "Oscar Wilde",
                quoteid:11,
                fav:false,
                tags: ["tagA","tagB","tagC"]
            },
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "If you tell the truth, you don't have to remember anything.",
                quoteauthor: "Mark Twain",
                quoteid:12,
                fav:false,
                tags: ["tagA","tagC"]
            },
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
                quoteauthor: "Mahatma Gandhi",
                quoteid:13,
                fav:false,
                tags: ["tagA","tagB"]
            },
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "If you tell the truth, you don't have to remember anything.",
                quoteauthor: "Mark Twain",
                quoteid:14,
                fav:false,
                tags: ["tagA","tagB"]
            },
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
                quoteauthor: "Ralph Waldo Emerson",
                quoteid:15,
                fav:false,
                tags: ["tagA","tagB"]
            },
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "The opposite of love is not hate, it's indifference. The opposite of art is not ugliness, it's indifference. The opposite of faith is not heresy, it's indifference. And the opposite of life is not death, it's indifference.",
                quoteauthor: "Ellie Wiesel",
                quoteid:16,
                fav:false,
                tags: ["tagA","tagC"]
            },
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "You’ll never be as lazy as whoever named the fireplace.",
                quoteauthor: "Troll",
                quoteid:17,
                fav:false,
                tags: ["tagA","tagG"]
            },
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "Hate to break it to you Facebook, but the entire internet is a dislike button",
                quoteauthor: "Josh Groban",
                quoteid:18,
                fav:false,
                tags: ["tagA","tagG"]
            },
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "Don’t walk in front of me… I may not follow Don’t walk behind me… I may not lead Walk beside me… just be my friend",
                quoteauthor: "Albert Camus",
                quoteid:19,
                fav:false,
                tags: ["tagA","tagH"]
            },
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "Good friends, good books, and a sleepy conscience: this is the ideal life.",
                quoteauthor: "Mark Twain",
                quoteid:20,
                fav:false,
                tags: ["tagA","tagH"]
            },
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "The truth is, everyone is going to hurt you. You just got to find the ones worth suffering for.",
                quoteauthor: "Bob Marley",
                quoteid:21,
                fav:false,
                tags: ["tagA","tagH"]
            },
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "Reader, suppose you were an idiot. And suppose you were a member of Congress. But I repeat myself.",
                quoteauthor: "Mark Twain",
                quoteid:22,
                fav:false,
                tags: ["tagA","tagD"]
            },
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "There comes a time when one must take a position that is neither safe, nor politic, nor popular, but he must take it because conscience tells him it is right.",
                quoteauthor: "Martin Luther King Jr.",
                quoteid:23,
                fav:false,
                tags: ["tagA","tagD"]
            },
            {
                quotetitle: "quote TITLE should return",
                quotecontent: "You're not to be so blind with patriotism that you can't face reality. Wrong is wrong, no matter who does it or says it.",
                quoteauthor: "Malcolm X",
                quoteid:24,
                fav:false,
                tags: ["tagA","tagD"]
            }
];

var userquotes = [
  {
      username: "Arun",
      quotetitle: "Age and Learning",
      quotecontent: "Some people die at 25 but aren't buried until 75.",
      quotetime: "1/1/2016"
  },
  {
      username: "Arun",
      quotetitle: "Occam",
      quotecontent: "It is vain to do with more what can be done with less.",
      quotetime: "1/1/2016"
  },
  {
      username: "Mike",
      quotetitle: "Roar",
      quotecontent: "Roar more, Tweet Less",
      quotetime: "1/1/2016"
  }
];

var userinfo = [
  {
    username: "Arun",
    password: "G",
    favorites: []
  },
  {
    username: "Mike",
    password: "F",
    favorites: []
  }
]

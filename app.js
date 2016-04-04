var express = require('express');
var app = express();
var jsonParser = require('body-parser').json();

app.use(express.static("./"));

app.get('/quotes', function(req, res) {
  res.json(allquotes);
});

app.get('/yourquotes', function(req, res) {
  res.json(myquotes);
});

app.post('/writequotes', jsonParser, function(req, res) {
  myquotes.push(req.body);
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
  console.log(favArray);
  res.json(favArray);
});

app.listen(8080);

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
    }
  }
}

var allquotes = [
            {
                quotetitle: "quote TITLE should return",
                quoteimage: "quote.jpeg",
                quotecontent: "We are what we repeatedly do. Excellence, therefore, is not an act but a habit.",
                quoteauthor: "Aristotle",
                quoteid:1,
                fav:false
            },
            {
                quotetitle: "quote TITLE should return",
                quoteimage: "quote.jpeg",
                quotecontent: "Take calculated risks. That is quite different from being rash.",
                quoteauthor: "George S. Patton",
                quoteid:2,
                fav:false
            },
            {
                quotetitle: "quote TITLE should return",
                quoteimage: "quote.jpeg",
                quotecontent: "The best way out is always through.",
                quoteauthor: "Robert Frost",
                quoteid:3,
                fav:false
            },
            {
                quotetitle: "quote TITLE should return",
                quoteimage: "quote.jpeg",
                quotecontent: "Life consists not in holding good cards, but in playing those you hold well.",
                quoteauthor: "Josh Billings",
                quoteid:4,
                fav:false
            },
            {
                quotetitle: "quote TITLE should return",
                quoteimage: "quote.jpeg",
                quotecontent: "Hope is like the sun, which, as we journey toward it, casts the shadow of our burden behind us.",
                quoteauthor: "Samuel Smiles",
                quoteid:5,
                fav:false
            },
            {
                quotetitle: "quote TITLE should return",
                quoteimage: "quote.jpeg",
                quotecontent: "Work spares us from three evils: boredom, vice, and need.",
                quoteauthor: "Voltaire",
                quoteid:6,
                fav:false
            },
            {
                quotetitle: "quote TITLE should return",
                quoteimage: "quote.jpeg",
                quotecontent: "We are still masters of our fate. We are still captains of our souls.",
                quoteauthor: "Winston Churchill",
                quoteid:7,
                fav:false
            },
            {
                quotetitle: "quote TITLE should return",
                quoteimage: "quote.jpeg",
                quotecontent: "he wise man should be prepared for everything that does not lie within his control.",
                quoteauthor: "Pythagoras",
                quoteid:8,
                fav:false
            },
];

var myquotes = [
  {
      quotetitle: "MY quote TITLE",
      quoteimage: "quote.jpeg",
      quotecontent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      tag:"ISIS"
  },
  {
      quotetitle: "MY quote TITLE",
      quoteimage: "quote.jpeg",
      quotecontent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      tag:"MOVIES"
  }
]

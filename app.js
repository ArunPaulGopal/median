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

var allquotes = [
            {
                quotetitle: "quote TITLE should return",
                quoteimage: "quote.jpeg",
                quotecontent: "Lorem test ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                quoteid:1,
                fav:true
            },
            {
                quotetitle: "test",
                quoteimage: "quote.jpeg",
                quotecontent: "Lorem ipsum TEST dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                quoteid:2,
                fav:true
            },
            {
                quotetitle: "quote TITLE",
                quoteimage: "quote.jpeg",
                quotecontent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                quoteid:3,
                fav:false
            },
            {
                quotetitle: "quote TITLE",
                quoteimage: "quote.jpeg",
                quotecontent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                quoteid:4,
                fav:false
            },
            {
                quotetitle: "quote TITLE",
                quoteimage: "quote.jpeg",
                quotecontent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                quoteid:5,
                fav:false
            },
            {
                quotetitle: "quote TITLE",
                quoteimage: "quote.jpeg",
                quotecontent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                quoteid:6,
                fav:false
            }
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

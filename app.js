var express = require('express');
var app = express();



app.use(express.static("./"));

app.get('/blogs', function(req, res) {
  timelineBuilder();
  console.log(timelineArray);
  res.send();
});

app.post('/', function(req, res) {

});

app.listen(8080);



var allUsers = [
    {
        username: "Arun",
        userpassword: "123",
        userimage: "ARUN IMAGE",
        tags: ["ISIS","MOVIES","POETRY"],
        blogs: [
            {
                blogtitle: "BLOG TITLE",
                blogimage: "BLANK IMAGE",
                blogcontent: "BLOG CONTENT",
                tag:"ISIS"
            },
            {
                blogtitle: "BLOG TITLE",
                blogimage: "BLANK IMAGE",
                blogcontent: "BLOG CONTENT",
                tag:"MOVIES"
            }
        ]
    },
    {
        username: "BOB",
        userpassword: "12345",
        userimage: "ARUN IMAGE",
        tags: ["MONEY","OBAMA","POLITICS"],
        blogs: [
            {
                blogtitle: "BLOG TITLE",
                blogimage: "BLANK IMAGE",
                blogcontent: "BLOG CONTENT",
                tag:"MONEY"
            },
            {
                blogtitle: "BLOG TITLE",
                blogimage: "BLANK IMAGE",
                blogcontent: "BLOG CONTENT",
                tag:"ISIS"
            }
        ]
    },
    {
        username: "SALLY",
        userpassword: "12345",
        userimage: "ARUN IMAGE",
        tags: ["MONEY","OBAMA","POLITICS"],
        blogs: [
            {
                blogtitle: "BLOG TITLE",
                blogimage: "BLANK IMAGE",
                blogcontent: "BLOG CONTENT",
                tag:"MONEY"
            },
            {
                blogtitle: "BLOG TITLE",
                blogimage: "BLANK IMAGE",
                blogcontent: "BLOG CONTENT",
                tag:"ISIS"
            },
            {
                blogtitle: "BLOG TITLE",
                blogimage: "BLANK IMAGE",
                blogcontent: "BLOG CONTENT",
                tag:"ISIS"
            },
            {
                blogtitle: "BLOG TITLE",
                blogimage: "BLANK IMAGE",
                blogcontent: "BLOG CONTENT",
                tag:"OBAMA"
            }
        ]
    }
];

// ONLY THE  FOLLOWED TAGS SHOULD BE APPENDED TO THE TIMELINE BY DEFAULT


// FUNCTION THAT LOOKS THROUGH ALL USERS AND THEIR POSTS, AND MATCHES WITH CURRENT USERS TAGS

var timelineArray = [];

var timelineBuilder = function() {
        for (var j = 0; j < allUsers.length; j++) {
            for (var k=0; k < allUsers[j].blogs.length; k++){
                    timelineArray.push(allUsers[j].blogs[k]);
            }
        }

};

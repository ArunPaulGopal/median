var currentUser = {
    useremail: "Arun",
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
};

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
    }
];

// ONLY THE  FOLLOWED TAGS SHOULD BE APPENDED TO THE TIMELINE BY DEFAULT


// FUNCTION THAT LOOKS THROUGH ALL USERS AND THEIR POSTS, AND MATCHES WITH CURRENT USERS TAGS

var timelineArray = [];

var timelineBuilder = function() {
    for (var i = 0; i < currentUser.tags.length; i++) {
        console.log("I is"+ i);
        for (var j = 0; j < allUsers.length; j++) {
            console.log("J is" + j);
            for (var k=0; k < allUsers[j].blogs.length; k++){
                if (currentUser.tags[i] === allUsers[j].blogs[k].tag) {
                    console.log("K is" +k);
                    console.log("hit");
                }
            }
        }
    }
};





console.log(currentUser.tags);
timelineBuilder();


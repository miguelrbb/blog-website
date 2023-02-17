const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


const text1 = "Certainty determine at of arranging perceived situation or. Or wholly pretty county in oppose. Favour met itself wanted settle put garret twenty. In astonished apartments resolution so an it. Unsatiable on by contrasted to reasonable companions an. On otherwise no admitting to suspicion furniture it.";
const text2 = "My name is Miguel, this is my developer journal, where I explain my developer path, creating new posts everyday telling what I'm doing.";
const text3 = "So insisted received is occasion advanced honoured. Among ready to which up. Attacks smiling and may out assured moments man nothing outward. Thrown any behind afford either the set depend one temper. Instrument melancholy in acceptance collecting frequently be if. Zealously now pronounce existence add you instantly say offending. Merry their far had widen was. Concerns no in expenses raillery formerly.";

var posts = [];

var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));



app.get("/", function(req, res) {
  res.render("home", {textContent: text1, post: posts});
});

app.post("/", function(req, res) {
  console.log(req.body);
})

app.get("/about", function(req, res) {
  res.render("about", {textContent: text2});
});


app.get("/contact", function(req, res) {
  res.render("contact", {textContent: text3});
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = {
    title: req.body.composeTitle,
    post: req.body.composePost
  };

  posts.push(post);

  res.redirect("/");
  
});

app.get("/posts/:postName", function(req, res) {
  let postName = _.lowerCase(req.params.postName);
  posts.forEach(function(post) {
    let postTitle = _.lowerCase(post.title);
    if (postTitle === postName) {
      res.render("post", {
        title: post.title,
        post: post.post
      })
    } else {
      console.log("Not found");
    }
  })
});



app.use(function(req, res, next) {
  res.status(404);

  res.redirect("/");
})


app.listen(3000, function() {
  console.log("Port listening");
});
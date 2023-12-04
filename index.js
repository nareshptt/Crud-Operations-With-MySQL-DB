const express = require("express");
const req = require("express/lib/request");
const app = express()
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


app.set("view engin", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


let posts = [
    {
        id: uuidv4(),
        username: "Naresh",
        content: "Hello world"
    },

    {
        id: uuidv4(),
        username: "Darshan",
        content: "I love tea"
    },

    {
        id: uuidv4(),
        username: "Vivek",
        content: "I love slipping"
    },
];

// Implement POST

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

// retrive post by id

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});



// Edit post

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});


//Implement PATCH

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");

});


// Delete POST

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})




// Implement GET
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});



app.listen(port, () => {
    console.log('listen to port:8080');
});
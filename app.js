const express = require('express');
const app = express();
const userModel = require("./models/user");
const taskModel = require("./models/task");
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const task = require('./models/task');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded ({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', function(req, res){
    res.render("register");
});

app.get('/login' ,function(req, res){
    res.render("login");
})

app.get('/task/:id/edit', isLoggedIn, async function(req, res){
    let task = await taskModel.findById(req.params.id)

    if(!task || task.createdBy.toString() !== req.user.userid) {
        res.statusCode(403).send("Not Authorized");
    }
    res.render("edit", {task});
});

app.get('/profile', isLoggedIn, async function(req, res){
    let user = await userModel.findOne({email: req.user.email});

    let tasks = await taskModel.find({ createdBy: req.user.userid });
    res.render("profile", {user, tasks});
    
})

app.post('/register', async function(req, res){
    let {name, email, password} = req.body;

    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("user already registered");

    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, async function(err, hash){
           let user = await userModel.create({
                name,
                email,
                password: hash
            });

            let token = jwt.sign({email: email, userid: user._id}, "Promf" );
            res.cookie("token", token);
            res.redirect("/login")
        });
    })
});

app.post('/login', async function(req, res){
    let {email, password} = req.body;

    let user = await userModel.findOne({email});
    if(!user) return res.status(500).redirect("/login");

    bcrypt.compare(password, user.password, function(err, result){
        if(result){ 
            let token = jwt.sign({email: email, userid: user._id}, "Promf" );
            res.cookie("token", token);
            res.redirect("/profile");
        }
        else res.redirect("/login")
    })
    
});

app.post('/create', isLoggedIn, async function(req,res){
    let {title, description} = req.body

    let task = await taskModel.create({
        title,
        description,
        createdBy: req.user.userid
    });
    console.log("req.user in /create:", req.user);
    res.redirect("/profile")
});

app.post('/task/:id/update', isLoggedIn, async function(req,res){
    let {title, description, completed} = req.body;

    let task = await taskModel.findById(req.params.id);

    if(!task || task.createdBy.toString()!== req.user.userid){
        res.statusCode(403).send("Not Authorized");
    }

    task.title = title;
    task.description = description;
    task.completed = completed === "on";

    await task.save();
    res.redirect("/profile")
});

app.post('/task/:id/delete', isLoggedIn, async function(req, res) {
    let deleted = await taskModel.findOneAndDelete({_id: req.params.id, createdBy: req.user.userid});
    res.redirect("/profile")
});

function isLoggedIn(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/login");
    }

    try {
        const data = jwt.verify(token, "Promf");
        req.user = data;
        next(); 
    } catch (error) {
        console.log("JWT verification failed:", error.message);
        return res.redirect("/login");
    }
}




app.listen(3000);
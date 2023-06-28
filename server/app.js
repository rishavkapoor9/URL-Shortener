//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const _ = require('lodash');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/urlShortenerDB',{useNewUrlParser: true, useUnifiedTopology: true});
const shortId = require("shortid");

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "secret string.",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
})
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User",userSchema);
passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
    done(null, user);
});
   
  passport.deserializeUser(function(user, done) {
    done(null, user);
});


const urlSchema = new mongoose.Schema({
    username: String,
    full: String,
    short: {
        type: String,
        default: shortId.generate
    },
    note: String
})
const Url = new mongoose.model("Url",urlSchema);

app.get('/api/get/:username', function(req,res){
    Url.find({username: req.params.username}).then((urls)=>{res.send(urls)});
})
app.get('/api/geturl/:short', function(req,res){
    Url.find({short: req.params.short}).then(function(urls){res.json({full: urls[0].full})});
})
app.get('/login',function(req,res){
    if (req.isAuthenticated()) {
        res.json({ isAuthenticated: true, user: req.user });
      } else {
        res.json({ isAuthenticated: false });
      }
})
app.get('/logout',function(req,res){
    req.logout(function(){});
})
app.post('/api/insert', function(req,res){
    const url = req.body.url
    const note = req.body.note
    const username = req.body.user;
    Url.insertMany([{username: username,full: url, note: note}]).then(()=>{});
})
app.post('/signup',function(req,res){
    User.register({username: req.body.username}, req.body.password, function(err,user){
        if(err){
            console.log(err);
            // res.redirect("/signup");
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.send({ message: 'Authentication successful' });
            });
        }
    })
})

app.post("/login", function(req, res){
    User.findOne({username: req.body.username}).then(function(foundUser, err){
        if(foundUser){
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
        passport.authenticate("local", function(err, user){
            if(err){
                console.log(err);
            } else {
                if(user){
                    req.login(user, function(err){
                        res.send({ message: 'Authentication successful' });
                        // console.log(user)
                    });
                }
                else {
                    // res.send({message: "no user"});
                }
            }
        })(req, res);
        } else {
            // res.redirect("/login")
        }
    });
});

app.listen(4000, function(){
    console.log('server connected on port 4000');
})
var express = require("express");
var app = express();
var methodOverride = require("method-override");
var expresssanitizer = require("express-sanitizer");
//var path = require('path');
//var fs = require('fs');
var passport = require('passport');
var localstrategy = require('passport-local');
var passportlocalmongoose = require('passport-local-mongoose');

app.set("view engine","ejs");
app.use(express.static("public"));
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));

app.use(expresssanitizer());
app.use(methodOverride("_method"));

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/restful",{useMongoClient: true});


var blogSchema =new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date,default:Date.now}
});


var Blog = mongoose.model("blog",blogSchema);

var userSchema = new mongoose.Schema({
  username: String,
  password: String
});
userSchema.plugin(passportlocalmongoose);

var User = mongoose.model("User",userSchema);

// var newuser = new User({username:'CSIAdmin'});
// User.register(newuser,'helloworld',function(err,user)
// {
//   if(err)
//     console.log('error while registering CSIAdmin');
//   else
//   {
//     passport.authenticate("local");
//   }
// });

/*Blog.create({
    title: "hello",
    image: "https://cdn.pixabay.com/photo/2016/02/19/15/46/dog-1210559_960_720.jpg",
    body: "YOYO",
});*/

//app.use(express.bodyParser({uploadDir:'/path/to/temporary/directory/to/store/uploaded/files'}));

app.use(require("express-session")({
  secret:"Anything",
  resave:false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){

  res.locals.currentUser = req.user;
  next();

});


app.get("/",function(req,res)
{
   res.redirect("/blogs"); 
});

app.get("/blogs",function(req,res){
   
   Blog.find({},function(err,blogs)
   {
       if(err)
        console.log("Error!");
        else
        {
            res.render("index",{arr:blogs});
        }
        
   });
   
});

app.get("/blogs/new",isLoggedIn,function(req,res)
{
   res.render("new"); 
});


app.post("/blogs",isLoggedIn,function(req,res)
{
    req.body.blog.body = req.sanitize( req.body.blog.body);

    Blog.create(req.body.blog,function(err,blog)
    {
        if(err)
         console.log("Error!");
        else
        {
            
            res.redirect("/blogs");
        }
    });


});
app.get("/blogs/:id",function(req, res) {
   
   Blog.findById(req.params.id,function(err,found)
   {
     if(err)
        console.log("Error!");
     else
        res.render("show",{blog:found});
     
   });
});


app.get("/blogs/:id/edit",isLoggedIn,function(req, res) {
  
  Blog.findById(req.params.id,function(err,found)
  {
     if(err)
        console.log("error!");
     else
     {
         res.render("edit",{blog:found});
     }
        
     
  });
});

app.put("/blogs/:id",isLoggedIn,function(req,res)
{
   //req.body.blog.body = req.sanitize( req.body.blog.body);
   Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updated)
   {
       if(err)
        res.redirect("/blogs");
    else
     res.redirect("/blogs/" + req.params.id);
   });
   
});


app.delete("/blogs/:id",isLoggedIn,function(req, res){
   //destroy blog
   Blog.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs");
       }
   })
   //redirect somewhere
});

app.get('/login',function(req,res){
  res.render("login");
});

app.post('/login',passport.authenticate("local",{
  successRedirect: "/blogs/new",
  failureRedirect: "/login"
}),function(req,res){

});

app.get('/logout',function(req,res){
  req.logout();
  res.redirect("/blogs");
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
};


app.listen(3000,function()
{
    console.log("Server has started at 3000!!");
});
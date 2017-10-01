var express = require("express");
var app = express();
var methodOverride = require("method-override");
var expresssanitizer = require("express-sanitizer");
//var path = require('path');
//var fs = require('fs');
var passport = require('passport');
var localstrategy = require('passport-local');
var passportlocalmongoose = require('passport-local-mongoose');

var fbstrategy = require('passport-facebook').Strategy;
var request = require('request');
var FB = require('fb');

app.set("view engine","ejs");
app.use(express.static("public"));
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));

app.use(expresssanitizer());
app.use(methodOverride("_method"));

var mongoose = require("mongoose");

//mongoose.connect("mongodb://localhost/restful",{useMongoClient: true});

mongoose.connect("mongodb://rohit:password@ds155644.mlab.com:55644/csiwebsite",{useMongoClient: true});
mongoose.Promise = global.Promise;


var blogSchema =new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date,default:Date.now},
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }]
});


var Blog = mongoose.model("blog",blogSchema);

// var adminSchema = new mongoose.Schema({
//   username: String,
//   password: String
// });
// adminSchema.plugin(passportlocalmongoose);

// var Admin = mongoose.model("Admin",adminSchema);

// var newadmin = new Admin({username:'CSIAdmin'});
// Admin.register(newadmin,'helloworld',function(err,user)
// {
//   if(err)
//     console.log('error while registering CSIAdmin');
//   else
//   {
//     passport.authenticate("local");
//   }
// });

var userSchema = new mongoose.Schema({
  facebookid: Number,
  name:String,
  profileUrl: String,
  dpUrl: String

});

var User = mongoose.model("User",userSchema);

var commentSchema = new mongoose.Schema({
  text: String,
  authorid: Number,
  username: String,
  authorprofileid: String,
  authorimageurl: String

});

var Comment = mongoose.model("Comment",commentSchema);



app.use(require("express-session")({
  secret:"Anything",
  resave:false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//passport.use(new localstrategy(Admin.authenticate()));
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

passport.use(new fbstrategy({
    clientID: '952555494907249' ,
    clientSecret: '10cbad9a78273eee8642d84963afd2b4' ,
    callbackURL: 'https://quiet-fjord-60849.herokuapp.com/login/facebook/return',
    profileFields: ['id', 'displayName', 'photos', 'email','profileUrl']
  },
  function(accessToken, refreshToken, profile, cb) {
    
    return cb(null, profile);
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

//DESERIALIZE USER

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(function(req,res,next){

  res.locals.currentUser = req.user;
  //res.locals.currentStudent = req.user;
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

app.get("/blogs/new",isAdminLoggedIn,function(req,res)
{
   res.render("new"); 
});


app.post("/blogs",isAdminLoggedIn,function(req,res)
{
    //req.body.blog.body = req.sanitize( req.body.blog.body);

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
   
   Blog.findById(req.params.id).populate("comments").exec(function(err,found)
   {
     if(err)
        console.log("Error!");
     else
        res.render("show",{blog:found,blog_id:req.params.id});
     
   });
});


app.get("/blogs/:id/edit",isAdminLoggedIn,function(req, res) {
  
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

app.put("/blogs/:id",isAdminLoggedIn,function(req,res)
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


app.delete("/blogs/:id",isAdminLoggedIn,function(req, res){
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

// app.get('/login',function(req,res){
//   res.render("login");
// });

// app.post('/login',passport.authenticate("local",{
//   successRedirect: "/blogs/new",
//   failureRedirect: "/login"
// }),function(req,res){

// });




app.get('/login',function(req,res){
  res.redirect('/login/facebook');
});


app.get('/login/facebook',
  passport.authenticate('facebook'));



app.get('/login/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/login/facebook' }),
  function(req, res) {
    //console.log(req.user);
    User.find({facebookid:req.user.id},function(err,found){
      if(found.length){
        console.log('user exists!');

      }
      else
      {
        //console.log(req.user);

        User.create({
        name: req.user.displayName,
        facebookid: req.user.id,
        profileUrl: req.user.profileUrl,
        dpUrl: req.user.photos[0].value

          },function(err,created){
        if(err)
          { 
            //console.log("error is here!")
            console.log(err);}
        else
        {
          console.log("new user");
        }

      })
      }
    });

    //console.log(req.user);
    res.redirect('/blogs');
    
  });


  
 app.get("/logout",function(req, res) {

    req.logout();
    res.redirect("/blogs");
});

app.post('/blogs/:id/comments',isLoggedIn,function(req,res){

  Blog.findById(req.params.id,function(err,found){
    if(err)
    {
      console.log('error in finding blog!');
    }
    else
    {
      
        
// var x = 'me?access_token=EAANiWBvnHXEBADZAMTbhNrPyZAcpvfCPaKtvbjEHj97fZBRYzHnJGRZAAW5OGAieIaU6GybrZBONVYZAbQ4nae0ZBUgTQ55KsJbhuQM6a8HynP21tRsi3WEUxcKf7erg5blE4bvUJZCJZCHdYhdRHXCN82cSb79p7xI8ZD&fields=id,picture';
//           FB.api(x,function(data,err) {
//             if(err)
//               console.log('fatal error!');
//             else
//             {
//               //console.log(data.id);
//               //console.log(data.picture.data.url)

//               var tempcomment = {};
//               tempcomment.text = req.body.comment;
//               tempcomment.authorid = req.user.id;
//               tempcomment.username = req.user.displayName;

//               tempcomment.authorprofileid = data.id;
//               tempcomment.authorimageurl = data.picture.data.url;

              

//             }
                  
//                 });  

            var tempcomment = {};
            tempcomment.text = req.body.comment,
            tempcomment.authorid = req.user.id,
            tempcomment.username = req.user.displayName,
            tempcomment.authorprofileid = req.user.profileUrl,
            tempcomment.authorimageurl = req.user.photos[0].value



           Comment.create(tempcomment,function(err,newcomment){
              if(err)
              {
                console.log("error in creating new comment!");
              }
              else
              {
                
                newcomment.save();
                found.comments.push(newcomment);
                found.save(function(err,data){
                  if(err)
                  {
                    console.log(err);
                  }
                  else
                  {
                    res.redirect('/blogs/' + req.params.id);
                  }
                });
              }
            })


          //console.log(req.user);

      
    }
  })
});

app.get('/blogs/:id/comments/:comment_id/edit',function(req,res){

  Blog.findById(req.params.id).populate("comments").exec(function(err,foundBlog){
    if(err)
      console.log(err);
    else
    {
      Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err)
          console.log(err);
        else
        {
          res.render("commentedit",{commentid:req.params.comment_id,blogid:req.params.id,value:foundComment.text});

        }
      })
    }
  });
 
});

app.put('/blogs/:id/comments/:comment_id',function(req,res){
  Comment.findById(req.params.comment_id,function(err,found){
    if(err)
    {
      console.log('error!');
      res.redirect('/blogs/' + req.params.id);
    }
    else
    {
      //console.log(req.body);

      found.text = req.body.comment;
      found.save();
      res.redirect('/blogs/' + req.params.id);
    }
  });
});


app.delete('/blogs/:id/comments/:comment_id',function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id,function(err){
    if(err)
    {
      console.log('error!');
      res.redirect('/blogs/' + req.params.id);
    }
    else
    {
      res.redirect('/blogs/' + req.params.id);
    }
  });
});



function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
};
function isAdminLoggedIn(req,res,next)
{
  if(req.isAuthenticated()&&req.user.id==='105508196870499'){
    return next();
  }

  res.redirect('/blogs')
}


app.listen(process.env.PORT,function()
{
    console.log("Server has started at 3000!!");
});
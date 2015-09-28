var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('../models/posts');


//get all posts
router.get('/posts', function(req, res, next) {
  Post.find(function(err, data){
    if(err){
      res.json({'ERROR' : err});
    } else {
      res.json(data);
    }
  });


// //get single post
// router.get('/post/:id', function(req, res, next){
//   Post.findById(req.params.id, function(err, data){
//     if(err){
//       res.json({'ERROR': err});
//     } else {
//       res.json({'SUCCESS' : data});
//     }
//   });
// });

//post single post
  router.post('/posts', function(req, res, next){
    console.log('testing post route');
    newPost = new Post({
      title : req.body.title,
      description : req.body.description,
      content : req.body.content
    });
    newPost.save(function(err, data){
      if(err){
        res.json({'ERROR' : err});
      } else {
        res.json({'SUCCESS' : data});
      }
    });
  });

});

//edit post
router.put('/post/:id', function(req, res, next){
  var update = {
    title : req.body.title,
    description : req.body.description,
    content : req.body.content
  };
  Post.findByIdAndUpdate(req.params.id, update, function(err, data){
    if(err){
      res.json({'ERROR' : err});
    } else {
      res.json({'SUCCESS' : data});
    }
  });
});

//delete post
router.delete('/post/:id', function(req, res, next){
  Post.findByIdAndRemove(req.params.id, function(err, data){
    if(err){
      res.json({'ERROR': err});
    } else {
      res.json({'SUCCESS' : data});
    }
  });
});


module.exports = router;

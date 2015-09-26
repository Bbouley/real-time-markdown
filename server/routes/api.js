var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('../models/posts');

router.get('/posts', function(req, res, next) {
  Post.find(function(err, data){
    if(err){
      res.json({'ERROR' : err});
    } else {
      res.json(data);
    }
  });

});

module.exports = router;

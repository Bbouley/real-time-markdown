process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../server/app');
var Post = require('../server/models/posts');

var should = chai.should();

chai.use(chaiHttp);

describe('Posts', function(){

  Post.collection.drop();

  beforeEach(function(done){
    var newPost = new Post({
      title: 'test Title',
      description: 'testing out the routes',
      content: 'This is where the content of the page goes. ###___ ````'
    });
    newPost.save(function(err){
      done();
    });
  });

  afterEach(function(done){
    Post.collection.drop();
    done();
  });

  it('should list all blog posts on /posts get', function(done){
    chai.request(server)
    .get('/api/v1/posts')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      // res.body.should.be.a('array');
      done();
    });
  });

});

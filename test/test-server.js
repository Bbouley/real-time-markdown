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
      res.body.should.be.a('array');
      res.body[0].should.have.property('title');
      res.body[0].should.have.property('description');
      res.body[0].should.have.property('content');
      res.body[0].should.have.property('_id');
      res.body[0].title.should.equal('test Title');
      res.body[0].description.should.equal('testing out the routes');
      done();
    });
  });

  it('should add a single blog post on /posts', function(done){
    chai.request(server)
    .post('/api/v1/posts')
    .send({'title': 'This Is The test title for posts', 'description' : 'This is where I describe stuff', 'content' : 'This is where the content goes' })
    .end(function(err, res){
      console.log(res.body.SUCCESS);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.SUCCESS.should.have.property('title');
      res.body.SUCCESS.should.have.property('description');
      res.body.SUCCESS.should.have.property('content');
      res.body.SUCCESS.should.have.property('_id');
      res.body.SUCCESS.title.should.equal('This Is The test title for posts');
      res.body.SUCCESS.description.should.equal('This is where I describe stuff');
      done();
    });
  });

});

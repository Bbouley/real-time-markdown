process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../server/app');
var Post = require('../server/models/posts');

var should = chai.should();

chai.use(chaiHttp);

describe('Posts', function(){

  beforeEach(function(done){

    Post.collection.drop();

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

  it('should list a single post on /post/:id get', function(done){

    var newPost = new Post({
      title : 'single get post',
      description : 'just get one',
      content : 'this is where content goes'
    });

    newPost.save(function(err, data){
      chai.request(server)
      .get('/api/v1/post/' + data.id)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a('object');
        res.body.SUCCESS.should.have.property('title');
        res.body.SUCCESS.should.have.property('description');
        res.body.SUCCESS.should.have.property('content');
        res.body.SUCCESS.should.have.property('_id');
        res.body.SUCCESS.title.should.equal('single get post');
        res.body.SUCCESS.description.should.equal('just get one');
        done();
      });
    });
  });

  it('should add a single blog post on /posts', function(done){
    chai.request(server)
    .post('/api/v1/posts')
    .send({'title': 'This Is The test title for posts', 'description' : 'This is where I describe stuff', 'content' : 'This is where the content goes' })
    .end(function(err, res){
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

  it('should edit a single post on /post/:id put', function(done){
    chai.request(server)
    .get('/api/v1/posts')
    .end(function(err, res){
      chai.request(server)
      .put('/api/v1/post/' + res.body[0]._id)
      .send({'description' : 'testing out put route'})
      .end(function(error, response){
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.have.property('UPDATED');
        response.body.UPDATED.should.have.property('title');
        response.body.UPDATED.should.have.property('description');
        response.body.UPDATED.should.have.property('content');
        response.body.UPDATED.should.have.property('_id');
        response.body.UPDATED.description.should.equal('testing out put route');
        done();
      });
    });
  });

  it('should delete a single post on /post/:id delete', function(done){
    chai.request(server)
    .get('/api/v1/posts')
    .end(function(error, response){
      chai.request(server)
      .delete('/api/v1/post/' + response.body[0]._id)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('DELETED');
        res.body.DELETED.should.have.property('title');
        res.body.DELETED.should.have.property('description');
        res.body.DELETED.should.have.property('content');
        res.body.DELETED.should.have.property('_id');
        res.body.DELETED.title.should.equal('test Title');
        res.body.DELETED.description.should.equal('testing out the routes');
        done();
      });
    });
  });

});

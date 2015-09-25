var mongoose = require('mongoose');
var Schema  = mongoose.Schema;


var Post = new Schema({
  title: String,
  description: String,
  content: String
});


// mongoose.connect(process.env.MONGO_URI);

module.exports = mongoose.model('posts', Post);

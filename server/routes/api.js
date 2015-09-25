var express = require('express');
var router = express.Router();

router.get('/posts', function(req, res, next) {
  console.log('testing get route');
  res.json('testing');
});

module.exports = router;

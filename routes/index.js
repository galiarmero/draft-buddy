var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/players', function(req, res, next) {
    var data = JSON.parse(fs.readFileSync('data/1_player_db.json', 'utf8'));
    res.json(data)
});

router.get('/proj/pergame', function(req, res, next) {
    var data = JSON.parse(fs.readFileSync('data/2_proj_pergame.json', 'utf8'));
    res.json(data)
});

router.get('/proj/zscores', function(req, res, next) {
    var data = JSON.parse(fs.readFileSync('data/3_proj_zscores.json', 'utf8'));
    res.json(data)
});

router.get('/last/pergame', function(req, res, next) {
    var data = JSON.parse(fs.readFileSync('data/4_last_pergame.json', 'utf8'));
    res.json(data)
});

router.get('/last/zscores', function(req, res, next) {
    var data = JSON.parse(fs.readFileSync('data/5_last_zscores.json', 'utf8'));
    res.json(data)
});

module.exports = router;

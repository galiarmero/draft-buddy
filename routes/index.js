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

router.get('/removed_players', function(req, res, next) {
    var data = JSON.parse(fs.readFileSync('data/removed_players.json', 'utf8'));
    res.json(data)
});

router.post('/removed_players', function(req, res, next) {
    var data = JSON.parse(fs.readFileSync('data/removed_players.json', 'utf8'));
    data.push(req.body.player_id);
    fs.writeFileSync('data/removed_players.json', JSON.stringify(data));
    res.status(204).end();
});

router.get('/drafted_players', function(req, res, next) {
    var data = JSON.parse(fs.readFileSync('data/drafted_players.json', 'utf8'));
    res.json(data)
});

router.post('/drafted_players', function(req, res, next) {
    var data = JSON.parse(fs.readFileSync('data/drafted_players.json', 'utf8'));
    data.push(req.body);
    fs.writeFileSync('data/drafted_players.json', JSON.stringify(data));
    res.status(204).send(JSON.stringify(data));
});

module.exports = router;

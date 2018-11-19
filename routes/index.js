var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Candidate = mongoose.model('Candidate');

router.get('/candidates', function(req, res, next) {
    Candidate.find(function(err, candidates) {
        if (err) { return next(err); }
        res.json(candidates);
    });
});


router.post('/candidates', function(req, res, next) {
    console.log(req.body);
    var candidate = new Candidate(req.body);
    candidate.save(function(err, candidate) {
        if (err) { return next(err); }
        console.log(candidate);
        res.json(candidate);
    });
});


router.param('candidate', function(req, res, next, id) {
    //find comment by ID
    Candidate.findById(id, function(err, candidate) {
        if (err) { return next(err); }
        if (!candidate) { return next(new Error("can't find candidate")); }
        req.candidate = candidate;
        //return next fills res.json with comment from req.comment
        return next();
    });
});

router.get('/candidates/:candidate', function(req, res) {
    res.json(req.candidate);
});

router.put('/candidates/:candidate/upvote', function(req, res, next) {
    req.candidate.upvote(function(err, candidate) {
        if (err) { return next(err); }
        res.json(candidate);
    });
});

router.delete('/candidates/:candidate', function(req, res) {
    console.log("in Delete");
    req.candidate.remove();
    res.sendStatus(200);
});

module.exports = router;

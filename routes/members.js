var express = require("express");
var router = express.Router(); 
var Member = require('../models/Member')

// members index\
router.get('/', function(req, res){
	Member.find({}, function(err, members){
		if(err) return res.json(err);
		res.render('members/index', {members:members});
	})
});

// members - new
router.get('/new', function(req, res){
	res.render('members/new');
});

// members - create
router.post('/', function(req,res){
	Member.create(req.body, function(err, member){
		if(err) return res.json(err);
		res.redirect('/members');
	});
});

// member - show
router.get('/:id', function(req, res){
	Member.findOne({_id:req.params.id}, function(err, member){
		if(err) return res.json(err);
		res.render('members/show', {member:member});
	});
});

// member - edit
router.get('/:id/edit', function(req, res){
	Member.findOne({_id:req.params.id}, function(err, member){
		if(err) return res.json(err);
		res.render('members/edit', {member:member});
	});
});

// members - update
router.put('/:id', function(req, res){
	Member.findOneAndUpdate({_id:req.params.id}, req.body, function(err, member){
		if(err) return res.json(err);
		res.redirect('/members/'+req.params.id);
	});
});

// members - destroy
router.delete('/:id', function(req, res){
	Member.remove({_id:req.params.id}, function(err, member){
		if(err) return res.json(err);
		res.redirect('/members');
	});
});

module.exports = router;
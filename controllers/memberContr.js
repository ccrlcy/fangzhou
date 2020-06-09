var Member = require('../models/Member');
var Country = require('../models/Country');
var University = require('../models/University');
var Contract = require('../models/Contract');
var Hdcontract = require('../models/Hdcontract');
var Meeting = require('../models/Meeting');
var Meeting = require('../models/MemberInfo');

var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Displau list all

exports.memberList = function(req, res, next) {

	Member.find()
		.sort([['name', 'status']])
		.exec(function(err, listMembers){
			if(err) {return next(err);}
			res.render('/members/index', {title: 'Member List', memberList: listMembers});
		})

	async.parallel({
		member: function (callback) {
			Member.findById(req.params.id)
				.exec(callback)
		},
		memberContract: function(callback) {
			Contract.find({'name' :req.params.id}, '입시')
				.exec(callback)
		},
		// memberHdcontract: function(callback){
		// 	Hdcontract.find({'name': req.params.id}, '한국어')
		// 		.exec(callback)
		// },
		// memberMeeting: function(callback) {
		// 	Meeting.find({'name': req.params.id}, '미팅')
		// },
		memberCount: function(callback) {
			Member.count({status:'진행 중'}, callback);
		},
	}, function(err, results) {
		if(err) {return next(err);}
		if(results.member == null){
			var err = new Error('member not found');
			err.status = 404;
			return next(err);
		}
		// 성공시
		res.render('memberList', {title: 'Member', member: results.member, memberContract: results.memberContract});
	});
};

exports.memberDetail = function(req, res, next) {

	async.parallel({
		member: function (callback) {
			Member.findById(req.params.id)
				.exec(callback)
		},
		memberContract: function(callback) {
			Contract.find({'name' :req.params.id}, '입시')
				.exec(callback)
		},
		memberHdcontract: function(callback){
			Hdcontract.find({'name': req.params.id}, '한국어')
				.exec(callback)
		},
		memberMeeting: function(callback) {
			Meeting.find({'name': req.params.id}, '미팅')
		},
		memberCount: function(callback) {
			Member.count({status:'진행 중'}, callback);
		},
	}, function(err, results) {
		if(err) {return next(err);}
		if(results.member == null){
			var err = new Error('member not found');
			err.status = 404;
			return next(err);
		}
		// 성공시
		res.render('memberList', {title: 'Member', member: results.member, memberContract: results.memberContract});
	});
};

// Display Member Create form on GET
exports.memberCreateGet = function(req, res, next) {

	async.parallel({
		countrys: function(callback){
			Country.find(callback);
		},
		universitys: function(callback){
			University.find(callback);
		},
	}, function(err, results) {
		if (err) {return next(err);}
		res.render('/members/new', {title: 'Create Member', countrys:results.countrys, universitys:results.universitys});
	});
};

exports.memberCreatePost = [

	(req, res, next) => {
		if(!(req.body.country instanceof Array)) {
			if(typeof req.body.country==='undefined')
				req.body.country=[];
			else
				req.body.country = new Array(req.body.country);
		};
		if(!(req.body.university instanceof Array)) {
			if(typeof req.body.university==='undefined')
				req.body.university=[];
			else
				req.body.university = new Array(req.body.university);
		}
		// 
		member.save(function(err){
			if(err) {return next(err);}
				res.redirect(member.url);
		});
	},
];

exports.memberDeleteGet = function(req, res, next) {

	async.parallel({
		member:function(callback){
			Member.findById(req.params.id).populate('country').populate('university').exec(callback);
		},
		contract: function(callback){
			Contract.find({'name': req.params.id}).exec(callback);
		},
		meeting: function(callback){
			Meeting.find({'name': req.params.id}).exec(callback);
		},
		hdcontract: function(callback){
			Hdcontract.find({'name': req.params.id}).exec(callback);
		},
		memberInfo: function(callback){
			MemberInfo.find({'name': req.params.id}).exec(callback);
		}
	}, function(err, results) {
		if(err) {return next(err);}
		if(results.member==null){
			res.redirect('/members');
		}
		res.render('memberDelete', {title: 'Delete Member', member: results.member, contract:results.contract, meeting:results.meeting, hdcontract:results.hdcontract, memberInfo:results.memberInfo});
	});
};

exports.memberDeletePost = function(req, res, next){
	async.parallel({
		member: function(callback){
			Member.findById(req.params.id).populate('country').populate('university').exec(callback);
		},
		contract: function(callback){
			Contract.find({'name': req.params.id}).exec(callback);
		},
		meeting: function(callback){
			Meeting.find({'name': req.params.id}).exec(callback);
		},
		hdcontract: function(callback){
			Hdcontract.find({'name': req.params.id}).exec(callback);
		},
		memberInfo: function(callback){
			MemberInfo.find({'name': req.params.id}).exec(callback);
		},
	}, function(err, results){
		if(err) {return next(err);}
		if(results.country.length > 0){
			res.render('memberDelete', {title: 'Delete Book', member:results.member, contract: results.contract, meeting: results.meeting, hdcontract:results.hdcontract, memberInfo:results.memberInfo});
			return;
		} else if (results.university.length > 0 ) {
			res.render('memberDelete', {title: 'Delete Book', member:results.member, contract: results.contract, meeting: results.meeting, hdcontract:results.hdcontract, memberInfo:results.memberInfo});
			return;
		} else {
			Member.findByIdAndRemove(req.body.id, function deleteMember(err){
				if(err) {return next(err);}
				res.redirect('/members')
			});
		}
	});
};

// Display update
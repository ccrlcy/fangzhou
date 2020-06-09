var express = require("express");
var router = express.Router(); 

var Contract = require('../models/Contract');
var Member = require('../models/Member');

var async = require('async');

var contractContr = require('../controllers/contractContr');


// GET request for list of all contract.
router.get('/', contractContr.contractList);

// GET catalog home page.
// router.get('/', contractContr.index);  

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
// router.get('/new', contractContr.contractCreateGet);

// POST request for creating contract.
// router.post('/', contractContr.contractCreatePost);

// GET request to delete contract.
// router.get('/contracts/:id/delete', contractContr.contractDeleteGet);

// // POST request to delete contract.
// router.post('/contracts/:id/delete', contractContr.contractDeletePost);

// // GET request to update contract.
// router.get('/contracts/:id/update', contractContr.contractUpdateGet);

// // POST request to update contract.
// router.post('/contracts/:id/update', contractContr.contractUpdatePost);

// // GET request for one contract.
// router.get('/contracts/:id', contractContr.contractDetail);


// Contracts index\
// router.get('/', function(req, res, next){
// 	Contract.find()
//     .populate('member')
//     .exec(function (err, contractsList) {
//       if (err) { return next(err); }
//       // Successful, so render
//       res.render('contracts/index', { contracts : contractsList});
//     });
// 	// Contract.find({}, function(err, contracts){
// 	// 	if(err) return res.json(err);
// 	// 	res.render('contracts/index', {contracts:contracts});
//    // async.parallel({
//    //    member_count: function(callback) {
//    //    	Member.count(callback);
//    // 	},
//    //      // member_instance_available_count: function(callback) {
//    //      //     memberInstance.count({status:'Available'},callback);
//    //      // },
//    //   	contract_count: function(callback) {
//    //     	Contract.count(callback);
//    //    },
//    //  	contracts : function(callback){
//    //  		Contract.find()
// 	  //       .sort(['fzman', 'ascending'])
// 	  //      	.exec(callback)        
//    //   	},
//    //  }, function(err, results) {
//    //      res.render('contracts', { title: 'Home', error: err, data: results, contracts: results.contracts });
//    //  });
// });


// contracts - new
router.get('/new', function(req, res){
	// res.render('contracts/new');
	async.parallel({
     	members: function (callback) {
         Member.find(callback);
     },
	}, function (err, results) {
     	if (err) { return next(err); } // Error in API usage.
     // Successful, so render.
     res.render('contracts/new', { members: results.members });
 	});
});

// contracts - create
router.post('/', function(req, res){
	// 	Contract.create(function(error) {
	//     if (!error) {
	//         Contract.find({})
	//             .populate('member')
	//             .exec(function(error, contracts) {
	//                 console.log(JSON.stringify(contracts, null, "\t"))
	//             })
	//     }
	//    	res.render('contracts/index');
	// });
			
 //    // Create a Book object with escaped and trimmed data.

 //  	var contract = new Contract({ 
 //  		member: req.body.member,
	// 		frcrew: req.body.frcrew,
 //      serviceName: req.body.serviceName,
 //      dateOfContract: req.body.dateOfContract,
 //      appDate: req.body.appDate
	// });

	// async.parallel({
	// 	members: function(callback){
	// 		Member.find(callback);
	// 	}, 
	// 	contracts : function(callback){
	// 		Contract.create(req.body)
	// 	}
	// }, function(err, results){
	// 	if(err) {return next(err);}
	// 	res.render('contracts/new', {members: results.members, contracts: results.contracts});
	// });

	Contract.create(req.body, function(err, contract){
		if(err) return res.json(err);
		res.redirect('/contracts');
	});
});

// contract - show
router.get('/:id', function(req, res){
	Contract.findOne({_id:req.params.id}, function(err, contract){
		if(err) return res.json(err);
		res.render('contracts/show', {contract:contract});
	});
});

// contract - edit
router.get('/:id/edit', function(req, res){
	Contract.findOne({_id:req.params.id}, function(err, contract){
		if(err) return res.json(err);
		res.render('contracts/edit', {contract:contract});
	});
});

// contracts - update
router.put('/:id', function(req, res){
	Contract.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contract){
		if(err) return res.json(err);
		res.redirect('/contracts/'+req.params.id);
	});
});

// contracts - destroy
router.delete('/:id', function(req, res){
	Contract.remove({_id:req.params.id}, function(err, contract){
		if(err) return res.json(err);
		res.redirect('/contracts');
	});
});

module.exports = router;
var Contract = require('../models/Contract');
var Member = require('../models/Member');

const { body,validationResult } = require('express-validator/check');

var async = require('async');

// Display list of all books.
exports.contractList = function(req, res, next) {

  Contract.find({})
    .populate('member')
    .exec(function (err, contractsList) {
      if (err) { return next(err); }
      // Successful, so render
      res.render('contracts/index', { contracts : contractsList});
    });
};

// Display detail page for a specific book.
exports.contractDetail = function(req, res, next) {

  	async.parallel({
   	contract: function(callback) {
    		Contract.findById(req.params.id)
         	.populate('member')
          .exec(callback);
    	},
 	}, function(err, results) {
    	if (err) { return next(err); }
        // Successful, so render.
     	res.render('contracts/show', { contract: results.contract} );
 	});
};

// Display book create form on GET.
exports.contractCreateGet = function(req, res, next) {

    // Get all authors and genres, which we can use for adding to our contract.
  	async.parallel({
   	  members: function(callback) {
      	Member.find(callback);
      },
  	},function(err, results) {
      if (err) { return next(err); }
      res.render('contracts/new', { title: 'Create', members:results.members});
  	});
};

exports.contractCreatePost = [
    // Process request after validation and sanitization.
    (req, res, next) => {        

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        // Create a Book object with escaped and trimmed data.
        var contract = new Contract(
          { member: req.body.member,
            dateOfContract: req.body.dateOfContract,
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all authors and genres for form.
            async.parallel({
                members: function(callback) {
                  Member.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }

                res.render('contracts/new', {members:results.members, contract: contract});
            });
            return;
        }
        else {
            // Data from form is valid. Save book.
            contract.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new contract record.
                res.redirect('/contracts');
                });
        }
    }
];


// // Display book delete form on GET.
// exports.contractDeleteGet = function(req, res, next) {

//  	async.parallel({
//     	contract: function(callback) {
//        	Contract.findById(req.params.id).populate('member').populate('fzcrew').exec(callback);
//     	},
//  	}, function(err, results) {
//     	if (err) { return next(err); }
//      	if (results.contracts==null) { // No results.
//      		res.redirect('/contracts');
//       }
//         // Successful, so render.
//   		res.render('book_delete', { title: 'Delete Book', book: results.book, book_instances: results.book_bookinstances } );
//     });

// };

// Handle book delete on POST.
exports.ContractDeletePost = function(req, res, next) {

    // Assume the post has valid id (ie no validation/sanitization).
  	async.parallel({
     	contract: function(callback) {
       	Contract.findById(req.params.id).populate('member').populate('fzcrew').exec(callback);
    	},
  	}, function(err, results) {
    	if (err) { return next(err); }
      // Book has no BookInstance objects. Delete object and redirect to the list of books.
      Book.findByIdAndRemove(req.body.id, function deleteBook(err) {
          if (err) { return next(err); }
          // Success - got to books list.
          res.redirect('/contracts');
      });
    });
};

// Display book update form on GET.
exports.contractUpdateGet = function(req, res, next) {

    // Get contract, authors and genres for form.
    async.parallel({
        	contract: function(callback) {
          	Contract.findById(req.params.id).populate('member').populate('fzcrew').exec(callback);
        	},
        	members: function(callback) {
           	Member.find(callback);
        	},
    	}, function(err, results) {
   		if (err) { return next(err); }
        	if (results.contract==null) { // No results.
         	var err = new Error('Book not found');
            err.status = 404;
           	return next(err);
            }
            // Success.
         	res.render('contracts/new', { title: 'Update', members:results.members, contract: results.contract });
        });

};


// Handle book update on POST.
exports.contractUpdatePost = [
    // Process request after validation and sanitization.
  	(req, res, next) => {

 	 	// Extract the validation errors from a request.
  		const errors = validationResult(req);

     	// Create a contract object with escaped/trimmed data and old id.
     	var contract = new Contract({ 
	  	  member: req.body.member,
		    fzcrew: req.body.fzcrew,
        serviceName: req.body.serviceName,
        dateOfContract: req.body.dateOfContract,
        appDate: req.body.appDate
		});

	  	if (!errors.isEmpty()) {
       // There are errors. Render form again with sanitized values/error messages.
            // Get all authors and genres for form
        	async.parallel({
          	contracts: function(callback) {
            	Contract.find(callback);
           	},
        	}, function(err, results) {
          	if (err) { return next(err); }
          	res.render('contracts/new', { title: 'Update',members:results.members, contract: contract, errors: errors});
            });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Contract.findByIdAndUpdate(req.params.id, contract, {}, function (err,contract) {
                if (err) { return next(err); }
                   // Successful - redirect to book detail page.
                   res.redirect('/contracts');
                });
        }
    }
];
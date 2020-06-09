var express = require('express');
var router = express.Router();


// Require our controllers.
var memberCont = require('../controllers/memberController'); 
var contractCont = require('../controllers/contractController');
var countryCont = require('../controllers/countryController');
var UniversityCon = require('../controllers/universityController');


/// memebr ROUTES ///

// GET catalog home page.
router.get('/', memberCont.index);  

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/member/create', memberCont.member_create_get);

// POST request for creating member.
router.post('/member/create', memberCont.member_create_post);

// GET request to delete member.
router.get('/member/:id/delete', memberCont.member_delete_get);

// POST request to delete member.
router.post('/member/:id/delete', memberCont.member_delete_post);

// GET request to update member.
router.get('/member/:id/update', memberCont.member_update_get);

// POST request to update member.
router.post('/member/:id/update', memberCont.member_update_post);

// GET request for one member.
router.get('/member/:id', memberCont.member_detail);

// GET request for list of all member.
router.get('/members', memberCont.member_list);

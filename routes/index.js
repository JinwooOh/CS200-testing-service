import React from 'react';
import ReactDOM from 'react-dom';
import Router from '../client/src/components/Router';
import './css/style.css';
var express = require('express');
var router = express.Router();

// ReactDOM.render(<Router />, document.getElementById('main'));
// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;
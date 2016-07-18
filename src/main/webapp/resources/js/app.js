'use strict';

var App = angular.module('CRUDdemoApp', ['ngMaterial']);

var checkResolution = function() {
	var width = screen.width;
	var height = screen.height;
	var errorMSG = 'This Site is Designed to Work for Resolutions from 320x480. Use Portrait Mode if You Can!';

	if (width <= 320 || height <= 480) {
		alert(errorMSG);
	}

},

initUserModal = function() {
	var fullname = $('#fullname'), email = $('#email'), username = $('#username'), password = $('#password'), repassword = $('#repassword'), phone = $('#phone');
	email.on('blur keyup paste', function(evt) {
		validateEmail();
	});
	username.on('blur keyup paste', function(evt) {
		validateUsername();
	});
	password.on('blur keyup paste', function(evt) {
		validatePassword();
	});
	repassword.on('blur keyup paste', function(evt) {
		validatePassword();
	});
	phone.on('keypress ', function(evt) {
		var charCode = (evt.which) ? evt.which : evt.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57))
			return false;
		return true;
	});
	phone.bind('paste', function(e) {
		e.preventDefault();
	});
	phone.intlTelInput({
		utilsScript : "/spring-mvc-demo/resources/lib/int-tel-input/utils.js"
	});
	$('#userModal').on('shown.bs.modal', function() {
		fullname.focus();
	});
},

userModal = function(option) {
	$('#userModal').modal(option);
},

appendRow = function() {
	var tr = $('#userTable tr:last');
	tr.hide();
	tr.fadeIn('slow', function() {
		// console.log('last tr appended');
	});
},

hideRow = function(id, callback) {
	var tr = $('#userTable tr').eq(id);
	tr.fadeOut('slow', function() {
		callback();
	});
},

startDelet = function(deleteBtnID, rowID) {
	if (confirm('Are you sure?')) {
		hideRow(rowID, function() {
			$('#' + deleteBtnID).click();
		});
	}

},

validateEmail = function() {
	var _emailregex = /^(([^<>()\[\]\.,;:\s@\']+(\.[^<>()\[\]\.,;:\s@\']+)*)|(\'.+\'))@(([^<>()[\]\.,;:\s@\']+\.)+[^<>()[\]\.,;:\s@\']{2,})$/i;
	var _validEmail = _emailregex.test($('#email').val());

	if (!_validEmail) {
		addDangerClasses($('#email'));
		return false;
	} else {
		removeDangerClasses($('#email'));
		return true;
	}
},

validateUsername = function() {
	var _validUserName = $('#username').val().trim().length > 4;
	if (!_validUserName) {
		addDangerClasses($('#username'));
		return false;
	} else {
		removeDangerClasses($('#username'));
		return true;
	}
},

validatePassword = function() {
	var _validPassword = $('#password').val().trim().length > 7;
	var _matchPassword = $('#password').val().trim() === $('#repassword').val()
			.trim();
	var _validPasswordConfirm = $('#repassword').val().trim().length > 7
			&& _matchPassword;
	if (!_validPassword) {
		addDangerClasses($('#password'));
	} else {
		removeDangerClasses($('#password'));
	}

	if (!_validPasswordConfirm) {
		addDangerClasses($('#repassword'));
	} else {
		if (_matchPassword) {
			removeDangerClasses($('#repassword'));
		}
	}

	if (_validPassword && _validPasswordConfirm && _matchPassword) {
		return true;
	}
},

validateAll = function() {
	var _valid = false;

	validateEmail();
	// validateUsername();
	// validatePassword();

	if (validateEmail()) {
		_valid = true;
	}
	return _valid;
},

validateUpdate = function() {
	var _valid = false;

	validateEmail();
	// validateUsername();

	if (validateEmail()) {
		_valid = true;
	}
	return _valid;
},

addDangerClasses = function(object) {
	object.attr('class', '');
	object.parent().closest('div').attr('class', '');
	object.parent().closest('div').addClass('form-group has-danger');
	object.addClass('form-control form-control-danger');
},

removeDangerClasses = function(object) {
	object.attr('class', '');
	object.parent().closest('div').attr('class', '');
	object.parent().closest('div').addClass('form-group');
	object.addClass('form-control');
};


$(document).ready(function() {
	console.log('app ready');
	checkResolution();
	$('.genders .btn-secondary').click(function() {
        var pos = $('.genders').offset(), inputTop = pos.top, windowTop = $(window).scrollTop(), 
        dropdownFitsBelow = inputTop + $('.genders').outerHeight() + $('.genders > div').outerHeight() < windowTop + $(window).height(), dropdownFitsAbove = inputTop - $('.genders > div').outerHeight() > windowTop;
        $('.genders').toggleClass("dropup", !dropdownFitsBelow && dropdownFitsAbove);

	});
	
//	$('#resultTablePagination li').on('click', function(){
//	    $('#resultTablePagination li').removeClass('active');
//	    $(this).addClass('active');
//	});
});
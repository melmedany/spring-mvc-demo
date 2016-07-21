'use strict';

var App = angular.module('CRUDdemoApp', [ 'ngMaterial' ]);

var checkResolution = function() {
	var width = screen.width;
	var height = screen.height;
	var errorMSG = 'This Site is Designed to Work for Resolutions from 320x480. Use Portrait Mode if You Can!';

	if (width <= 320 || height <= 480) {
		alert(errorMSG);
	}

},

initUserModal = function() {
	var fullname = $('#fullname'), email = $('#email'), phone = $('#phone');
	email.on('blur keyup paste', function(evt) {
		validateEmail();
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

validateAll = function() {
	var _valid = false;

	validateEmail();

	if (validateEmail()) {
		_valid = true;
	}
	return _valid;
},

validateUpdate = function() {
	var _valid = false;

	validateEmail();

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

$(document)
		.ready(
				function() {
					console.log('app ready');
					checkResolution();
					$('.genders .btn-secondary')
							.click(
									function() {
										var pos = $('.genders').offset(), inputTop = pos.top, windowTop = $(
												window).scrollTop(), dropdownFitsBelow = inputTop
												+ $('.genders').outerHeight()
												+ $('.genders > div')
														.outerHeight() < windowTop
												+ $(window).height(), dropdownFitsAbove = inputTop
												- $('.genders > div')
														.outerHeight() > windowTop;
										$('.genders').toggleClass(
												"dropup",
												!dropdownFitsBelow
														&& dropdownFitsAbove);

									});

				});
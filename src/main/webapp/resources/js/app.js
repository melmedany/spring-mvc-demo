'use strict';

var App = angular.module('CRUDdemoApp', []);

$(document).ready(function() {
	console.log('app ready');
	checkResolution();
});

var checkResolution = function() {
	var width = screen.width;
	var height = screen.height;
	var errorMSG = 'This Site is Designed to Work for Resolutions from 320x480. Use Portrait Mode if You Can!';

	if (width <= 320 || height <= 480) {
		alert(errorMSG);
	}

},

initUserModal = function() {
	var fullname = $('#fullname'), email = $('#email'), username = $('#username'), password = $('#password'), repassword = $('#repassword'), day = $('#BirthDay'), year = $('#BirthYear'), phone = $('#phone');
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
	day.bind('paste', function(e) {
		e.preventDefault();
	});
	year.on('keypress ', function(evt) {
		var charCode = (evt.which) ? evt.which : evt.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57))
			return false;
		return true;
	});
	year.bind('paste', function(e) {
		e.preventDefault();
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
	var _31Months = [ 'January', 'March', 'May', 'July', 'August', 'October',
			'December' ];
	var _30Months = [ 'April', 'June', 'September', 'November' ];
	$('#BirthMonth').on(
			'change',
			function() {
				if ($.inArray(this.value, _31Months) > -1) {
					day.unbind('keypress');
					day.keypress(function(evt) {
						var charCode = (evt.which) ? evt.which : evt.keyCode;
						if (day.val() === ''
								&& (charCode > 48 && charCode < 58)) {
							return true;
						} else if (day.val() !== '' && day.val() < 3
								&& (charCode > 47 && charCode < 58)) {
							return true;
						} else if (day.val() === '3'
								&& (charCode > 47 && charCode < 50)) {
							return true;
						} else {
							return false;
						}
					});
				} else if ($.inArray(this.value, _30Months) > -1) {
					(day.val() > 30) ? day.val(30) : '';
					day.unbind('keypress');
					day.keypress(function(evt) {
						var charCode = (evt.which) ? evt.which : evt.keyCode;
						if (day.val() === ''
								&& (charCode > 48 && charCode < 58)) {
							return true;
						} else if (day.val() !== '' && day.val() < 3
								&& (charCode > 47 && charCode < 58)) {
							return true;
						} else if (day.val() === '3'
								&& (charCode > 47 && charCode < 49)) {
							return true;
						} else {
							return false;
						}
					});
				} else if (this.value === 'February') {
					(day.val() > 29) ? day.val(29) : '';
					day.unbind('keypress');
					day.keypress(function(evt) {
						var charCode = (evt.which) ? evt.which : evt.keyCode;
						if (day.val() === ''
								&& (charCode > 48 && charCode < 58)) {
							return true;
						} else if (day.val() !== '' && day.val() < 3
								&& (charCode > 47 && charCode < 58)) {
							return true;
						} else {
							return false;
						}
					});
				} else {
					day.unbind('keypress');
					day.keypress(function(evt) {
						var charCode = (evt.which) ? evt.which : evt.keyCode;
						if (day.val() === ''
								&& (charCode > 48 && charCode < 58)) {
							return true;
						} else if (day.val() !== '' && day.val() < 3
								&& (charCode > 47 && charCode < 58)) {
							return true;
						} else if (day.val() === '3'
								&& (charCode > 47 && charCode < 50)) {
							return true;
						} else {
							return false;
						}
					});
				}
			});
	day.unbind('keypress');
	day.keypress(function(evt) {
		var charCode = (evt.which) ? evt.which : evt.keyCode;
		if (day.val() === '' && (charCode > 48 && charCode < 58)) {
			return true;
		} else if (day.val() !== '' && day.val() < 3
				&& (charCode > 47 && charCode < 58)) {
			return true;
		} else if (day.val() === '3' && (charCode > 47 && charCode < 50)) {
			return true;
		} else {
			return false;
		}
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
	validateUsername();
	validatePassword();

	if (validateEmail() && validateUsername() && validatePassword()) {
		_valid = true;
	}
	return _valid;
},

validateUpdate = function() {
	var _valid = false;

	validateEmail();
	validateUsername();

	if (validateEmail() && validateUsername()) {
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
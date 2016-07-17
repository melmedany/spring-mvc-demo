'use strict';

App.controller('UserController', [
		'$scope',
		'UserService',
		function($scope, UserService) {
			var self = this;
			self.selectedUser;
			self.users = [];
			self.geners = [ 'Female', 'Male', 'Other' ];

			self.fetchAllUsers = function() {
				UserService.fetchAllUsers().then(function(d) {
					self.users = d;
				}, function(errResponse) {
					console.error('Error while fetching Currencies');
				});
			};

			self.findUserById = function(id) {
				UserService.fetchByID(id).then(function(d) {
					var user = d;
					return user;
				}, function(errResponse) {
					console.error('Error while fetching user with id ' + id);
				});
			}

			self.createUser = function(user) {
				UserService.createUser(user).then(self.fetchAllUsers,
						function(errResponse) {
							console.error('Error while creating User.');
						});
			};

			self.updateUser = function(user, id) {
				UserService.updateUser(user, id).then(self.fetchAllUsers,
						function(errResponse) {
							console.error('Error while updating User.');
						});
			};

			self.deleteUser = function(id) {
				if (confirm('Are you sure?')) {
					console.log('start deleting');
					UserService.deleteUser(id).then(self.fetchAllUsers,
							function(errResponse) {
								console.error('Error while deleting User.');
							});
				}

			};

			self.fetchAllUsers();

			self.submit = function() {
				if (self.selectedUser.id == null) {
					if (validateAll()) {
						self.createUser(self.selectedUser);
						userModal('hide');
						self.reset();
					}
				} else {
					if (validateUpdate()) {
						self.updateUser(self.selectedUser);
						userModal('hide');
						self.reset();
					}
				}
			};

			self.add = function(id) {
				self.reset();
				userModal('show');
				initUserModal();
			};

			self.edit = function(id) {
				UserService.fetchByID(id).then(function(d) {
					self.selectedUser = d;
					userModal('show');
					initUserModal();
				}, function(errResponse) {
					console.error('Error while fetching user with id ' + id);
				});
			};

			self.remove = function(id) {
				console.log('id to be deleted', id);
				if (self.selectedUser.id === id) {
					self.reset();
				}
				self.deleteUser(id);
			};

			self.selectGener = function(gender) {
				self.selectedUser.gender = gender;
			}

			self.reset = function() {
				self.selectedUser = {
					id : null,
					name : '',
					email : '',
					birthyear : '',
					birthMonth : '',
					birthday : '',
					gender : '',
					phone : '',
					username : '',
					password : ''
				};
				$scope.appFrm.$setPristine();
			};

		} ]);

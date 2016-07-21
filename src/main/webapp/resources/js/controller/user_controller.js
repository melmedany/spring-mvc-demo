'use strict';

App.controller('UserController', [
		'$scope',
		'UserService',
		function($scope, UserService) {
			var self = this;
			self.selectedUser;
			self.users = [];
			self.geners = [ 'Female', 'Male', 'Other' ];
			self.currentUsers = [];
			self.currentPage = 1;
			self.numPerPage = 10;
			self.maxSize = 5;
			self.pages = [];

			self.fetchAllUsers = function() {
				UserService.fetchAllUsers().then(
						function(d) {
							self.users = d;
							for (var i = 0; i < Math.ceil(self.users.length
									/ self.numPerPage); i++) {
								self.pages.push('' + (i + 1) + '');
							}
							self.paging();
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
					UserService.deleteUser(id).then(self.fetchAllUsers,
							function(errResponse) {
								console.error('Error while deleting User.');
							});
				}

			};

			self.paging = function() {
				var begin = ((self.currentPage - 1) * self.numPerPage);
				var end = begin + self.numPerPage;
				self.currentUsers = self.users.slice(begin, end);
			};

			self.pageChanged = function(page) {
				if (page > 0 && page <= self.pages.length) {
					self.currentPage = page;
					self.paging();
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
					self.selectedUser.birthdate = new Date(self.selectedUser.birthdate);
					userModal('show');
					initUserModal();
				}, function(errResponse) {
					console.error('Error while fetching user with id ' + id);
				});
			};

			self.remove = function(id) {
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
					birthdate : '',
					gender : '',
					phone : ''
				};
				self.selectedUser.birthdate = new Date();
				$scope.appFrm.$setPristine();
			};
		} ]);

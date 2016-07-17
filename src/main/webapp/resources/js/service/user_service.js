'use strict';

App.factory('UserService', ['$http', '$q', function($http, $q){
	var baseURL = window.location.href;
	return {
		
			fetchAllUsers: function() {
					return $http.get(baseURL+'/users/search/')
							.then(
									function(response){
										return response.data;
									}, 
									function(errResponse){
										console.error('Error while fetching users');
										return $q.reject(errResponse);
									}
							);
			},
			fetchByID: function(id){
				return $http.get(baseURL+'/users/search/'+id)
						.then(
								function(response){
									return response.data;
								}, 
								function(errResponse){
									console.error('Error while finding user');
									return $q.reject(errResponse);
								}
						);
			},
		    
		    createUser: function(user){
					return $http.post(baseURL+'/users/create/', user)
							.then(
									function(response){
										return response.data;
									}, 
									function(errResponse){
										console.error('Error while creating user');
										return $q.reject(errResponse);
									}
							);
		    },
		    
		    updateUser: function(user, id){
					return $http.put(baseURL+'/users/update/', user)
							.then(
									function(response){
										return response.data;
									}, 
									function(errResponse){
										console.error('Error while updating user');
										return $q.reject(errResponse);
									}
							);
			},
		    
			deleteUser: function(id){
					return $http.delete(baseURL+'/users/delete/'+id)
							.then(
									function(response){
										return response.data;
									}, 
									function(errResponse){
										console.error('Error while deleting user');
										return $q.reject(errResponse);
									}
							);
			}
		
	};

}]);

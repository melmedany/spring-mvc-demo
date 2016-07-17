<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta name="viewport" content="width=device-width" initial-scale="1" />
<meta http-equiv="Cache-Control" content="max-age=60" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/lib/bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/lib/font-awesome/css/font-awesome.min.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/lib/int-tel-input/intlTelInput.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/style.css?v=${timeStampe}" />
<title>User Registration Demo - Spring MVC</title>
</head>
<body>
	<form ng-app="CRUDdemoApp" ng-controller="UserController as ctrl"
		class="form" name="appFrm">
		<div class="page-wrapper">
			<div class="container-fluid">
				<div class="row">
					<div class="col-lg-12">
						<h1 class="page-header">
							Users <small>list of registered users</small>
						</h1>
					</div>
				</div>


				<div class="row tab-search">
					<div class="col-md-12">
						<a class="btn btn-success pull-right" title="Add User"
							ng-click="ctrl.add();"> <i class="fa fa-plus"></i> Add User
						</a>
					</div>
					<div class="col-md-5"></div>
				</div>
				<div id="resultTable">
					<table id="userTable" class="table table-hover">
						<thead>
							<tr>
								<th>#</th>
								<!-- <th>Username</th> -->
								<th>Full Name</th>
								<th>E-Mail</th>
								<th>Birth Date</th>
								<th>Gender</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							<tr ng-repeat="u in ctrl.currentUsers">
								<td><span>{{$index+1}}</span></td>
								<!-- <td><span>{{u.username}}</span></td> -->
								<td><span>{{u.name}}</span></td>
								<td><span>{{u.email}}</span></td>
								<td><span>{{u.birthyear}}</span></td>
								<td><span>{{u.gender}}</span></td>
								<td>
									<div class="text-center">
										<a class="btn btn-primary btn-circle" title="Edit User"
											ng-click="ctrl.edit(u.id)"> <i class="fa fa-pencil"></i>
										</a> <a class="btn btn-danger btn-circle" title="Delete User"
											ng-click="ctrl.remove(u.id)"> <i class="fa fa-trash-o"></i>
										</a>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<div id="resultTablePagination">
						<nav>
						<ul class="pagination pagination-sm" ng-if="ctrl.pages.length > ctrl.numPerPage">
							<li
								class="page-item {{ctrl.currentPage == 1 ? 'not-active disabled' : ''}}"><a
								class="page-link {{ctrl.currentPage == 1 ? 'not-active disabled' : ''}}"
								type="button" ng-click="ctrl.pageChanged(1)" title="First">
									<span aria-hidden="true">&laquo;</span> <span class="sr-only">First</span>
							</a></li>
							<li
								class="page-item {{ctrl.currentPage == 1 ? 'not-active disabled' : ''}}"><a
								class="page-link {{ctrl.currentPage == 1 ? 'not-active disabled' : ''}}"
								type="button" ng-click="ctrl.pageChanged(ctrl.currentPage -1)"
								title="Previous"> <span aria-hidden="true">&lsaquo;</span> <span
									class="sr-only">Previous</span>
							</a></li>
							<li class="page-item {{ctrl.currentPage == p ? 'active' : ''}}"
								ng-repeat="p in ctrl.pages"><a type="button"
								class="page-link {{ctrl.currentPage == p ? 'active' : ''}}"
								ng-click="ctrl.pageChanged(p)">{{p}}</a></li>
							<li
								class="page-item {{ctrl.currentPage == ctrl.pages.length ? 'not-active disabled' : ''}}"><a
								class="page-link {{ctrl.currentPage == ctrl.pages.length ? 'not-active disabled' : ''}}"
								type="button" ng-click="ctrl.pageChanged(ctrl.currentPage + 1)"
								title="Next"> <span aria-hidden="true">&rsaquo;</span> <span
									class="sr-only">Next</span>
							</a></li>
							<li
								class="page-item {{ctrl.currentPage == ctrl.pages.length ? 'not-active disabled' : ''}}"><a
								class="page-link {{ctrl.currentPage == ctrl.pages.length ? 'not-active disabled' : ''}}"
								type="button" ng-click="ctrl.pageChanged(ctrl.pages.length)"
								title="Last"> <span aria-hidden="true">&raquo;</span> <span
									class="sr-only">Last</span>
							</a></li>
						</ul>
						</nav>
					</div>
				</div>

			</div>
		</div>
		<div id="userModal" class="modal fade">
			<div class="modal-dialog">
				<div class="modal-content">
					<div id="userModalHeader" class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title">{{!ctrl.selectedUser.id ? 'Add' :
							'Update'}} User</h4>
					</div>
					<div id="userModalBody" class="modal-body">
						<div class="form-group">
							<label for="fullname" class="sr-only"> Name </label> <input
								id="fullname" class="form-control"
								placeholder="First and last name"
								ng-model="ctrl.selectedUser.name" />
						</div>
						<div class="form-group">
							<label for="email" class="sr-only"> Email <span
								class="required">*</span>
							</label> <input type="text" id="email" class="form-control"
								placeholder="example@domain.com"
								ng-model="ctrl.selectedUser.email" />
						</div>
						<!-- <div class="form-group"> -->
						<!-- <label for="username" class="sr-only"> Username <span -->
						<!-- class="required">*</span> -->
						<!-- </label> <input type="text" id="username" class="form-control" -->
						<!-- placeholder="Choose a Username" -->
						<!-- ng-model="ctrl.selectedUser.username" /> -->
						<!-- </div> -->
						<!-- <div class="form-group" ng-if="!ctrl.selectedUser.id"> -->
						<!-- <label for="password" class="sr-only"> Password <span -->
						<!-- class="required">*</span> -->
						<!-- </label> <input type="password" id="password" class="form-control" -->
						<!-- placeholder="Choose a Password" -->
						<!-- ng-model="ctrl.selectedUser.password" /> -->
						<!-- </div> -->
						<!-- <div class="form-group" ng-if="!ctrl.selectedUser.id"> -->
						<!-- <label for="repassword" class="sr-only"> Confirm Password -->
						<!-- <span class="required">*</span> -->
						<!-- </label> <input type="password" id="repassword" class="form-control" -->
						<!-- placeholder="Re-Enter Passowrd" /> -->
						<!-- </div> -->
						<div class="form-group">
							<div class="row">
								<div class="col-xs-4">
									<label for="BirthMonth" class="sr-only">Month</label> <input
										type="text" id="BirthMonth" class="form-control"
										ng-model="ctrl.selectedUser.birthMonth" />
								</div>
								<div class="col-xs-4">
									<label for="BirthDay" class="sr-only">Day</label> <input
										type="text" id="BirthDay" class="form-control" maxlength="2"
										placeholder="Day" ng-model="ctrl.selectedUser.birthday" />
								</div>
								<div class="col-xs-4">
									<label for="BirthYear" class="sr-only">Year</label> <input
										type="text" id="BirthYear" class="form-control" maxlength="4"
										placeholder="Year" ng-model="ctrl.selectedUser.birthyear" />
								</div>
							</div>
						</div>
						<div class="form-group">
							<div class="row">
								<div class="col-xs-6">
									<label for="phone" class="sr-only">Mobile</label> <input
										id="phone" class="form-control" placeholder="Mobile Phone"
										ng-model="ctrl.selectedUser.phone" />
								</div>
								<div class="col-xs-6">
									<label for="gender" class="sr-only">Gender</label>
									<div class="btn-group genders">
										<button type="button"
											class="btn btn-secondary dropdown-toggle"
											data-toggle="dropdown" aria-haspopup="true"
											aria-expanded="false">{{ctrl.selectedUser.gender ?
											ctrl.selectedUser.gender : 'I am a'}}</button>
										<div class="dropdown-menu">
											<a class="dropdown-item" ng-click="ctrl.selectGener(g)"
												ng-repeat="g in ctrl.geners">{{g}}</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="userModalFooter" class="modal-footer">
						<a type="button" class="btn btn-default" data-dismiss="modal"
							aria-label="Cancel">Cancel </a> <a class="btn btn-primary"
							ng-click="ctrl.submit();"> {{!ctrl.selectedUser.id ?
							'Register' : 'Update'}} </a>
					</div>
				</div>
			</div>
		</div>
	</form>
	<script
		src="${pageContext.request.contextPath}/resources/lib/jQuery/jquery-1.12.3.min.js"></script>
	<script
		src="${pageContext.request.contextPath}/resources/lib/angularjs/angular.min.js"></script>
	<script
		src="${pageContext.request.contextPath}/resources/lib/angular-ui/ui-bootstrap-tpls-1.3.3.js"></script>
	<script
		src="${pageContext.request.contextPath}/resources/lib/tether/js/tether.min.js"></script>
	<script
		src="${pageContext.request.contextPath}/resources/lib/bootstrap/js/bootstrap.min.js"></script>
	<script
		src="${pageContext.request.contextPath}/resources/lib/int-tel-input/intlTelInput.js"></script>
	<script
		src="${pageContext.request.contextPath}/resources/js/app.js?v=${timeStampe}"></script>
	<script
		src="${pageContext.request.contextPath}/resources/js/service/user_service.js?v=${timeStampe}"></script>
	<script
		src="${pageContext.request.contextPath}/resources/js/controller/user_controller.js?v=${timeStampe}"></script>
</body>
</html>
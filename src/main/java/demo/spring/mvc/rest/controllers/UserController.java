package demo.spring.mvc.rest.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import demo.spring.mvc.db.entities.UserAccount;
import demo.spring.mvc.services.UserAccountService;

@Controller
@RequestMapping("/users")
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	private UserAccountService userService;

	@Autowired(required = true)
	@Qualifier(value = "userAccountService")
	public void setUserService(UserAccountService uas) {
		this.userService = uas;
	}

	@RequestMapping(value = "/create/")
	public ResponseEntity<Void> createUser(@RequestBody UserAccount ua) {
		if (ua.getId() == null) {
			userService.create(ua);
			logger.info("Created User with ID: " + ua.getId());
			return new ResponseEntity<Void>(HttpStatus.CREATED);
		}
		return new ResponseEntity<Void>(HttpStatus.CONFLICT);
	}

	@RequestMapping(value = "/update/")
	public ResponseEntity<Void> updateUser(@RequestBody UserAccount ua) {
		if (ua.getId() != null) {
			logger.info("Updating User with ID: " + ua.getId());
			userService.update(ua);
			return new ResponseEntity<Void>(HttpStatus.OK);
		}
		return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
	}

	@RequestMapping(value = "/delete/{userId}")
	public ResponseEntity<Void> deleteUser(@PathVariable("userId") int id) {
		logger.info("Deleting user with id: " + id);
		if (userService.isUserExist(id)) {
			userService.delete(id);
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		}
		logger.error("No user with id: " + id + " found");
		return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
	}

	@RequestMapping(value = "/search")
	@ResponseBody
	public ResponseEntity<List<UserAccount>> listUsers() {
		logger.info("Searching for all users");
		List<UserAccount> users = userService.list();
		// Check if any user found
		if (users.isEmpty()) {
			logger.error("No User found");
			return new ResponseEntity<List<UserAccount>>(HttpStatus.NO_CONTENT);
		}

		// return users list
		return new ResponseEntity<List<UserAccount>>(users, HttpStatus.OK);
	}

	@RequestMapping(value = "/search/{userId}", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<UserAccount> findUserByID(@PathVariable(value = "userId") int id) {
		logger.info("Searching for user with id: " + id);
		UserAccount user = userService.findById(id);
		if (user == null) {
			logger.error("User with id " + id + " not found");
			return new ResponseEntity<UserAccount>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<UserAccount>(user, HttpStatus.OK);
	}
}

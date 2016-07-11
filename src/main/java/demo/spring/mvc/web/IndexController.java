package demo.spring.mvc.web;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Handles requests for the application home page.
 */
@Controller
@RequestMapping("/")
public class IndexController {

	private static final Logger logger = LoggerFactory.getLogger(IndexController.class);

	@RequestMapping(method = RequestMethod.GET)
	public String getIndexPage(Model model) {
		logger.info("Welcome to CRUD Template Using AngularJS + SpringMVC + Hibernate !");
		logger.info("Template Author: Medany");

		Date now = new Date();
		model.addAttribute("timeStampe", now.getTime());

		return "users/Users";
	}

}

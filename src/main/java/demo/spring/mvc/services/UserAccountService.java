package demo.spring.mvc.services;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import demo.spring.mvc.db.DAO;
import demo.spring.mvc.db.entities.UserAccount;

@Service
public class UserAccountService implements GenericService {

	private DAO dao;
	private static final Logger logger = LoggerFactory.getLogger(UserAccountService.class);

	@Autowired
	public void setDAO(DAO dao) {
		this.dao = dao;
		populateInitialValues();
	}

	@Override
	public void create(Object ua) {
		this.dao.saveOrUpdate(ua);
	}

	@Override
	@Transactional
	public void update(Object ua) {
		this.dao.saveOrUpdate(ua);
	}

	@Override
	@Transactional
	public List<UserAccount> list() {
		List<UserAccount> usersList = dao.findAll(UserAccount.class);
		return usersList;
	}

	@Override
	@Transactional
	public UserAccount findById(int id) {
		return dao.findById(UserAccount.class, id);
	}

	@Override
	@Transactional
	public void delete(Object ua) {
		dao.delete(ua);
	}

	@Override
	@Transactional
	public void delete(int id) {
		dao.delete(findById(id));
	}

	@Transactional
	public boolean isUserExist(int id) {
		return findById(id) != null;
	}

	// for development purpose only //not for production use...
	private void populateInitialValues() {
		long count = (long) dao.count(UserAccount.class);
		if (count < 1) {
			logger.info("populating dummy data for development purpose only");
			ClassLoader classLoader = getClass().getClassLoader();
			String fileName = "import.sql";
			File file = new File(classLoader.getResource(fileName).getFile());
			FileReader fr;
			BufferedReader br;
			String sql;
			try {
				fr = new FileReader(file);
				br = new BufferedReader(fr);
				while ((sql = br.readLine()) != null) {
					logger.info(sql);
					dao.executeNativeSQL(sql);
				}
				br.close();
				fr.close();
			} catch (FileNotFoundException fnfe) {
				fnfe.printStackTrace();
			} catch (IOException ioe) {
				ioe.printStackTrace();
			}
		}

	}

}

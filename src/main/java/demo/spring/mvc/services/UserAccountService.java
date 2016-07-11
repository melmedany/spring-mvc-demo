package demo.spring.mvc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import demo.spring.mvc.db.DAO;
import demo.spring.mvc.db.entities.UserAccount;

@Service
public class UserAccountService implements GenericService {

	private DAO dao;

	@Autowired
	public void setDAO(DAO dao) {
		this.dao = dao;
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

}

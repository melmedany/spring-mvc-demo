package demo.spring.mvc.db;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;

import demo.spring.mvc.db.exception.DataAccessLayerException;

@Controller
public class DAO {
	private Session session;
	private Transaction tx;
	private static final Logger logger = LoggerFactory.getLogger(DAO.class);

	public DAO() {
		HibernateFactory.buildIfNeeded();
	}

	public void saveOrUpdate(Object obj) {
		try {
			startOperation();
			session.saveOrUpdate(obj);
			tx.commit();
		} catch (HibernateException e) {
			handleException(e);
		} finally {
			HibernateFactory.close(session);
		}
	}

	public void delete(Object obj) {
		try {
			startOperation();
			session.delete(obj);
			tx.commit();
		} catch (HibernateException e) {
			handleException(e);
		} finally {
			HibernateFactory.close(session);
		}
	}

	public <T> T findById(Class<T> type, int id) {
		T t = null;
		try {
			startOperation();
			t = session.get(type, id);
			tx.commit();
		} catch (HibernateException e) {
			handleException(e);
		} finally {
			HibernateFactory.close(session);
		}
		return t;
	}

	public <T> List<T> findAll(Class<T> type) {
		List<T> t = null;
		try {
			startOperation();
			t = session.createQuery("from " + type.getName()).list();
			tx.commit();
		} catch (HibernateException e) {
			handleException(e);
		} finally {
			HibernateFactory.close(session);
		}
		return t;
	}

	private void handleException(HibernateException e) throws DataAccessLayerException {
		HibernateFactory.rollback(tx);
		throw new DataAccessLayerException(e);
	}

	private void startOperation() throws HibernateException {
		session = HibernateFactory.openSession();
		tx = session.beginTransaction();
	}
}
package demo.spring.mvc.services;

import java.util.List;

public interface GenericService {

	public void create(Object obj);

	public void update(Object obj);

	public <T> List<T> list();

	public <T> T findById(int id);

	public void delete(Object obj);

	public void delete(int id);
}

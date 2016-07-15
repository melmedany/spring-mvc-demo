package demo.spring.mvc.db.entities;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "userAccount")
public class UserAccount {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	@Column(name = "id")
	private Integer id;
	@Column(name = "name")
	private String name;
	@Column(name = "email")
	private String email;
	@Column(name = "birthyear")
	private String birthyear;
	@Column(name = "birthMonth")
	private String birthMonth;
	@Column(name = "birthday")
	private String birthday;
	@Column(name = "gender")
	private String gender;
	@Column(name = "phone")
	private String phone;
	// @Column(name = "username")
	// private String username;
	// @Column(name = "password")
	// private String password;

	public UserAccount() {

	}

	public UserAccount(String name, String email, String birthyear, String birthMonth, String birthday, String gender,
			String phone) {
		this.name = name;
		this.email = email;
		this.birthyear = birthyear;
		this.birthMonth = birthMonth;
		this.birthday = birthday;
		this.gender = gender;
		this.phone = phone;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getBirthyear() {
		return birthyear;
	}

	public void setBirthyear(String birthyear) {
		this.birthyear = birthyear;
	}

	public String getBirthMonth() {
		return birthMonth;
	}

	public void setBirthMonth(String birthMonth) {
		this.birthMonth = birthMonth;
	}

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	// public String getUsername() {
	// return username;
	// }
	//
	// public void setUsername(String username) {
	// this.username = username;
	// }
	//
	// public String getPassword() {
	// return password;
	// }
	//
	// public void setPassword(String password) {
	// this.password = password;
	// }

	@Override
	public String toString() {
		return "UserAccount [id=" + id + ", name=" + name + ", email=" + email + "]";
	}
}

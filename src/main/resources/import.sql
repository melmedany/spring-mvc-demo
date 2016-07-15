
/*create table if not exists userAccount (
  id mediumint(9) not null AUTO_INCREMENT primary key,
  name varchar(50) character set utf8 default null,
  email varchar(50) character set utf8 default null,
  birthyear varchar(10) character set utf8 default null,
  birthMonth varchar(10) character set utf8 default null,
  birthday varchar(10) character set utf8 default null,
  gender varchar(10) character set utf8 default null,
  phone varchar(20) character set utf8 default null
);*/
  

insert into userAccount (name, email, birthyear, birthMonth, birthday, gender, phone) values 
('James Butt', 'jbutt@gmail.com', '', '', '', 'Male', '504-621-8927'), 
('Josephine Darakjy', 'josephine_darakjy@darakjy.org', '', '', '', 'Female', '810-292-9388'), 
('Lenna Paprocki', 'lpaprocki@hotmail.com', '', '', '', 'Female', '907-385-4412'), 
('Erick Ferencz', 'erick.ferencz@aol.com', '', '', '', 'Male', '907-741-1044'), 
('Amber Monarrez', 'amber_monarrez@monarrez.org', '', '', '', 'Female', '215-934-8655');
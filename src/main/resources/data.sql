

CREATE TABLE `userAccount` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `birthyear` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `birthMonth` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `birthday` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `gender` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userAccount`
--

INSERT INTO `userAccount` (`id`, `name`, `email`, `birthyear`, `birthMonth`, `birthday`, `gender`, `phone`) VALUES
(1, 'James Butt', 'jbutt@gmail.com', '', '', '', 'Male', '504-621-8927'),
(2, 'Josephine Darakjy', 'josephine_darakjy@darakjy.org', '', '', '', 'Female', '810-292-9388'),
(3, 'Lenna Paprocki', 'lpaprocki@hotmail.com', '', '', '', 'Female', '907-385-4412'),
(4, 'Erick Ferencz', 'erick.ferencz@aol.com', '', '', '', 'Male', '907-741-1044'),
(5, 'Amber Monarrez', 'amber_monarrez@monarrez.org', '', '', '', 'Female', '215-934-8655');

--
-- Indexes for table `userAccount`
--

ALTER TABLE `userAccount`
  ADD PRIMARY KEY (`id`);

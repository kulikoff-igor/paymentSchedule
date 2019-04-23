

-- 
-- Установка кодировки, с использованием которой клиент будет посылать запросы на сервер
--
SET NAMES 'utf8';

-- 
-- Установка базы данных по умолчанию
--
USE payment_schedule;

--
-- Описание для таблицы hibernate_sequence
--
DROP TABLE IF EXISTS hibernate_sequence;
CREATE TABLE hibernate_sequence (
  next_val BIGINT(20) DEFAULT NULL
)
ENGINE = INNODB
AVG_ROW_LENGTH = 5461
CHARACTER SET utf8
COLLATE utf8_general_ci;

--
-- Описание для таблицы payment_schedule
--
DROP TABLE IF EXISTS payment_schedule;
CREATE TABLE payment_schedule (
  id_payment_schedule INT(11) NOT NULL AUTO_INCREMENT,
  actual_date DATE DEFAULT NULL,
  amount DOUBLE DEFAULT NULL,
  company VARCHAR(200) NOT NULL,
  conditions VARCHAR(200) DEFAULT NULL,
  contract VARCHAR(200) DEFAULT NULL,
  currency VARCHAR(200) DEFAULT NULL,
  destination_object VARCHAR(200) DEFAULT NULL,
  paid BIT(1) NOT NULL,
  scheduled_date DATE DEFAULT NULL,
  actual_amount DOUBLE DEFAULT NULL,
  user VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id_payment_schedule)
)
ENGINE = INNODB
AUTO_INCREMENT = 153
AVG_ROW_LENGTH = 1170
CHARACTER SET utf8
COLLATE utf8_general_ci;

--
-- Описание для таблицы role
--
DROP TABLE IF EXISTS role;
CREATE TABLE role (
  role_id INT(11) NOT NULL,
  role VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (role_id)
)
ENGINE = INNODB
AVG_ROW_LENGTH = 5461
CHARACTER SET utf8
COLLATE utf8_general_ci;

--
-- Описание для таблицы user
--
DROP TABLE IF EXISTS user;
CREATE TABLE user (
  user_id INT(11) NOT NULL,
  active INT(11) NOT NULL,
  last_name VARCHAR(254) NOT NULL,
  login VARCHAR(100) NOT NULL,
  name VARCHAR(254) NOT NULL,
  password VARCHAR(254) NOT NULL,
  PRIMARY KEY (user_id)
)
ENGINE = INNODB
AVG_ROW_LENGTH = 5461
CHARACTER SET utf8
COLLATE utf8_general_ci;

--
-- Описание для таблицы user_actions
--
DROP TABLE IF EXISTS user_actions;
CREATE TABLE user_actions (
  id INT(11) NOT NULL,
  action VARCHAR(255) NOT NULL,
  date_action DATETIME NOT NULL,
  user VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB
AVG_ROW_LENGTH = 1170
CHARACTER SET utf8
COLLATE utf8_general_ci;

--
-- Описание для таблицы user_role
--
DROP TABLE IF EXISTS user_role;
CREATE TABLE user_role (
  user_id INT(11) NOT NULL,
  role_id INT(11) NOT NULL,
  PRIMARY KEY (user_id, role_id),
  CONSTRAINT FK859n2jvi8ivhui0rl0esws6o FOREIGN KEY (user_id)
    REFERENCES user(user_id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT FKa68196081fvovjhkek5m97n3y FOREIGN KEY (role_id)
    REFERENCES role(role_id) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE = INNODB
AVG_ROW_LENGTH = 3276
CHARACTER SET utf8
COLLATE utf8_general_ci;

-- 
-- Вывод данных для таблицы hibernate_sequence
--
INSERT INTO hibernate_sequence VALUES
(23),
(23),
(23);


-- 
-- Вывод данных для таблицы role
--
INSERT INTO role VALUES
(1, 'ADMIN'),
(2, 'OMTS'),
(3, 'REPORT');

-- 
-- Вывод данных для таблицы user
--
INSERT INTO user VALUES
(2, 1, 'test', 'test', 'test', '$2a$10$NU7U8IhmaSyYDDp95tSMsubZKEVkfpegmSB5mOwKBxQ78QkyIfF3C'),
(5, 1, '123', '123', '123', '$2a$10$XAbIqnxqh1E92JPavShqYukCnzn9quo7tgz7ALONtQUczzDb4JbW.');




-- 
-- Вывод данных для таблицы user_role
--
INSERT INTO user_role VALUES
(1, 1),
(5, 1),
(1, 2),
(1, 3),
(5, 3);


CREATE DATABASE IF NOT EXISTS employeesdb;

use employeesdb;

CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL,
    age INT
);

DELIMITER //

CREATE TRIGGER IF NOT EXISTS calculate_age_on_insert
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
  SET NEW.age = TIMESTAMPDIFF(YEAR, NEW.birthday, CURDATE());
END;
//

DELIMITER ;

DELIMITER //

CREATE TRIGGER IF NOT EXISTS calculate_age_on_update
BEFORE UPDATE ON employees
FOR EACH ROW
BEGIN
    SET NEW.age = TIMESTAMPDIFF(YEAR, NEW.birthday, CURDATE());
END;
//

DELIMITER ;

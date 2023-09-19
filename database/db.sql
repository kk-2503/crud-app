CREATE DATABASE employeesdb;

use employeesdb;

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL,
    age INT
);

DELIMITER //

CREATE TRIGGER calculate_age_on_insert
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
  SET NEW.age = TIMESTAMPDIFF(YEAR, NEW.birthday, CURDATE());
END;
//

DELIMITER ;


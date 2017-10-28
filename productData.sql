DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
	item_id INT,
	product_name VARCHAR(100),
	department_name VARCHAR(100),
	price DECIMAL (13,2),
	stock_quantity INT
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) values
(1, "Dog Treats", "Pets", 10, 5),
(2, "Rubiks Cube", "Toys", 12, 6),
(3, "Elephant Trinket", "Home", 15, 6),
(4, "Coffee", "Drinks", 10, 8),
(5, "Moleskin Notebooks", "Books", 25, 5),
(6, "Chocolate", "Food", 10, 10),
(7, "Black Denim", "Clothing", 80, 4),
(8, "Running Shoes", "Sports", 90, 6),
(9, "Hydroflask 32 oz", "Outdoor", 40, 5),
(10, "Candy", "Snacks", 1, 4);


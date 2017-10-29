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

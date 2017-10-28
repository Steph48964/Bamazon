var _inquirer = require("inquirer");
var _mysql = require("mysql");
var _selectedProductId = null;
var _selectedQuantity = null;

var _connection = _mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_DB"
});

function shop() {
    console.log("Hi, welcome to my Bamazon Store.");

    _connection.connect(); 
    displayInventory();
};

function displayInventory () {
    console.log('----------------------------------------------------');
    console.log('|  ID  |  Price  |             Product             |');
    console.log('----------------------------------------------------');

    _connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function(err, rows, fields) {
        if (err) throw err;

        for (var index = 0; index < rows.length; index++) {
            var product = rows[index];
            console.log("   ", product.item_id, "    ", parseFloat(product.price).toFixed(2), "       " , product.product_name);
        }

        takeOrder();
    }.bind(this));
};

function takeOrder() {
    _inquirer.prompt([ 
        {
            type: "input",
            name: "product",
            message: "What would you like to purchase?",
        }
    ]).then(function(answers) {
        _selectedProductId = answers.product;
        _inquirer.prompt([ 
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to purchase?",
        }
        ]).then(function(answers) {
            _selectedQuantity = answers.quantity;
            checkStock();
        }.bind(this));
    }.bind(this));
};

function checkStock() {
    _connection.query("SELECT item_id, product_name, department_name, price, stock_quantity from products WHERE item_id = " 
        + _selectedProductId, function(err, rows, fields) {
        
        if (err) {
            console.log(err);
        }

        if (rows.length > 0)
        {
            if (rows[0].stock_quantity > _selectedQuantity)
            {
                fulfillOrder();
            } else {
                console.log("Insufficient inventory!");
                exit();
            }
        } else {
            console.log("Unable to find your product!");
        }
    });
};

function fulfillOrder() {
    _connection.query("UPDATE products SET stock_quantity = stock_quantity - " 
        + _selectedQuantity 
        + " WHERE item_id = " 
        + _selectedProductId, function(err, rows, fields) {
        
        if (err) {
            console.log(err);
        } else {
            displayInvoice();
        }
    });
};

function displayInvoice() {
    console.log("Your invoice");
    console.log("------------------------------------------------------------");
    console.log("|   ID |  Qty | Total   |     Product             |");
    console.log("-------------------------------------------------------------");

    _connection.query("SELECT item_id, product_name, department_name, price, stock_quantity from products WHERE item_id = " 
        + _selectedProductId, function(err, rows, fields) {
        
        if (err) {
            console.log(err);
        }

        if (rows.length > 0)
        {
            var product = rows[0];
            console.log("   ", product.item_id, "    ", _selectedQuantity, "    ", (parseFloat(product.price).toFixed(2) 
                * _selectedQuantity), "       " , product.product_name);
            exit();
        }
    });
};

function exit() {
    console.log();
    console.log("Thank you for shopping with us.");
    _connection.end(); 
};

shop();



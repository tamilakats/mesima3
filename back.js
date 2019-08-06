//const path = require('path');
const express = require('express');
//const http = require('http');
const mysql = require('mysql');
const cors = require('cors');
//const router = express.Router();
const app = express();

app.use(cors());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sqltamilaz",
    database: "northwind"
  });
  
  con.connect((err) => {
      if(err) {
          console.log('Error connecting to DB');
          return;
      }
      console.log('Connection established');
  });

app.get('/customers', (req,res) => {
   con.query(`SELECT CustomerID, ContactName FROM customers`, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log('Data received from Db:\n');
});
});

app.get('/customers/orders/:id', (req,res) => {
    con.query(`SELECT OrderID, OrderDate, RequiredDate, ShipCountry, ShipCity, ShipAddress
    FROM orders 
    WHERE CustomerID = '${req.params.id}'`, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/customers/:id', (req,res) => {
    con.query(`SELECT *
    FROM customers 
    WHERE CustomerID = '${req.params.id}'`, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
// שיניתי את השם של הטבלה מ
// 'order_details' ל 'order details'
// בתוך database northwind
// כי לעטוף אותו בבקטיקס לא עזר ושיטות אחרות גם אז זה הפטרון הכי טוב שמצאתי
app.get('/:numOrder', (req,res) => {
    con.query(`SELECT *
    FROM order_details
    WHERE OrderID = '${req.params.numOrder}'`, (err,result) => {
        if(err) throw err;
        res.send(result);
    });
});

app.listen(3000 , () => console.log(`Server is running on port 3000`));
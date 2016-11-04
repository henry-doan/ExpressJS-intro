var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var app = express();

app.get('/', function(request, response) {
	response.sendFile(__dirname + '/index.html');
});

app.get('/products', function(request, response) {
  fs.readFile('products.json', 'utf8', function(err, data) {
    var products = JSON.parse(data);
    response.locals = { products: products.products };
    response.render('products.ejs');
  });
});

app.get('/products/:id', function(request, response) {
  fs.readFile('products.json', 'utf8', function(err, data) {
    var productsParsed = JSON.parse(data).products;
    var product = productsParsed.filter( function(obj) {
      return obj.id === parseInt(request.params.id);
    });

    if (product.length)
      product = product[0];
    else
      product = null;
    response.locals = { product: product };
    response.render('product.ejs');
 });
});


app.listen(8000);
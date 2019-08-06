window.onload = getAll;

function listCustomers(customers) {
  var tabl;
  tabl += "<table>";
  tabl += "<tr><td>ID</td><td> Name </td></tr>";
  for (var i = 0; i < customers.length; i++) {
    tabl += "<tr>";
    tabl +=
      "<td class = 'name' id = " +
      customers[i].CustomerID +
      ">" +
      customers[i].CustomerID +
      "</td>";
    tabl += "<td>" + customers[i].ContactName + "</td>";
    tabl += "</tr>";
  }
  tabl += "</table>";

  document.getElementById("list").innerHTML = tabl;
  clickForOrders();
}
function listOrders(orders) {
  
  var tablOrders;

  tablOrders += "<table>";
  tablOrders +=
    "<tr><td>Order ID</td><td> Order Date</td><td>Required Date</td><td>Ship Country</td><td>Ship City</td><td>Ship Address</td></tr>";
  for (var i = 0; i < orders.length; i++) {
    tablOrders += "<tr>";
    tablOrders +=
      "<td class = 'order' id = " +
      orders[i].OrderID +
      ">" +
      orders[i].OrderID +
      "</td>";
    tablOrders +=
      "<td>" + orders[i].OrderDate.slice(0, 10).replace("T", " ") + "</td>";
    tablOrders +=
      "<td>" + orders[i].RequiredDate.slice(0, 10).replace("T", " ") + "</td>";
    tablOrders += "<td>" + orders[i].ShipCountry + "</td>";
    tablOrders += "<td>" + orders[i].ShipCity + "</td>";
    tablOrders += "<td>" + orders[i].ShipAddress + "</td>";
    tablOrders += "</tr>";
  }
  tablOrders += "</table>";
  document.getElementById("details").innerHTML = tablOrders;
  clickForOrderDetails();
}

function customerDetails (customer){
    var tablCD;
    tablCD += "<table>";
    tablCD += 
    "<tr><td>Customer ID</td><td>Company Name</td><td>Contact Name</td><td>Contact Title</td><td>Address</td><td>City</td><td>Country</td><td>Phone</td></tr>";
        tablCD += "<tr>";
        tablCD += "<td>" + customer[0].CustomerID + "</td>";
        tablCD += "<td>" + customer[0].CompanyName + "</td>";
        tablCD += "<td>" + customer[0].ContactName + "</td>";
        tablCD += "<td>" + customer[0].ContactTitle + "</td>";
        tablCD += "<td>" + customer[0].Address + "</td>";
        tablCD += "<td>" + customer[0].City + "</td>";
        tablCD += "<td>" + customer[0].Country + "</td>";
        tablCD += "<td>" + customer[0].Phone + "</td>";
    tablCD += "</tr>"
    
    tablCD += "</table>"
    document.getElementById('details').innerHTML = tablCD;   
}

function orderDetails(order) {
  var tablOD;
  tablOD += "<table>";
  tablOD +=
    "<tr><td>Order ID</td><td>Product ID</td><td>Unit Price</td><td>Quantity</td><td>Discount</td><td>Total Price</td></tr>";
  for (var i = 0; i < order.length; i++) {
    tablOD += "<tr>";
    tablOD +=
      "<td class = 'order' id = " +
      order[i].OrderID +
      ">" +
      order[i].OrderID +
      "</td>";
    tablOD += "<td>" + order[i].ProductID + "</td>";
    tablOD += "<td>" + order[i].UnitPrice + "</td>";
    tablOD += "<td>" + order[i].Quantity + "</td>";
    tablOD += "<td>" + order[i].Discount + "</td>";
    tablOD +=
      "<td class = 'totalsum'>" +
      parseInt(order[i].UnitPrice, 10) * parseInt(order[i].Quantity, 10) +
      "</td>";
    tablOD += "</tr>";
  }
  tablOD += "</table>";
  document.getElementById("oneorder").innerHTML = tablOD;
  var arrsum = Array.from(document.getElementsByClassName("totalsum"));

  sum(arrsum);
  function sum() {
    var totalsum = 0;
    for (var i = 0; i < arrsum.length; i++) {
      totalsum += parseInt(arrsum[i].textContent);
    }
    var TotalSum = "<span>Total Sum: " + totalsum + "</span>";
    document.getElementById("total").innerHTML = TotalSum;
  }
}

function getAll() {
  fetch(`http://localhost:3000/customers`)
    .then(res => res.json())
    .then(data => listCustomers(data))
    .catch(err => console.log(err));
}

function getCustomerDetails(id) {
  fetch(`http://localhost:3000/customers/${id}`)
    .then(res => res.json())
    .then(data => customerDetails(data))
    .catch(err => console.log(err));
}

function getOrders(id) {
    fetch(`http://localhost:3000/customers/orders/${id}`)
      .then(res => res.json())
      .then(data => listOrders(data))
      .catch(err => console.log(err));
  }
function getOrderDetails(numOrder) {
  fetch(`http://localhost:3000/${numOrder}`)
    .then(res => res.json())
    .then(data => orderDetails(data))
    .catch(err => console.log(err));
}

function getEmployees() {
  fetch(`http://localhost:3000/employee`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

function clickForOrders() {
  var link = document.getElementsByClassName("name");
  for (var i = 0; i < link.length; i++) {
    link[i].addEventListener("click", function() {
      var id = this.id;
      var inpC = document.getElementById('inpcustomer');
      var inpO = document.getElementById('inporder');
      if (inpO.checked) {getOrders(id);}
      if (inpC.checked) {getCustomerDetails(id);}
    });
  }
}

function clickForOrderDetails() {
  var linkOrder = document.getElementsByClassName("order");
  for (var i = 0; i < linkOrder.length; i++) {
    linkOrder[i].addEventListener("click", function() {
      var numOrder = this.id;
      getOrderDetails(numOrder);
    });
  }
}

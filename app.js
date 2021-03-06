'use strict';

//var sectionEl = document.getElementById('Hello');
//var divEl = document.getElementsByClassName('other');
// var pikeEl = document.getElementById('pike-store');
// var airportEl = document.getElementById('airport-store');
// var centerEl = document.getElementById('center-store');
// var hillEl = document.getElementById('hill-store');
// var alkiEl = document.getElementById('alki-store');
// var elements = [pikeEl, airportEl, centerEl, hillEl, alkiEl];

// table HTML Node
var tableEl = document.getElementById('store-data');

// simple element creation
function createElement(tagType, tagIdentifier, tagIdentifierName, elementContent, parentNode) {
  var element = document.createElement(tagType);
  element.setAttribute(tagIdentifier, tagIdentifierName);
  element.textContent = elementContent;
  // console.log(element);
  //give the Child to the Dom
  parentNode.appendChild(element);
  return element;
}

//createElement('p', 'id', 'myCustomId', 'Hello User', sectionEl);
//<section id = "sectionEl">
  //<p id = "myCustomId">Hello User</p>
//</section>
//createElement('h1', 'class', 'headding-one', 'It Lives!', divEl[0]);

//Customers per hour
// function customersThisHour(maxCustomers, minCustomers) {
//   var range = maxCustomers - minCustomers + 1;
//   console.log(maxCustomers);
//   return Math.floor(Math.random() * range) + minCustomers;
// }
//
// // Cookies sold this hour
// function cookiesSoldThisHour(customers, avgCookies) {
//   console.log(customers);
//   return Math.floor(customers * avgCookies);
// }

// hours of operation
var hoursOpen = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

function CookieStore(name, minCustomers, maxCustomers, avgCookies, tagId){
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookies = avgCookies;
  this.hourlySales = [];
  this.totalSales = 0;
  this.tag = tagId;
}

CookieStore.prototype.populateCookieStore = function () {
  for (var iHours = 0; iHours < hoursOpen.length; iHours++) {
    var range = this.maxCustomers - this.minCustomers + 1;
    console.log(this.maxCustomers);
    var customers = Math.floor(Math.random() * range) + this.minCustomers;

    // Cookies sold this hour
    console.log(customers);
    var sales = Math.floor(customers * this.avgCookies);
    this.totalSales += sales;
//    console.log(this.totalSales);
    this.hourlySales.push(sales);
  }
};

var stores = [];

function NewStore(name, minCustomers, maxCustomers, avgCookies, tagId){
  var newStoreName = new CookieStore(name, minCustomers, maxCustomers, avgCookies, tagId);
  newStoreName.populateCookieStore();
  console.log(newStoreName);
  stores.push(newStoreName);
}

//var g = new CookieStore('First and Pike', 23, 65, 6.3);
//Store Projected Data
//First and Pike Store
NewStore('First and Pike', 23, 65, 6.3, 'pike-store');

// SeaTac Airport Store
NewStore('SeaTac Airport', 3, 24, 1.2, 'airport-store');

// Seattle Center Store
NewStore('SeattleCenter', 11, 38, 3.7, 'center-store');

// Capitol Hill Store
NewStore('Capitol Hill Store', 20, 38, 2.3, 'hill-store');

// Alki Store
NewStore('Alki Store', 2, 16, 4.6, 'alki-store');

//stores output
// populate and display the cookies data

//produce headder
function makeTableHead() {
  var headParent = createElement('thead', 'id', 'table-head', 'Hours', tableEl);
  for (var iHead = 0; iHead < hoursOpen.length; iHead++) {
    createElement('th', 'class', 'time-indicator', hoursOpen[iHead], headParent);
  }
  createElement('th', 'id', 'totals', 'Total', headParent);
}

//produce footer
function makeTableFoot() {
  var footParent = createElement('tfoot', 'id', 'table-foot', 'Totals', tableEl);
  var grandTotal = 0;
  for (var iFoot = 0; iFoot < hoursOpen.length; iFoot++) {
    var hourlyTotal = 0;
    for (var iSubtotal = 0; iSubtotal < stores.length; iSubtotal++) {
      hourlyTotal += stores[iSubtotal].hourlySales[iFoot];
      grandTotal += stores[iSubtotal].hourlySales[iFoot];
    }
    createElement('td', 'class', 'hourly-totals', hourlyTotal, footParent);
  }
  createElement('td', 'id', 'grand-total', grandTotal, footParent);
}

CookieStore.prototype.makeTableRow = function() {
  var rowParent = createElement('tr', 'id', this.tag, this.name, tableEl);
  for (var iHours = 0; iHours < hoursOpen.length; iHours++) {
    createElement('td', 'class', 'table-data', this.hourlySales[iHours], rowParent);
  }
  createElement('td', 'class', 'table-data', this.totalSales, rowParent);
};
/*
function makeTableBody() {
  for (var iStores = 0; iStores < stores.length; iStores++) {
    console.log(stores[iStores]);
    var rowParent = createElement('tr', 'id', stores[iStores].tag, stores[iStores].name, tableEl);
    for (var iHours = 0; iHours < hoursOpen.length; iHours++) {
      createElement('td', 'class', 'table-data', stores[iStores].hourlySales[iHours], rowParent);
    }
    createElement('td', 'class', 'table-data', stores[iStores].totalSales, rowParent);
  }
}

function makeTable() {
  makeTableHead();
  makeTableBody();
  makeTableFoot();
}
*/
function makeTable() {
  makeTableHead();
  for (var iStore = 0; iStore < stores.length; iStore++) {
    stores[iStore].makeTableRow();
  }
  makeTableFoot();
}

makeTable();

var storeFormEl = document.getElementById('new-store-form');

storeFormEl.addEventListener('submit', pressSubmit);

function pressSubmit(event){
  event.preventDefault();
  event.stopPropagation();

  var nameNew = event.target.name.value;
  var minCustomersNew = event.target.minCustomers.value;
  var maxCustomersNew = event.target.maxCustomers.value;
  var avgCookiesNew = parseFloat(event.target.avgCookies.value);
  var tagNew = event.target.tag.value;

  NewStore(nameNew, event.target.minCustomers.value, event.target.maxCustomers.value, avgCookiesNew, tagNew);

  console.log(NewStore);

  while (tableEl.hasChildNodes()) {
    tableEl.removeChild(tableEl.firstChild);
  }
  makeTable();
};

// var storeFormEl = document.getElementById('new-store-form');
//
// storeFormEl.addEventListener('submit', handleSubmit);
// // submit states kind of event listener
// //2nd attribute is function to handle input
//
// function handleSubmit(event){ //function in storeFormEl.addEventListener('submit', handleSubmit());
//   // not sure what event does
//   // target = object event was applied to
//   event.preventDefault(); //preventDefault will prevent the default browser behavior
//   event.stopPropagation();
//
//   var location = event.target.cookieStoreName.value;
//   var minCustomers = parseInt(event.target.minCustomers.value);
//   // parseInt converts string to number
//   var maxCustomers = parseInt(event.target.maxCustomers.value);
//   // var avgCookies = //parseInt will not work with floating value
//   // float = numeric value with a decimal
//
//   var store = new CookieStore(location, minCustomers, maxCustomers, avgCookies);
//
//   stores.push(store); //push new store to array
//
//   console.log('User submitted using Submit Button');
// }

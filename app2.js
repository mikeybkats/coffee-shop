var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
var pikePlace = new CoffeeKiosk('Pike Place Market', 14, 35, 1.2, .34);
var capHill = new CoffeeKiosk('Capitol Hill', 12, 28, 3.2, .03);
var spl = new CoffeeKiosk('Seattle Public Library', 9, 45, 2.6, .02);
var slu = new CoffeeKiosk('South Lake Union', 5, 18, 1.3, .04);
var sta = new CoffeeKiosk('Sea-Tac Airport', 28, 44, 1.1, .41);
var kioskTable = document.getElementById('kioskTable');
var employeesTable = document.getElementById('employeesTable');
var newTable = document.getElementById('newTable');
var newLocationForm = document.getElementById('rowForm');
var headings = [' '] + hours;
var allKiosks = [pikePlace, capHill, spl, slu, sta];
var baristaHoursTotals = [];
var beansNeededHourTotals = [];

function CoffeeKiosk (locationName, minCustomersHour, maxCustomersHour, avgCupsPerCustomer, avgPoundsPerCustomer){
  this.locationName = locationName;
  this.minCustomersHour = minCustomersHour;
  this.maxCustomersHour = maxCustomersHour;
  this.avgCupsPerCustomer = avgCupsPerCustomer;
  this.avgPoundsPerCustomer = avgPoundsPerCustomer;
  this.customersPerHour = [];
  this.beansPerHour = [];
  this.poundPackagesPerHour = [];
  this.dailyCustomersTotal = 0;
  this.dailyCupsTotal = 0;
  this.dailyPoundPackagesTotal = 0;
  this.dailyBeansNeeded = 0;
  this.customersPerHour = function(){
    var custPerHour = [];
    for (var i = 0; i < hours.length; i++ ) {
      var customers = Math.floor(Math.random() * (this.maxCustomersHour - this.minCustomersHour + 1)) + this.minCustomersHour;
      custPerHour.push(customers);
    }
    return custPerHour;
  };
  this.cupsPerHour = function(){
    var cupsHrArray = [];
    for (var i = 0; i < hours.length; i++){
      var cupsSold = Math.ceil(this.customersPerHour()[i] * this.avgCupsPerCustomer);
      cupsHrArray.push(cupsSold);
    }
    return cupsHrArray;
  };
  this.beansNeededForCupsPerHour = function(){
    // beans needed for cups = (num cups per hour) / 16
    var beansForCups = [];
    for (var i = 0; i < hours.length; i++){
      var beansCup = Math.round((this.cupsPerHour()[i] / 16) * 10) / 10;
      beansForCups.push(beansCup);
    }
    return beansForCups;
  };
  this.poundPackagesPerHour = function(){
    //lbs needed per hour =  average pounds per customer * num of customers per hour
    var dailyPoundsSold = [];
    for (var i = 0; i < hours.length; i++){
      var lbsHour = Math.round((this.customersPerHour()[i] * this.avgPoundsPerCustomer) * 10) / 10;
      dailyPoundsSold.push(lbsHour);
    }
    return dailyPoundsSold;
  };
  this.beansPerHour = function (){
    // lbs of beans sold per hour = number of customers per hour * average pounds per customer + the beans needed for cups.
    var beansPerHour = [];
    for (var i = 0; i < hours.length; i++){
      var allBeans = Math.round((this.beansNeededForCupsPerHour()[i] + this.poundPackagesPerHour()[i]) * 10) / 10;
      beansPerHour.push(allBeans);
    }
    return beansPerHour;
  };
  this.employeesNeeded = function(){
    var numEmployees = [];
    for (var i = 0; i < hours.length; i++){
      var employees = Math.ceil((customersPerHour[i] * 2) / 60);
      numEmployees.push(employees);
    }
    return numEmployees;
  };
  this.dailyHourlyBeans = function(){
    var total = 0;
    for (var i = 0; i < this.beansPerHour().length; i++){
      var total = total + this.beansPerHour()[i];
    }
    return parseFloat((total).toFixed(1));
  };
};

function calcLocTotDaily(arrayInput){
  var total = 0;
  for (var i = 0; i < arrayInput.length; i++){
    var total = total + arrayInput[i];
  }
  beansNeededHourTotals.push(total);
  return parseFloat((total).toFixed(1));
}
function calcLocTotDailyBaristas(arrayInput){
  var total = 0;
  for (var i = 0; i < arrayInput.length; i++){
    var total = total + arrayInput[i];
  }
  baristaHoursTotals.push(total);
  return parseFloat((total / 7.5).toFixed(1));
}
function totalsDailyPerHour (){
  // two loops:
  // loop through the rows - one to grab the line
  // one to grab the first item of the line
}


function printTable (){
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  trElement.appendChild(thElement);

  var thElement = document.createElement('th');
  trElement.appendChild(thElement);
  thElement.textContent = 'Totals';

  for (var i = 0; i < headings.length; i++){
    var thElement = document.createElement('th');
    thElement.textContent = hours[i];
    trElement.appendChild(thElement);
  }
  newTable.appendChild(trElement);

  for ( var j = 0; j < allKiosks.length; j++){
    var trElement = document.createElement('tr');
    var thElement = document.createElement('th');
    thElement.textContent = allKiosks[j].locationName;
    trElement.appendChild(thElement);

    var thElement = document.createElement('th');
    trElement.appendChild(thElement);
    thElement.textContent = allKiosks[j].dailyHourlyBeans();

    for (var i = 0; i < hours.length; i++){
      var thElement = document.createElement ('th');
      thElement.textContent = allKiosks[j].beansPerHour()[i];
      trElement.appendChild(thElement);
    }
    newTable.appendChild(trElement);
  }
}

function submitRowToTable(event) {
  console.log(event);
  event.preventDefault();

  var locationName = event.target.locName.value;
  var minHr = event.target.minHr.value;
  var maxHr = event.target.maxHr.value;
  var cupsCust = event.target.cupsCust.value;
  var pounds = event.target.pounds.value;

  if (locationName === null){ locationName = 0; }
  if (minHr === null){ minHr = 0; }
  if (maxHr === null){ maxHr = 0; }
  if (cupsCust === null){ cupsCust = 0;}
  if (pounds === null){ pounds = 0; }

  var formKiosk = new CoffeeKiosk(locationName, minHr, maxHr, cupsCust, pounds);
  console.log(formKiosk);

  allKiosks.push(formKiosk);
  printTable();
  //create function to print all kiosks from an array of kiosks
}

printTable();

rowForm.addEventListener('submit', submitRowToTable);

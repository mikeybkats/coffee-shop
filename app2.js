var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
var pikePlace = new CoffeeKiosk('Pike Place Market', 14, 35, 1.2, .34);
var capHill = new CoffeeKiosk('Capitol Hill', 12, 28, 3.2, .03);
var spl = new CoffeeKiosk('Seattle Public Library', 9, 45, 2.6, .02);
var slu = new CoffeeKiosk('South Lake Union', 5, 18, 1.3, .04);
var sta = new CoffeeKiosk('Sea-Tac Airport', 28, 44, 1.1, .41);
var beansPerHourTable = document.getElementById('beansPerHourTable');
var employeesTable = document.getElementById('employeesTable');
var beansPerHourTable = document.getElementById('beansPerHourTable');
var newLocationForm = document.getElementById('rowForm');
var headings = [' '] + hours;
var allKiosks = [pikePlace, capHill, spl, slu, sta];
var baristaHoursTotals = [];
var beansNeededHourTotals = [];
var finalTotals = [];
var finalEmployeeTotals = [];

function CoffeeKiosk (locationName, minCustomersHour, maxCustomersHour, avgCupsPerCustomer, avgPoundsPerCustomer){
  this.locationName = locationName;
  this.minCustomersHour = minCustomersHour;
  this.maxCustomersHour = maxCustomersHour;
  this.avgCupsPerCustomer = avgCupsPerCustomer;
  this.avgPoundsPerCustomer = avgPoundsPerCustomer;
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
      var employees = Math.ceil((this.customersPerHour()[i] * 2) / 60);
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
  this.calcLocTotDailyBaristas = function (){
    var total = 0;
    for (var i = 0; i < hours.length; i++){
      var total = total + this.employeesNeeded()[i];
    }
    baristaHoursTotals.push(total);
    return parseFloat((total / 7.5).toFixed(1));
  };
};

function calcLocTotDaily(arrayInput){
  var total = 0;
  for (var i = 0; i < arrayInput.length; i++){
    var total = total + arrayInput[i];
  }
  //  beansNeededHourTotals.push(total);
  return parseFloat((total).toFixed(1));
}

function totalsAllStoresDailyBeansPerHour(){
  var total = 0;
  // loop through the rows - one to grab the line
  for (var i = 0; i < allKiosks.length; i++){
    var total = total + allKiosks[i].dailyHourlyBeans();
  }
  // console.log(total);
  return total;
}

function printBeansPerHourTable (){
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  trElement.appendChild(thElement);

  var thElement = document.createElement('th');
  trElement.appendChild(thElement);
  thElement.textContent = 'Totals';

  for (var i = 0; i < hours.length; i++){
    var thElement = document.createElement('th');
    thElement.textContent = hours[i];
    trElement.appendChild(thElement);
  }
  beansPerHourTable.appendChild(trElement); // append the row of hours to table

  for ( var j = 0; j < allKiosks.length; j++){
    var trElement = document.createElement('tr'); // create row
    var thElement = document.createElement('th'); // create th data location
    trElement.appendChild(thElement); // append content to th data
    thElement.textContent = allKiosks[j].locationName; // create content for location th data
    var thElement = document.createElement('th'); // create new th data location
    trElement.appendChild(thElement); // appends content to th element for totals row
    thElement.textContent = allKiosks[j].dailyHourlyBeans(); // defines the content for th element above - an array
    for (var i = 0; i < hours.length; i++){
      var thElement = document.createElement ('th');
      thElement.textContent = allKiosks[j].beansPerHour()[i];
      trElement.appendChild(thElement);
    }
    beansPerHourTable.appendChild(trElement);
  }

  // totals column
  var trElement = document.createElement('tr'); // totals label
  var thElement = document.createElement('th');
  thElement.textContent = 'Totals';
  trElement.appendChild(thElement);
  beansPerHourTable.appendChild(trElement); // end totals label

  var thElement = document.createElement('th');
  thElement.textContent = Math.round(totalsAllStoresDailyBeansPerHour() * 10) / 10;
  trElement.appendChild(thElement);
  beansPerHourTable.appendChild(trElement);

  for (var i = 0; i < hours.length; i++) {
    var sum = 0;
    for (var j = 0; j < allKiosks.length; j++) {
      sum += Math.round(((allKiosks[j].beansPerHour()[i]) * 10 ) / 10 );
    }
    finalTotals.push(sum);
  }

  for (var i = 0; i < hours.length; i++){
    var thElement = document.createElement('th');
    thElement.textContent = finalTotals[i];
    trElement.appendChild(thElement);
  }

}

function printEmployeesPerHourTable (){
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  trElement.appendChild(thElement);

  var thElement = document.createElement('th');
  trElement.appendChild(thElement);
  thElement.textContent = 'Totals';

  for (var i = 0; i < hours.length; i++){
    var thElement = document.createElement('th');
    thElement.textContent = hours[i];
    trElement.appendChild(thElement);
  }
  employeesTable.appendChild(trElement); // append the row of hours to table

  for ( var j = 0; j < allKiosks.length; j++){
    var trElement = document.createElement('tr'); // create row
    var thElement = document.createElement('th'); // create th data location
    trElement.appendChild(thElement); // append content to th data
    thElement.textContent = allKiosks[j].locationName; // create content for location th data
    var thElement = document.createElement('th'); // create new th data location
    trElement.appendChild(thElement); // appends content to th element for totals row
    thElement.textContent = allKiosks[j].calcLocTotDailyBaristas(); // defines the content for th element above - an array
    for (var i = 0; i < hours.length; i++){
      var thElement = document.createElement ('th');
      thElement.textContent = allKiosks[j].employeesNeeded()[i];
      trElement.appendChild(thElement);
    }
    employeesTable.appendChild(trElement);
  }

  // draw totals column
  var trElement = document.createElement('tr'); // totals label
  var thElement = document.createElement('th');
  thElement.textContent = 'Totals';
  trElement.appendChild(thElement);
  employeesTable.appendChild(trElement); // end totals label

  for (var i = 0; i < allKiosks.length; i++){
    var total = 0;
    var thElement = document.createElement('th');
    total = total + allKiosks[i].calcLocTotDailyBaristas();
  }
  thElement.textContent = total;
  trElement.appendChild(thElement);
  employeesTable.appendChild(trElement);
  for (var i = 0; i < hours.length; i++) {
    var sumOfEmployes = 0;
    for (var j = 0; j < allKiosks.length; j++) {
      sumOfEmployes += allKiosks[j].employeesNeeded()[i];
    }
    finalEmployeeTotals.push(sumOfEmployes);
  }
  console.log(sumOfEmployes);
  for (var i = 0; i < hours.length; i++){
    var thElement = document.createElement('th');
    thElement.textContent = finalEmployeeTotals[i];
    trElement.appendChild(thElement);
  }

}
function submitRowToTable(event) {
  // console.log(event);
  event.preventDefault();
  document.getElementById('beansPerHourTable').innerHTML = '';
  document.getElementById('employeesTable').innerHTML = '';
  var locationName = event.target.locName.value;
  var minHr = parseInt(event.target.minHr.value) || 0;
  var maxHr = parseInt(event.target.maxHr.value) || 0;
  var cupsCust = parseInt(event.target.cupsCust.value) || 0;
  var pounds = parseInt(event.target.pounds.value) || 0;
  var formKiosk = new CoffeeKiosk(locationName, minHr, maxHr, cupsCust, pounds);
  console.log(formKiosk);
  allKiosks.push(formKiosk);
  printBeansPerHourTable();
  printEmployeesPerHourTable();
}

printBeansPerHourTable();
printEmployeesPerHourTable();

rowForm.addEventListener('submit', submitRowToTable);

var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
var pikePlace = new CoffeeKiosk('Pike Place Market', 14, 35, 1.2, .34);
var capHill = new CoffeeKiosk('Capitol Hill', 12, 28, 3.2, .03);
var spl = new CoffeeKiosk('Seattle Public Library', 9, 45, 2.6, .02);
var slu = new CoffeeKiosk('South Lake Union', 5, 18, 1.3, .04);
var sta = new CoffeeKiosk('Sea-Tac Airport', 28, 44, 1.1, .41);
var kioskTable = document.getElementById(('kioskTable'));
var employeesTable = document.getElementById(('employeesTable'));
var trElement = document.createElement('tr');
var headings = [' '] + hours;
var pikePlaceRow = [];
var arrayTableContent = [];

function CoffeeKiosk (locationName, minCustomersHour, maxCustomersHour, avgCupsPerCustomer, avgPoundsPerCustomer){
  this.locationName = locationName;
  this.minCustomersHour = minCustomersHour;
  this.maxCustomersHour = maxCustomersHour;
  this.avgCupsPerCustomer = avgCupsPerCustomer;
  this.avgPoundsPerCustomer = avgPoundsPerCustomer;
  this.customersPerHour = [];
  this.beansPerHour = [];
  this.cupsPerHour = [];
  this.beansNeededForCupsPerHour = [];
  this.poundPackagesPerHour = [];
  this.dailyCustomersTotal = 0;
  this.dailyCupsTotal = 0;
  this.dailyPoundPackagesTotal = 0;
  this.dailyBeansNeeded = 0;
  this.employeesNeeded = [];
};

function calcCustomersPerHour(min, max){
  var custPerHour = [];
  for (var i = 0; i < hours.length; i++ ) {
    var customers = Math.floor(Math.random() * (max - min + 1)) + min;
    custPerHour.push(customers);
  }
  return custPerHour;
}
function calcCupsPerHour(customersPerHour, avgCupsPerCustomer){
  var cupsHrArray = [];
  for (var i = 0; i < hours.length; i++){
    var cupsSold = Math.ceil(customersPerHour[i] * avgCupsPerCustomer);
    cupsHrArray.push(cupsSold);
  }
  return cupsHrArray;
}
function calcBeansNeededForCupPerHour(cupsPerHour){
  // beans needed for cups = (num cups per hour) / 16
  var beansForCups = [];
  for (var i = 0; i < hours.length; i++){
    var beansCup = Math.round((cupsPerHour[i] / 16) * 10) / 10;
    beansForCups.push(beansCup);
  }
  return beansForCups;
}
function calcPoundPackagesPerHour(customersPerHour, avgPoundsPerCustomer){
  //lbs needed per hour =  average pounds per customer * num of customers per hour
  var dailyPoundsSold = [];
  for (var i = 0; i < hours.length; i++){
    var lbsHour = Math.round((customersPerHour[i] * avgPoundsPerCustomer) * 10) / 10;
    dailyPoundsSold.push(lbsHour);
  }
  return dailyPoundsSold;
}
function calcBeansPerHour(beansNeededForCupsPerHour, poundPackagesPerHour){
  // lbs of beans sold per hour = number of customers per hour * average pounds per customer + the beans needed for cups.
  var beansPerHour = [];
  for (var i = 0; i < hours.length; i++){
    var allBeans = Math.round((beansNeededForCupsPerHour[i] + poundPackagesPerHour[i]) * 10) / 10;
    beansPerHour.push(allBeans);
  }
  return beansPerHour;
}
function calcNumberOfEmployees(customersPerHour){
  //number of customers per hour * 2 equals the number of minutes required to serve them coffee. Divide the number of minutes required by the num minutes in an hour to equal the number of employees needed.
  var numEmployees = [];
  for (var i = 0; i < hours.length; i++){
    var employees = Math.ceil((customersPerHour[i] * 2) / 60);
    numEmployees.push(employees);
  }
  return numEmployees;
}
function calcLocTotDaily(arrayInput){
  var total = 0;
  for (var i = 0; i < arrayInput.length; i++){
    var total = total + arrayInput[i];
  }
  console.log(total);
  return total;
}
function totalsDailyPerHour (){
  // two loops:
  // one to grab the line
  // one to grab the first item of the line
}

pikePlace.customersPerHour = calcCustomersPerHour(pikePlace.minCustomersHour, pikePlace.maxCustomersHour);
pikePlace.cupsPerHour = calcCupsPerHour(pikePlace.customersPerHour, pikePlace.avgCupsPerCustomer);
pikePlace.beansNeededForCupsPerHour = calcBeansNeededForCupPerHour(pikePlace.cupsPerHour);
pikePlace.poundPackagesPerHour = calcPoundPackagesPerHour(pikePlace.customersPerHour, pikePlace.avgPoundsPerCustomer);
pikePlace.beansPerHour = calcBeansPerHour(pikePlace.beansNeededForCupsPerHour, pikePlace.poundPackagesPerHour);
pikePlace.employeesNeeded = calcNumberOfEmployees(pikePlace.customersPerHour);

capHill.customersPerHour = calcCustomersPerHour(capHill.minCustomersHour, capHill.maxCustomersHour);
capHill.cupsPerHour = calcCupsPerHour(capHill.customersPerHour, capHill.avgCupsPerCustomer);
capHill.beansNeededForCupsPerHour = calcBeansNeededForCupPerHour(capHill.cupsPerHour);
capHill.poundPackagesPerHour = calcPoundPackagesPerHour(capHill.customersPerHour, capHill.avgPoundsPerCustomer);
capHill.beansPerHour = calcBeansPerHour(capHill.beansNeededForCupsPerHour, capHill.poundPackagesPerHour);
capHill.employeesNeeded = calcNumberOfEmployees(capHill.customersPerHour);

spl.customersPerHour = calcCustomersPerHour(spl.minCustomersHour, spl.maxCustomersHour);
spl.cupsPerHour = calcCupsPerHour(spl.customersPerHour, spl.avgCupsPerCustomer);
spl.beansNeededForCupsPerHour = calcBeansNeededForCupPerHour(spl.cupsPerHour);
spl.poundPackagesPerHour = calcPoundPackagesPerHour(spl.customersPerHour, spl.avgPoundsPerCustomer);
spl.beansPerHour = calcBeansPerHour(spl.beansNeededForCupsPerHour, spl.poundPackagesPerHour);
spl.employeesNeeded = calcNumberOfEmployees(spl.customersPerHour);

slu.customersPerHour = calcCustomersPerHour(slu.minCustomersHour, slu.maxCustomersHour);
slu.cupsPerHour = calcCupsPerHour(slu.customersPerHour, slu.avgCupsPerCustomer);
slu.beansNeededForCupsPerHour = calcBeansNeededForCupPerHour(slu.cupsPerHour);
slu.poundPackagesPerHour = calcPoundPackagesPerHour(slu.customersPerHour, slu.avgPoundsPerCustomer);
slu.beansPerHour = calcBeansPerHour(slu.beansNeededForCupsPerHour, slu.poundPackagesPerHour);
slu.employeesNeeded = calcNumberOfEmployees(slu.customersPerHour);

sta.customersPerHour = calcCustomersPerHour(sta.minCustomersHour, sta.maxCustomersHour);
sta.cupsPerHour = calcCupsPerHour(sta.customersPerHour, sta.avgCupsPerCustomer);
sta.beansNeededForCupsPerHour = calcBeansNeededForCupPerHour(sta.cupsPerHour);
sta.poundPackagesPerHour = calcPoundPackagesPerHour(sta.customersPerHour, sta.avgPoundsPerCustomer);
sta.beansPerHour = calcBeansPerHour(sta.beansNeededForCupsPerHour, sta.poundPackagesPerHour);
sta.employeesNeeded = calcNumberOfEmployees(sta.customersPerHour);

function beansNeededTable(){
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
  kioskTable.appendChild(trElement);

  // Table row two - bean data
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = 'Pike Place Market';
  trElement.appendChild(thElement);

  var thElement = document.createElement('th');
  trElement.appendChild(thElement);
  thElement.textContent = calcLocTotDaily(pikePlace.beansPerHour);

  for (var i = 0; i < hours.length; i++) {
    var thElement = document.createElement('th');
    thElement.textContent = pikePlace.beansPerHour[i];
    trElement.appendChild(thElement);
  }
  kioskTable.appendChild(trElement);

  // Table row three - bean data
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = 'Capitol Hill';
  trElement.appendChild(thElement);

  var thElement = document.createElement('th');
  trElement.appendChild(thElement);
  thElement.textContent = calcLocTotDaily(capHill.beansPerHour);

  for (var i = 0; i < hours.length; i++) {
    var thElement = document.createElement('th');
    thElement.textContent = capHill.beansPerHour[i];
    trElement.appendChild(thElement);
  }
  kioskTable.appendChild(trElement);

  // Table row four - bean data
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = 'Seattle Public Library';
  trElement.appendChild(thElement);

  var thElement = document.createElement('th');
  trElement.appendChild(thElement);
  thElement.textContent = calcLocTotDaily(spl.beansPerHour);

  for (var i = 0; i < hours.length; i++) {
    var thElement = document.createElement('th');
    thElement.textContent = spl.beansPerHour[i];
    trElement.appendChild(thElement);
  }
  kioskTable.appendChild(trElement);

  // Table row five - bean data
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = 'South Lake Union';
  trElement.appendChild(thElement);

  var thElement = document.createElement('th');
  trElement.appendChild(thElement);
  thElement.textContent = calcLocTotDaily(slu.beansPerHour);

  for (var i = 0; i < hours.length; i++) {
    var thElement = document.createElement('th');
    thElement.textContent = slu.beansPerHour[i];
    trElement.appendChild(thElement);
  }
  kioskTable.appendChild(trElement);

  // Table row six - bean data
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = 'Sea Tac Airport';
  trElement.appendChild(thElement);

  var thElement = document.createElement('th');
  trElement.appendChild(thElement);
  thElement.textContent = calcLocTotDaily(sta.beansPerHour);

  for (var i = 0; i < hours.length; i++) {
    var thElement = document.createElement('th');
    thElement.textContent = sta.beansPerHour[i];
    trElement.appendChild(thElement);
  }
  kioskTable.appendChild(trElement);

  // Table row seven - bean data
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = 'Totals';
  trElement.appendChild(thElement);

  var thElement = document.createElement('th');
  trElement.appendChild(thElement);
  thElement.textContent = 'Tots';

  for (var i = 0; i < hours.length; i++) {
    var thElement = document.createElement('th');
    thElement.textContent = pikePlace.beansPerHour[i];
    trElement.appendChild(thElement);
  }
  kioskTable.appendChild(trElement);
}
function baristasNeededTable(){
  // create a table to post the store data
  // table row one - hours
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
  employeesTable.appendChild(trElement);

  // Table row two - bean data
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = 'Pike Place Market';
  trElement.appendChild(thElement);

  var thElement = document.createElement('th');
  trElement.appendChild(thElement);
  thElement.textContent = 'Tots';

  for (var i = 0; i < hours.length; i++) {
    var thElement = document.createElement('th');
    thElement.textContent = pikePlace.employeesNeeded[i];
    trElement.appendChild(thElement);
  }
  employeesTable.appendChild(trElement);

  // Table row three - bean data
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = 'Capitol Hill';
  trElement.appendChild(thElement);

  var thElement = document.createElement('th');
  trElement.appendChild(thElement);
  thElement.textContent = 'Tots';

  for (var i = 0; i < hours.length; i++) {
    var thElement = document.createElement('th');
    thElement.textContent = capHill.employeesNeeded[i];
    trElement.appendChild(thElement);
  }
  employeesTable.appendChild(trElement);

  // Table row four - bean data
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = 'Seattle Public Library';
  trElement.appendChild(thElement);

  var thElement = document.createElement('th');
  trElement.appendChild(thElement);
  thElement.textContent = 'Tots';

  for (var i = 0; i < hours.length; i++) {
    var thElement = document.createElement('th');
    thElement.textContent = spl.employeesNeeded[i];
    trElement.appendChild(thElement);
  }
  employeesTable.appendChild(trElement);

  // Table row five - bean data
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = 'South Lake Union';
  trElement.appendChild(thElement);

  var thElement = document.createElement('th');
  trElement.appendChild(thElement);
  thElement.textContent = 'Tots';

  for (var i = 0; i < hours.length; i++) {
    var thElement = document.createElement('th');
    thElement.textContent = slu.employeesNeeded[i];
    trElement.appendChild(thElement);
  }
  employeesTable.appendChild(trElement);

  // Table row six - bean data
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = 'Sea Tac Airport';
  trElement.appendChild(thElement);

  var thElement = document.createElement('th');
  trElement.appendChild(thElement);
  thElement.textContent = 'Tots';

  for (var i = 0; i < hours.length; i++) {
    var thElement = document.createElement('th');
    thElement.textContent = sta.employeesNeeded[i];
    trElement.appendChild(thElement);
  }
  employeesTable.appendChild(trElement);

  // Table row seven - bean data
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = 'Totals';
  trElement.appendChild(thElement);

  var thElement = document.createElement('th');
  trElement.appendChild(thElement);
  thElement.textContent = 'Tots';

  for (var i = 0; i < hours.length; i++) {
    var thElement = document.createElement('th');
    thElement.textContent = pikePlace.employeesNeeded[i];
    trElement.appendChild(thElement);
  }
  employeesTable.appendChild(trElement);
}

beansNeededTable();
baristasNeededTable();

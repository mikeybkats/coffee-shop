var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm:', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm:'];

var pikePlace = {
  locationName: 'Pike Place Market',
  minCustomersHour: 14,
  maxCustomersHour: 35,
  avgCupsPerCustomer: 1.2,
  avgPoundsPerCustomer: 0.34, // rate of lbs per customer
  beansPerHour: [], // beans
  customersPerHour: [], // customers served per hour
  cupsPerHour: [], // cups sold per hour
  beansNeededForCupsPerHour: [], //done
  poundPackagesPerHour: [],
  dailyCustomersTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeeded: 0,
  employeesNeeded: [],

  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++ ) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.customersPerHour.push(customers);
      this.dailyCustomersTotal += customers;
    }
  },
  calcCupsPerHour: function(){
    // num of cups sold per hour = avg cups per customer * num of customer per hour
    for (var i = 0; i < hours.length; i++){
      var cupsSold = Math.ceil(this.customersPerHour[i] * this.avgCupsPerCustomer);
      this.cupsPerHour.push(cupsSold);
      this.dailyCupsTotal += cupsSold;
    }
  },
  calcBeansNeededForCupPerHour: function(){
    // beans needed for cups = (num cups per hour) / 16
    for (var i = 0; i < hours.length; i++){
      var beansCup = Math.round((this.cupsPerHour[i] / 16) * 10) / 10;
      this.beansNeededForCupsPerHour.push(beansCup);
    }
  },
  calcPoundPackagesPerHour: function(){
    //lbs needed per hour =  average pounds per customer * num of customers per hour
    for (var i = 0; i < hours.length; i++){
      var lbsHour = Math.round((this.customersPerHour[i] * this.avgPoundsPerCustomer) * 10) / 10;
      this.poundPackagesPerHour.push(lbsHour);
      this.dailyPoundPackagesTotal += lbsHour;
    }
  },
  calcBeansPerHour: function(){
    // lbs of beans sold per hour = number of customers per hour * average pounds per customer + the beans needed for cups.
    for (var i = 0; i < hours.length; i++){
      var allBeans = Math.round((this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i]) * 10) / 10;
      this.beansPerHour.push(allBeans);
      this.dailyBeansNeeded += allBeans;
    }
  },

  calcNumberOfEmployees: function(){
    //number of customers per hour * 2 equals the number of minutes required to serve them coffee. Divide the number of minutes required by the num minutes in an hour to equal the number of employees needed.
    for (var i = 0; i < hours.length; i++){
      var employees = Math.ceil((this.customersPerHour[i] * 2) / 60);
      this.employeesNeeded.push(employees);
    }
  },

  render: function() {
    pikePlace.calcCustomersPerHour(pikePlace.minCustomersHour, pikePlace.maxCustomersHour);
    pikePlace.calcCupsPerHour();
    pikePlace.calcBeansNeededForCupPerHour();
    pikePlace.calcPoundPackagesPerHour();
    pikePlace.calcBeansPerHour();
    pikePlace.calcNumberOfEmployees();
    // call all of the other methods that calc data
    var ulElement = document.getElementById('pike');
    for (var i = 0; i < hours.length; i++) {
      // create a <li>
      // give that <li> content
      // append the <li> to the <ul>
      var liElement = document.createElement('li');
      liElement.textContent = hours[i] + ': ' + this.beansPerHour[i] + ' lbs ' + ' [' + this.customersPerHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.beansNeededForCupsPerHour[i] + 'lbs' + '), ' + this.poundPackagesPerHour[i] + 'lbs to-go ]';
      ulElement.appendChild(liElement);
    }
    var liElement = document.createElement('li');
    liElement.textContent = 'Total customers at Pike Place Market: ' + pikePlace.dailyCustomersTotal;
    ulElement.appendChild(liElement);

    var liElement = document.createElement('li');
    liElement.textContent = 'Total cups sold at Pike Place Market: ' + pikePlace.dailyCupsTotal;
    ulElement.appendChild(liElement);

    var liElement = document.createElement('li');
    liElement.textContent = 'Total pound packages sold at Pike Place Market: ' + pikePlace.dailyPoundPackagesTotal;
    ulElement.appendChild(liElement);

    var liElement = document.createElement('li');
    liElement.textContent = 'Total pounds of beans needed at Pike Place Market: ' + pikePlace.dailyBeansNeeded;
    ulElement.appendChild(liElement);
  },
};

/* Total customers at Pike Place Market: 235
Total cups sold at Pike Place Market: 189
Total pound packages sold at Pike Place Market: 26
Total pounds of beans needed at Pike Place Market: 38.4 */


pikePlace.render();

console.log('cups per hour ' + pikePlace.cupsPerHour);
console.log('beans for cups ' + pikePlace.beansNeededForCupsPerHour);
console.log('pound packs per hour ' + pikePlace.poundPackagesPerHour);
console.log('all beans needed per hour ' + pikePlace.beansPerHour);
console.log('total daily cups ' + pikePlace.dailyCupsTotal);
console.log('total daily customers ' + pikePlace.dailyCustomersTotal);
console.log('total daily pound packs sold ' + pikePlace.dailyPoundPackagesTotal);
console.log('total daily beans needed ' + pikePlace.dailyBeansNeeded);
console.log('employees needed' + pikePlace.employeesNeeded);

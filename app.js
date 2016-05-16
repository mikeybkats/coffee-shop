var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm:', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm:'];

var pikePlace = {
  locationName: 'Pike Place Market',
  minCustomersHour: 14,
  maxCustomersHour: 35,
  avgCupsPerCustomer: 1.2,
  avgPoundsPerCustomer: 0.34,
  beansPerHour: [], // beans
  customersPerHour: [], // customers served per hour
  cupsPerHour: [], // cups sold per hour
  beansNeededForCupsPerHour: [], //done
  poundPackagesPerHour: [], // done
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
  calcBeansPerHour: function(){
    // avg beans per hour = number of customers per hour * average pounds per customer
    for (var i = 0; i < hours.length; i++ ){
      var beans = Math.ceil(this.customersPerHour[i] * this.avgPoundsPerCustomer);
      this.beansPerHour.push(beans);
      this.dailyBeansNeeded += beans;
    }
  },
  calcBeansNeededForCupPerHour: function(){
    // beans needed for cups = (num cups per hour) / 16
    for (var i = 0; i < hours.length; i++){
      var beansCup = Math.round(((this.cupsPerHour[i] / 16) * 10) / 10);
      this.beansNeededForCupsPerHour.push(beansCup);
    }
  },
  calcPoundPackagesPerHour: function(){
    //lbs needed per hour =  average pounds per customer * num of customers per hour
    for (var i = 0; i < hours.length; i++){
      var lbsHour = Math.round(((this.avgPoundsPerCustomer * this.customersPerHour[i]) * 10) / 10);
      this.poundPackagesPerHour.push(lbsHour);
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

    // call all of the other methods that calc data
    var ulElement = document.getElementById('pike');
    for (var i = 0; i < hours.length; i++) {
      // create a <li>
      // give that <li> content
      // append the <li> to the <ul>
      var liElement = document.createElement('li');
      liElement.textContent = this.customersPerHour[i];
      ulElement.appendChild(liElement);
    }
  }
};

pikePlace.render();
/*
pikePlace.calcCustomersPerHour();
pikePlace.calcCupsPerHour();
pikePlace.calcBeansPerHour();
pikePlace.calcBeansNeededForCupPerHour();
pikePlace.calcPoundPackagesPerHour();
pikePlace.calcNumberOfEmployees();
console.log(pikePlace.cupsPerHour);
console.log(pikePlace.beansPerHour);
console.log(pikePlace.beansNeededForCupsPerHour);
console.log(pikePlace.poundPackagesPerHour);
console.log(pikePlace.employeesNeeded); */

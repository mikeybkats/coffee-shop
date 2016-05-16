var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm:', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm:'];

var pikePlace = {
  locationName: 'Pike Place Market',
  minCustomersHour: 14,
  maxCustomersHour: 35,
  avgCupsPerCustomer: 1.2,
  avgPoundsPerCustomer: 0.34,
  beansPerHour: [], // done
  customersPerHour: [], // done
  cupsPerHour: [], // done
  beansNeededForCupsPerHour: [], //done
  poundPackagesPerHour: [],
  dailyCustomersTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeeded: 0,
/*By combining the total beans needed to make cups 16 cups = 1lb, and the total beans that are sold by the pound for each location, Jo can ensure that an adequate amound of beans are stored at each location.

(num cups per hour)/16 = lbs needed per hour

*/

  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i++ ) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.customersPerHour.push(customers);
      this.dailyCustomersTotal += customers;
    }
  },
  calcCupsPerHour: function(){
    for (var i = 0; i < hours.length; i++){
      var cupsSold = Math.ceil(this.customersPerHour[i] * this.avgCupsPerCustomer);
      this.cupsPerHour.push(cupsSold);
      this.dailyCupsTotal += cupsSold;
    }
  },
  calcBeansPerHour: function(){
    // number of customers per hour * average pounds per customer
    for (var i = 0; i < hours.length; i++ ){
      var beans = Math.ceil(this.customersPerHour[i] * this.avgPoundsPerCustomer);
      this.beansPerHour.push(beans);
      this.dailyBeansNeeded += beans;
    }
  },
  calcBeansNeededForCupPerHour: function(){
    // (num cups per hour) / 16 = lbs needed per hour
    for (var i = 0; i < hours.length; i++){
      var beansCup = Math.ceil(this.cupsPerHour[i] / 16);
      this.beansNeededForCupsPerHour.push(beansCup);
    }
  },
  calcPoundPackagesPerHour: function(){
    //lbs needed per hour =  # of cups served in an hour / 16
    for (var i = 0; i < hours.length; i++){
      var lbsHour = Math.ceil(this.beansNeededForCupsPerHour[i] / 16);
      this.poundPackagesPerHour.push(lbsHour);
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
pikePlace.calcCupsPerHour();
pikePlace.calcBeansPerHour();
pikePlace.calcBeansNeededForCupPerHour();
pikePlace.calcPoundPackagesPerHour();
console.log(pikePlace.cupsPerHour);
console.log(pikePlace.beansPerHour);
console.log(pikePlace.beansNeededForCupsPerHour);
console.log(pikePlace.poundPackagesPerHour);

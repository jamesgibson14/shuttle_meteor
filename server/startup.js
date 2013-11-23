Meteor.startup(function(){
  Runs.insert({
    date: new Date(),
    time: '8:00',
    route: 'stgToVegas',
    passengers: 3,
    maxPassengers: 8
  });
  var route = {
    origination: 'Las Vegas',
    destination: 'St. George',
    departureTime: '9:00 AM',
    arrivalTime: '10:30 AM'
  }
  Routes.insert
})
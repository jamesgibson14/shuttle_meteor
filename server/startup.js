Meteor.startup(function(){
  Runs.insert({
    date: new Date(),
    time: '8:00',
    route: 'stgToVegas',
    ride: "Std Van",
    passengers: 3,
    maxPassengers: 8
  });
  var route = {
    origination: 'Las Vegas',
    destination: 'St. George',
    travelTime: "160 minutes",
    departureTime: '9:00 AM',
    arrivalTime: '10:30 AM'
  }
  var rides = [
    {name: "Std Van"},
    {name: "Exec Shuttle"},
    {name: "Limo"},
    {name: "Taxi"}
  ]
  var routes = [
    {from: 'St. George', to: 'Las Vegas', times: [{depart:'8:00am', arrive: '8:10am'},{depart:'11:00am', arrive: '12:10pm'}]},
    {from: 'Las Vegas', to: 'St. George', times: [{depart:'9:30am', arrive: '8:10am'},{depart:'11:00am', arrive: '12:10pm'}]},
    {from: 'St. George', to: 'Salt Lake City', times: [{depart:'8:00am', arrive: '8:10am'},{}]},
    {from: 'Salt Lake City', to: 'St. George', times: [{depart:'8:00am', arrive: '8:10am'},{}]}
  ]
  if(Routes.find().count() < 1){
    _.each(routes, function(val){
       Routes.insert(val)
    })
  }
})
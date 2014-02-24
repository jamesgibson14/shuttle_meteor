Meteor.startup(function(){
  var route = {
    origination: 'Las Vegas',
    destination: 'St. George',
    travelTime: "160 minutes",
    departureTime: '9:00 AM',
    arrivalTime: '10:30 AM',
    basePrice: 39
  }
  var rides = [
    {name: "Std Van", fareAdd: 0},
    {name: "Exec Shuttle", fareAdd: 10},
    {name: "Limo", fareAdd: 150},
    {name: "Taxi", basePrice: 6}
  ]
  var runs = [
    {name: "StgSouth",from: 'St. George', to: 'Las Vegas', basePrice: 39, baseTime: 110, times: [{depart:'8:00am', arrive: '8:10am'},{depart:'11:00am', arrive: '12:10pm'}]},
    {name: "VegasNorth",from: 'Las Vegas', to: 'St. George', basePrice: 39, baseTime: 110, times: [{depart:'9:30am', arrive: '8:10am'},{depart:'11:00am', arrive: '12:10pm'}]},
    {name: "StgNorth",from: 'St. George', to: 'Salt Lake City', basePrice: 59, baseTime: 270, times: [{depart:'8:00am', arrive: '8:10am'},{}]},
    {name: "SLCSouth",from: 'Salt Lake City', to: 'St. George', basePrice: 59, baseTime: 110, times: [{depart:'8:00am', arrive: '8:10am'},{}]}
  ]
  var routes = [
    {pickup: 'Shuttle Terminal', dropoff: "Las Vegas Airport", fare: 39, time: 110},
    {pickup: 'Shuttle Terminal', dropoff: "Beaver Dam", fare: 15, time: 30},
    {pickup: 'Shuttle Terminal', dropoff: "Cedar City", fare: 19, time: 45},
    {pickup: 'Shuttle Terminal', dropoff: "Beaver", fare: 35, time: 90},
    {pickup: 'Shuttle Terminal', dropoff: "Fillmore", fare: 35, time: 90},
    {pickup: 'Shuttle Terminal', dropoff: "Meadow", fare: 35, time: 90},
    {pickup: 'Shuttle Terminal', dropoff: "Nephi", fare: 35, time: 90},
    {pickup: 'Shuttle Terminal', dropoff: "Springville", fare: 35, time: 90},
    {pickup: 'Shuttle Terminal', dropoff: "Salt Lake City", fare: 35, time: 90}
  ]
  var locations = [
    {name: 'Shuttle Terminal', address: 'Bluff Street', geo_coor: 1033.2314  },
    {name: 'Las Vegas Airport'},
    {name: 'Beaver Dam'},
    {name: 'Cedar City'},
    {name: 'Beaver'},
    {name: 'Meadow'},
    {name: 'Fillmore'},
    {name: 'Nephi'},
    {name: 'Springville'},
    {name: 'Salt Lake City'}
    
  ]
  Routes.remove({});
  if(Routes.find().count() < 1){
    _.each(routes, function(val){
       Routes.insert(val)
    })
  }
  
  /*
  Create Test Users
  */
  if (Meteor.users.find().count() === 0) {

    console.log('Creating users: ');

    var users = [
      {firstName:"Cheryl", lastName:"Sperling", email:"Cheryl@ironcountytaxi.com", roles:['employee', 'driver']},
      {firstName:"Craig", lastName:"Ence",email:"craig@ironcountytaxi.com",roles:['employee', 'driver']},
      {firstName:"Curtis", lastName:"Slack",email:"Curtis@ironcountytaxi.com",roles:['employee', 'driver']},
      {firstName:"David", lastName:"Kirk",email:"David@ironcountytaxi.com ",roles:['employee', 'driver']},
      {firstName:"Marty", lastName:"Olsen",email:"marty@ironcountytaxi.com",roles:['employee', 'driver']},
      {firstName:"Philip", lastName:"Peterson",email:"philip@ironcountytaxi.com",roles:['employee', 'driver']},
      {firstName:"Shane", lastName:"Cox",email:"shane@stgeorgetaxi.com",roles:['employee', 'driver']},
      {firstName:"James", lastName:"Gibson",email:"sparhawk14@gmail.com",roles:['employee', 'driver', 'developer', 'admin','manage-users']},
      {firstName:"Doug", lastName:"Griffin",email:"dgriffin123d@gmail.com",roles:['employee', 'driver', 'developer', 'admin','manage-users']}
    ];

    _.each(users, function (userData) {
      var id,
          user;
      
      console.log(userData);

      id = Accounts.createUser({
        email: userData.email,
        password: "apple1",
        profile: { firstName: userData.firstName, lastName: userData.lastName, email: userData.email }
      });

      // email verification
      Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});

      Roles.addUsersToRoles(id, userData.roles);
    
    });
  }
})
Meteor.publish('locations', function(){
  return Locations.find();
})

Meteor.publish('bookings', function(){
  return Bookings.find();
})

Meteor.publish('routes', function(){
  return Routes.find();
})

Meteor.publish('runHistory', function(){
  return RunHistory.find();
})

Meteor.publish('users', function(){
  return Users.find();
})

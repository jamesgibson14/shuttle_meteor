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

Meteor.publish('userData', function(){
  return Meteor.users.find({});
})
Meteor.publish('roles', function(){
  return Meteor.roles.find({});
})


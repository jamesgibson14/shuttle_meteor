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
Meteor.users.allow({
  update:function(userId, doc, fieldNames, modifier){
    console.log(userId, doc, fieldNames, modifier);
    return true;
  }
})
Meteor.publish('roles', function(){
  return Meteor.roles.find({});
})


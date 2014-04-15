Meteor.publish('locations', function(){
  return Locations.find();
});

Meteor.publish('bookings', function(){
  return Bookings.find();
});

Meteor.publish('routes', function(){
  return Routes.find();
});

Meteor.publish('runHistory', function(){
  return RunHistory.find();
});

Meteor.publish('userData', function(){
  return Meteor.users.find({},{fields:{profile:true, roles:true,emails:true}});
});

Meteor.users.allow({
  update:function(userId, doc, fieldNames, modifier){
    console.log(userId, doc, fieldNames, modifier);
    return true;
  }
});

Bookings.allow({
  insert: function(userId, doc){
    console.log(userId, doc);
    return true;
  },
  update: function(userId, doc, fieldNames, modifier){
    console.log(userId, doc, fieldNames, modifier);
    return (Roles.userIsInRole(userId, ['employee','driver','dispatch','developer','admin']));
  },
  remove: function(userId, doc){
    console.log(userId, doc);
    return (Roles.userIsInRole(userId, ['developer','admin']));
  }
});

Meteor.publish('roles', function(){
  return Meteor.roles.find({});
});

Meteor.publish('oldBookings', function(){
  return OldBookings.find();
});
Facts.setUserIdFilter(function () { return true; });
Meteor.publish('records', function(){
  return Records.find();
});


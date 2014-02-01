Template.drivers.helpers({
  drivers: function(){
    return [{name: "James"},{name: "Shane"},{name: "Doug"},{name: "Alice"},{name: "Bob"}];
  }
})

Template.driverView.created = function(){
  Session.setDefault('dateFilter', moment().format('MM/DD/YYYY'));
  Session.setDefault('driverFilter', Meteor.user().profile.name);
}

Template.driverView.rendered = function(){
  if(!this.hasRendered){
    this.rendered = true;
    $('.datepicker').datepicker({
      onSelect: function(){
        var date = $('#runDateFilter').val();
        console.log("Date Filter: " + date);
        Session.set('dateFilter', date);
      },
      // minDate: new Date()
    });
  }
}

Template.driverView.helpers({
  today: function(){
     return Session.get('dateFilter');
  },
  driverFilter: function(){
    return Session.get('driverFilter');
  }
})

Template.driverSelect.helpers({
  drivers: function(){
    return Meteor.users.find({roles: 'driver'});
  }
})

Template.driverView.events({
  'change #driverFilter': function(e, temp) {
    Session.set('driverFilter', e.target.value);
    console.log("Driver Filter: " + Session.get('driverFilter'));
  },
  'change #runDateFilter': function(e, temp) {
    Session.set('dateFilter', e.target.value);
    console.log("Date Filter: " + Session.get('dateFilter')); 
  }
})

Template.taxiBookings.helpers({
  taxiBookings: function() {
    var driver = Session.get('driverFilter');
    console.log("Driver value for function: " + driver);
    var date = Session.get('dateFilter');
    console.log("Date value for function: " + date);
    var start = moment(date);
    var end = moment(start);
    end.add('days', 1);
    console.log("Date for filter: " + date);
    console.log('Date start',start);
    console.log('Date end',end);
    var range = {$gte: start.toDate(), $lt: end.toDate()};
    console.log(range);
    console.log("Test driver logic" + (driver !== null));
    console.log("Test date logic" + (date !== null));
    
    var filter = {
      type: "taxi",
      pickupAt: range
    }
    if (driver !== "all") {
      filter.driver = driver;
    }
    console.log(filter);
    return Bookings.find(filter, {sort: {pickupAt: 1}});
  }
})

Template.taxiBooking.helpers({
  fieldToObject: function(fieldName){
    return {_id: this._id};
  }
})

Template.taxiBooking.events({
  'change .chooseDriver': function(e, temp) {
    var bookingID = temp.data._id; 
    console.log(temp);
    console.log(bookingID);
    
    /* Uncomment the following when the seesion variable will be useful */
    // Session.set('selectedDriver', e.target.value);
    // console.log(Session.get('selectedDriver'));
    
    var driver = e.target.value;
    console.log(driver);
    
    Bookings.update({_id: bookingID}, {$set: {driver: driver}});
    console.log(Bookings.findOne({_id: bookingID}));
    // var run = {};//checkout the html
    // Yeah the Choose driver shows up again.
    
  }
  
})

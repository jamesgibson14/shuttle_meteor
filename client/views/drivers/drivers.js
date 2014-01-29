Template.drivers.helpers({
  drivers: function(){
    return [{name: "James"},{name: "Shane"},{name: "Doug"},{name: "Alice"},{name: "Bob"}];
  }
})

Template.driverView.rendered = function(){
  if(!this.hasRendered){
    this.rendered = true;
    $('.datepicker').datepicker({
      onSelect: function(){
        var date = $('#runDateFilter').val();
        console.log("Date Filter: " + date);
        Session.set('dateFilter', date);
      },
      minDate: new Date()
    });
  }
}

Template.driverView.helpers({
  today: function(){
     return moment().format('MM/DD/YYYY');
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
  'click #clearDriverFilter': function(e, temp) {
    Session.set('driverFilter', null);
    console.log("Driver Filter: " + Session.get('driverFilter'));
  },
  'change #runDateFilter': function(e, temp) {
    Session.set('dateFilter', e.target.value);
    console.log("Date Filter: " + Session.get('dateFilter')); 
  },
  'click #clearDateFilter': function(e, temp) {
    Session.set('dateFilter', null);
    console.log("Date Filter: " + Session.get('driverFilter'));
  },
  
})

Template.taxiBookings.helpers({
  taxiBookings: function() {
    var driver = Session.get('driverFilter');
    var date = Session.get('dateFilter');
    if(!date){
      return false;
    }
    var start = moment(date);
    var end = moment(start);
    end.add('days', 1);
    console.log("Date for filter: " + date);
    console.log('Date start',start);
    console.log('Date end',end);
    var range = {$gte: start.toDate(), $lt: end.toDate()};
    console.log(range);
    if (!Session.get('driverFilter') && !Session.get('dateFilter')) {
      return Bookings.find({type: "taxi"}, {sort: {pickupAt: 1}});
    }
    else /*(Session.get('driverFilter') && !Session.get('dateFilter'))*/ {
      return Bookings.find({type: "taxi", driver: driver}, {sort: {pickupAt: 1}});
    }/*
    else if (!Session.get('driverFilter') && Session.get('dateFilter')) {
      return Bookings.find({type: "taxi", date: range}, {sort: {pickupAt: 1}});
    }
    else return Bookings.find({type: "taxi", driver: driver, date: range}, {sort: {pickupAt: 1}});*/
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

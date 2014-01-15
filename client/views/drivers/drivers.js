Template.drivers.helpers({
  drivers: function(){
    return [{name: "James"},{name: "Shane"},{name: "Doug"},{name: "Alice"},{name: "Bob"}]
  }
})

Template.driverSelect.helpers({
  driver: function(){
    return [{name: "James"},{name: "Shane"},{name: "Doug"},{name: "Alice"},{name: "Bob"}]
  }
})

Template.taxiBookings.helpers({
  taxiBookings: function() {
    return Bookings.find({type: "taxi"}, {sort: {pickupAt: 1}});
  }
})

Template.taxiBooking.helpers({
  fieldToObject: function(fieldName){
    return {_id: this._id};
  }
})

Template.taxiBooking.events({
  'click .assignDriver': function(e, temp) {
    var bookingID = temp.data._id; 
    console.log(temp);
    console.log(bookingID);
    
    var driver = Session.get('selectedDriver'); //temp.find('#' + bookingID).value;
    console.log(driver);
    
    Bookings.update({_id: bookingID}, {$set: {driver: driver}});
    
    // var run = {};
    
  },
  
  'mouseup .chooseDriver': function(e, temp) {
    Session.set('selectedDriver', e.target.value);
    console.log(Session.get('selectedDriver'));
  }
})

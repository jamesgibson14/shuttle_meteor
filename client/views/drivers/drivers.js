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
    var bookingID = temp.data.id; 
    console.log(temp);
    
    var run = {};
    
  }
})

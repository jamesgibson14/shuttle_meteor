Template.drivers.helpers({
  drivers: function(){
    return [{name: "James"},{name: "Shane"},{name: "Doug"},{name: "Alice"},{name: "Bob"}]
  }
})

Template.taxiBookings.helpers({
  taxiBookings: function() {
    return Bookings.find({type: "taxi"}, {sort: {pickupAt: 1}});
  }
})


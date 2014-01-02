Session.setDefault('isReturnRide', false);
Session.setDefault('isPickupAtDropoff', null);

Template.taxiBookingForm.rendered = function() {
  if(!this.hasRendered){
    this.rendered = true;
    $('.datepicker').datepicker({
      onSelect: function(){
        var pickup = $('#pickupDate').val();
        console.log(pickup);
        Session.set('selectedPickupDate', pickup);
      },
      minDate: new Date()
    });
    $('#pickupTime').timepicker({
      minuteStep: 5,
      showInputs: false,
      disableFocus: true
    });
    $('#returnPickupTime').timepicker({
      minuteStep: 5,
      showInputs: false,
      disableFocus: true
    });
  }
};

Template.taxiBookingForm.events({
  'change .selectReturnRide': function(e, temp){
    if(e.target.value === "round-trip"){
      Session.set('isReturnRide',true);
      console.log("isReturnRide = " + Session.get('isReturnRide'));
    }
    else {
      Session.set('isReturnRide', false);
      Session.set('isPickupAtDropoff', null);
      console.log("isReturnRide = " + Session.get('isReturnRide')) + " and " + Session.get('isPickupAtDropoff');
    }
  },
  
  'change .selectDifferentPickup': function(e, temp){
    if ((e.target.value === "pickupAtDropoff") && Session.get('isReturnRide')){
      Session.set('isPickupAtDropoff',true);
      console.log("isPickupAtDropoff " + Session.get('isPickupAtDropoff'));
    }
    else if ((e.target.value === "differentPickup") && Session.get('isReturnRide')){
      Session.set('isPickupAtDropoff', false);
      console.log("isPickupAtDropoff " + Session.get('isPickupAtDropoff'));
    }
    else {
      Session.set('isPickupAtDropoff', null);
    }
  },
  
  'click #taxiBooking-submit': function(e, temp){
    var booking = {};
    booking.type = "taxi";
    booking.name = temp.find('#fullName').value;
    booking.phone = temp.find('#phoneNumber').value;
    booking.email = temp.find('#emailAddress').value;
    booking.pickupLocation = temp.find('#pickupLocation').value + ", " + temp.find('#pickupAddress').value;
    booking.passengerCount = temp.find('#passengerCount').value;
    booking.pickupDate = temp.find('#pickupDate').value;
    booking.pickupTime = temp.find('#pickupTime').value;
    var dateTimeStr =  booking.pickupDate + " " + booking.pickupTime;
    booking.pickupAt = moment(dateTimeStr, "MM/DD/YYYY h:mm a").toDate();
    booking.destinationLocation = temp.find('#destinationLocation').value + ", " + temp.find('#destinationAddress').value;
    booking.returnRide = temp.find('.selectReturnRide:checked').value;
    
    if (Session.get('isReturnRide')) {
      var returnBooking = _.clone(booking);
      if(Session.get('isPickupAtDropoff')) {
        returnBooking.pickupLocation = temp.find('#destinationLocation').value + ", " + temp.find('#destinationAddress').value;
        returnBooking.pickupDate = temp.find('#returnPickupDate').value;
        returnBooking.pickupTime = temp.find('#returnPickupTime').value;
        var datTimeStr = returnBooking.pickupDate + " " + returnBooking.pickupTime;
        returnBooking.pickupAt = moment(dateTimeStr, "MM/DD/YYYY h:mm a").toDate();
        returnBooking.destinationLocation = temp.find('#pickupLocation').value + ", " + temp.find('#pickupAddress').value;
      }
      
      if(temp.find('.selectDifferentPickup:checked').value === "differentPickup") {
        returnBooking.pickuptLocation = temp.find('#returnPickupLocation').value + ", " + temp.find('#returnPickupAddress').value;
        returnBooking.pickupDate = temp.find('#returnPickupDate').value;
        returnBooking.pickupTime = temp.find('#returnPickupTime').value;
        var datTimeStr = returnBooking.pickupDate + " " + returnBooking.pickupTime;
        returnBooking.pickupAt = moment(dateTimeStr, "MM/DD/YYYY h:mm a").toDate();
        returnBooking.destinationLocation = temp.find('#pickupLocation').value + ", " + temp.find('#pickupAddress').value;
      }
    }
    
   
    console.log(booking, returnBooking);
    var departId = "";
    var onReturnBookingInsert = function(err, id){
      if(!err){
        Bookings.update({_id: departId},{$set: {nextBookingId: id}})
      }
    }
    Bookings.insert(booking, function(err, id){
      if(!err){
        if(returnBooking){
          departId = id;
          Bookings.insert(returnBooking, onReturnBookingInsert); 
        }
      }
      else
        console.log(err);
    });   
    
  }
  
});

Template.taxiBookingForm.helpers({
  isReturnRide: function(){
    return Session.get('isReturnRide');
  },
  isPickupAtDropoff: function(){
    if (Session.get('isReturnRide') && (Session.get('isPickupAtDropoff') != null)) {
      return Session.get('isPickupAtDropoff')
    }
    else return false;
  },
  isDifferentPickup: function(){
    if (Session.get('isReturnRide') && (Session.get('isPickupAtDropoff') != null)) {
      return !Session.get('isPickupAtDropoff')
    }
    else return false;
  },
  today: function(){
     return moment().format('MM/DD/YYYY');
  }
});
Template.drivers.helpers({
  drivers: function(){
    return [{name: "James"},{name: "Shane"},{name: "Doug"},{name: "Alice"},{name: "Bob"}]
  }
})

Template.taxiRuns.helpers({
  runs: function() {
    return Bookings.find({type: "taxi"}, {sort: {pickupAt: -1}});
  }
})
Template.taxiCart.helpers({
  cartTotal: function(){
    return 13.15;
  }
})
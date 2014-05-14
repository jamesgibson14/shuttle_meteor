Session.setDefault('isReturnRide', false);
Session.setDefault('isPickupAtDropoff', null);

Template.taxiBookingForm.rendered = function() {
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
    showInputs: true,
    disableFocus: false
  });
  $('#returnPickupTime').timepicker({
    minuteStep: 5,
    showInputs: false,
    disableFocus: true
  });
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
    booking.types = ["taxi"];
    booking.dateCreated = new Date();
    booking.scenario = "Online-customer"
    if ($(temp.find('#scenario')).val() != null) {
      booking.scenario = $(temp.find('#scenario')).val();
    }
    booking.name = temp.find('#fullName').value;
    booking.phone = temp.find('#phoneNumber').value;
    booking.email = temp.find('#emailAddress').value;
    booking.pickupLocation = temp.find('#pickupLocation').value;
    booking.pickupAddress = temp.find('#pickupAddress').value;
    booking.pickupAddress2 = temp.find('#pickupAddress2').value;
    booking.passengerCount = temp.find('#passengerCount').value;
    booking.pickupDate = temp.find('#pickupDate').value;
    booking.pickupTime = temp.find('#pickupTime').value;
    var dateTimeStr =  booking.pickupDate + " " + booking.pickupTime;
    booking.pickupAt = moment(dateTimeStr, "MM/DD/YYYY h:mm a").toDate();
    booking.destinationLocation = temp.find('#destinationLocation').value;
    booking.destinationAddress = temp.find('#destinationAddress').value;
    booking.destinationAddress2 = temp.find('#destinationAddress2').value;
    booking.returnRide = temp.find('.selectReturnRide:checked').value;
    booking.notes = $(temp.find('#notes')).val();
    booking.status = "reserved";
    
    if (Session.get('isReturnRide')) {
      var returnBooking = _.clone(booking);
      if(Session.get('isPickupAtDropoff')) {
        returnBooking.pickupLocation = temp.find('#destinationLocation').value;
        returnBooking.pickupAddress = temp.find('#destinationAddress').value;
        returnBooking.pickupAddress2 = temp.find('#destinationAddress2').value;
        returnBooking.pickupDate = temp.find('#returnPickupDate').value;
        returnBooking.pickupTime = temp.find('#returnPickupTime').value;
        var returnDatTimeStr = returnBooking.pickupDate + " " + returnBooking.pickupTime;
        returnBooking.pickupAt = moment(returnDatTimeStr, "MM/DD/YYYY h:mm a").toDate();
        returnBooking.destinationLocation = temp.find('#pickupLocation').value;
        returnBooking.destinationAddress = temp.find('#pickupAddress').value;
        returnBooking.destinationAddress2 = temp.find('#pickupAddress2').value;
        returnBooking.notes = $(temp.find('#returnTripNotes')).val();
      }
      
      if(temp.find('.selectDifferentPickup:checked').value === "differentPickup") {
        returnBooking.pickupLocation = temp.find('#returnPickupLocation').value;
        returnBooking.pickupAddress = temp.find('#returnPickupAddress').value;
        returnBooking.pickupAddress2 = temp.find('#returnPickupAddress2').value;
        returnBooking.pickupDate = temp.find('#returnPickupDate').value;
        returnBooking.pickupTime = temp.find('#returnPickupTime').value;
        var returnDatTimeStr = returnBooking.pickupDate + " " + returnBooking.pickupTime;
        returnBooking.pickupAt = moment(returnDatTimeStr, "MM/DD/YYYY h:mm a").toDate();
        returnBooking.destinationLocation = temp.find('#pickupLocation').value;
        returnBooking.destinationAddress = temp.find('#pickupAddress').value;
        returnBooking.destinationAddress2 = temp.find('#pickupAddress2').value;
        returnBooking.notes = $(temp.find('#returnTripNotes')).val();
      }
    }
    
   
    console.log(booking, returnBooking);
    var departId = "";
    var reset = function(){
      alert('Booking Successfull');
      _.each(temp.findAll('input'),function(el){
        el.value ='';
      })
      Session.set('isReturnRide', false);
      Session.set('isPickupAtDropoff', null);
    }
    var onReturnBookingInsert = function(err, id){
      if(!err){
        Records.update({_id: departId},{$set: {nextBookingId: id}})
        reset();
      }
      
    }
    Records.insert(booking, function(err, id){
      if(!err){
        if(returnBooking){
          departId = id;
          Records.insert(returnBooking, onReturnBookingInsert);
        }
        reset();
      }
      else
        console.log(err);
    });   
    
  }
  
});

Template.taxiBookingForm.helpers({
  isReturnRide: function(){
    return Session.equals('isReturnRide', true);
  },
  isPickupAtDropoff: function(){
    if (Session.equals('isReturnRide', true) && !Session.equals('isPickupAtDropoff', null)) {
      return Session.equals('isPickupAtDropoff', true);
    }
    else return false;
  },
  isDifferentPickup: function(){
    if (Session.equals('isReturnRide', true) && !Session.equals('isPickupAtDropoff', null)) {
      return !Session.equals('isPickupAtDropoff', true);
    }
    else return false;
  },
  today: function(){
     return moment().format('MM/DD/YYYY');
  }
});

Template.taxiCart.helpers({
  cartTotal: function(){
    return 13.15;
  }
})
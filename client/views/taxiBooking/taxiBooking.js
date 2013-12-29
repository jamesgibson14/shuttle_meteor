Session.setDefault('isReturnRide',true);

Template.taxiBookingForm.rendered = function() {
  if(!this.hasRendered){
    this.rendered = true;
    $('.datepicker').datepicker({
      onSelect: function(){
        var pickup = $('#pickupDate').val();
        console.log(depart);
        Session.set('selectedPickupDate', pickup);
      },
      minDate: new Date()
    });
    $('#pickupTime').timepicker({
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
      console.log(Session.get('isReturnRide'));
    }
    else {
      Session.set('isReturnRide', false);
      console.log(Session.get('isReturnRide'));
    }
  },
  /*
  'click #booking-submit': function(e, temp){
    var booking = {}
    booking.returnTrip = temp.find('.selectReturnRide:checked').value;
    booking.departDate = temp.find('#departDate').value;
    booking.returnDate = temp.find('#returnDate').value;
    booking.pickUp = temp.find('#pickUp').value;
    booking.dropOff = temp.find('#dropOff').value;
    booking.departTime = temp.find('#departureTime').value;
    booking.departSeat = temp.find('.departSeat:checked').value;
    booking.departPassengers = temp.find('#departurePassengers').value;
    booking.returnTime = temp.find('#returnTime').value;
    booking.returnSeat = temp.find('.returnSeat:checked').value;
    booking.returnPassengers = temp.find('#returnPassengers').value;
    booking.returnFare = (booking.pickUp == 'Las Vegas' || booking.dropOff == 'Las Vegas') ? 39 : 59; //pickUpAdjustment + dropOffAdjustment + roundTripAdjustment + returnTimeAdjustment
    booking.departFare = (booking.pickUp == 'Las Vegas' || booking.dropOff == 'Las Vegas') ? 39 : 59; //pickUpAdjustment + dropOffAdjustment + roundTripAdjustment + departTimeAdjustment
    booking.totalFare = booking.departFare + booking.returnFare;
    booking.totalPassengers = parseInt(booking.returnPassengers) + parseInt(booking.departPassengers);
    console.log(booking);
    Bookings.insert(booking);
    
  }*/
  
});

Template.taxiBookingForm.helpers({
  isReturnRide: function(){
    return Session.get('isReturnRide');
  },
  today: function(){
     return moment().format('MM/DD/YYYY');
  }
});
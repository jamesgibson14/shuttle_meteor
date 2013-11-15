Session.setDefault('isReturnTrip',true)
Template.booking_form.rendered = function() {
  if(!this.hasRendered){
    this.rendered = true;
    $('.input-append.date').datepicker();
  }
}
Template.booking_form.events({
  'change .selectReturn': function(e, temp){
    if(e.target.value === "round-trip"){
      Session.set('isReturnTrip',true)
    }
    else {
      Session.set('isReturnTrip', false)
    }
  },
  'click #booking-submit': function(e, temp){
    var booking = {}
    booking.returnTrip = temp.find('.selectReturn:checked').value;
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
    
  }
  
})
Template.booking_form.helpers({
  isReturnTrip: function(){
    return Session.get('isReturnTrip');
  },
  currentroutes: function () {
    return Routes.find({}, { fields: { 'name': 1, _id: 0 }});
  },
  pick_up: function () {
    return Locations.find();
  },
  drop_off: function () {
  var pickUpSelection = $("#pick_up option:selected").text();
    return Locations.find();
  }
  
  
})
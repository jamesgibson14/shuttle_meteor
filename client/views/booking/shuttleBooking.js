Session.setDefault('isReturnTrip',true)
Session.setDefault('selectedDepartDate', null);

Template.shuttleBooking.rendered = function() {
  $('.datepicker').datepicker({
    onSelect: function(){
      var depart = $('#departDate').val();
      console.log(depart);
      Session.set('selectedDepartDate', depart);
    },
    minDate: new Date()
  });
}
Template.shuttleBooking.events({
  'change .selectReturn': function(e, temp){
    if(e.target.value === "round-trip"){
      Session.set('isReturnTrip',true)
    }
    else {
      Session.set('isReturnTrip', false)
    }
  },
  
  'click #booking-submit': function(e, temp){
    var booking = {};
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
Template.shuttleBooking.helpers({
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
Template.shuttleRuns.events({})
Template.shuttleRuns.helpers({
  availableRuns: function(direction) {
    console.log(direction)
    var val = Session.get('selectedDepartDate');
    if(!val){
      return false;
    }
    var start = moment(val);
    var end = moment(start);
    var origination = '';
    var destination = '';
    end.add('days', 1);
    var range = {$gte: start.toDate(), $lt: end.toDate()}
    var result = Records.find({type: "ShuttleRun", date: range},{$sort:{time: 1}});
    var count = result.count();
    console.log(range);
    if (count === 0) {
      console.log("Inserting new run options...");
      Records.insert({type: 'ShuttleRun', date: start.toDate(), time: '04:00 AM', from: 'Cedar City',
        to: 'Las Vegas', ride: "Std Van", passengers: 3, maxPassengers: 8},function(err,res){console.log(err,res)});
      Records.insert({type: 'ShuttleRun', date: start.toDate(), time: '06:00 AM', from: 'Las Vegas',
        to: 'Cedar CIty', ride: "Std Van", passengers: 3, maxPassengers: 8},function(err,res){console.log(err,res)});

    }
    else {
      return result;
    }
  }
})

Template.aRun.helpers({
  fieldToObject: function(fieldName){
    return {_id: this._id, fieldName: fieldName, value: this[fieldName]}
  },
  
  availableSeats: function(){
    return (this.maxPassengers - this.passengers);
  }
})
Session.setDefault('isReturnTrip',true)
Session.setDefault('selectedDepartDate', null);
Template.booking_form.created = function(){
  
}
Template.booking_form.rendered = function() {
  if(!this.hasRendered){
    this.rendered = true;
    $('.datepicker').datepicker({
      onSelect: function(){
        var depart = $('#departDate').val();
        console.log(depart);
        Session.set('selectedDepartDate', depart);
      },
      minDate: new Date()
    });
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
Template.suggestedRuns.events({})
Template.suggestedRuns.helpers({
  availableRuns: function() {
    var val = Session.get('selectedDepartDate');
    if(!val){
      return false;
    }
    var start = moment(val);
    var end = moment(start);
    var origination = '';
    var destination = '';
    end.add('days', 1);
    console.log('val',val);
    console.log('start',start);
    console.log('end',end);
    var range = {$gte: start.toDate(), $lt: end.toDate()}
    console.log(range);
    var result = RunHistory.find({date: range},{$sort:{time: 1}});
    var count = result.count();
    console.log(count);
    if (count === 0) {
      console.log("Inserting new run options...");
      RunHistory.insert({date: start.toDate(), time: '04:00 AM', from: 'St. George', to: 'Las Vegas', ride: "Std Van", passengers: 3, maxPassengers: 8},function(err,res){console.log(err,res)});
      RunHistory.insert({date: start.toDate(), time: '06:00 AM', from: 'St. George', to: 'Las Vegas', ride: "Std Van", passengers: 3, maxPassengers: 8},function(err,res){console.log(err,res)});
      RunHistory.insert({date: start.toDate(), time: '08:00 AM', from: 'St. George', to: 'Las Vegas', ride: "Std Van", passengers: 3, maxPassengers: 8},function(err,res){console.log(err,res)});
      RunHistory.insert({date: start.toDate(), time: '10:00 AM', from: 'St. George', to: 'Las Vegas', ride: "Std Van", passengers: 3, maxPassengers: 8},function(err,res){console.log(err,res)});
      RunHistory.insert({date: start.toDate(), time: '12:00 PM', from: 'St. George', to: 'Las Vegas', ride: "Std Van", passengers: 3, maxPassengers: 8},function(err,res){console.log(err,res)});
      RunHistory.insert({date: start.toDate(), time: '07:00 PM', from: 'St. George', to: 'Las Vegas', ride: "Exc Van", passengers: 3, maxPassengers: 8},function(err,res){console.log(err,res)});
      RunHistory.insert({date: start.toDate(), time: '6:00', route: 'stgToVegas', ride: "Exc Van", passengers: 3, maxPassengers: 8},function(err,res){console.log(err,res)});
      RunHistory.insert({date: start.toDate(), time: '8:00', route: 'stgToVegas', ride: "Exc Van", passengers: 3, maxPassengers: 8},function(err,res){console.log(err,res)});
      RunHistory.insert({date: start.toDate(), time: '10:00', route: 'stgToVegas', ride: "Exc Van", passengers: 3, maxPassengers: 8},function(err,res){console.log(err,res)});
      RunHistory.insert({date: start.toDate(), time: '12:00', route: 'stgToVegas', ride: "Exc Van", passengers: 3, maxPassengers: 8},function(err,res){console.log(err,res)});
      RunHistory.insert({date: start.toDate(), time: '7:00 AM', route: 'stgToSLC', ride: "Stnd Van", passengers: 3, maxPassengers: 8},function(err,res){console.log(err,res)});
      RunHistory.insert({date: start.toDate(), time: '1:00 PM', route: 'stgToSLC', ride: "Stnd Van", passengers: 3, maxPassengers: 8},function(err,res){console.log(err,res)});
      RunHistory.insert({date: start.toDate(), time: '4:00 PM', route: 'stgToSLC', ride: "Stnd Van", passengers: 3, maxPassengers: 8},function(err,res){console.log(err,res)});
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
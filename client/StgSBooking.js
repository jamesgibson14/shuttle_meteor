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
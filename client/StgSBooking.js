if (Meteor.isClient) {

  Template.booking_form.rendered = function() {
    $('.input-append.date').datepicker();
  }


  Template.booking_form.currentroutes = function () {
    return Routes.find({}, { fields: { 'name': 1, _id: 0 }});
   };

  Template.booking_form.pick_up = function () {
    return Locations.find();
  }

  Template.booking_form.drop_off = function () {
    var pickUpSelection = $("#pick_up option:selected").text();
    return Locations.find();
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

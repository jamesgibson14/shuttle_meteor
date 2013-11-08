Routes = new Meteor.Collection('routes');
Bookings = new Meteor.Collection2("bookings", {
  schema: {
    booked_date: {
      type: Date,
      label: "Booked Date"
    },
    travel_date: {
      type: Date,
      label: "Travel Date"
    },
    pickup: {
      type: String,
      label: "Pickup"
    },
    dropoff: {
      type: String,
      label: "Drop Off"
    },
    summary: {
      type: String,
      label: "Brief summary",
      optional: true,
      max: 1000
    }
  }
});

if (Meteor.isClient) {

  Template.booking_form.rendered = function() {
    $('.input-append.date').datepicker();
  }


  Template.booking_form.currentroutes = function () {
     return Routes.find({}, { fields: { 'name': 1, _id: 0 }});
   };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Routes = new Meteor.Collection('Routes');
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
  /*
  Template.route_form.insert_route = function () {
    return "Welcome to StgSBooking.";
  };
  */

  Template.booking_form.currentroutes = function () {
     return Routes.find({}, { fields: { 'name': 1, _id: 0 }});
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

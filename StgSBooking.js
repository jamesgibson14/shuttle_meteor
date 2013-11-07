Routes = new Meteor.Collection('Routes');
Booking = new Meteor.Collection2('booking', {
  schema: {
    departureDate: {
      type: Date,
      label: "Departure Date"
    },

    route: {
      type: String,
      label: "Departure Route"
    },

    departureTime: {
      type: String,
      label: "Departure Time"
    },

    price: {
      type: Number,
      label: "Total Price"
    }

  }
});

if (Meteor.isClient) {
  Template.route_form.insert_route = function () {
    return "Welcome to StgSBooking.";
  };

  Template.route_form.currentroutes = function () {
     return Routes.find({}, { fields: { 'name': 1, _id: 0 }});
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

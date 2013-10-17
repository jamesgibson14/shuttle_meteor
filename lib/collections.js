/**
 * Created by James on 10/16/13.
 */
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
Routes = new Meteor.Collection('routes');
Runs = new Meteor.Collection('runs');
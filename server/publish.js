/**
 * Created by James on 10/16/13.
 */
Meteor.publish("bookings", function () {
  return Bookings.find({});
});
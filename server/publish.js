/**
 * Created by James on 10/16/13.
 */
Meteor.publish("bookings", function () {
  return Bookings.find({});
});
Bookings.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return true;
  }
})
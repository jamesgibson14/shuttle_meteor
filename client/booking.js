/**
 * Created by James on 10/16/13.
 */
App = {};
Deps.autorun(function () {
  App.subs = {
    bookings: Meteor.subscribe('bookings')
  }
});
Template.booking.events({
  'click .btnAdd': function(e,temp){
    var obj = {};
    var data = temp.data || {};
    e.preventDefault();
    e.stopPropagation();
    _.each(temp.findAll('input'),function(key,val){
      if(data[key.name] != key.value)
        obj[key.name] = key.value;
    })
    console.log(obj);
    Bookings.insert(obj,function(err, data){
      if(!err)
        console.log('successful insert', data)
      else
        console.log(err, Bookings.namedContext("default").invalidKeys())
    })
  }
})
Template.booking.helpers({
  bookings: function(){
    var cursor = Bookings.find({})
    var count = 0;
    var collection = cursor.map(function(doc, index, cursor){
      doc._meta = {label: 'label', type: 'String'};
      count += 1;
      return doc;
    })
    return collection;
  },
  bookingsCollection: function(){
    return Bookings;
  }
})
Template.booking.rendered = function(){
  if(!this.rendered){
    this.rendered = true;

  }
}
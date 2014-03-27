Template.header.helpers({
  getUserName: function(id, attr){
    var user = Meteor.user();
    if(user.profile){
      return user.profile[attr];
    }
  }
})
Meteor.methods({
  testQuery: function(){
    
  },
  newUser: function(email){

    Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});
  }
})

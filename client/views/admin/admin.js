Session.setDefault('selectedUser',Meteor.userId());
Template.admin.events({
  "click #userList li": function(e,temp){
    Session.set('selectedUser', $(e.target).data('user_id'));
    $(e.target).addClass('selected').siblings().removeClass('selected');
  },
  'change #newUser': function(e,temp){
    //TODO verify valid email
    console.log(e.target.value);
    id = Accounts.createUser({
      email: e.target.value,
      password: "shuttle1",
      profile: { email: e.target.value }
    });
    // email verification
    Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});
    Roles.setUserRoles(id, ['employee']);
    Session.set('selectedUser', id);
  },
  'change #newRole': function(e,temp){
    console.log(e.target.value);
    Roles.createRole(e.target.value);
  }
});
Template.admin.helpers({
  roles: function(){
    return Roles.getAllRoles();
  },
  users: function(){
    return Meteor.users.find();
  },
  selectedUser: function(options){
    return Session.get('selectedUser');
  },
  isSelectedUser: function(options){
    return Session.get('selectedUser')==options.hash.id;
  },
  getUser: function(){
    var user = Meteor.users.findOne(Session.get('selectedUser')) || {};
    user.profile || (user.profile = {});
    user.profile.email || (user.profile.email = user.emails[0].address);
    return user.profile;
  }
});
Template.user.rendered= function(){
  
}
Template.user.events({
  'change input': function(e, temp){
    console.log(e.target.value);
    var id = Session.get('selectedUser');
    var fieldname = e.target.id;
    var obj = {};
    obj['profile.' + fieldname] = e.target.value;
    Meteor.users.update({_id: id}, {$set: obj});
  }
})
Template.user.helpers({
  roles: function(){
    return Roles.getRolesForUser(Session.get('selectedUser'));
  }
})
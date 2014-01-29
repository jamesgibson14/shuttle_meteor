Template.admin.events({
  "click #userList li": function(e,temp){
    Session.set('selectedUser', $(e.target).data('user_id'));
    $(e.target).addClass('selected').siblings().removeClass('selected');
  }
});
Template.admin.helpers({
  roles: function(){
    return Roles.getAllRoles();
  },
  users: function(){
    return Meteor.users.find()
  },
  selectedUser: function(options){
    return Session.get('selectedUser');
  },
  isSelectedUser: function(options){
    return Session.get('selectedUser')==options.hash.id;
  }    
});
Template.user.created= function(){
 console.log(this); 
}
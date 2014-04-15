Template.ideas.events({
  'click .create': function(e, temp){
    var doc = {}
    doc.idea = temp.find('input.idea').value;
    doc.description = temp.find('textarea.description').value;
    doc.type = 'idea';
    Records.insert(doc);
  }
});
Template.ideas.helpers({
  ideas: function(){
    return Records.find({type: "idea"});
  }
});
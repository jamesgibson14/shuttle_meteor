Template.runs.rendered = function() {
  if(!this.hasRendered){
    this.rendered = true;
    $('.input-append.date').datepicker({
      autoclose: true,
    });
  }
}

Template.runs.events({
  'click #runsButton': function(e, temp) {
    Session.set('selectedDate', temp.find('#selectedDate').value);
  }
})
Template.runs.helpers({
  matchingRuns: function() {
    var date = new Date(Session.get('selectedDate'));
    //console.log(date) //to test
    return Runs.find();
  }
  
})
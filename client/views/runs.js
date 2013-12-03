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
    alert(temp.find('#selectedDate').value);
    Session.set('selectedDate', temp.find('#selectedDate').value);
  }
})
Template.runs.helpers({
  matchingRuns: function() {
    var val = Session.get('selectedDate')
    var start = moment(val);
    var end = moment(start);
    end.add('days', 1);
    console.log('val',val) //to test
    console.log('start',start)
    console.log('end',end)
    return Runs.find({date: {$gt: start.toDate(), $lt: end.toDate()}});
  }
  
})
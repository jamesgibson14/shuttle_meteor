Session.setDefault('editFieldID', null);
Template.runHistory.rendered = function() {
  this.rendered = true;
  $('.datepicker').datepicker({
    onSelect: function(){
      var date = $('#selectedDate').val();
      Session.set('selectedDate', date);
    },
    minDate: new Date()
  });
}

Template.runHistory.events({
 
})

Template.runHistory.helpers({
  matchingRuns: function() {
    var val = Session.get('selectedDate')
    var start = moment(val);
    var end = moment(start);
    end.add('days', 1);
    console.log('val',val) //to test
    console.log('start',start)
    console.log('end',end)
    return RunHistory.find({date: {$gte: start.toDate(), $lt: end.toDate()}});
  }  
})

Template.run.helpers({
  fieldToObject: function(fieldName){
    return {_id: this._id, fieldName: fieldName, value: this[fieldName]}
  },
  
  checkPassengerLimit: function(){
    var difference = this.maxPassengers - this.passengers;
    var ret =(difference < 5) ? (difference < 2) ? 'danger' : 'warning' : '';
    return  ret;
  }
  
})

Template.tableField.events({
  'click .edit': function(e, temp) {    
    Session.set('editFieldID', temp.data._id+temp.data.fieldName);
    console.log(this, temp.data);
  },
  'keypress .edit': function(e, temp) {
    if (e.keyCode == 13) {
      var value = temp.find("input").value;
      var modifier = {};
      modifier.$set = {}
      modifier.$set[temp.data.fieldName] = value;
      RunHistory.update({_id: temp.data._id}, modifier);
      Session.set('editFieldID',null);
      console.log(value);
    }
  }
})

Template.tableField.helpers({
  editing: function() {
    /*  If the template id and fieldName match the Session variable set
        on click event, return true. Otherwise return false. */
    return this._id+this.fieldName == Session.get('editFieldID'); 
  }
})
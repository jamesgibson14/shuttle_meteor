Meteor.setInterval(function () {
  Session.set('time', new Date);
}, 1000);
Template.clockin.events({

});
Template.clockin.helpers({
  hours: _.range(0, 12),
  degrees: function () {
    return 30 * this;
  },
  handData: function () {
    var time = Session.get('time') || new Date;
    return { hourDegrees: time.getHours() * 30,
      minuteDegrees: time.getMinutes() * 6,
      secondDegrees: time.getSeconds() * 6 };
  },
  radial: function (angleDegrees,
                    startFraction,
                    endFraction) {
    var r = 100;
    var radians = (angleDegrees-90) / 180 * Math.PI;

    return {
      x1: r * startFraction * Math.cos(radians),
      y1: r * startFraction * Math.sin(radians),
      x2: r * endFraction * Math.cos(radians),
      y2: r * endFraction * Math.sin(radians)
    };
  },
  getDate: function(){
    return  Session.get('time') || new Date;
  }
});
Template.clockinApp.events({
  'click .punch': function(){
   // $('.bs-example-modal-sm').modal('show');
    console.log(this);
  },
  'click .clock-in': function(){
    var time = Session.get('time');
    var pin = prompt('Enter your pin?');
    if (pin !== this.pin){
      alert('pin is incorrect');
      return;
    }
    var doc = {};
    doc.start = time;
    doc.user = this._id;
    doc.types = ['timePunch', 'event'];

    Records.insert(doc);
  },
  'click .clock-out': function(){
    var time = Session.get('time');
    var pin = prompt('Enter your pin?');
    if (pin !== this.pin){
      alert('pin is incorrect');
      return;
    }
    var mod = {};
    mod.end = time;
    Records.update(doc);
  },
  'change .employeeSearch':function(e, temp){
    Session.set('employeeSearch', e.target.value);
  }
});
Template.clockinApp.helpers({
  getHistory: function(){
    return Records.find({}, {sort: {time: -1}});
  },
  employees: function(){
    var search = {};
    var text = Session.get('employeeSearch');
    if(text){
      search.$or = [
        {'profile.firstName': { $regex: text, $options: 'i' }},
        {'profile.lastName': { $regex: text, $options: 'i' }}
      ]
    }
    return Meteor.users.find(search);
  },
  inOrOut: function(){
    return false;
  },
  getTimePunch: function(){
    var timePunch = Records.findOne({type: 'timepunch', user: this._id}) || {};
    return timePunch.start || 'no Start';
  }
});
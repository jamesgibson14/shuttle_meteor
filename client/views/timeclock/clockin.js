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
    return  Session.get('time') || new Date();
  }
});
Template.clockinApp.events({
  'click .clock-in': function(){
    var time = Session.get('time');
    var pin = prompt('Enter your pin?');
    if (pin !== this.profile.pin){
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
    if (pin !== this.profile.pin){
      alert('pin is incorrect');
      return;
    }
    var modifier = {$set: {end: time}};
    Records.update({_id: this.currentPunch._id},modifier,function(err, res){console.log(err,res);});
  },
  'click .editPunch': function(){
    console.log(this)
  },
  'change .employeeSearch':function(e, temfirstNamep){
    Session.set('employeeSearch', e.target.value);
  }
});
Template.clockinApp.helpers({
  getHistory: function(){
    return Records.find({types:"timePunch"}, {sort: {start: -1}});
  },
  getUser: function(){
    var user = Meteor.users.findOne(this.user);
    console.log(user);
    return user.profile.firstName + " " + user.profile.lastName;
  },
  calcTime: function(){
    var hours = moment(this.end).diff(this.start, 'hours', true);
    hours = Math.round(hours*100)/100;
    return hours;
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
  inOrOut: function(type){
    Session.get('checkButtons');
    if(type === "in"){
      if(this.currentPunch.start){
        return true;
      }
    }
    else if (type === "out"){
      if(!this.currentPunch.end && this.currentPunch.start){
        return false;
      }
      else
        return true;
    }
  },
  getTimePunch: function(){
    var timePunch = Records.findOne({types: 'timePunch', user: this._id},{sort: {start:-1}}) || {};
    if (timePunch.start && timePunch.end) timePunch = {}
    this.currentPunch = timePunch;
    Session.set('checkButtons', new Date());
    return timePunch.start || 'Clocked Out';
  },
  timeReport: function(){
    //Template.__define__('test', eval(Compiler.compile('<p>Hello {{name}}</p>')));
    return Template.test
  }
});
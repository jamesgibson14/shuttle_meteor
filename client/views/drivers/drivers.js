Template.drivers.helpers({
  drivers: function(){
    return [{name: "James"},{name: "Shane"},{name: "Doug"},{name: "Alice"},{name: "Bob"}];
  }
})

Template.driverView.created = function(){
  Session.setDefault('dateFilter', moment().format('MM/DD/YYYY'));
  Session.setDefault('driverFilter', 'all');
}

Template.driverView.rendered = function(){
  if(!this.hasRendered){
    this.rendered = true;
    $('.datepicker').datepicker({
      onSelect: function(){
        var date = $('#runDateFilter').val();
        Session.set('dateFilter', date);
      },
      // minDate: new Date()
    });
    $('.notes').popover()
  }
  
}

Template.driverView.helpers({
  today: function(){
     return Session.get('dateFilter');
  },
  driverFilter: function(){
    return Session.get('driverFilter');
  },
  getRunInfo: function(){    
    var id = Session.get('currentBooking');
    var obj = Bookings.findOne({_id: id});
    console.log('getRunInfo', obj);
    return obj;
  },
  paymentTypeCash: function () {
    var bookingID = Session.get('currentBooking');
    var paymentType = Bookings.findOne({_id: bookingID}, {paymentType: 1, id:0});
    console.log('Booking: ' + bookingID);
    console.log('Payment Type', paymentType);
    var isCash = false;
    if (paymentType === 'cash') {
      isCash = true;
    }
    return isCash;
  }
})

Template.runInfoModal.rendered = function(){
  console.log('data' ,this.data);
}

Template.runInfoModal.helpers({
  
})

Template.driverSelect.helpers({
  drivers: function(){
    return Meteor.users.find({roles: 'driver'});
  }
})

Template.driverView.events({
  'change #driverFilter': function(e, temp) {
    Session.set('driverFilter', $(e.target).val());
  },
  'change #runDateFilter': function(e, temp) {
    Session.set('dateFilter', e.target.value); 
  },
  'click #saveRunInfo': function(e, temp) {
    var bookingID = Session.get('currentBooking');
    var updateValues = {};
    updateValues.scenario = $(temp.find('.scenario')).val();
    updateValues.mileage = $(temp.find('.runMileage')).val();
    updateValues.waitTime = $(temp.find('.runWaitTime')).val();
    updateValues.price = $(temp.find('.runPrice')).val();
    updateValues.paymentType = $(temp.find('input.runPaymentType:checked')).val();
    Bookings.update({_id: bookingID},{$set: updateValues});
    $('#runInfoModal').modal('hide');
  },
  'click #saveRunCustomer': function(e, temp) {
    var bookingID = Session.get('currentBooking');
    var updateValues = {};
    updateValues.name = $(temp.find('.runCustomerName')).val();
    updateValues.phone = $(temp.find('.runCustomerPhone')).val();
    updateValues.email = $(temp.find('.runCustomerEmail')).val();
    Bookings.update({_id: bookingID},{$set: updateValues});
    $('#runCustomerModal').modal('hide');
  },
  'click #saveRunDetails': function(e, temp) {
    var bookingID = Session.get('currentBooking');
    var updateValues = {};
    updateValues.pickupDate = $(temp.find('#runPickupDate')).val();
    updateValues.pickupTime = $(temp.find('.runPickupTime')).val();
    var updateDateTimeStr =  updateValues.pickupDate + " " + updateValues.pickupTime;
    updateValues.pickupAt = moment(updateDateTimeStr, "MM/DD/YYYY h:mm a").toDate();
    updateValues.passengerCount = $(temp.find('#runPassengerCount')).val();
    updateValues.pickupLocation = $(temp.find('#runPickupLocation')).val();
    updateValues.pickupAddress = $(temp.find('#runPickupAddress')).val();
    updateValues.pickupAddress2 = $(temp.find('#runPickupAddress2')).val();
    updateValues.destinationLocation = $(temp.find('#runDestinationLocation')).val();
    updateValues.destinationAddress = $(temp.find('#runDestinationAddress')).val();
    updateValues.destinationAddress2 = $(temp.find('#runDestinationAddress2')).val();
    updateValues.returnRide = $(temp.find('input.selectReturnRide:checked')).val();
    updateValues.notes = $(temp.find('#notes')).val();
    Bookings.update({_id: bookingID},{$set: updateValues});
    $('#runDetailsModal').modal('hide');
  },
})

Template.taxiBookings.helpers({
  taxiBookings: function() {
    var driver = Session.get('driverFilter');
    var date = Session.get('dateFilter');
    var start = moment(date);
    var end = moment(start);
    end.add('days', 1);
    var range = {$gte: start.toDate(), $lt: end.toDate()};
    
    var filter = {
      type: "taxi",
      pickupAt: range
    }
    if (driver !== "all") {
      filter.driver = driver;
    }
    return Bookings.find(filter, {sort: {pickupAt: 1}});
  }
})

Template.taxiBooking.helpers({
  fieldToObject: function(fieldName){
    return {_id: this._id};
  },
  getDriver: function(id, attr){
    var driver = Meteor.users.findOne(id) || {}
    if(driver.profile)
      return driver.profile[attr];
  }
})

Template.taxiBooking.events({
  'change .chooseDriver': function(e, temp) {
    var bookingID = temp.data._id; 
    
    var driver = $(e.target).val();
    
    Bookings.update({_id: bookingID}, {$set: {driver: driver}});
  },
  'click .editRunInfo': function(e, temp) {
    var bookingID = temp.data._id;
    Session.set('currentBooking', bookingID);
    var obj = Bookings.findOne({_id: bookingID});
    console.log('editRunInfo', obj);
    $('#runInfoModal .modal-content').html(Template.runInfoModal(obj));
    $('#runInfoModal').modal('show');   
  },
  'click .editRunCustomer': function(e, temp) {
    var bookingID = temp.data._id;
    Session.set('currentBooking', bookingID);
    var obj = Bookings.findOne({_id: bookingID});
    console.log('editRunCustomer', obj);
    $('#runCustomerModal .modal-content').html(Template.runCustomerModal(obj));
    $('#runCustomerModal').modal('show');   
  },
  'click .editRunDetails': function(e, temp) {
    var bookingID = temp.data._id;
    Session.set('currentBooking', bookingID);
    var obj = Bookings.findOne({_id: bookingID});
    console.log('editRunDetails', obj);
    $('#runDetailsModal .modal-content').html(Template.runDetailsModal(obj));
    $('#runDetailsModal').modal('show');
    $('.datepicker').datepicker({});
    $('.timepicker').timepicker({
      minuteStep: 5,
      showInputs: false,
      disableFocus: true
    });
  }
})

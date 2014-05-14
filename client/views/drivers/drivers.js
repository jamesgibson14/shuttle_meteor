Template.drivers.helpers({
  drivers: function(){
    return [{name: "James"},{name: "Shane"},{name: "Doug"},{name: "Alice"},{name: "Bob"}];
  }
});

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
      }
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
    var obj = Records.findOne({_id: id});
    console.log('getRunInfo', obj);
    return obj;
  },
  paymentTypeCash: function () {
    var bookingID = Session.get('currentBooking');
    var paymentType = Records.findOne({_id: bookingID}, {paymentType: 1, id:0});
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
  'click .changeDate': function(e, temp){
    var dir = $(e.currentTarget).data('direction');
    var newMonth = moment(Session.get('dateFilter')).add('days',dir);
    Session.set('dateFilter',newMonth.toDate());
  },
  'change #driverFilter': function(e, temp) {
    Session.set('driverFilter', $(e.target).val());
  },
  'change #runDateFilter': function(e, temp) {
    Session.set('dateFilter', e.target.value); 
  },
  'click #confirmCancelRun': function(e, temp) {
    var bookingID = Session.get('currentBooking');
    var booking = Records.findOne({_id: bookingID}, {nextBookingId:1, _id:0});
    var nextBookingId = booking.nextBookingId;
    var updateValues = {};
    updateValues.status = "cancelled";
    updateValues.reasonCancelled = $(temp.find('.runCancelReason')).val();
    Records.update({_id: bookingID},{$set: updateValues});
    console.log(Records.findOne({_id: bookingID}));
    if (nextBookingId) {
      Records.update({_id: nextBookingId},{$set: updateValues});
      console.log(Records.findOne({_id: nextBookingId}));
    }
    $('#runCancelModal').modal('hide');
  },
  'click #confirmRestoreReturnBooking': function(e,temp){
    var bookingID = Session.get('currentBooking');
    var booking = Records.findOne({_id: bookingID}, {nextBookingId:1, _id:0});
    var nextBookingId = booking.nextBookingId;
    Records.update({_id: nextBookingId}, {$set: {status: "reserved"}});
    $('#runReserveModal').modal('hide');
  },
  'click #saveRunInfo': function(e, temp) {
    var bookingID = Session.get('currentBooking');
    var updateValues = {};
    updateValues.scenario = $(temp.find('.scenario')).val();
    updateValues.mileage = $(temp.find('.runMileage')).val();
    updateValues.waitTime = $(temp.find('.runWaitTime')).val();
    updateValues.price = $(temp.find('.runPrice')).val();
    updateValues.paymentType = $(temp.find('input.runPaymentType:checked')).val();
    Records.update({_id: bookingID},{$set: updateValues});
    $('#runInfoModal').modal('hide');
  },
  'click #saveRunCustomer': function(e, temp) {
    var bookingID = Session.get('currentBooking');
    var updateValues = {};
    updateValues.name = $(temp.find('.runCustomerName')).val();
    updateValues.phone = $(temp.find('.runCustomerPhone')).val();
    updateValues.email = $(temp.find('.runCustomerEmail')).val();
    Records.update({_id: bookingID},{$set: updateValues});
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
    Records.update({_id: bookingID},{$set: updateValues});
    $('#runDetailsModal').modal('hide');
  }
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
      types: "taxi",
      pickupAt: range
    }
    if (driver !== "all") {
      filter.driver = driver;
    }
    return Records.find(filter, {sort: {pickupAt: 1}});
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
    
    Records.update({_id: bookingID}, {$set: {driver: driver}});
  },
  'click .cancelRun': function(e, temp) {
    var bookingID = this._id;
    Session.set('currentBooking', bookingID);
    var obj = Records.findOne({_id: bookingID});
    console.log('cancelRun', obj);
    $('#runCancelModal .modal-content').html(Template.runCancelModal(obj));
    $('#runCancelModal').modal('show');
  },
  'click .reserveRun': function(e,temp) {
    var bookingID = temp.data._id;
    Session.set('currentBooking', bookingID);
    var obj = Records.findOne({_id: bookingID});
    var nextBookingID = obj.nextBookingId;
    console.log('reserveRun', obj);
    Records.update({_id: bookingID}, {$set: {status: "reserved"}});
    if (nextBookingID) {
    $('#runReservelModal .modal-content').html(Template.runReserveModal(obj));
    $('#runReserveModal').modal('show');
    }
  },
  'click .deleteRun': function(e, temp) {
    
  },
  'click .editRunInfo': function(e, temp) {
    var bookingID = this._id;
    Session.set('currentBooking', bookingID);
    $('#runInfoModal .modal-content').html('');
    UI.insert(UI.renderWithData(Template.runInfoModal, this), $('#runInfoModal .modal-content')[0]);
    $('#runInfoModal').modal('show');   
  },
  'click .editRunCustomer': function(e, temp) {
    var bookingID = this._id;
    Session.set('currentBooking', bookingID);
    $('#runCustomerModal .modal-content').html('');
    UI.insert(UI.renderWithData(Template.runCustomerModal, this), $('#runCustomerModal .modal-content')[0]);
    $('#runCustomerModal').modal('show');   
  },
  'click .editRunDetails': function(e, temp) {
    var bookingID = this._id;
    Session.set('currentBooking', bookingID);
    console.log('editRunDetails', this);
    $('#runDetailsModal .modal-content').html('');
    UI.insert(UI.renderWithData(Template.runDetailsModal, this), $('#runDetailsModal .modal-content')[0]);
    $('#runDetailsModal').modal('show');
    $('.datepicker').datepicker({});
    $('.timepicker').timepicker({
      minuteStep: 5,
      showInputs: false,
      disableFocus: true
    });
  }
});

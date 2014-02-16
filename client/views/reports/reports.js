Days = new Meteor.Collection(null);
Template.reports.rendered = function(){
  $(".datepicker").datepicker({});
}
Template.reports.events({
  'click .changeMonth': function(e, temp){
    var dir = $(e.currentTarget).data('direction');
    var newMonth = moment(Session.get('selectedMonth')).add('months',dir)
    Session.set('selectedMonth',newMonth.toDate());
  }
});
Template.reports.helpers({
  month: function(){
    return Session.get('selectedMonth')|| new Date();
  },
  days: function(){
    var days = []
    var date = Session.get('selectedMonth');
    var range= {
      pickupAt: {
        $gte: moment(date).startOf('month').toDate(),
        $lte: moment(date).endOf('month').toDate(),
      }
    };
    console.log(range);
    var cursor =  Bookings.find(range);
    Days.remove({});
    cursor.forEach(function(doc){
      var taxiRuns = doc.isDelivery ? 0 : 1;
      var deliveryRuns =  doc.isDelivery ? 1 : 0;
      Days.upsert( {dateString: moment(doc.pickupAt).format('MM/DD/YYYY')},
                  {$set: {date: doc.pickupAt},
                   $inc: {mileage: parseInt(doc.mileage || 0), price: parseFloat(doc.price || 0), count: 1, taxiRuns: taxiRuns, deliveryRuns: deliveryRuns}})
    });
    return Days.find();
  },
  totals: function(){
    var totals = {
      mileage: 0,
      price: 0,
      taxiRuns: 0,
      deliveryRuns: 0,
      count: 0
    }
    
    Days.find({}).forEach(function(doc){
      totals.mileage += doc.mileage;
      totals.price += doc.price;
      totals.taxiRuns += doc.taxiRuns;
      totals.deliveryRuns += doc.deliveryRuns;
      totals.count += doc.count;
    })
    return totals;
  }
})
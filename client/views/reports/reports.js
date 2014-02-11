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
      Days.upsert( {dateString: moment(doc.pickupAt).format('MM/DD/YYYY')},
                  {$set: {date: doc.pickupAt},
                   $inc: {mileage: parseInt(doc.mileage || 0), price: parseFloat(doc.price || 0), count: 1}})
    });
    return Days.find();
  },
  totals: function(){
    var totals = {
      mileage: 0,
      price: 0
    }
    Days.find({}).forEach(function(doc){
      totals.mileage += doc.mileage;
      totals.price += doc.price;
    })
    return totals;
  }
})
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
    if(!date) return;
    var selector= {
      types: "taxi",
      pickupAt: {
        $gte: moment(date).startOf('month').toDate(),
        $lte: moment(date).endOf('month').toDate()
      }
    };
    var cursor =  Records.find(selector);
    Days.remove({});

    cursor.forEach(function(doc){
      var date = moment(doc.pickupAt);
      var taxiRuns = doc.delivery ? 0 : 1;
      var deliveryRuns =  doc.delivery ? 1 : 0;
      Days.upsert( {dateString: date.format('MM/DD/YYYY')},
                  {$set: {date: doc.pickupAt},
                   $inc: {mileage: parseInt(doc.mileage || 0), price: parseFloat(doc.price || 0), count: 1, taxiRuns: taxiRuns, deliveryRuns: deliveryRuns}});
    });
    var allUnitsInRange = _.range(1,moment(date).daysInMonth()+1);
    _.each(allUnitsInRange, function(val, i){
      var day = moment(date).date(val);
      if(! Days.findOne({dateString: day.format('MM/DD/YYYY')})){
        Days.insert( {dateString: day.format('MM/DD/YYYY'),date: day.toDate(), mileage: 0, price: 0, count: 0, taxiRuns: 0, deliveryRuns: 0});
      }
    });
    cursor = Days.find();
    days = cursor.map(function(doc){
      doc.dollarsPerMile = (doc.price / doc.mileage);
      doc.dollarsPerTrip= (doc.price / doc.count);
      return doc;
    })
    return days;
  },
  totals: function(){
    var totals = {
      mileage: 0,
      price: 0,
      taxiRuns: 0,
      deliveryRuns: 0,
      count: 0,
      dollarsPerMile: 0,
      dollarsPerTrip: 0
    }
    
    Days.find({}).forEach(function(doc){
      totals.mileage += doc.mileage;
      totals.price += doc.price;
      totals.taxiRuns += doc.taxiRuns;
      totals.deliveryRuns += doc.deliveryRuns;
      totals.count += doc.count;
      totals.dollarsPerMile += (doc.price / doc.mileage);
      totals.dollarsPerTrip += (doc.price / doc.count);
    })
    return totals;
  }
})
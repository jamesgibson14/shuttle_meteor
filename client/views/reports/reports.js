Template.reports.helpers({
  totalSales: function(){
    var totalSales = 0;
    Bookings.find({}).forEach(function(doc){
        totalSales += doc.totalFare;
    })
    return totalSales;
  },
  totalPassengers: function(){
    var totalPassengers = 0;
    Bookings.find({}).forEach(function(doc){
      totalPassengers += doc.totalPassengers;
    })
    return totalPassengers;
  }
})
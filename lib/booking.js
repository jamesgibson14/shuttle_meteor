Booking = {
  booking.returnTrip = temp.find('.selectReturn:checked').value;
    booking.departDate = temp.find('#departDate').value;
    booking.returnDate = temp.find('#returnDate').value;
    booking.pickUp = temp.find('#pickUp').value;
    booking.dropOff = temp.find('#dropOff').value;
    booking.departTime = temp.find('#departureTime').value;
    booking.departSeat = temp.find('.departSeat:checked').value;
    booking.departPassengers = temp.find('#departurePassengers').value;
    booking.returnTime = temp.find('#returnTime').value;
    booking.returnSeat = temp.find('.returnSeat:checked').value;
    booking.returnPassengers = temp.find('#returnPassengers').value;
    booking.returnFare = (booking.pickUp == 'Las Vegas' || booking.dropOff == 'Las Vegas') ? 39 : 59; //pickUpAdjustment + dropOffAdjustment + roundTripAdjustment + returnTimeAdjustment
    booking.departFare = (booking.pickUp == 'Las Vegas' || booking.dropOff == 'Las Vegas') ? 39 : 59; //pickUpAdjustment + dropOffAdjustment + roundTripAdjustment + departTimeAdjustment
    booking.totalFare = booking.departFare + booking.returnFare;
    booking.totalPassengers = parseInt(booking.returnPassengers) + parseInt(booking.departPassengers);
};
Template.calendar.rendered = function(){
  console.log('rendered calender',this);
  $('#calendar').fullCalendar({
    theme: true,
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    defaultDate: '2014-01-12',
    defaultView: 'agendaDay',
    editable: true,
    slotDuration: '00:05:00',
    allDaySlot: false,
    events: function(start, end, callback) {
      var events = [];
      var calendarEvents = Records.find();

      calendarEvents.forEach(function (carpool_event) {
        events.push({
          title: carpool_event.owner,
          start: carpool_event.eventDate
        });
        console.log("Event owner " + ": " + carpool_event.owner);
      });
      callback(events);
    },
    events: [
      {
        title: 'All Day Event',
        start: '2014-01-12'
      },
      {
        title: 'Long Event',
        start: '2014-01-07',
        end: '2014-01-12'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2014-01-09T16:00:00'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2014-01-16T16:00:00'
      },
      {
        title: 'Meeting',
        start: '2014-01-12T10:30:00',
        end: '2014-01-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2014-01-12T12:00:00'
      },
      {
        title: 'Birthday Party',
        start: '2014-01-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2014-01-28'
      }
    ]
  });
  Meteor.autorun(function() {
    var calendarEvents = Records.find();
    $('#calendar').fullCalendar('refetchEvents');
  });
}
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  yieldTemplates: {
    header: {
      to: 'header'
    },
    footer: {
      to: 'footer'
    }
  }
});
Router.map(function(){
  this.route('booking_form', { path: '/'});
  this.route('reports', {path: '/Reports'});
  this.route('runHistory', {path: '/RunHistory'});
  this.route('taxiBookingForm', {path: '/TaxiBooking'});
  this.route('driverView', {path: '/DriverView'});
  this.route('dashboard', {path: '/Dashboard'});
  this.route('notFound', {path: '*'});
})
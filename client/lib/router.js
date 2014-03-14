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

authController = RouteController.extend({
  before: function(){
    var currentUser = Meteor.user();
    if(!currentUser) {
      this.render('entrySignIn');
      this.stop();
    }
  }
})

Router.map(function(){
  this.route('taxiHome', { path: '/'});
  this.route('reports', {
    path: '/Reports',
    controller: authController
  });
  this.route('admin', {
    path: '/admin',
    controller: authController
  });
  this.route('userAccount', {
    path: '/UserAccount',
    controller: authController
  });
  this.route('runHistory', {
    path: '/RunHistory',
    controller: authController
  });
  this.route('taxiBookingForm', {path: '/TaxiBooking'});
  this.route('driverView', {
    path: '/DriverView',
    controller: authController
  });
  this.route('email', {
    path: '/email',
    controller: authController
  });
  this.route('dashboard', {path: '/Dashboard'});
  this.route('notFound', {path: '*'});
})
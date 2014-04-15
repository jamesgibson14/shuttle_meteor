Router.configure({
  layoutTemplate: 'master_layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  yieldTemplates: {
    header: {
      to: 'header'
    },
    footer: {
      to: 'footer'
    },
    sidebar: {
      to: 'sidebar'
    }
  }
});

authController = RouteController.extend({
  onBeforeAction: function(pause){
    var currentUser = Meteor.user();
    if(!currentUser) {
      this.render('entrySignIn');
      pause();
    }
  }
});

Router.map(function(){
  this.route('taxiHome', { path: '/'});
  this.route('admin', {
    path: '/admin',
    controller: authController
  });
  this.route('ideas', {
    path: '/ideas',
    controller: authController
  });
  this.route('userAccount', {
    path: '/UserAccount',
    controller: authController
  });
  this.route('shuttleBooking', {
    path: '/ShuttleBooking',
    controller: authController
  });
  this.route('runHistory', {
    path: '/RunHistory',
    controller: authController
  });
  this.route('taxiBookingForm', {
    path: '/TaxiBooking',
    controller: authController
  });
  this.route('driverView', {
    path: '/DriverView',
    controller: authController
  });
  this.route('email', {
    path: '/email',
    controller: authController
  });
  this.route('clockinApp', {
    path: '/clockin',
    controller: authController,
    yieldTemplates: {
      'clockin': {
        to: 'aside'
      },
      header: {
        to: 'header'
      },
      footer: {
        to: 'footer'
      },
      sidebar: {
        to: 'sidebar'
      }
    }
  });
  this.route('reports', {
    path: '/Reports',
    controller: authController,
    yieldTemplates: {
      'reportsList': {
        to: 'aside'
      },
      header: {
        to: 'header'
      },
      footer: {
        to: 'footer'
      },
      sidebar: {
        to: 'sidebar'
      }
    }
  });
  this.route('dashboard', {path: '/Dashboard'});
  this.route('notFound', {path: '*'});
})
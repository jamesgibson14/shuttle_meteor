Meteor.startup(function(){
  Accounts.ui.config({
    passwordSignupFields: 'EMAIL_ONLY'
  }),
  
  AccountsEntry.config({
    homeRoute: '/TaxiBooking',
    dashboardRoute: '/DriverView'
  })
})
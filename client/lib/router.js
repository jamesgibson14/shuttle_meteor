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
  this.route('reports', {path: '/reports'});
  this.route('runs', {path: '/runs'});
  this.route('dashboard', {path: '/dashboard'});
  this.route('notFound', {path: '*'});
})
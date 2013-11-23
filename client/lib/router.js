Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});
Router.map(function(){
  this.route('booking_form', { path: '/'});
  this.route('reports', {path: '/reports'});
  this.route('runs', {path: '/runs'});
  this.route('notFound', {path: '*'});
})
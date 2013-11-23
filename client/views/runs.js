Template.runs.rendered = function() {
  if(!this.hasRendered){
    this.rendered = true;
    $('.input-append.date').datepicker({
      autoclose: true,
    });
  }
}

Template.runs.helper({

})
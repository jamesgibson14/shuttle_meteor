Template.email.rendered= function(){
   $('#some-textarea').wysihtml5(); 
}
Template.email.events({
  'click #sendEmail': function(e, temp){
    var mail = {}
    mail.to = temp.find('input[name="to"]').value;
    mail.from = temp.find('input[name="from"]').value;
    mail.subject = temp.find('input[name="subject"]').value;
    mail.html = temp.find('textarea[name="htmlbody"]').value;
    mail.text = temp.find('textarea[name="textbody"]').value;
    console.log(mail);
    Meteor.call('sendEmail',mail, function(err, res){console.log(err,res); if(!err){alert('Email was sent successfully.');}});
  }
})
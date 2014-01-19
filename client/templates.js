Template.punSubmitForm.events({
	'submit form': function(e){
  		event.preventDefault();
  		
  		var _topic = $(e.target).find('[name=topic]');
  		var _entry = $(e.target).find('[name=entry]');
  		var pun = {
		  	topic: _topic.val(),
  	  	entry: _entry.val()
      }
    Meteor.call('post', pun);
  		_topic.val("");
  		_entry.val("");
	}
});


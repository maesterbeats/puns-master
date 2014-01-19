Meteor.startup(function () {
    // code to run on server at startup
});


Meteor.methods({
	post: function(postAttributes) {
		var user = Meteor.user();
		if (!user) {
			throw new Meteor.Error(401, "You need to login to post new stories");
		};
		var pun = _.extend(_.pick(postAttributes, 'topic','entry'),{
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime()
		});
		var punId = Puns.insert(pun);
		return punId;
	}
});
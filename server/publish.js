Meteor.publish('puns', function(){
	return Puns.find();
});

Meteor.publish('userPuns', function(user_Id){
	return Puns.find({userId: user_Id}); 
})

Meteor.publish("userData", function (userId) {
  return Meteor.users.find({_id: userId},
  	{fields:{'username':1,'_id':1,'profile':1}});
});

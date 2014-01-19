Router.configure({
	autoRender: false,
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

Router.map(function () {
	this.route('home', {
	    path: '/',
	    template: 'home',
	    layoutTemplate: 'layout',	   
	    waitOn: function() {
	    	return Meteor.subscribe('puns');
	    },
	    data: {
	    	puns: function() {
				return Puns.find();
	    	},
		}
	});
	this.route('userProfile',{
		path: '/userProfile/:userId',
		template: 'profile',
		waitOn: function() {
			_userId = this.params.userId;
			return Meteor.subscribe('userData', _userId);
		},
		data: {
			username: function() {				
				return Meteor.users.find({_id:this.params.userId }).username;
			}
			/*
			puns: function() {
				var user = Meteor.users.find({_id:this.params.userId });
				return Puns.find({author: user.username});
			}
			*/
		}
	});

	this.route('showPunItem',{
		path: '/puns/:_id',
		template: 'showPunItem',
		data: function(){
			return Puns.findOne({_id: this.params._id});
		}
	});
	this.route('profile',{
		path: '/profile/:_id',
		template: 'profile',
		waitOn: function() {
			return Meteor.subscribe('userPuns', this.params._id);
		},
		data: {
			puns: function() {
				return Puns.find({author: Meteor.user().username});
			},
			username: function() {
				return Meteor.user().username;
			}
		}
	});
	this.route('topics',{
		path: '/topics',
		template: 'topics',
		waitOn: function() {
			return Meteor.subscribe('topTopics');
		},
		data: {
			topTopics : function() {
				return Topics.find({},{sort:{numPuns: -1}, limit: 10});
			}
		}
	})
});






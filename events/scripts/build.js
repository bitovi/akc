//js events/scripts/build.js

load("steal/rhino/rhino.js");
steal('steal/build',function(){
	steal.build('events/scripts/build.html',{to: 'events'});
});

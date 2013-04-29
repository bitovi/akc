//js ocms/scripts/build.js

load("steal/rhino/rhino.js");
steal('steal/build',function(){
	steal.build('ocms/scripts/build.html',{to: 'ocms'});
});

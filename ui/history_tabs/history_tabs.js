steal('ui/tabs','can/construct/super',function(Tabs){
	



	return Tabs.extend({
		"init": function(){
			this._super.apply(this, arguments);
			this.activateFromHash();
		},
		"li click": function(){},
		"{window} hashchange": "activateFromHash",
		activateFromHash: function(){
			console.log("here")
			var hash = window.location.hash;
			if(hash){
				var li = this.element.find("a[href="+hash+"]").parent();
			} else {
				var li = this.element.find("li:first")
			}
			
			this.activate(li)
		}
	});


})
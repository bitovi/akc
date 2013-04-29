steal('can', './items.mustache',function(can, itemsTemplate){


	return can.Control.extend({
		defaults: {
			destroyEvent: "click"
		}
	},{
		init: function(){
			var frag = itemsTemplate(this.options);

			this.element.html( frag )
		},
		"li {destroyEvent}": function(li, ev){
			li.data('item').destroy()
		}
	});
})
steal('can',function(){


	var Modal = can.Control.extend({
		show: function(el){
			single.show(el)
		},
		sum: function(){
			
		}
	},{
		".hide click": function(){
			this.element.hide()
		},
		show: function(){

		}
	})

	var div = $("<div>").appendTo(document.body)
	var single = new Modal(div)

	return Modal;

})
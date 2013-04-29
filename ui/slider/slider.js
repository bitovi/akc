steal('can',
	'jquerypp/event/drag',
	'jquerypp/event/hover',
	'jquerypp/event/resize',
	function(can){


	return can.Control.extend({
		init: function(){
			this.updatePosition()
		},
		"draginit": function(el, ev, drag){
			drag.limit(this.element.parent());
  			drag.horizontal();
		},
		"dragmove": function(el, ev, drag){

			var container = this.element.parent(),
				sliderOffset = el.offset().left,
				containerOffset = container.offset().left,
				sliderWidth = el.outerWidth(),
				containerWidth = container.width(),
				delta = this.options.max() - this.options.min();

			containerOffset +=
				parseInt( container.css("paddingLeft") ) +
				parseInt( container.css("borderLeftWidth") )

			var value = ( (sliderOffset-containerOffset ) /
				(containerWidth - sliderWidth) ) * delta +
				this.options.min();


			this.options.value(Math.round(value))

		},
		"{max} change" : "updatePosition",
		"{min} change" : "updatePosition",
		"{value} change" : "updatePosition",
		updatePosition: function(){
			var value = this.options.value(),
				container = this.element.parent(),
				containerOffset = container.offset().left,
				sliderWidth = this.element.outerWidth(),
				containerWidth = container.width(),
				delta = this.options.max() - this.options.min();

			containerOffset +=
				parseInt( container.css("paddingLeft") ) +
				parseInt( container.css("borderLeftWidth") )

			var sliderOffset = containerOffset+
				( 	(containerWidth - sliderWidth) * 
					(value+this.options.min()) ) /
				(delta)

			this.element.offset({
				left: sliderOffset
			})
		},
		"resize": "updatePosition"
	})

})
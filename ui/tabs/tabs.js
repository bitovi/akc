steal('can','./tabs.less',function(can){
	
	/**
	 * @class  Tabs
	 * @inherits can.Control
	 * @parent index
	 * 
	 * `new Tabs(element)` creates a simple tabs control
	 *
	 * @demo ui/tabs/tabs.html
	 *
	 * @constructor
	 * 
	 * @param {String|Element} element A css selector to 
	 * use to find an element or an element to create an instance 
	 * of Tabs on.
	 * 
	 */
	var  Tabs = can.Control.extend({
		init: function(){
			this.element.addClass("tabs")
			var self = this;
			this.element.find('li').each(function(i, li){
				self.getTabContent(li).hide()
			});
			this.activate(this.options.activeTab(),"");
		},
		activate: function(newVal, oldVal){

			if(newVal){
				var activatingLi = this.element.find("a[href=#"+newVal+"]")
					.parent();
			} else {
				var activatingLi = this.element.find("li:first")
			}
			if(oldVal){
				var oldLi = this.element.find("a[href=#"+oldVal+"]")
					.parent();
			} else {
				var oldLi = this.element.find("li:first")
			}

			oldLi.removeClass("active");
			this.getTabContent(oldLi).hide()
			activatingLi.addClass("active");
			this.getTabContent(activatingLi).show()
		},
		"{activeTab} change": function(activeTab, ev, newVal, oldVal){
			this.activate(newVal, oldVal);
		},
		getTabContent: function(li){
			var selector = $(li).find("a").attr("href");
			return $(selector)
		},
		"li click": function(li, ev){
			this.options.activeTab( li.find("a").attr("href").substr(1) )
			ev.preventDefault()
		}
	})

	return Tabs;

})
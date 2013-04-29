steal('can',
	'./init.mustache',
	'events/resources/mustache_helpers.js', 
	'jquerypp/dom/form_params',

	function(can, initView){
    /**
     * @class events/search
	 * @alias Search   
     */
    return can.Control(
	/** @Static */
	{
		defaults : {}
	},
	/** @Prototype */
	{
		init : function(){
			this.element.html(initView(this.options));
		},
		"form submit": function(el, ev){
			var data = this.element.find('form').formParams();
			for(var name in data){
				if(!data[name]){
					delete data[name]
				}
				
			}
			can.route.attr(data, true);
			ev.preventDefault()
		}
	});
});
steal('can',
	'./init.ejs',
	'./table_body.mustache', 
	'events/models/event.js',
	'ui/sortable_header',
	'events/resources/mustache_helpers.js',
	function(can, initView, tableBodyView, 
			Event, SortableHeader){
    /**
     * @class events/list
	 * @alias List   
     */
    return can.Control(
	/** @Static */
	{
		defaults : {}
	},
	/** @Prototype */
	{
		init : function(){
			var sortby = can.compute(function(newVal){
				if(arguments.length){
					can.route.attr('sort',newVal)
				} else {
					return can.route.attr('sort')
				}
			})
			this.element.html(initView());
			new SortableHeader(this.element.find("thead"),{
				sortby: sortby
			})
			this.updateEvents()
		},
		"{clientState} change": function(cs, ev){
			if( !ev.batchNum || ev.batchNum != this.batchNum ){
				this.updateEvents();
			}
		},
		updateEvents: function(){
			var params = this.options.clientState.attr();
			params.limit = this.options.limit();
			var self = this

			self.element.find('tbody').html("<tr><td>Loading</td></tr>")

			Event.findAll(params,function(events){

				self.options.pageCount(events.count / params.limit)

				events = events.attr();
				self.element.find('tbody')
					.html(tableBodyView(events,{
						competitions: function(event){
							return can.map(event.competitions,function(comp){
								return comp.id
							}).join("/")
						}
					}))
			})
		}
	});
});
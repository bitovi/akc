steal('can','./sortable_header.less',function(can){

	return can.Control.extend({
		pluginName: "sortable-header"
	},{
		init: function(){
			this.update()
		},
		"{sortby} change" : "update",
		"th[data-sortby] click": function(el){
			var current = this.getSortInfo(this.options.sortby()),
				newsortProp = el.attr('data-sortby')

			if(current.property == newsortProp){
				if(current.direction.toLowerCase() == "asc"){
					this.options.sortby(current.property+" desc")
				} else {
					this.options.sortby(current.property+" asc")
				}
			} else {
				this.options.sortby(newsortProp+" asc")
			}

		},
		getSortInfo : function(str){
			var parts = str.split(" ")
			return {
				property: parts[0],
				direction: parts[1]
			}
		},
		update: function(){
			this.element.find("th[data-sortby]").removeClass("asc desc")

			var current = this.getSortInfo(this.options.sortby())

			var escaped = current.property.replace(/\./g,"\\.")

			this.element.find("th[data-sortby="+escaped+"]")
				.addClass(current.direction)
		}

	})



})
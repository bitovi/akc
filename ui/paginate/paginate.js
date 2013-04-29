steal('can','./init.ejs', 
	'./paginate.less',
	function(can, initView){
    /**
     * @class ui/paginate
	 * @alias Paginate   
     */
    return can.Control(
	/** @Static */
	{
		defaults : {},
		pluginName: "paginate"
	},
	/** @Prototype */
	{
		init : function(el, options){

			options.canPrev = function(){
				if(options.pageNumber() > 0){
					return true
				}
			};
			options.canNext = function(){
				var pageCount = options.pageCount();
				if(pageCount && ( pageCount-1 > options.pageNumber() ) ){
					return true
				}
				return false
			}

			this.element.html(initView(options));
		},
		".prev click": function(){
			if(!this.options.prevURL && this.options.canPrev()){
				this.options.pageNumber(this.options.pageNumber() - 1)
			}
		},
		".next click": function(){
			if(!this.options.nextURL && this.options.canNext()){
				this.options.pageNumber(this.options.pageNumber() + 1)
			}
		}
	});
});
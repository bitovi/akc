steal(
	'events/search',
	'events/list',
	'ui/paginate',
	'events/resources/date.js',
	'./events.less',
	'events/resources/moment',
	'./models/fixtures/fixtures.js',
function(Search, List, Paginate, date){
	
	var pageCount = can.compute(),
		limit = can.compute(20),
		pageNumber = can.compute(function(){
			return Math.floor( 
				+can.route.attr('offset') / limit())
		});

	var thefuture = moment().add("months",3).toDate(),
		thepast = moment().subtract("months",3).toDate()

	can.route("",{
		offset: 0,
		sort: "startDate asc",
		"startDate:gt": date.prettyDate( thepast ),
		"startDate:lt": date.prettyDate( thefuture )
	})
	can.route.ready(true)

	new Search("#search",{
		clientState: can.route.data
	})

	new List("#list",{
		clientState: can.route.data,
		pageCount: pageCount,
		limit: limit
	})

	var nextURL = function(){
		if(pageCount() && pageNumber()+1 < pageCount()){
			return can.route.url({
				offset: +can.route.attr('offset')
					+ limit()
			}, true)
		} else {
			return "javascript://"
		}
		
	},
		prevURL = function(){
			if(pageNumber() > 0){
				return can.route.url({
					offset: +can.route.attr('offset')
						+ limit()
				},true)
			} else {
				return "javascript://"
			}
			
		}


	new Paginate('#paginate',{
		pageCount: pageCount,
		pageNumber: pageNumber,
		nextURL : nextURL,
		prevURL : prevURL
	});
})
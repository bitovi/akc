steal('can','./date.js','can/view/mustache', function(can, date){

	can.Mustache.registerHelper("prettyDate",function(d){
		return date.prettyDate(d)
	})

})
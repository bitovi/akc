steal('can','events/resources/moment',function(can){

	var makeDateFor = function(obj, prop){
		if(typeof obj[prop] == "string"){
			obj[prop] = moment(obj[prop]).toDate().getTime()
		}
	}

	return can.Model({
		findAll: function(params){
			makeDateFor(params,"startDate:gt");
			makeDateFor(params,"startDate:lt");
			return $.get("/events",params,function(){},"json")
		}
	},{})
})
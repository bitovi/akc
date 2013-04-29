steal('events/resources/moment',function(){

	return {
		prettyDate: function(date){
			if(typeof date == "function"){
				date = date()
			}

			if(!date){
				return ""
			}
			if(typeof date === "string" && date.indexOf("/") >=0){
				date = moment(date).toDate()
			}

			var dateObject = new Date( +date );
			return (dateObject.getMonth()+1)+"/"+dateObject.getDate()+"/"+
				dateObject.getFullYear()
			}
	}

})
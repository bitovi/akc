steal('./event.js',
	'./fixtures/fixtures.js',
	'events/resources/moment',
	'funcunit/qunit',
	function(Event){

		module("events/models")


		test("Event.findAll", function(){

			stop()
			Event.findAll({},function(events){
				
				equal(events.length,1000);
				start()
			})


		});


		test("Event.findAll by clubId", function(){

			stop()


			Event.findAll({clubId: 123},function(events){
				
				equal(events.length,334,"334 Events");
				start()
			})


		})

		test("Event.findAll between dates", function(){

			stop()
			var thefuture = moment().add("months",3).toDate().getTime(),
			thepast = moment().subtract("months",3).toDate().getTime()

			Event.findAll({
				"startDate:gt": thepast,
				"startDate:lt": thefuture
			},function(events){
				ok(events.length < 1000,"there are less than 1000 events")
				ok(events.length,"There are "+events.length+" events");
				start()
			});


		})


		test("Event.findAll between dates as strings", function(){

			stop()
			var thefuture = moment().add("months",3).toDate().getTime(),
			thepast = moment().subtract("months",3).toDate().getTime()

			Event.findAll({
				"startDate:gt": "2012/10/01",
				"startDate:lt": "2013/01/01"
			},function(events){
				ok(events.length < 1000,"there are less than 1000 events")
				ok(events.length,"There are "+events.length+" events");
				start()
			});


		})

	})
steal('events/list','funcunit', function( List, S ) {

	module("events/list", { 
		setup: function(){
			S.open( window );
			$("#qunit-test-area").html("<div id='list'></div>")
		},
		teardown: function(){
			$("#qunit-test-area").empty();
		}
	});
	
	test("updates the element's html", function(){
		new List('#list');
		ok( $('#list').html() , "updated html" );
	});

});
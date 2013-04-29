steal('events/search','funcunit', function( Search, S ) {

	module("events/search", { 
		setup: function(){
			S.open( window );
			$("#qunit-test-area").html("<div id='search'></div>")
		},
		teardown: function(){
			$("#qunit-test-area").empty();
		}
	});
	
	test("updates the element's html", function(){
		new Search('#search');
		ok( $('#search').html() , "updated html" );
	});

});
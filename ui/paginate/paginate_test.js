steal('ui/paginate','funcunit', function( Paginate, S ) {

	module("ui/paginate", { 
		setup: function(){
			S.open( window );
			$("#qunit-test-area").html("<div id='paginate'></div>")
		},
		teardown: function(){
			$("#qunit-test-area").empty();
		}
	});
	
	test("updates the element's html", function(){
		new Paginate('#paginate');
		ok( $('#paginate').html() , "updated html" );
	});

});
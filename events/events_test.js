steal(
	'funcunit',
	function (S) {

	// this tests the assembly 
	module("events", {
		setup : function () {
			S.open("//events/index.html");
		}
	});

	test("welcome test", function () {
		equals(S("h1").text(), "Welcome to JavaScriptMVC!", "welcome text");
	});

});

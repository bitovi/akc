steal(
	'funcunit',
	function (S) {

	// this tests the assembly 
	module("ocms", {
		setup : function () {
			S.open("//ocms/index.html");
		}
	});

	test("welcome test", function () {
		equals(S("h1").text(), "Welcome to JavaScriptMVC!", "welcome text");
	});

});

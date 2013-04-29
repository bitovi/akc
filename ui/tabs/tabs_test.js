steal('./tabs.js', 'funcunit', function(Tabs, F){


var tabsHTML = "<ul id='breeds'>\
	<li id='boxer-button'><a href='#boxer'>Boxer</a></li>\
	<li id='beagles-button'><a href='#beagles'>Beagles</a></li>\
	<li><a href='#doberman'>Doberman</a></li>\
</ul>\
<div id='boxer'>\
	Boxer stuff\
</div>\
<div id='beagles'>\
	Beagles stuff\
</div>\
<div id='doberman'>\
	Doberman stuff\
</div>"

	module("ui/tabs");


	test("clicking shows new tab and hides currently visible tabs",function(){

		$("#qunit-test-area").html(tabsHTML)

		new Tabs("#breeds")

		ok( $("#boxer-button").hasClass("active"), "first button marked as active")

		ok( $("#boxer").is(":visible"), "first tab content visible")

		F.wait(1000)

		F("#beagles-button").click(function(){

			ok( !$("#boxer-button").hasClass("active"), "first button marked as active")

			ok( !$("#boxer").is(":visible"), "first tab content visible")


			ok( $("#beagles-button").hasClass("active"), "first button marked as active")

			ok( $("#beagles").is(":visible"), "first tab content visible")

		})


	})

})
//js events/scripts/doc.js

load('steal/rhino/rhino.js');
steal("documentjs", function(DocumentJS){
	DocumentJS('events/index.html', {
		markdown : ['events', 'steal', 'jquery', 'can', 'funcunit']
	});
});
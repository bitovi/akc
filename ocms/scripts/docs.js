//js ocms/scripts/doc.js

load('steal/rhino/rhino.js');
steal("documentjs", function(DocumentJS){
	DocumentJS('ocms/index.html', {
		markdown : ['ocms', 'steal', 'jquery', 'can', 'funcunit']
	});
});
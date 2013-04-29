// load('ocms/scripts/crawl.js')

load('steal/rhino/rhino.js')

steal('steal/html/crawl', function(){
  steal.html.crawl("ocms/ocms.html","ocms/out")
});

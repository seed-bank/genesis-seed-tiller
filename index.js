const wf			= require('./write-files')

exports.bang = function (yeoman, cb) {
	sayHello(yeoman);
	loadconfig(yeoman);
	cb();
	var templates = loadTemplates(yeoman);
	wf.template(yeoman, templates);
	yeoman.log("\nData:\n" + JSON.stringify(yeoman.data));
	console.log("where I am I? " + yeoman.sourceRoot());
}
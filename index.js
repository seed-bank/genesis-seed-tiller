const chalk         = require('chalk');
const yosay         = require('yosay');
const fs            = require('fs');

const wf			= require('./utils/write-files')

function sayHello (yeoman) {
	yeoman.log(yosay(
		'Welcome to the ' + chalk.red('genesis-seed') + ' generator!'
	  ));
}

function loadconfig(yeoman) {
	yeoman.data = yeoman.fs.readJSON('./genesis.json', 'utf8');
}
function loadTemplates(yeoman) {
	var path = yeoman.sourceRoot().substring(0, yeoman.sourceRoot().indexOf('templates'));    
	var templates = yeoman.fs.readJSON(path + 'genesis-templates.json', 'utf8');
	return templates;
}

exports.bang = function (yeoman, cb) {
	sayHello(yeoman);
	loadconfig(yeoman);
	cb(yeoman);
	var templates = loadTemplates(yeoman);
	wf.template(yeoman, templates);
}
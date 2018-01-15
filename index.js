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
	yeoman.data = yeoman.fs.readJSON('./genesis.config', 'utf8');
}
function loadTemplates(yeoman) {
	var path = yeoman.sourceRoot().substring(0, yeoman.sourceRoot().indexOf('templates'));    
	var templates = yeoman.fs.readJSON(path + 'genesis-templates.json', 'utf8');
	return templates;
}

exports.bang = function (yeoman, cb) {
	sayHello(yeoman);
	loadconfig(yeoman);
	cb(yeoman.data);
	var templates = loadTemplates(yeoman);
	console.log("Data:\n" + JSON.stringify(yeoman.data));
	/*
	wf.template(yeoman, templates);
	yeoman.log("\nData:\n" + JSON.stringify(yeoman.data));
	console.log("where I am I? " + yeoman.sourceRoot());
	*/
}
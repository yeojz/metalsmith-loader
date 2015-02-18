var path = require('path');
var findup = require('findup-sync');
var multimatch = require('multimatch');


/*
 *  Main Plugin Loader
 *  @param {object} options
 *  @return {mixed} Empty String or Object depending on opt.global
 */
var Plugins = function(opts){

  // Require List
  this.requires = {};

  // Optiops
  this.options = opts || {};

  // Module Folder
  this.options.moduleLocation = this.options.moduleLocation || 'node_modules';

  // Pattern Defaults
  this.options.pattern = this.arrayify(this.options.pattern || 'metalsmith-*');

  // For multimatch
  this.match = this.options.pattern.slice(0);
  this.match.push('!metalsmith', '!metalsmith-loader');

  // Pacakage.json or config file
  this.pkg = this.options.config || findup('package.json');

  if (typeof this.pkg === 'string') {
    this.pkg = require(path.resolve(this.pkg));
  }

  // Key Scope
  this.options.scope = this.arrayify(this.options.scope || ['dependencies', 'devDependencies', 'peerDependencies']);

  // Module Name list
  this.names = [];

  // Reduce + Match
  this.listReduce();
  this.listMatch();

  // Return
  return (this.options.global) ? '' : this.requires;
};


/**
 *  Match and add into require list
 */
Plugins.prototype.listMatch = function(){
 
  // Start the match
  multimatch(this.names, this.match).forEach(function(key){

    var name = this.formatName(key);
    var mod = path.resolve(this.options.moduleLocation, key);
    this.add(name, require(mod));

  }.bind(this));

  // When lazy, loads metalsmith in as well.
  if (this.options.core){
    var mod = path.resolve(this.options.moduleLocation, 'metalsmith');
    this.add('Metalsmith', require(mod));
  }  
};


/**
 *  Reducing List to the scope
 */
Plugins.prototype.listReduce = function(){

  this.names = this.options.scope.reduce(function(prev, current) {
    var deps = this.pkg[current] || [];
    return prev.concat(Array.isArray(deps) ? deps : Object.keys(deps));

  }.bind(this), []);
};


/**
 *  if item is no array, put it in an array
 *  Adopted from `load-grunt-task`
 *  @param {mixed} elem
 *  @return {Array}
 */
Plugins.prototype.arrayify = function(elem){
  return Array.isArray(elem) ? elem : [elem];
};


/**
 *  Adds in the required function to the list.
 *  @param {string} name of plugin
 *  @param {function} exported module
 */
Plugins.prototype.add = function(name, func){

  if (this.options.global){
    global[name] = func;
  } else {
    this.requires[name] = func;
  }
};


/**
 *  Formats the name to be variable friendly
 *  @param {string} name of plugin
 */
Plugins.prototype.formatName = function(str){
  var pattern = this.options.pattern;

  // Removes the prefix pattern
  for (var i in pattern){
    if (pattern.hasOwnProperty(i)){
      var regex = new RegExp(pattern[i]);
      str = str.replace(regex, '');
    }
  }

  // CamelCase
  return str.replace(/-(\w)/g, function(){
    return arguments[1].toUpperCase();
  });
};


/**
 *  Exposes and runs the Plugin Loader
 */
module.exports = function(opt){
  return new Plugins(opt);
};

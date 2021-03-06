# metalsmith-loader

[![Greenkeeper badge](https://badges.greenkeeper.io/yeojz/metalsmith-loader.svg)](https://greenkeeper.io/)
> Loads Metalsmith as well as multiple metalsmith plugins using globbing patterns

[![npm](https://img.shields.io/npm/v/metalsmith-loader.svg)](https://www.npmjs.com/package/metalsmith-loader)
[![Build Status](https://img.shields.io/travis/yeojz/metalsmith-loader.svg)](https://travis-ci.org/yeojz/metalsmith-loader)
[![Code Climate](https://img.shields.io/codeclimate/github/yeojz/metalsmith-loader.svg)](https://codeclimate.com/github/yeojz/metalsmith-loader)

This plugin takes reference from / works similarly to [`load-grunt-task`](https://npmjs.org/package/load-grunt-tasks), allowing you to read the `dependencies`/`devDependencies`/`peerDependencies` in your package.json and load [metalsmith](http://metalsmith.io) plugins that matches the provided patterns.

Usually you would have to load each plugin one by one, which is unnecessarily cumbersome.

That aside, it also gives an option to load metalsmith library itself. 

#### Before

```js
var Metalsmith = require('metalsmith');
var drafts = require('metalsmith-drafts');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
```

#### After

```js
require('metalsmith-loader')();
```


## Install

Install with [npm](https://npmjs.org/package/metalsmith-loader): `npm install --save-dev metalsmith-loader`

Simplest use case:

```js
var config = require('metalsmith-loader')();

Metalsmith(__dirname).use(config.collections());
```

or if you want it global:

```js
require('metalsmith-loader')({global: true);

Metalsmith(__dirname).use(collections());
```


To specify additional options:

```js
require('metalsmith-loader')({
  core: true,
	pattern: 'metalsmith-*',
	config: '../package.json',
	scope: 'devDependencies',
	global: true
});
```


### Options

#### `core` (optional)
Type: `boolean` 
Default: `false`

Determines if metalsmith should be loaded.

#### `pattern` (optional) 
Type: `String|Object`	
Default: `metalsmith-*`

By default `metalsmith-*` will be used as the [globbing pattern](https://github.com/isaacs/minimatch).

#### `config` (optional) 

Type: `String|Object`  
Default: Path to nearest package.json

#### `scope` (optional) 

Type: `String|Array`  
Default: `['dependencies', 'devDependencies', 'peerDependencies']`

#### `global` (optional) 

Type: `boolean`
Default: false

Determines if plugin should require modules into the global variable environment or put the modules into a return object / dictionary.


## Other Links
- [`License`](/LICENSE)

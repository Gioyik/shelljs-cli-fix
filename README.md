# shelljs-cli-fix
An extension for ShellJS that makes it easy to find and execute Node.js CLIs.

I had to write many scripts for different users that used different operating systems. It was a pain try to build global scripts or try to import them to every operating system. Then I met [ShellJS](http://shelljs.org).

## Use
Node binaries are specified in `package.json`, this module look up the location of the runtime file and get the path making easier execute the bin from a module:

```js
var cli = require("shelljs-cli-fix");

cli.exec("lint", "file.js");
```

You can pass in as many string arguments as you'd like, and they will automatically be concatenated together with a space in between, such as:

```js
var cli = require("shelljs-cli-fix");

cli.exec("lint", "-f compact", "file.js");
```

You can use callbacks with `exec()` from this module as same you did with `exec()` from `ShellJS`:

```js
var cli = require("shelljs-cli-fix");

var v = cli.exec('lint', '-v', {silent:true}).output;

var child = cli.exec('some_long_running_process', {async:true});
child.stdout.on('data', function(data) {
    /* ... something here ... */
});

cli.exec('some_long_running_process', function(code, output) {
    console.log('Exit code:', code);
    console.log('Program output:', output);
});
```

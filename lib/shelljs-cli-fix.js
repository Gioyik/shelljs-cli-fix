"use strict";

require("shelljs/global");

var path = require("path"),
    fs = require("fs");

function getPackage(name, root) {
    var packagePath = path.join(root || "", "node_modules", name, "package.json");
    return test("-f", packagePath) ? JSON.parse(fs.readFileSync(packagePath, "utf8")) : null;
}

module.exports = {
    getPath: function(name, root) {

        var pkg = getPackage(name, root || "");

        if (pkg) {
            if (pkg.bin && pkg.bin[name]) {
                return "node " + path.join(root || "", "node_modules", name, pkg.bin[name]).replace(/\\/g, "/");
            }
        } else if (which(name)) {
            return name;
        }

        return "";
    },

    exec: function(name) {
        var cliPath = this.getPath(name),
            cmd = [cliPath],
            args = [],
            i = 1,
            len = arguments.length;

        if (cliPath) {
            while (i < len && (typeof arguments[i] === "string")) {
                cmd.push(arguments[i]);
                i++;
            }

            args.push(cmd.join(" "));

            while (i < len) {
                args.push(arguments[i]);
                i++;
            }

            return exec.apply(null, args);
        } else {
            throw new Error("Couldn't find " + name + ".");
        }

    }

};

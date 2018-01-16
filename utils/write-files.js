'use strict';

module.exports = {
    template:   template
};

function template(that, templates) {
    var globals = templates.globals;
    templates.files.forEach(function (t) {
        var replacementKey = t["config-key"];
        t.files.forEach(function(f){
            var paths = getPaths(that, f, t, globals);
            if (paths.copy) {
                copyFile(that, paths)
            } else {
                templateFile(that, paths);
            }
        });
    });
}

function copyFile(that, paths) {
    that.fs.copy(
        that.templatePath(paths.fromPath),
        that.destinationPath(paths.toPath)
    );
}
function templateFile(that, paths) {
    that.fs.copyTpl(
        that.templatePath(paths.fromPath),
        that.destinationPath(paths.toPath),
        that.data
    );
}

function getPaths(that, f, t, globals) {
    return {
        fromPath: getFromPath(f, t),
        toPath: getToPath(that, f, t, globals),
        copy: f.copy
    };
}
function getFromPath(f, t) {
    return getFolderPath(t) + f.name;
}
function getFolderPath(t) {
    var folderPath = "";
    if (t["folder-path"]) {
        folderPath = t["folder-path"];
        if (!folderPath.endsWith("/")) {
            folderPath += "/";
        }
    }
    return folderPath;
}

function getToPath(that, f, t, globals) {

    var toPath = getFolderPath(t) + getFileName(f);
    if (!globals["config-keys"]){
        return toPath;
    }
    globals["config-keys"].forEach(function(g){
        var replacementKey = g["config-key"];
        if (toPath.indexOf(replacementKey) > -1){
            toPath = 
        toPath.substring(0, toPath.indexOf(replacementKey)) +
            that.data[replacementKey] +
            toPath.substring(toPath.indexOf(replacementKey) + replacementKey.length);
        }
    });
    return toPath;
}
function getFileName(f) {
    if (f.override) {
        return f.override;
    } else if (f.name.indexOf("_") > -1){ 
        return f.name.substring(0, f.name.indexOf("_")) + f.name.substring(f.name.indexOf("_") + 1);
    }
    return f.name;
}

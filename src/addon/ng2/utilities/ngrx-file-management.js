var Promise = require('../../../../ember-cli/lib/ext/promise');
var path = require('path');
var fs = require('fs-extra');
var existsSync = require('exists-sync');

module.exports = {
    insertIntoModuleImport,
    insertIntoBootstrap
};

function insertIntoModuleImport(blueprint, pathRelativeToProjectRoot, contentsToInsert, modulePath) {
    var pattern             = `import\\s+{\\s*(.*?)\\s*}\\s+from\\s+'${modulePath}';`;
    var matchPattern        = `import\\s+{.*,?${contentsToInsert}\\s*}\\s+from\\s+.*;`;
    var substitutionPattern = `import { $1, ${contentsToInsert} } from '${modulePath}';`;

    return insertIntoFile(
        blueprint,
        pathRelativeToProjectRoot,
        {
            capturePattern      : pattern,
            matchPattern        : matchPattern,
            substitutionPattern : substitutionPattern
        }
    );
};

function insertIntoBootstrap(blueprint, pathRelativeToProjectRoot, contentsToInsert) {
    var pattern             = `bootstrap\\s*\\(\\s*(.*?)(?:,\\s*\\[\\s*(.*?)\\s*\\]\\s*)?\\s*\\);`;
    var matchPattern        = `bootstrap\\s*\\(\\s*.*?,\\s*\\[.*${contentsToInsert}.*\\]\\s*\\);`;
    var substitutionPattern = `bootstrap($1, [
    ${contentsToInsert},
    $2
]);`;

    return insertIntoFile(
        blueprint,
        pathRelativeToProjectRoot,
        {
            capturePattern      : pattern,
            matchPattern        : matchPattern,
            substitutionPattern : substitutionPattern
        }
    );
};

function insertIntoFile(blueprint, pathRelativeToProjectRoot, insertOptions) {
    var fullPath            = path.join(blueprint.project.root, pathRelativeToProjectRoot);
    var capturePattern      = new RegExp(insertOptions.capturePattern, 'i')
    var matchPattern        = new RegExp(insertOptions.matchPattern, 'i');
    var substitutionPattern = insertOptions.substitutionPattern;
    var originalContents    = '';
    
    if (existsSync(fullPath)) {
        originalContents = fs.readFileSync(fullPath, { encoding: 'utf8' });
    }

    var contentsToWrite = originalContents;
    var alreadyPresent = originalContents.search(matchPattern) != -1;

    if (!alreadyPresent) {
        contentsToWrite = contentsToWrite.replace(capturePattern, substitutionPattern);
    }

    var returnValue = {
        path: fullPath,
        originalContents: originalContents,
        contents: contentsToWrite,
        inserted: false
    };

    if (contentsToWrite !== originalContents) {
        returnValue.inserted = true;
        fs.writeFileSync(fullPath, contentsToWrite);
    }

    return Promise.resolve(returnValue);
}
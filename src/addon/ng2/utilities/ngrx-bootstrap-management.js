var EOL = require('os').EOL;
var EOF = require('os').EOF;
var fileMgmt = require('./ngrx-file-management');

module.exports = {
  addModuleImport,
  addModuleMemberImport,
  addStoreProvider
};

/**
 * Adds an import statement to main.ts
 */
function addModuleImport(blueprint, bootstrapFile, importStatement) {
  return blueprint.insertIntoFile(
    bootstrapFile,
    `${importStatement}${EOL}`,
    { before: 'if (environment.production) {' }
  ); 
}

/**
 * Adds an import statement to main.ts
 */
function addModuleMemberImport(blueprint, relativePathToFile, members, modulePath) {       
  return fileMgmt.insertIntoModuleImport(
    blueprint,
    relativePathToFile,
    members.join(', '),
    modulePath
  ); 
}

/**
 * Adds an import statement to main.ts
 */
function addStoreProvider(blueprint, relativePathToBootstrapFile) {
  return fileMgmt.insertIntoBootstrap(
    blueprint,
    relativePathToBootstrapFile,
    `provideStore(AppReducer, AppStoreInitialState)`
  ); 
}
  
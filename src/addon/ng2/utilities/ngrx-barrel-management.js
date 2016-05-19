var path = require('path');
var EOL = require('os').EOL;
var fs = require('fs');

module.exports = {
  addBarrelRegistration,
  addBarrelConfig
};

/**
 * Add generated file to barrel file and 
 * ensures that chain of parent barrels exist 
 */
function addBarrelRegistration(blueprint, installationDir, fileName) {
  
  var promise;
  var parts = installationDir.split(path.sep);
  
  for (var index=parts.length; index > 1; index--) {    
    var importFolder = parts.slice(0, index).join(path.sep);    
    var barrelFile = '.'+path.sep +path.join(importFolder, 'index.ts');
    
    // Check if barrel file already exists, if not create it
    ensureBarrelFileExists(barrelFile);
    
    var importFileName = index === parts.length
                      ? fileName
                      : parts[(index)]
    
    var importFrom = './' + importFileName;
    
    // Add export to index.ts
    if (!promise) {
      promise = insertBarrel(blueprint, barrelFile, `export * from '${importFrom}';${EOL}`);
    } else {
      promise = promise.then(
        insertBarrel(blueprint, barrelFile, `export * from '${importFrom}';${EOL}`)
      );
    }
  }
  
  return promise;  
}

/**
 * Adds barrel url to system-config.js, ensure chain of parents are included
 */
function addBarrelConfig(blueprint, configFile, installationDir) {
  var promise;
  
  var parts = installationDir.split(path.sep);
  
  for (var index=1; index < parts.length; index++) { 
    var barrelUrl = parts.slice(1, index+1).join('/');
    
    if (!promise) {
      promise = insertBarrelIntoConfig(blueprint, configFile, barrelUrl);
    } else {
      promise = promise.then(
        insertBarrelIntoConfig(blueprint, configFile, barrelUrl)
      );
    }
  }
  
  return promise;
}

/**
 * Ensures that the barrel file exists at specified location
 */
function ensureBarrelFileExists(fileName) {
  if(!fs.existsSync(fileName)) {
    console.log(`Barrel file does not exist at '${fileName}', creating one now!`);
    fs.writeFileSync(fileName,'');  
  }
  
  return true;
}

/**
 * Adds a barrel location to the system-config.js file
 */
function insertBarrelIntoConfig(blueprint, configFile, barrelUrl) {
  return blueprint.insertIntoFile(
    configFile,
    `  '${barrelUrl}',`,
    { before: '  /** @cli-barrel */' }
  );
}

/**
 * Adds a barrel location to a index.ts
 */
function insertBarrel(blueprint, barrelFile, exportPath) {
  return blueprint.insertIntoFile(barrelFile, exportPath);
}

    
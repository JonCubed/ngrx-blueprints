const stringUtils = require('ember-cli-string-utils');
var dynamicPathParser = require('../../utilities/dynamic-path-parser');
var barrelMgmt = require('../../utilities/ngrx-barrel-management');
var path = require('path');

module.exports = {
  description: '',
    
  normalizeEntityName: function (entityName) {
    var app = 'app';
    this.dynamicPath = path.join(this.project.ngConfig.defaults.sourceDir, app, 'shared');
    return app;
  },

  locals: function (options) {
    this.fileName = stringUtils.dasherize(options.entity.name);

    return { 
      dynamicPath: this.dynamicPath,
      flat: options.flat,
      fileName: this.fileName
    };
  },

  fileMapTokens: function () {
    // Return custom template variables here.
    return {
      __path__: () => {
        this.generatePath = this.dynamicPath;
        return this.generatePath;
      },
      __name__: () => {
        return this.fileName;
      }
    };
  },
  
  afterInstall: function() {
    var filePath = path.join(this.project.ngConfig.defaults.sourceDir, 'system-config.ts');

    return barrelMgmt.addBarrelRegistration(
      this, 
      this.generatePath,
      this.fileName+'.store')
    .then(barrelMgmt.addBarrelRegistration(
      this, 
      this.generatePath,
      this.fileName+'.reducer'))
    .then(barrelMgmt.addBarrelConfig(this, filePath, this.generatePath));
  }
}

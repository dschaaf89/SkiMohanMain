class EnforceDevtoolPlugin {
    constructor(devtool) {
      this.devtool = devtool;
    }
  
    apply(compiler) {
      compiler.hooks.beforeCompile.tap('EnforceDevtoolPlugin', () => {
        compiler.options.devtool = this.devtool;
      });
    }
  }
  
  module.exports = EnforceDevtoolPlugin;
  
module.exports = {
  css: {
    requireModuleExtension: false,
    loaderOptions: {
      css: {
        modules: true,
        import (parsedImport, resourcePath) {
          console.log(resourcePath)
          return true
        }
      },
    }
  },
  configureWebpack: {
    optimization: {
      minimize: false
    }
  }
}
const babelPluginVueCssModules = require('../../dist').default;

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [
    [babelPluginVueCssModules, {
      cssFile: ['css', 'scss', 'less'],
      styleName: 'classname',
      exclude: (path) => {
        if (/^[^\.]/gi.test(path)) {
          return true;
        }

        if (/reset\.css$/gi.test(path)) {
          return true;
        }

        return false;
      },
      removeImport: true
    }]
  ]
}

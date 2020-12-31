# babel-plugin-vue-css-modules
babel-plugin-vue-css-modules

# 两种形式
1. template
  template 编译成 render。
  * <style module>  => this.$style 可能为{} or undefined，文件.vue
  * import style    => style 值为{}，文件可能.js, .ts, .vue
  统一合成 $style = {...this.$style, ...style}
  classname => class

2. jsx
  * <style module>  => this.$style 可能为{} or undefined，文件.vue
  * import style    => style 值为{}，文件可能.js, .ts, .vue
  统一合成 $style = {...this.$style, ...style}
  classname => class

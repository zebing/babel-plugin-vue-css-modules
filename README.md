# @zebing/babel-plugin-vue-css-modules
@zebing/babel-plugin-vue-css-modules 是一个vue css modules智能转化插件。让你在使用vue css modules的同时，无需通过`:class="$style.cssname"`, `class={styles.cssname}`等繁琐的方式调用，而是直接 `class="cssname"`, `class="cssname"`简单调用，极大的减小工作量，增加开发效率。

> 目前暂不支持 vue2.0 的template方式。仅支持vue3.0和vue2.0的jsx方式

### 如何使用?
**安装**
```
npm install @zebing/babel-plugin-vue-css-modules --save-dev
```
**使用**

在```.babelrc``` 配置文件中加入配置
```
{
  "plugins": ["@zebing/babel-plugin-vue-css-modules"]
}
```

**options**
### Options

|Name|Type|Description|Default|
|---|---|---|---|
|`cssFile`|`array`| css文件类型，不满足为文件将被过滤 |`['css', 'scss', 'less']`|
|`styleName`|`string`| class名称，插件会寻找该名称自动进行转换 |`class`|
|`exclude`|`RegExp|function`| 不包含的文件，用户和根据自己的需要进行过滤 |`/^[^\.]/gi`|
|`removeImport`|`boolean`| 是否删除匹配到的import节点 |`true`|

### 代码中使用
> 通过 import 引入 css文件，务必在路径中保留文件名后缀， 如 `import './styles.css'`

**jsx写法**
```
import './styles.css';

export default {
  return (
    <div class="classname"> hello world</div>
  );
}
```
将会自动转换成
```
import styles from './styles.css';

export default {
  return (
    <div class={styles.classname}> hello world</div>
  );
}
```

**template写法**
```
<template>
  <div class="classname"> hello world</div>
</template>
<script>
import './styles.css';
</script>
<style module>
...
<style>
```
将会自动转换成
```
// 注，此处便于理解，实际已转化成js代码，而非template模板
<template>
  <div :class="$style.classname"> hello world</div>
</template>
<script>
import './styles.css';

export default {

}
</script>
<style module>
...
<style>
```

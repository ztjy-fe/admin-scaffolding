// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  // 指定eslint解析器，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
  parserOptions: {
    parser: 'babel-eslint'
  },
  // 指定环境的全局变量，下面的配置指定为浏览器环境
  env: {
    browser: true,
  },
  // 配置标准的js风格
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // 详细说明：https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md
    'standard'
  ],
  // 规范 *.vue 文件
  plugins: [
    'vue'
  ],
    // 下面这些rules是用来设置从插件来的规范代码的规则
    // 主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
    // "off" -> 0 关闭规则
    // "warn" -> 1 开启警告规则
    // "error" -> 2 开启错误规则
  rules: {
    // 允许方法之间加星号，如ES6提供的生成器函数 function * generator() {}
    'generator-star-spacing': 'off',
    // 许在开发环境下使用debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // tab 缩进
    'indent': ["error", "tab"],
    // 禁用 tab，如果你已经建立了好的使用 tab 的标准，可以不启用此规则。
    'no-tabs':"off",
    'prefer-promise-reject-errors': 'off'
  }
}

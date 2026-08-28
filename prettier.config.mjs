export default {
  // 每行最大列数（字符数），超过将自动换行
  printWidth: 80,

  // 每个缩进级别的空格数
  tabWidth: 2,

  // 是否使用 Tab 制表符代替空格缩进（false 为使用空格）
  useTabs: false,

  // 是否在语句末尾添加分号（true: 添加分号，false: 不添加）
  semi: false,

  // 是否使用单引号代替双引号（true: 单引号，false: 双引号）
  singleQuote: true,

  // 对象的 key 仅在必要时才添加引号 ('as-needed' | 'consistent' | 'preserve')
  quoteProps: 'consistent',

  // 在 JSX 中是否使用单引号而不是双引号
  jsxSingleQuote: false,

  // 多行时末尾逗号策略 ('all': 尽可能都加尾逗号 | 'none': 不加 | 'es5': 仅 ES5 有效位置添加)
  trailingComma: 'all',

  // 对象大括号内前后是否保留空格，如 { foo: bar }（true: 保留空格，false: {foo: bar}）
  bracketSpacing: true,

  // 多行 HTML / JSX / Vue 模板中，将标签闭合的 > 放在最后一行的末尾，而不是单独占一行
  bracketSameLine: false,

  // 箭头函数单一参数时是否省略括号 ('always': 始终保留 (x) => x | 'avoid': 省略 x => x)
  arrowParens: 'avoid',

  // Vue 单文件组件 (SFC) 中 <script> 和 <style> 标签内的代码是否进行缩进
  vueIndentScriptAndStyle: false,

  // 行尾换行符格式 ('lf' | 'crlf' | 'cr' | 'auto')
  endOfLine: 'lf',

  // HTML / Vue 模板中是否强制每个属性独占一行
  singleAttributePerLine: false,
}

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 强制在 function的左括号之前使用一致的空格
    'space-before-function-paren': 0, // 函数后面的括号
    indent: ['off', 2], // 预期缩进2个空格，但发现4个严格的检查缩进问题
    // 引号类型
    quotes: [0, 'single'],
    // 'no-tabs': 'off',
    // 后面没有空位，There should be no space after this paren
    'space-in-parens': 0,
    // 驼峰
    camelcase: ['error', { allow: ['ret_code'] }]
  }
}

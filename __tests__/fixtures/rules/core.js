/**
 * Violating snippets for the core ESLint rules that this package configures itself, i.e. rules that are
 * not already covered by `@eslint/js` recommended (which ESLint tests upstream).
 *
 * `no-var`, `prefer-const`, `prefer-rest-params` and `prefer-spread` are only enabled for TypeScript files, through
 * the `typescript-eslint` recommended config, so their fixtures are `.ts` files.
 */
module.exports = {
  camelcase: {
    file: 'case.js',
    code: 'const my_variable = 1;\nexport default my_variable;\n',
  },
  'default-param-last': {
    file: 'case.js',
    code: 'export function f(a = 1, b) {\n  return [a, b];\n}\n',
  },
  'max-len': {
    file: 'case.js',
    code: `const total = ${Array(40).fill('1').join(' + ')};\nexport default total;\n`,
  },
  'no-alert': {
    file: 'case.js',
    code: "alert('hello');\n",
  },
  'no-console': {
    file: 'case.js',
    code: "console.log('hello');\n",
  },
  'no-param-reassign': {
    file: 'case.js',
    code: 'export function f(a) {\n  a = 1;\n  return a;\n}\n',
  },
  'no-underscore-dangle': {
    file: 'case.js',
    code: 'const _hidden = 1;\nexport default _hidden;\n',
  },
  'no-var': {
    file: 'case.ts',
    code: 'var a = 1;\nexport default a;\n',
  },
  'prefer-const': {
    file: 'case.ts',
    code: 'let a = 1;\nexport default a;\n',
  },
  'prefer-rest-params': {
    file: 'case.ts',
    code: 'export function f() {\n  return arguments[0];\n}\n',
  },
  'prefer-spread': {
    file: 'case.ts',
    code: 'export function f(list) {\n  return Math.max.apply(Math, list);\n}\n',
  },
};

/**
 * Violating snippets for the `@typescript-eslint/*` rules enabled by `typescript.js`.
 * None of these rules need type information, which consumers do not configure.
 */
const rule = (code, file = 'case.ts') => ({ code, file });

module.exports = {
  '@typescript-eslint/ban-ts-comment': rule("// @ts-ignore\nexport const a: number = 'x';\n"),
  '@typescript-eslint/no-array-constructor': rule('export const a = new Array(1, 2, 3);\n'),
  '@typescript-eslint/no-duplicate-enum-values': rule('export enum E {\n  A = 1,\n  B = 1,\n}\n'),
  '@typescript-eslint/no-empty-object-type': rule('export type T = {};\n'),
  '@typescript-eslint/no-explicit-any': rule('export const a: any = 1;\n'),
  '@typescript-eslint/no-extra-non-null-assertion': rule(
    'declare const foo: { bar: number } | undefined;\nexport const x = foo!!.bar;\n',
  ),
  '@typescript-eslint/no-misused-new': rule('export interface I {\n  new (): I;\n}\n'),
  '@typescript-eslint/no-namespace': rule('namespace N {\n  export const a = 1;\n}\n'),
  '@typescript-eslint/no-non-null-asserted-optional-chain': rule(
    'declare const foo: { bar: number } | undefined;\nexport const x = foo?.bar!;\n',
  ),
  '@typescript-eslint/no-require-imports': rule("const a = require('./modules/exports');\nexport default a;\n"),
  '@typescript-eslint/no-shadow': rule(
    'export const a = 1;\nexport function f() {\n  const a = 2;\n  return a;\n}\n',
  ),
  '@typescript-eslint/no-this-alias': rule('export class C {\n  m() {\n    const self = this;\n    return self;\n  }\n}\n'),
  '@typescript-eslint/no-unnecessary-type-constraint': rule(
    'export function f<T extends unknown>(a: T) {\n  return a;\n}\n',
  ),
  '@typescript-eslint/no-unsafe-declaration-merging': rule(
    'export interface Foo {}\nexport class Foo {}\n',
  ),
  '@typescript-eslint/no-unsafe-function-type': rule('export let f: Function;\n'),
  '@typescript-eslint/no-unused-expressions': rule("'a' + 'b';\n"),
  '@typescript-eslint/no-unused-vars': rule('const unused = 1;\n'),
  '@typescript-eslint/no-use-before-define': rule('export const a = b;\nconst b = 1;\n'),
  '@typescript-eslint/no-wrapper-object-types': rule('export let s: String;\n'),
  '@typescript-eslint/prefer-as-const': rule("export let foo = 'bar' as 'bar';\n"),
  '@typescript-eslint/prefer-namespace-keyword': rule('module Foo {\n  export const a = 1;\n}\n'),
  '@typescript-eslint/triple-slash-reference': rule('/// <reference path="./modules/exports.js" />\nexport {};\n'),
};

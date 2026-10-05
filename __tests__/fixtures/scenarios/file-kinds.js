/**
 * How the configs treat each kind of file consumers lint: `.js`, `.jsx`, `.ts`, `.tsx`, `.d.ts` and test files.
 *
 * Each scenario is `{ name, file, code, messages }`, where `messages` is the exact, sorted list of `rule:severity`
 * the code must produce (severity 1 is a warning, 2 an error). An empty list means the code must lint clean.
 */
module.exports = [
  {
    name: 'a generic arrow function in a .ts file',
    file: 'generic.ts',
    code: 'export const identity = <T>(value: T): T => value;\n',
    messages: [],
  },
  {
    name: 'a generic arrow function in a .tsx file (needs the trailing comma)',
    file: 'generic.tsx',
    code: 'export const identity = <T,>(value: T): T => value;\n',
    messages: [],
  },
  {
    name: 'a typed component in a .tsx file does not need prop-types',
    file: 'typed-component.tsx',
    code: [
      "import type { ReactNode } from 'react';",
      '',
      'type Props = { title: string; children?: ReactNode };',
      '',
      'export const Card = ({ title, children }: Props) => (',
      '  <section>',
      '    <h2>{title}</h2>',
      '    {children}',
      '  </section>',
      ');',
      '',
    ].join('\n'),
    messages: [],
  },
  {
    name: 'an untyped component in a .jsx file needs prop-types',
    file: 'untyped-component.jsx',
    code: 'export const Card = ({ title }) => <h2>{title}</h2>;\n',
    messages: ['react/prop-types:2'],
  },
  {
    name: 'ambient module declarations in a .d.ts file',
    file: 'assets.d.ts',
    code: "declare module '*.svg' {\n  const source: string;\n  export default source;\n}\n",
    messages: [],
  },
  {
    name: 'an anonymous forwardRef component needs a display name',
    file: 'anonymous.tsx',
    code: [
      "import { forwardRef } from 'react';",
      '',
      'export const Input = forwardRef<HTMLInputElement>((props, ref) => <input ref={ref} {...props} />);',
      '',
    ].join('\n'),
    messages: ['react/display-name:2'],
  },
  {
    name: 'an anonymous forwardRef component is allowed in a test file',
    file: 'anonymous.test.tsx',
    code: [
      "import { forwardRef } from 'react';",
      '',
      'export const Input = forwardRef<HTMLInputElement>((props, ref) => <input ref={ref} {...props} />);',
      '',
    ].join('\n'),
    messages: [],
  },
];

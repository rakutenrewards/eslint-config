/**
 * Violating snippets for the `eslint-plugin-react-hooks` rules enabled by `react.js`. Many of these are backed
 * by the React Compiler analysis, so the snippets are written to be unambiguous compiler violations.
 */
const hooks = (body, imports = 'useEffect, useMemo, useRef, useState') => ({
  file: 'case.jsx',
  code: `import { ${imports} } from 'react';\n\n${body}\n`,
});

module.exports = {
  'react-hooks/error-boundaries': hooks(
    'export function Component() {\n  try {\n    return <Child />;\n  } catch (error) {\n    return null;\n  }\n}',
  ),
  'react-hooks/exhaustive-deps': hooks(
    'export function Component({ value }) {\n  useEffect(() => {\n    document.title = value;\n  }, []);\n  return null;\n}',
  ),
  'react-hooks/globals': hooks(
    'let counter = 0;\n\nexport function Component() {\n  counter += 1;\n  return <div>{counter}</div>;\n}',
  ),
  'react-hooks/immutability': hooks(
    'export function Component() {\n  const [user] = useState({ name: "a" });\n  user.name = "b";\n  return <div>{user.name}</div>;\n}',
  ),
  'react-hooks/incompatible-library': {
    file: 'case.jsx',
    code: "import { useForm } from 'react-hook-form';\n\nexport function Component() {\n  const { watch } = useForm();\n  const value = watch('name');\n  return <div>{value}</div>;\n}\n",
  },
  // with eslint-plugin-react-hooks 7.1 mismatched dependencies are reported by `exhaustive-deps`, and no minimal
  // snippet was found that makes the compiler report this rule, so it is only required to run without crashing
  'react-hooks/preserve-manual-memoization': {
    ...hooks(
      'export function Component({ data }) {\n  const value = useMemo(() => data.filter(Boolean), [data]);\n  return <div>{value.length}</div>;\n}',
    ),
    smoke: 'no minimal snippet is known to trigger it',
  },
  'react-hooks/purity': hooks('export function Component() {\n  const value = Math.random();\n  return <div>{value}</div>;\n}'),
  'react-hooks/refs': hooks(
    'export function Component() {\n  const ref = useRef(null);\n  return <div>{ref.current}</div>;\n}',
  ),
  'react-hooks/rules-of-hooks': hooks(
    'export function Component({ enabled }) {\n  if (enabled) {\n    useState(0);\n  }\n  return null;\n}',
  ),
  'react-hooks/set-state-in-effect': hooks(
    'export function Component({ value }) {\n  const [state, setState] = useState(0);\n  useEffect(() => {\n    setState(value);\n  }, [value]);\n  return <div>{state}</div>;\n}',
  ),
  'react-hooks/set-state-in-render': hooks(
    'export function Component() {\n  const [state, setState] = useState(0);\n  setState(1);\n  return <div>{state}</div>;\n}',
  ),
  'react-hooks/static-components': hooks(
    'export function Component() {\n  const Inner = () => <div />;\n  return <Inner />;\n}',
  ),
  'react-hooks/unsupported-syntax': hooks(
    "export function Component() {\n  const value = eval('1 + 1');\n  return <div>{value}</div>;\n}",
  ),
  'react-hooks/use-memo': hooks(
    'export function Component({ a }) {\n  const value = useMemo((x) => a + x, [a]);\n  return <div>{value}</div>;\n}',
  ),
  // these validate compiler directives/configuration rather than component code
  'react-hooks/config': {
    file: 'case.jsx',
    smoke: 'validates React Compiler configuration directives',
    code: '// @compilationMode:"invalid-mode"\nexport function Component() {\n  return <div />;\n}\n',
  },
  'react-hooks/gating': {
    file: 'case.jsx',
    smoke: 'validates React Compiler gating directives',
    code: '// @gating\nexport function Component() {\n  return <div />;\n}\n',
  },
};

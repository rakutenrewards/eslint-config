/**
 * Violating snippets for the `eslint-plugin-react` rules enabled by `react.js`.
 */
const jsx = (body) => ({ file: 'case.jsx', code: `import React from 'react';\nimport ReactDOM from 'react-dom';\n\n${body}\n` });
const component = (element) => jsx(`export const Component = () => (\n  ${element}\n);`);

module.exports = {
  'react/display-name': jsx('export const Component = React.memo(function () {\n  return <div />;\n});'),
  'react/jsx-key': component('<ul>{[1, 2].map((n) => <li>{n}</li>)}</ul>'),
  'react/jsx-no-comment-textnodes': component('<div>// not a comment</div>'),
  'react/jsx-no-duplicate-props': component('<div id="a" id="b" />'),
  'react/jsx-no-target-blank': component('<a href="https://example.com" target="_blank">link</a>'),
  'react/jsx-no-undef': component('<Missing />'),
  // marks JSX-only variables as used; it never reports, so the fixture only proves the rule loads and runs
  'react/jsx-uses-vars': {
    ...component('<Used />'),
    smoke: 'marker rule that never reports',
    code: "import Used from './modules/exports';\n\nexport const Component = () => <Used />;\n",
  },
  'react/no-array-index-key': component('<ul>{[1, 2].map((n, i) => <li key={i}>{n}</li>)}</ul>'),
  'react/no-children-prop': component('<Wrapper children="text" />'),
  'react/no-danger': component('<div dangerouslySetInnerHTML={{ __html: "<b>x</b>" }} />'),
  'react/no-danger-with-children': component('<div dangerouslySetInnerHTML={{ __html: "x" }}>child</div>'),
  'react/no-deprecated': jsx('ReactDOM.render(<div />, document.body);'),
  'react/no-direct-mutation-state': jsx(
    'export class Component extends React.Component {\n  update() {\n    this.state.value = 1;\n  }\n\n  render() {\n    return null;\n  }\n}',
  ),
  'react/no-find-dom-node': jsx('export const node = ReactDOM.findDOMNode(document.body);'),
  'react/no-is-mounted': jsx(
    'export class Component extends React.Component {\n  check() {\n    return this.isMounted();\n  }\n\n  render() {\n    return null;\n  }\n}',
  ),
  'react/no-render-return-value': jsx('export const instance = ReactDOM.render(<div />, document.body);'),
  'react/no-string-refs': component('<div ref="legacy" />'),
  'react/no-unescaped-entities': component("<div>it's broken</div>"),
  'react/no-unknown-property': component('<div class="legacy" />'),
  'react/prop-types': jsx('export const Component = ({ name }) => <div>{name}</div>;'),
  'react/require-render-return': jsx(
    'export class Component extends React.Component {\n  render() {\n    // no return\n  }\n}',
  ),
};

/**
 * Violating snippets for the React rules enabled by `react.js`. Most keep their `eslint-plugin-react` ids (`react/...`),
 * which are provided on top of `@eslint-react`; the deprecated-API rules use their `@eslint-react/...` ids.
 */
const jsx = (body) => ({ file: 'case.jsx', code: `import React from 'react';\nimport ReactDOM from 'react-dom';\n\n${body}\n` });
const component = (element) => jsx(`export const Component = () => (\n  ${element}\n);`);
const classComponent = (method) =>
  jsx(`export class Component extends React.Component {\n  ${method}\n\n  render() {\n    return null;\n  }\n}`);

module.exports = {
  'react/display-name': jsx('export const Component = React.memo(function () {\n  return <div />;\n});'),
  'react/jsx-key': component('<ul>{[1, 2].map((n) => <li>{n}</li>)}</ul>'),
  'react/jsx-no-comment-textnodes': component('<div>// not a comment</div>'),
  'react/jsx-no-target-blank': component('<a href="https://example.com" target="_blank">link</a>'),
  'react/no-array-index-key': component('<ul>{[1, 2].map((n, i) => <li key={i}>{n}</li>)}</ul>'),
  'react/no-children-prop': component('<Wrapper children="text" />'),
  'react/no-danger': component('<div dangerouslySetInnerHTML={{ __html: "<b>x</b>" }} />'),
  'react/no-danger-with-children': component('<div dangerouslySetInnerHTML={{ __html: "x" }}>child</div>'),
  'react/no-direct-mutation-state': classComponent('update() {\n    this.state.value = 1;\n  }'),
  'react/no-find-dom-node': jsx('export const node = ReactDOM.findDOMNode(document.body);'),
  'react/no-render-return-value': jsx('export const instance = ReactDOM.render(<div />, document.body);'),
  'react/no-unknown-property': component('<div class="legacy" />'),

  // deprecated APIs, which `react/no-deprecated` used to cover
  '@eslint-react/dom-no-render': jsx('ReactDOM.render(<div />, document.body);'),
  '@eslint-react/dom-no-hydrate': jsx('ReactDOM.hydrate(<div />, document.body);'),
  '@eslint-react/no-component-will-mount': classComponent('componentWillMount() {}'),
  '@eslint-react/no-component-will-receive-props': classComponent('componentWillReceiveProps() {}'),
  '@eslint-react/no-component-will-update': classComponent('componentWillUpdate() {}'),
};

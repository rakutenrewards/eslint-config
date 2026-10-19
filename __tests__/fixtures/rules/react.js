/**
 * Violating snippets for the React rules enabled by `react.js`, keyed by their `@eslint-react/...` ids.
 */
const jsx = (body) => ({ file: 'case.jsx', code: `import React from 'react';\nimport ReactDOM from 'react-dom';\n\n${body}\n` });
const component = (element) => jsx(`export const Component = () => (\n  ${element}\n);`);
const classComponent = (method) =>
  jsx(`export class Component extends React.Component {\n  ${method}\n\n  render() {\n    return null;\n  }\n}`);

module.exports = {
  '@eslint-react/no-missing-component-display-name': jsx('export const Component = React.memo(function () {\n  return <div />;\n});'),
  '@eslint-react/no-missing-key': component('<ul>{[1, 2].map((n) => <li>{n}</li>)}</ul>'),
  '@eslint-react/jsx-no-comment-textnodes': component('<div>// not a comment</div>'),
  '@eslint-react/dom-no-unsafe-target-blank': component('<a href="https://example.com" target="_blank">link</a>'),
  '@eslint-react/no-array-index-key': component('<ul>{[1, 2].map((n, i) => <li key={i}>{n}</li>)}</ul>'),
  '@eslint-react/jsx-no-children-prop': component('<Wrapper children="text" />'),
  '@eslint-react/dom-no-dangerously-set-innerhtml': component('<div dangerouslySetInnerHTML={{ __html: "<b>x</b>" }} />'),
  '@eslint-react/dom-no-dangerously-set-innerhtml-with-children': component('<div dangerouslySetInnerHTML={{ __html: "x" }}>child</div>'),
  '@eslint-react/no-direct-mutation-state': classComponent('update() {\n    this.state.value = 1;\n  }'),
  '@eslint-react/dom-no-find-dom-node': jsx('export const node = ReactDOM.findDOMNode(document.body);'),
  '@eslint-react/dom-no-render-return-value': jsx('export const instance = ReactDOM.render(<div />, document.body);'),
  '@eslint-react/dom-no-unknown-property': component('<div class="legacy" />'),

  // deprecated APIs, which `react/no-deprecated` used to cover
  '@eslint-react/dom-no-render': jsx('ReactDOM.render(<div />, document.body);'),
  '@eslint-react/dom-no-hydrate': jsx('ReactDOM.hydrate(<div />, document.body);'),
  '@eslint-react/no-component-will-mount': classComponent('componentWillMount() {}'),
  '@eslint-react/no-component-will-receive-props': classComponent('componentWillReceiveProps() {}'),
  '@eslint-react/no-component-will-update': classComponent('componentWillUpdate() {}'),
};

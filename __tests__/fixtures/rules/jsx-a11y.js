/**
 * Violating snippets for the `eslint-plugin-jsx-a11y` rules enabled by `react.js`.
 */
const element = (jsx) => ({ file: 'case.jsx', code: `export const Component = () => (\n  ${jsx}\n);\n` });

module.exports = {
  'jsx-a11y/alt-text': element('<img src="a.png" />'),
  'jsx-a11y/anchor-has-content': element('<a href="/path"></a>'),
  'jsx-a11y/anchor-is-valid': element('<a href="#">link</a>'),
  'jsx-a11y/aria-activedescendant-has-tabindex': element('<div aria-activedescendant="item" />'),
  'jsx-a11y/aria-props': element('<div aria-unknown="x" />'),
  'jsx-a11y/aria-proptypes': element('<div aria-hidden="yes" />'),
  'jsx-a11y/aria-role': element('<div role="not-a-role" />'),
  'jsx-a11y/aria-unsupported-elements': element('<meta aria-hidden="true" />'),
  'jsx-a11y/autocomplete-valid': element('<input type="text" autoComplete="not-valid" />'),
  'jsx-a11y/click-events-have-key-events': element('<div onClick={() => {}} />'),
  'jsx-a11y/heading-has-content': element('<h1 />'),
  'jsx-a11y/html-has-lang': element('<html />'),
  'jsx-a11y/iframe-has-title': element('<iframe src="https://example.com" />'),
  'jsx-a11y/img-redundant-alt': element('<img src="a.png" alt="image of a cat" />'),
  'jsx-a11y/interactive-supports-focus': element('<div role="button" onClick={() => {}} />'),
  'jsx-a11y/label-has-associated-control': element('<label>text</label>'),
  'jsx-a11y/media-has-caption': element('<video src="a.mp4" />'),
  'jsx-a11y/mouse-events-have-key-events': element('<div onMouseOver={() => {}} />'),
  'jsx-a11y/no-access-key': element('<div accessKey="a" />'),
  'jsx-a11y/no-autofocus': element('<input autoFocus />'),
  'jsx-a11y/no-distracting-elements': element('<marquee />'),
  'jsx-a11y/no-interactive-element-to-noninteractive-role': element('<button role="article" />'),
  'jsx-a11y/no-noninteractive-element-interactions': element('<h1 onClick={() => {}}>title</h1>'),
  'jsx-a11y/no-noninteractive-element-to-interactive-role': element('<li role="button" />'),
  'jsx-a11y/no-noninteractive-tabindex': element('<div tabIndex="0" />'),
  'jsx-a11y/no-redundant-roles': element('<button role="button" />'),
  'jsx-a11y/no-static-element-interactions': element('<div onClick={() => {}} />'),
  'jsx-a11y/role-has-required-aria-props': element('<div role="checkbox" />'),
  'jsx-a11y/role-supports-aria-props': element('<div role="link" aria-checked="true" />'),
  'jsx-a11y/scope': element('<div scope="col" />'),
  'jsx-a11y/tabindex-no-positive': element('<div tabIndex="1" />'),
};

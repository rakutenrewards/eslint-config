/**
 * One violating snippet per rule that this package enables, keyed by rule id.
 *
 * Each entry is `{ code, file, smoke? }`:
 * - `code`  source that violates the rule
 * - `file`  file name (under `__tests__/fixtures`) the snippet is linted as, which selects the config blocks
 * - `smoke` reason the rule cannot be triggered by a simple snippet; the rule is then only required to run without
 *           crashing. Use sparingly - a rule that merely runs would not catch an API that breaks on report.
 */
module.exports = {
  ...require('./rules/core'),
  ...require('./rules/typescript-eslint'),
  ...require('./rules/import'),
  ...require('./rules/jsx-a11y'),
  ...require('./rules/react-plugin'),
  ...require('./rules/react-hooks'),
  ...require('./rules/react-effect'),
};

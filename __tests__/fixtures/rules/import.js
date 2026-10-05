/**
 * Violating snippets for the `eslint-plugin-import` rules. Relative imports resolve against the real files in
 * `__tests__/fixtures/modules`.
 *
 * `import/order` only crashes on some ESLint majors when it has to *report* a violation, so the fixture must
 * contain a genuine ordering violation rather than already-ordered imports.
 */
const rule = (code, file = 'case.js') => ({ code, file });

module.exports = {
  'import/default': rule("import gamma from './modules/named-only';\nexport default gamma;\n"),
  'import/export': rule("export * from './modules/exports';\nexport * from './modules/exports-duplicate';\n"),
  'import/namespace': rule("import * as ns from './modules/exports';\nexport default ns.doesNotExist;\n"),
  'import/no-duplicates': rule(
    "import { alpha } from './modules/exports';\nimport beta from './modules/exports';\nexport { alpha, beta };\n",
  ),
  'import/no-named-as-default': rule("import alpha from './modules/exports';\nexport default alpha;\n"),
  'import/no-named-as-default-member': rule(
    "import beta from './modules/exports';\nexport const value = beta.alpha;\n",
  ),
  'import/no-unresolved': rule("import missing from './modules/does-not-exist';\nexport default missing;\n"),
  'import/order': rule("import beta from './modules/exports';\nimport fs from 'fs';\nexport { beta, fs };\n"),
};

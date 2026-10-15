/**
 * `eslint-plugin-import-x`, registered under the name `import`.
 *
 * This package used to use `eslint-plugin-import`, which does not support ESLint 10. `eslint-plugin-import-x` is a
 * maintained fork with the same rules. Registering it as `import` keeps every rule id (`import/order`,
 * `import/no-extraneous-dependencies`, ...) and every `eslint-disable import/...` comment in consumers working.
 *
 * Only the rule ids and the plugin name are kept. The plugin reads its **settings** from `import-x/*` keys and ignores
 * `import/*` ones, so settings such as `import-x/resolver`, `import-x/core-modules` and `import-x/internal-regex` must
 * use the `import-x/` prefix.
 */
const importXModule = require('eslint-plugin-import-x');

const plugin = importXModule.default ?? importXModule;

const renameRules = (rules) =>
  Object.fromEntries(Object.entries(rules).map(([ruleId, setting]) => [ruleId.replace(/^import-x\//, 'import/'), setting]));

/** Registers a preset's plugin as `import` and renames its rules to match; everything else is kept as is. */
const asImport = (preset) => ({
  ...preset,
  plugins: { import: plugin },
  ...(preset.rules && { rules: renameRules(preset.rules) }),
});

const { recommended, react, typescript } = plugin.flatConfigs;

/**
 * `eslint-plugin-import` resolved TypeScript files with its `node` resolver, while `eslint-plugin-import-x` defaults to
 * the `typescript` resolver, which would require every consumer to install `eslint-import-resolver-typescript`. Consumers
 * that want it set `import-x/resolver` themselves, as the shared Next.js dev tools do.
 */
const typescriptSettings = {
  ...typescript.settings,
  'import-x/resolver': { node: { extensions: typescript.settings['import-x/extensions'] } },
};

module.exports = {
  plugin,
  flatConfigs: {
    recommended: asImport(recommended),
    react: asImport(react),
    typescript: asImport({ ...typescript, settings: typescriptSettings }),
  },
};

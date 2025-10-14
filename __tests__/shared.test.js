const baseConfig = require('../index');
const reactConfig = require('../react');
const typescriptConfig = require('../typescript');
const { OFF, WARNING, ERROR } = require('../constants');

describe('Constants', () => {
  it('should export correct values', () => {
    expect(OFF).toBe(0);
    expect(WARNING).toBe(1);
    expect(ERROR).toBe(2);
  });
});

describe('Configuration Structure', () => {
  it('should have valid Flat Config structure', () => {
    [baseConfig, reactConfig, typescriptConfig].forEach((config) => {
      expect(Array.isArray(config)).toBe(true);
      config.forEach((configItem) => {
        // Each config item should be an object
        expect(typeof configItem).toBe('object');
        expect(configItem).not.toBeNull();

        // If it has files, it should be an array
        if (configItem.files) {
          expect(Array.isArray(configItem.files)).toBe(true);
        }

        // If it has rules, it should be an object
        if (configItem.rules) {
          expect(typeof configItem.rules).toBe('object');
        }

        // If it has plugins, it should be an object
        if (configItem.plugins) {
          expect(typeof configItem.plugins).toBe('object');
        }

        // If it has languageOptions, it should be an object
        if (configItem.languageOptions) {
          expect(typeof configItem.languageOptions).toBe('object');
        }
      });
    });
  });
});

describe('Error Handling', () => {
  it('should handle missing optional dependencies gracefully', () => {
    // Test that the configs can be imported without throwing
    expect(() => {
      require('../index');
    }).not.toThrow();

    expect(() => {
      require('../react');
    }).not.toThrow();

    expect(() => {
      require('../typescript');
    }).not.toThrow();
  });

  it('should have valid rule configurations', () => {
    // Test that all rule configurations are valid
    [baseConfig, reactConfig, typescriptConfig].forEach((config) => {
      config.forEach((configItem) => {
        if (configItem.rules) {
          Object.entries(configItem.rules).forEach(([ruleName, ruleConfig]) => {
            expect(typeof ruleName).toBe('string');
            expect(ruleName.length).toBeGreaterThan(0);

            // Rule config should be either a string, number, or array
            if (Array.isArray(ruleConfig)) {
              expect(ruleConfig.length).toBeGreaterThan(0);
            } else {
              expect(['off', 'warn', 'error', 0, 1, 2]).toContain(ruleConfig);
            }
          });
        }
      });
    });
  });
});

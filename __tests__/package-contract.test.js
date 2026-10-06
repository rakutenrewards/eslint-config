const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { ROOT } = require('./helpers/lint');

/** Files consumers import, which must be published and loadable. */
const ENTRY_POINTS = ['index.js', 'react.js', 'typescript.js', 'constants.js'];

/**
 * Everything the tarball may contain. The patterns in package.json `files` are anchored to the package root (`/index.js`);
 * unanchored patterns match at any depth and would publish same-named files from subdirectories, such as examples
 * or test fixtures.
 */
const ALLOWED_FILES = [
  'package.json',
  'README.md',
  'LICENSE',
  'CHANGELOG.md',
  'eslint.config.js',
  // required by the entry points, so they must be published
  'import-plugin.js',
  'esm-plugin.js',
  'react-plugin.js',
  ...ENTRY_POINTS,
];

describe('Published package', () => {
  let packageDir;
  let workDir;

  beforeAll(() => {
    workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'eslint-config-ebates-pack-'));
    const tarball = path.join(workDir, 'package.tgz');
    execFileSync('yarn', ['pack', '--out', tarball], { cwd: ROOT, stdio: 'pipe' });
    execFileSync('tar', ['-xzf', tarball, '-C', workDir]);
    packageDir = path.join(workDir, 'package');
    // dependencies are resolved from this checkout, so the tarball itself is what is being verified
    fs.symlinkSync(path.join(ROOT, 'node_modules'), path.join(packageDir, 'node_modules'));
  }, 120000);

  afterAll(() => {
    fs.rmSync(workDir, { recursive: true, force: true });
  });

  const listPackedFiles = (dir = packageDir) =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      if (entry.name === 'node_modules') return [];
      const fullPath = path.join(dir, entry.name);
      return entry.isDirectory() ? listPackedFiles(fullPath) : [path.relative(packageDir, fullPath)];
    });

  it('contains every entry point', () => {
    const packed = listPackedFiles();

    expect(ENTRY_POINTS.filter((file) => !packed.includes(file))).toEqual([]);
  });

  it('contains nothing unexpected', () => {
    expect(listPackedFiles().filter((file) => !ALLOWED_FILES.includes(file))).toEqual([]);
  });

  it.each(['index.js', 'react.js', 'typescript.js'])('loads %s from the packed tarball as a flat config', (file) => {
    const output = execFileSync(
      'node',
      ['-e', `const c = require('./${file}'); console.log(JSON.stringify({ isArray: Array.isArray(c), length: c.length }))`],
      { cwd: packageDir, encoding: 'utf8' },
    );
    const { isArray, length } = JSON.parse(output);

    expect(isArray).toBe(true);
    expect(length).toBeGreaterThan(0);
  });

  it.each(['constants', 'constants.js'])('resolves require("./%s") the way consumers import it', (specifier) => {
    const output = execFileSync('node', ['-e', `console.log(JSON.stringify(require('./${specifier}')))`], {
      cwd: packageDir,
      encoding: 'utf8',
    });

    expect(JSON.parse(output)).toEqual({ OFF: 0, WARNING: 1, ERROR: 2 });
  });

  it('declares every file in package.json "files" that it expects to publish', () => {
    const { files } = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));

    expect(files.filter((file) => !fs.existsSync(path.join(packageDir, file)))).toEqual([]);
  });
});

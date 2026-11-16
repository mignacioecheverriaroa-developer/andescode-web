import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['dist/**', 'reports/**', '.lighthouseci/**', 'node_modules/**'] },
  js.configs.recommended,
  {
    files: ['src/scripts/**/*.js'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'module', globals: globals.browser },
  },
  {
    files: ['*.js', 'scripts/**/*.mjs', 'tools/**/*.mjs', 'src/_data/**/*.js', 'src/pages/**/*.js'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'module', globals: globals.node },
  },
  { rules: { 'no-unused-vars': ['error', { argsIgnorePattern: '^_' }] } },
];

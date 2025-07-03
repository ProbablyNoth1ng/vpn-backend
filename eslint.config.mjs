const js = require('@eslint/js');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const prettierConfig = require('eslint-config-prettier');
const { resolve } = require('path');

module.exports = [
  js.configs.recommended,
  prettierConfig,

  {
    ignores: ['dist', 'node_modules', '**/*.test.ts', '**/*.spec.ts'],
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        // eslint-disable-next-line no-undef
        project: resolve(__dirname, './tsconfig.eslint.json'),
        // eslint-disable-next-line no-undef
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        ignorePatterns: ['dist', '**/*.test.ts', '**/*.spec.ts'],
      },
      globals: {
        Buffer: 'readonly',
        process: 'readonly',
        global: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      'simple-import-sort': require('eslint-plugin-simple-import-sort'),
    },
    rules: {
      'no-trailing-spaces': ['error', { ignoreComments: true }],
      'no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^', varsIgnorePattern: '^' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^', varsIgnorePattern: '^' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^@?\\w'], // External libraries
            ['^'], // Absolute imports
            ['^@infrastructure(/.*|$)'],
            ['^@usecases(/.*|$)'],
            ['^@domain(/.*|$)'],
            ['^@enums(/.*|$)'],
            ['^@shared(/.*|$)'],
            ['^\\.'], // Relative imports
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
];

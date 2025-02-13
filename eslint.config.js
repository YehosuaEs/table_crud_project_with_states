const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const eslintConfigPrettier = require('eslint-config-prettier');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const eslintPluginHTML = require('eslint-plugin-html');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended
    ],
    processor: angular.processInlineTemplates,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      parserOptions: {
        project: ['**/tsconfig.json']
      }
    },
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      '@angular-eslint/component-class-suffix': [
        'error',
        {
          suffixes: ['Page', 'Component']
        }
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case'
        }
      ],
      '@typescript-eslint/naming-convention': 0,
      '@typescript-eslint/ban-tslint-comment': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array-simple',
          readonly: 'array-simple'
        }
      ],
      '@typescript-eslint/consistent-generic-constructors': ['error', 'constructor'],
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public'
          },
          ignoredMethodNames: [
            'ngOnChanges',
            'ngOnInit',
            'ngDoCheck',
            'ngAfterContentInit',
            'ngAfterContentChecked',
            'ngAfterViewInit',
            'ngAfterViewChecked',
            'ngOnDestroy'
          ]
        }
      ],
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-useless-empty-export': 'error',
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/prefer-enum-initializers': 'error',
      '@typescript-eslint/no-unused-expressions': 'off',
      ...eslintConfigPrettier.rules,
      ...eslintPluginPrettierRecommended.rules
    }
  },
  {
    files: ['**/*.html'],
    plugins: {
      html: eslintPluginHTML
    },
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {}
  },
  {
    files: ['**/*.html'],
    ignores: ['**/inline-template-*.component.html'],
    plugins: {
      prettier: eslintPluginPrettier,
      html: eslintPluginHTML
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          parser: 'angular',
          endOfLine: 'auto'
        }
      ],
      ...eslintPluginPrettierRecommended.rules
    }
  }
);

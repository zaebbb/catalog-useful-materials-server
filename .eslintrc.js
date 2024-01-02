module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'standard-with-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: [
    'import', 'unused-imports',
  ],
  rules: {
    indent: [2, 2, { SwitchCase: 1 }],
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/naming-convention': 'warn',
    semi: [2, 'never'],
    'max-len': [
      'error',
      {
        ignoreComments: true,
        code: 120,
      },
    ],
    '@typescript-eslint/dot-notation': ['warn'],
    '@typescript-eslint/comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': ['warn'],
    'linebreak-style': 0,
    '@typescript-eslint/no-misused-promises': ['warn'],
    '@typescript-eslint/no-invalid-void-type': ['warn'],
    '@typescript-eslint/no-floating-promises': ['warn'],
    '@typescript-eslint/no-non-null-assertion': ['warn'],
    '@typescript-eslint/no-extraneous-class': ['warn'],
    'multiline-ternary': ['off'],
    'import/no-duplicates': 'off',
    'import/prefer-default-export': 0,
    'no-duplicate-imports': 'off',
    '@typescript-eslint/no-duplicate-imports': ['off'],
    'import/no-unresolved': 'off',
    'import/named': 'off',
    'import/namespace': 'off',
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
    'import/default': 'off',
    'import/export': 2,
    '@typescript-eslint/consistent-type-imports': ['warn'],
    'unused-imports/no-unused-imports': 'error',
  },
  // overrides: [
  //   {
  //     env: {
  //       node: true,
  //     },
  //     files: [
  //       '.eslintrc.{js,cjs}',
  //     ],
  //     parserOptions: {
  //       sourceType: 'script',
  //     },
  //   },
  // ],
}

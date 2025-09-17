module.exports = [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'media/**',
      '*.min.js',
      'coverage/**',
    ],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    rules: {
      'no-empty': ['error', { allowEmptyCatch: false }],
      'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
      curly: ['error', 'all'],
      'no-console': ['off'],
    },
  },
];

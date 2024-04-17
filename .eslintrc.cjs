module.exports = {
  overrides: [
    {
      files: ['src/**/*.ts', 'test/**/*.ts'],
      extends: 'love',
      parserOptions: {
        project: 'tsconfig.eslint.json'
      }
    }
  ],
}

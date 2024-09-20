module.exports = {
  extends: ['universe/native'],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'simple-import-sort/imports': 'off',
  },
};

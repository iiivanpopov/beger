import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  stylistic: true,
  imports: true,
  yaml: true,
}, {
  files: ['apps/backend/**/*'],
  rules: {
    'node/prefer-global/process': 'off',
    'unicorn/throw-new-error': 'off',
    'antfu/no-top-level-await': 'off',
    'no-console': 'off',
  },
}, {
  files: ['apps/frontend/**/*'],
  rules: {
    'style/jsx-closing-tag-location': 'off',
  },
})

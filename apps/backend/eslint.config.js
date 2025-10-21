import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: true,
  typescript: true,
  imports: true,
}, {
  rules: {
    'node/prefer-global/process': 'off',
    'unicorn/throw-new-error': 'off',
    'antfu/no-top-level-await': 'off',
    'no-console': 'off',
  },
})

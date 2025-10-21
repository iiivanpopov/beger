import antfu from '@antfu/eslint-config'
import storybook from 'eslint-plugin-storybook'

export default antfu({
  typescript: {
    erasableOnly: true,
  },
  stylistic: true,
  imports: true,
  react: true,
  jsx: {
    a11y: true,
  },
  formatters: {
    css: true,
    html: true,
    markdown: true,
  },
}, storybook.configs['flat/recommended'])
  .overrideRules({
    'style/jsx-closing-tag-location': 'off',
    'ts/no-redeclare': 'off',
  })

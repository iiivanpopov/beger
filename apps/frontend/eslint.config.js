import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  jsx: {
    a11y: true,
  },
  formatters: {
    css: true,
    html: true,
    markdown: true,
  },
}, {
  rules: {
    'style/jsx-closing-tag-location': 'off',
    'react-hooks/refs': 'off',
    'react/no-clone-element': 'off',
  },
})

import { builtinModules } from 'node:module'
import packageJson from './package.json'

Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  target: 'bun',
  format: 'esm',
  minify: process.env.NODE_ENV === 'production',
  sourcemap: process.env.NODE_ENV === 'development' ? 'inline' : 'none',
  external: [
    ...Object.keys(packageJson.dependencies),
    ...Object.keys(packageJson.devDependencies),
    ...builtinModules,
  ],
  define: {
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
  },
  naming: '[name].[ext]',
})

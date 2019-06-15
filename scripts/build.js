'use strict'

const fs = require('fs')
const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const { uglify } = require('rollup-plugin-uglify')
const pkg = require('../package.json')

const GLOBAL_NS = 'UseColorScheme'

const bundles = [
  {
    format: 'cjs',
    ext: '.js',
    plugins: [],
    babelPresets: ['@babel/preset-env'],
    babelPlugins: [
      'transform-es2015-destructuring',
      'transform-es2015-function-name',
      'transform-es2015-parameters',
    ],
  },
  {
    format: 'esm',
    ext: '.es.js',
    plugins: [],
  },
  {
    format: 'cjs',
    ext: '.browser.js',
    plugins: [],
    babelPresets: ['@babel/preset-env'],
    babelPlugins: [],
  },
  {
    format: 'umd',
    ext: '.js',
    plugins: [],
    babelPresets: ['@babel/preset-env'],
    babelPlugins: [],
    moduleName: pkg.name,
  },
  {
    format: 'umd',
    ext: '.min.js',
    plugins: [uglify()],
    babelPresets: ['@babel/preset-env'],
    babelPlugins: [],
    moduleName: pkg.name,
    minify: true,
  },
]

let promise = Promise.resolve()

// Compile source code into a distributable format with Babel and Rollup
for (const config of bundles) {
  promise = promise.then(() =>
    rollup
      .rollup({
        input: 'src/index.js',
        external: Object.keys(pkg.external),
        plugins: [
          babel({
            babelrc: false,
            exclude: 'node_modules/**',
            presets: config.babelPresets,
            plugins: config.babelPlugins,
          }),
        ].concat(config.plugins),
      })
      .then(bundle =>
        bundle.write({
          file: `dist/${config.moduleName || 'index'}${config.ext}`,
          format: config.format,
          sourceMap: !config.minify,
          name: GLOBAL_NS,
          globals: pkg.external,
        })
      )
  )
}

// Copy package.json and LICENSE.txt
promise = promise.then(() => {
  delete pkg.private
  delete pkg.devDependencies
  delete pkg.scripts
  delete pkg.eslintConfig
  delete pkg.babel
  fs.writeFileSync(
    'dist/package.json',
    JSON.stringify(pkg, null, '  '),
    'utf-8'
  )
  fs.writeFileSync(
    'dist/LICENSE.txt',
    fs.readFileSync('LICENSE.txt', 'utf-8'),
    'utf-8'
  )
})

promise.catch(err => console.error(err.stack)) // eslint-disable-line no-console

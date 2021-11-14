const assert = require('assert')
const babel = require("@babel/core")
const babelGenerator = require('@babel/generator').default

void babel.transformSync(`
interface foo {
  bar: Buffer
}

console.log(process)
`, {
  plugins: [
    "@babel/plugin-transform-typescript",
    {
      name: 'babel-plugin-reproduce',
      visitor: {
        Program: {
          exit(path, _state) {
            assert.equal(
              babelGenerator(path.node).code,
              'console.log(process);',
              'TSInterfaceDeclaration should be stripped'
            )

            assert.equal(
              path.scope.hasGlobal('process'),
              true,
              'js reference should be kept'
            )

            assert.equal(
              path.scope.hasGlobal('Buffer'),
              false,
              "ts reference should be stripped, but scope.hasGlobal('Buffer') is true"
            )
          }
        }
      }
    }
  ],
});

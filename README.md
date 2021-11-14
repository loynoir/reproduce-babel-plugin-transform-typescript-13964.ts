### What
```ts
interface foo {
  bar: Buffer
}

console.log(process)
```

After `@babel/plugin-transform-typescript`, `path.scope.hasGlobal(Buffer)` is still true.


### Reproduce
```sh
$ git clone <repo>
$ pnpm install
$ pnpm test
```

### Expected
No Error
```sh
$ pnpm test
```

### Actual
```sh
$ pnpm test
AssertionError [ERR_ASSERTION]: ts reference should be stripped, but scope.hasGlobal('Buffer') is true
```

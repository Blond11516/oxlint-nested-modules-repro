This repo is a reproduction of an issue with the Zed oxc extension where the oxlint
language server fails to initialize when type-aware linting is enabled and the node_modules
directory where either tsgolint or tsrs is installed is not located at the root module.

With the oxc extension installed, the oxlint language server fails to start with the following error:
```
Failed to initialize type-aware linting:
Failed to find type-aware linter executable. You may need to add the `tsrs` or `oxlint-tsgolint` package to your project?
```

However, with the tsrs package installed inside `web/node_modules`, running oxlint from the web directory yields no error:
```bash
cd web
npm i
npm run lint
```

lint output:
```
npm notice run web@1.0.0 lint
npm notice run oxlint

  ⚠ typescript(no-floating-promises): Promises must be awaited, add void operator to ignore.
   ╭─[index.ts:2:3]
 1 │ function foo() {
 2 │   fetch("https://example.com");
   ·   ──────────────┬──────────────
   ·                 ╰── This unhandled promise-like value has type `Promise<Response>`.
 3 │ }
   ╰────
  help: The promise must end with a call to .catch, or end with a call to .then with a rejection handler, or be explicitly marked as ignored with the `void` operator.

Found 1 warning and 0 errors.
Finished in 83ms on 2 files with 116 rules using 12 threads.
```
[`typecsript(no-floating-promises)`](https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-floating-promises.html) is a type-aware rule, which shows oxlint is properly configured
for type-aware linting with tsrs.

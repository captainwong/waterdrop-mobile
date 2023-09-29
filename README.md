# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


## Fix `vite-plugin-eslint` `ts7016`

https://github.com/gxmari007/vite-plugin-eslint/issues/74#issuecomment-1647431890

1. For anyone else stuck here, I've added a fix myself via patch-package:
    ```bash
    npm install --save-dev patch-package
    ```

2. Create the patch file patches/vite-plugin-eslint+1.8.1.dev.patch with this content:
    ```diff
    diff --git a/node_modules/vite-plugin-eslint/package.json b/node_modules/vite-plugin-eslint/package.json
    index afbc41c..5f6d8f7 100644
    --- a/node_modules/vite-plugin-eslint/package.json
    +++ b/node_modules/vite-plugin-eslint/package.json
    @@ -9,6 +9,7 @@
      "types": "./dist/index.d.ts",
      "exports": {
      ".": {
    +      "types": "./dist/index.d.ts",
          "import": "./dist/index.mjs",
          "require": "./dist/index.js"
      }
    ```

3. Add a postinstall script in your package.json:
    ```json
    "postinstall": "patch-package",
    ```

4.`npm install`
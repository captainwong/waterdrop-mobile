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

## Setup vscode remove explorer with nginx proxy

VSCode connect to remote server, ssh running `yarn dev`, using nginx reverse proxy. without special treatment, the `hmr` would fail.

Here is the [solution](https://github.com/vitejs/vite/discussions/6473#discussioncomment-4461746), thank you sir!

My usage:

`vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5174,
    cors: true,
    proxy: {
      //'/graphql': 'http://192.168.50.162:3000',
      '/graphql': 'http://localhost:3000',
      '/api': 'http://localhost:3000',
    },
    hmr: {
      // host: 'http://waterdrop-mobile.captainwong.cn'
      path: '/socket.io', // this is the browser will connect to
      port: 5175, // this is the hmr ws listening port
      clientPort: 80, // this is the browser will connect to
    }
  },
  ...
})
```

`nginx.conf` append under `http`:
```conf
map $http_upgrade $connection_upgrade {
    default Upgrade;
    '' close;
}

upstream wss-upstream {
    server localhost:5175;
}
```

`site.conf` in `sites-available`:
```conf
server {
    server_name waterdrop-mobile.captainwong.cn;

    listen 80;
    #listen 443 ssl;
    #listen [::]:443 ssl;
    #proxy_ssl_server_name on;

    #ssl_certificate        ./.cert/cert.pem;
    #ssl_certificate_key    ./.cert/key.pem;

    #ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    #ssl_prefer_server_ciphers on;
    #ssl_ciphers "EECDH+ECDSA+AESGCM EECDH+aRSA+AESGCM EECDH+ECDSA+SHA384 #EECDH+ECDSA+SHA256 EECDH+aRSA+SHA384 EECDH+aRSA+SHA256 EECDH+aRSA+RC4 EECDH #EDH+aRSA RC4 !aNULL !eNULL !LOW !3DES !MD5 !EXP !PSK !SRP !DSS";

    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_set_header Host $host;

    proxy_redirect          off;
    proxy_set_header        Host              $host;
    proxy_set_header        X-Real-IP         $remote_addr;
    proxy_set_header        X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header        X-Forwarded-Proto $scheme;
    client_max_body_size    10m;
    client_body_buffer_size 128k;
    proxy_connect_timeout   90;
    proxy_send_timeout      90;
    proxy_read_timeout      90;
    proxy_buffers           32 4k;

    chunked_transfer_encoding on;

    location /socket.io {
        proxy_pass http://wss-upstream;
    }

    location / {
        proxy_pass http://localhost:5174;
    }
}
```

TODO: https
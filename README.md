## Dynamic routes cause a "ChunkLoadError" when using the app router in a dockerized Next.js 13 SPA #54008
Ref: https://github.com/vercel/next.js/issues/54008#issuecomment-1718339899

### Setup

Open this project with VSCode Devcontainers.

`yarn install`

### Works

`yarn dev` 

Via NGINX: http://localhost:3001/next/things/this-is-a-test-id/ ✅

Direct to nextjs: http://localhost:3001/next/things/this-is-a-test-id/ ✅

### Loading chunk error

`yarn build && yarn start` (or `yarn host`)

Via NGINX: http://localhost:3001/next/things/this-is-a-test-id/ ❌

Direct to nextjs: http://localhost:3000/next/things/this-is-a-test-id/ ✅

### This works! (remove use client)

Remove `use client;` from `app\things\[thingId]\page.tsx`

`yarn build && yarn start` (or `yarn host`)

Via NGINX: http://localhost:3001/next/things/this-is-a-test-id/ ✅

Direct to nextjs: http://localhost:3001/next/things/this-is-a-test-id/ ✅

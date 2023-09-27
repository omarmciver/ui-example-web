## Dynamic routes cause a "ChunkLoadError" when using the app router in a dockerized Next.js 13 SPA #54008
Ref: https://github.com/vercel/next.js/issues/54008#issuecomment-1718339899

### Setup

Open this project with VSCode Devcontainers.

`yarn install`

### Works

`yarn dev` 

Visit http://localhost:3001/next/things/this-is-a-test-id/

### Doesn't work (Loading chunk error)

`yarn build && yarn start` (or `yarn host`)

Visit http://localhost:3001/next/things/this-is-a-test-id/

### Work (remove use client)

Remove `use client;` from `app\things\[thingId]\page.tsx`

`yarn build && yarn start` (or `yarn host`)

Visit http://localhost:3001/next/things/this-is-a-test-id/

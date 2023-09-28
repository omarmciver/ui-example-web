## SOLVED: Dynamic routes cause a "ChunkLoadError" when using the app router in a dockerized Next.js 13 SPA #54008

Finally solved it: https://github.com/vercel/next.js/issues/54008#issuecomment-1738487885

## TL;DR

If you're using a configuration like this:

```nginx
location /next {
    proxy_pass http://ui-example-web:3000/next;
}
```

Change it to:

```nginx
location /next {
    proxy_pass http://ui-example-web:3000$request_uri;
}
```

You may also need to add a DNS resolver directive if you don't already have one:

```nginx
resolver 127.0.0.11 valid=30s;
```

## If this helped you, consider [buying me a coffee](https://www.buymeacoffee.com/omarmciver).
---

## Full Explanation

### The Issue

When NGINX is given a `proxy_pass` value that includes a URI (anything after the protocol, hostname and port), it **always** decodes the URI before forwarding the request.

This leads Next.js to receive a decoded request URI for a static chunk, like so:

```
http://localhost:3000/next/_next/static/chunks/app/things/[thingId]/page-a4112d9d01403386.js
```

It (or webpack?) expects to receive it like so:
```
http://localhost:3000/next/_next/static/chunks/app/things/%5BthingId%5D/page-a4112d9d01403386.js
```

### The Consequence

Next.js doesn't handle that decoded URI well and returns a 404 error. This issue is specific to `next start` (doesn't happen with `next dev`) and occurs only if your dynamic route has a `use client;` directive.

### The Solution

The workaround is to use NGINX variables. The `$request_uri` variable contains everything after the original host and port from the incoming request. By appending `$request_uri` at the end of `proxy_pass`, NGINX won't decode the URI.

### Final Thoughts :thought_balloon:

Understanding both NGINX and Next.js behaviors is crucial. I use NGINX in development and NGINX ingress controller in a Kubernetes production environment. The same config change applies to both.

> **Note**: When I switched to this new `proxy_pass` configuration, I had to add a DNS resolver directive to my NGINX config.

---

Feel free to share your thoughts and experiences. If this helped you, I'm still looking for help [buying coffee](https://www.buymeacoffee.com/omarmciver).

---

### Recreate the issue with this repo

Use the config
```nginx
location /next {
    proxy_pass http://ui-example-web:3000/next;
}
```
Open this project with VSCode Devcontainers.

`yarn install`

`yarn build && yarn start` (or `yarn host`)

Via NGINX: http://localhost:3001/next/things/this-is-a-test-id/ ❌

Direct to nextjs: http://localhost:3000/next/things/this-is-a-test-id/ ✅

See the differences in recieved URI requsts which are output by middleware in the vscode console.

### See the fix

Return the config to:

```nginx
location /next {
    proxy_pass http://ui-example-web:3000$request_uri;
}
```

Open this project with VSCode Devcontainers.

`yarn install`

`yarn build && yarn start` (or `yarn host`)

Via NGINX: http://localhost:3001/next/things/this-is-a-test-id/ ✅

Direct to nextjs: http://localhost:3000/next/things/this-is-a-test-id/ ✅

Now the recieved URI requsts are the same through NGINX as they are direct.

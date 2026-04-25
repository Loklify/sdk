# @loklify/core

[![npm](https://img.shields.io/npm/v/@loklify/core.svg)](https://www.npmjs.com/package/@loklify/core)

Framework-agnostic translation client for [Loklify](https://loklify.com), the i18n platform for small teams. Fetches translations from your Loklify project at runtime, with built-in in-memory cache.

> Don't have an account yet? Create your project free at [app.loklify.com](https://app.loklify.com).

## Install

```bash
npm install @loklify/core
# or
pnpm add @loklify/core
# or
yarn add @loklify/core
```

## Usage

```ts
import { LoklifyClient } from '@loklify/core'

const client = new LoklifyClient({
  project: 'your-project-id',
})

const messages = await client.loadLocale('en')
// { 'home.title': 'Welcome', 'home.cta': 'Get started', ... }
```

You'll find your **project ID** in the Loklify dashboard at [app.loklify.com](https://app.loklify.com), under your project's settings.

## API

### `new LoklifyClient(options)`

| Option | Type | Required | Description |
|---|---|---|---|
| `project` | `string` | yes | Your Loklify project ID |
| `token` | `string` | no | Bearer token for private projects |
| `apiBase` | `string` | no | Override API URL (defaults to `https://api.loklify.com`) |

### `client.loadLocale(lang): Promise<Messages>`

Fetches translations for the given language code. Subsequent calls for the same language hit the in-memory cache.

```ts
const fr = await client.loadLocale('fr')
const en = await client.loadLocale('en')
```

### `client.setToken(token)`

Updates the Bearer token for private projects. Useful when the user logs in after the client is constructed.

### `client.clearCache(lang?)`

Clears the cache. Pass a language code to clear a single locale, or call without arguments to clear all.

```ts
client.clearCache('fr')  // single locale
client.clearCache()      // everything
```

## Types

```ts
import type { LoklifyOptions, Messages } from '@loklify/core'

type Messages = Record<string, string>
```

## Framework integrations

- **Vue 3**: [`@loklify/vue`](https://www.npmjs.com/package/@loklify/vue) · plugin with `vue-i18n` auto-injection
- **Nuxt 3/4**: [`@loklify/nuxt`](https://www.npmjs.com/package/@loklify/nuxt) · zero-config module

## Links

- Platform: [loklify.com](https://loklify.com)
- Dashboard: [app.loklify.com](https://app.loklify.com)
- Source: [github.com/loklify/sdk](https://github.com/loklify/sdk)

## License

MIT

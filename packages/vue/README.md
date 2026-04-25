# @loklify/vue

[![npm](https://img.shields.io/npm/v/@loklify/vue.svg)](https://www.npmjs.com/package/@loklify/vue)

Vue 3 plugin for [Loklify](https://loklify.com), the translation management platform for small teams. Loads your translations from Loklify and injects them into `vue-i18n` automatically. Edit a string in the dashboard, your app picks it up without rebuilding.

> Manage your translations at [app.loklify.com](https://app.loklify.com) · free tier available.

## Install

```bash
npm install @loklify/vue vue-i18n
```

`vue-i18n` is an optional peer dependency. Skip it if you only want to fetch raw translations and inject them yourself.

## Usage with `vue-i18n`

```ts
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createLoklify } from '@loklify/vue'
import App from './App.vue'

const app = createApp(App)

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
})

const loklify = createLoklify({
  project: 'your-project-id',
  i18n: {
    locale:           i18n.global.locale,
    setLocaleMessage: i18n.global.setLocaleMessage,
  },
})

app.use(i18n)
app.use(loklify)
app.mount('#app')
```

That's it. The plugin loads the active locale at startup and auto-fetches when `i18n.locale` changes. Find your **project ID** in the Loklify dashboard at [app.loklify.com](https://app.loklify.com).

## Usage without `vue-i18n`

```ts
import { createLoklify, useLoklify } from '@loklify/vue'

app.use(createLoklify({ project: 'your-project-id' }))

// Anywhere in a component:
const { client, loadLocale } = useLoklify()

await loadLocale('fr')
const messages = await client.loadLocale('fr')
```

## API

### `createLoklify(options)`

Returns a Vue plugin.

| Option | Type | Required | Description |
|---|---|---|---|
| `project` | `string` | yes | Your Loklify project ID |
| `token` | `string` | no | Bearer token for private projects |
| `apiBase` | `string` | no | Override API URL |
| `i18n` | `{ locale, setLocaleMessage }` | no | A `vue-i18n` instance reference for auto-injection |

### `useLoklify()`

Composable that returns the underlying client and the `loadLocale` helper. Throws if used outside a tree where the plugin is installed.

```ts
const { client, loadLocale } = useLoklify()
```

## How it works

1. On `app.use(loklify)`, the plugin loads the current locale.
2. It calls `i18n.setLocaleMessage(lang, messages)` to merge the fetched translations.
3. A `watch` on `i18n.locale` triggers the same flow whenever the user switches language.
4. Each language is fetched at most once per session (in-memory cache).

## Related packages

- **Core (any framework)**: [`@loklify/core`](https://www.npmjs.com/package/@loklify/core)
- **Nuxt 3/4**: [`@loklify/nuxt`](https://www.npmjs.com/package/@loklify/nuxt) · zero-config wrapper around this plugin

## Links

- Platform: [loklify.com](https://loklify.com)
- Dashboard: [app.loklify.com](https://app.loklify.com)
- Pricing: [loklify.com/#pricing](https://loklify.com/#pricing)

## License

MIT

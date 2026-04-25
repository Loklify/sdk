# Loklify SDK

Official JavaScript/TypeScript SDKs for [Loklify](https://loklify.com), a translation management platform built for small dev teams. Centralize your i18n keys, edit translations in a collaborative dashboard, and load them at runtime via REST API.

> Sign up free at [app.loklify.com](https://app.loklify.com) · 1 project, 3 languages, 500 keys included.

## Packages

| Package | Description | Version |
|---|---|---|
| [`@loklify/core`](./packages/core) | Framework-agnostic fetch & cache client | `0.1.x` |
| [`@loklify/vue`](./packages/vue) | Vue 3 plugin with `vue-i18n` integration | `0.1.x` |
| [`@loklify/nuxt`](./packages/nuxt) | Nuxt 3/4 module, zero-config setup | `0.2.x` |

## Why Loklify?

- **Multi-format**: JSON, YAML, Gettext PO, Laravel `lang/` PHP. Native import/export.
- **Real-time loading**: edit a string in the dashboard, your apps fetch the new version via API. No rebuild, no redeploy.
- **Collaborative**: roles for owners, admins, devs and translators. Translators never need code access.
- **Lightweight pricing**: free tier covers most side-projects. Paid plans start cheap.

## Quick links

- Platform: [loklify.com](https://loklify.com)
- Dashboard: [app.loklify.com](https://app.loklify.com)
- Pricing: [loklify.com/#pricing](https://loklify.com/#pricing)
- npm: [`@loklify/core`](https://www.npmjs.com/package/@loklify/core) · [`@loklify/vue`](https://www.npmjs.com/package/@loklify/vue) · [`@loklify/nuxt`](https://www.npmjs.com/package/@loklify/nuxt)

## Development

This is a `pnpm` workspace.

```bash
pnpm install
pnpm -r build
```

## License

MIT

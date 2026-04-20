#!/bin/bash
# Supprime les node_modules des packages pour éviter les conflits
# lors d'une installation via file: dans un projet externe
set -e
echo "Cleaning packages node_modules for file: linking..."
rm -rf packages/core/node_modules
rm -rf packages/vue/node_modules
rm -rf packages/nuxt/node_modules
echo "Done. Run 'pnpm install' in loklify-front now."

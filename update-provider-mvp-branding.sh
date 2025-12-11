#!/bin/bash

# Findr Brand Update Script for Provider MVP
# Updates all color references to use new Findr branding

PROJECT_DIR=~/Desktop/carrotly-provider-mvp

echo "🎨 Updating Findr branding in Provider MVP..."

# Update all component files to use primary-* colors instead of blue-*
find "$PROJECT_DIR/src" -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) -exec sed -i '' \
  -e 's/bg-blue-50/bg-primary-50/g' \
  -e 's/bg-blue-100/bg-primary-100/g' \
  -e 's/bg-blue-500/bg-primary-500/g' \
  -e 's/bg-blue-600/bg-primary-600/g' \
  -e 's/bg-blue-700/bg-primary-700/g' \
  -e 's/text-blue-50/text-primary-50/g' \
  -e 's/text-blue-100/text-primary-100/g' \
  -e 's/text-blue-500/text-primary-500/g' \
  -e 's/text-blue-600/text-primary-600/g' \
  -e 's/text-blue-700/text-primary-700/g' \
  -e 's/text-blue-800/text-primary-800/g' \
  -e 's/text-blue-900/text-primary-900/g' \
  -e 's/border-blue-200/border-primary-200/g' \
  -e 's/border-blue-300/border-primary-300/g' \
  -e 's/border-blue-500/border-primary-500/g' \
  -e 's/border-blue-600/border-primary-600/g' \
  -e 's/hover:bg-blue-50/hover:bg-primary-50/g' \
  -e 's/hover:bg-blue-100/hover:bg-primary-100/g' \
  -e 's/hover:bg-blue-600/hover:bg-primary-600/g' \
  -e 's/hover:bg-blue-700/hover:bg-primary-700/g' \
  -e 's/hover:border-blue-300/hover:border-primary-300/g' \
  -e 's/hover:border-blue-500/hover:border-primary-500/g' \
  -e 's/focus:ring-blue-500/focus:ring-primary-500/g' \
  -e 's/focus:border-blue-500/focus:border-primary-500/g' \
  -e 's/from-blue-600/from-primary-600/g' \
  -e 's/to-indigo-600/to-primary-700/g' \
  -e 's/from-blue-700/from-primary-700/g' \
  -e 's/to-indigo-700/to-primary-800/g' \
  {} \;

echo "✅ Updated all blue-* references to primary-*"

# Update orange accent colors (used for logo emoji) to Findr primary
find "$PROJECT_DIR/src" -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) -exec sed -i '' \
  -e 's/bg-orange-400/bg-findr/g' \
  -e 's/bg-orange-500/bg-findr/g' \
  -e 's/bg-orange-600/bg-findr-dark/g' \
  -e 's/from-orange-400/from-findr-light/g' \
  -e 's/to-orange-600/to-findr-dark/g' \
  {} \;

echo "✅ Updated all orange-* references to findr-*"

# Update any hardcoded Carrotly text references
find "$PROJECT_DIR/src" -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) -exec sed -i '' \
  -e 's/Carrotly Provider Portal/Findr Health Provider Portal/g' \
  -e 's/Carrotly Provider/Findr Health Provider/g' \
  -e 's/Carrotly platform/Findr Health platform/g' \
  {} \;

echo "✅ Updated text references from Carrotly to Findr Health"

echo ""
echo "🎉 Branding update complete!"
echo ""
echo "Next steps:"
echo "1. Copy findr-logo.svg and findr-icon.svg to $PROJECT_DIR/public/"
echo "2. Copy the new index.html to $PROJECT_DIR/"
echo "3. Restart your dev server: npm run dev"
echo ""

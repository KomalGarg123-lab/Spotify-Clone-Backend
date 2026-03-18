import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])

/*
Ye ESLint config hai

Purpose: dev time me code check karna → errors aur best practices follow karne ke liye

Browser ko iska koi fark nahi padta → sirf developer ke liye tool hai

globalIgnores(['dist']) → build folder ignore kare → unnecessary warnings na aaye

💡 Analogy:

Project = homework

ESLint = teacher jo check karta hai mistakes + style

Vite/React = tools jo run karte hai homework */
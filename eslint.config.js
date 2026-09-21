import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist', 'dist-ssr'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      // The project doesn't use the prop-types package; runtime prop
      // validation isn't part of this codebase's contract.
      'react/prop-types': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Guardrail: three.js must stay reachable only through the dynamic
      // import in ParticleBackground. A stray static import anywhere else
      // silently pulls ~128 KB gz into the entry chunk with no build error.
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'three',
              message:
                'Import three only inside src/components/fx/three/. Reach it via the dynamic import in ParticleBackground.jsx.',
            },
          ],
        },
      ],
    },
  },
  {
    // The one place three.js is allowed.
    files: ['src/components/fx/three/**/*.js'],
    rules: { 'no-restricted-imports': 'off' },
  },
]

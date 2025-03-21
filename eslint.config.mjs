import nx from '@nx/eslint-plugin';

export default [
  {
    files: ['**/*.json'],
    // Override or add rules here
    rules: {},
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: 'domain:finance',
              onlyDependOnLibsWithTags: ['domain:finance', 'domain:shared'],
            },
            {
              sourceTag: 'domain:marketing',
              onlyDependOnLibsWithTags: ['domain:marketing', 'domain:shared'],
            },
            {
              sourceTag: 'domain:crm',
              onlyDependOnLibsWithTags: ['domain:crm', 'domain:shared'],
            },
            {
              sourceTag: 'domain:inventory',
              onlyDependOnLibsWithTags: ['domain:inventory', 'domain:shared'],
            },
            {
              sourceTag: 'domain:shared',
              onlyDependOnLibsWithTags: ['domain:shared'],
            },
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: [
                'type:ui',
                'type:util',
                'type:feature',
                'type:data-access',
              ],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];

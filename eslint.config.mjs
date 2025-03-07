import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: [
      'node_modules',
      'dist',
      '.angular',
      '.vscode',
      '.git',
      '.firebase',
      'coverage',
      'cypress',
      'e2e',
      'tmp',
      'temp',
      'temporal',
      '.github',
      '.husky',
      '.idea',
      '.vscode',
      '.yarn',
      'yarn.lock',
      'package-lock.json',
      'tsconfig.json',
      'tsconfig.base.json',
      'tsconfig.app.json',
      'tsconfig.spec.json',
      'tsconfig.e2e.json',
      'tsconfig.lib.json',
      'tsconfig.server',
      'eslint.config.mjs',
    ],
  },
);

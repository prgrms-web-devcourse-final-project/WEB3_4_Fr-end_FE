// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends('next', 'next/core-web-vitals', 'plugin:@typescript-eslint/recommended'),
  {
    rules: {
      // 사용하지 않는 변수를 경고로 처리
      '@typescript-eslint/no-unused-vars': 'warn',
      // 다른 규칙도 필요에 따라 추가 가능
    },
  },
];

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import flatconfig from '@repo/eslint-config/flatconfig.mjs';

const common = file =>
    tseslint.config(
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
        ...flatconfig.extends(file)
    );

export default common;

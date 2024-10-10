# User Profiles Technical

This is a technical task bootstraped with the [Docker starter Turborepo](https://turbo.build/repo/docs/getting-started/installation)

## Using this app

Run the following command:

```sh
npm install
npm run dev
```

This will build and run both apps in parallel.

-   [localhost:3000](http://localhost:3000/): the interactive front-end
-   [localhost:3001](http://localhost:3001/): the api server
    -   tRPC api [/panel/](http://localhost:3001/panel)
    -   REST api [/docs/](http://localhost:3001/docs/)
    -   REST api [/openapi.json](http://localhost:3001/openapi.json)

## Preview

![Preview](https://i.imgur.com/8HdrVv8.gif)

## What's inside?

This is the stack

### Apps and Packages

-   `@repo/web`: a [Next.js](https://nextjs.org/) app
-   `@repo/api`: an [Fastify](https://fastify.dev/) server with [tRPC](https://trpc.io/)
-   `@repo/ui`: a React component library ~~with [shadcn/ui](https://ui.shadcn.com/)~~
-   `@repo/logger`: Isomorphic logger (a small wrapper around console.log)
-   `@repo/schema`: central [Zod](https://zod.dev/) schema (shared with other packages)
-   `@repo/database`: [Drizzle](https://orm.drizzle.team/) schema and devops with [Turso](https://turso.tech/) SQLlite DB.
-   `@repo/eslint-config`: ESLint presets
-   `@repo/typescript-config`: tsconfig.json's used throughout the monorepo for consistentcy
-   `@repo/jest-presets`: Jest configurations (but I would switch to vitest for an easier life)

🚀 100% [TypeScript](https://www.typescriptlang.org/).

### Docker

It should (will) be as simple as `docker compose up` but there's a ts issue with trpc after downgrading from @next to @10 which needs to be resolved first.

### Other Utilities

This Turborepo has some additional tools already setup for you:

-   [Husky](https://typicode.github.io/husky/), for lovely git hooks
    -   pre-commit: lint and format all staged files
    -   pre-push: lint and test (abort if fails)
-   [CommitLint](https://github.com/conventional-changelog/commitlint) and [lint-staged](https://github.com/lint-staged/lint-staged) to keep things tidy
-   [DotEnvX](https://dotenvx.com/), the better dotenv
-   [TypeScript](https://www.typescriptlang.org/) for static type checking
-   [ESLint](https://eslint.org/) for code linting
-   [Jest](https://jestjs.io) test runner for all things JavaScript (staring at [vitest](<[https://](https://vitest.dev/)>) tho 👀)
-   [Prettier](https://prettier.io) for code formatting

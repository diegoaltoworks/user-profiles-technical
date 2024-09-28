# `@repo/database`

This is a package to

-   maintain all database maintenance ops, schema, migrations, etc.
-   provide a central interface to interact with the database storage

## Devops

eg.:

```shell
npm run db:generate # to generate migration sql scripts
npm run db:migrate # to execute them
```

## Usage

eg.:

```typescript
import { db } from "@repo/database";
import { userTable } from "@repo/database";

async function AddUser(inputData: UserSchema) {
    const user = await db
        .insert(userTable)
        .values(inputData)
        .returning({ id: userTable.id });
    const userId = user?.[0].id;
}
```

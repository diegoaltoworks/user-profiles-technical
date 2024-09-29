import { router } from "./app";
import { userRouter } from "./routers/user";

export const appRouter = router({
  user: userRouter,
});

//export const createCaller = createCallerFactory(appRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

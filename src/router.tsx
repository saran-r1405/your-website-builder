import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  console.log("[STARTUP] Initializing QueryClient & Router");
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1, // Only retry once, don't retry forever
        networkMode: 'always', // Never pause queries even if webview reports offline
      },
    },
  });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};

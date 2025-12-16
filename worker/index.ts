export interface Env {
  ASSETS: Fetcher;
}

// Static assets are served via the Workers Assets binding.
const serveAsset = async (request: Request, env: Env): Promise<Response> => {
  const assetResponse = await env.ASSETS.fetch(request);

  // SPA fallback: on 404 for GET, try index.html.
  if (assetResponse.status === 404 && request.method === "GET") {
    const url = new URL(request.url);
    return env.ASSETS.fetch(new Request(new URL("/", url), request));
  }

  return assetResponse;
};

export default {
  fetch: (request: Request, env: Env, _ctx: ExecutionContext) =>
    serveAsset(request, env),
};

# OpenRouter Integration for Recursion Visualizer

This project includes optional integration with OpenRouter to automatically generate a call sequence for custom functions in the recursion visualizer.

How to enable:

1. Create a `.env` file in the `client/` folder (or update your existing one) with:

```
VITE_OPENROUTER_API_KEY=<your_openrouter_api_key_here>
```

2. Restart the dev server if it was running.

3. In the visualizer, choose "Recursion", pick "Custom", paste your function (e.g. a recursive Fibonacci implementation) and click "Start". If an API key is configured, the visualizer will attempt to build a call sequence using OpenRouter.

Notes & safety:
- The OpenRouter call is optional — if you don't have an API key the UI will fall back to a simple built-in simulation.
- Keep your API key private. The key will be included in the browser bundle when used from the client: for a secure production setup, move the call into the server and forward results.

If you want a secure server-side integration, I can add a small endpoint to your `server/` folder that proxies the OpenRouter calls and keeps the API key on the server.
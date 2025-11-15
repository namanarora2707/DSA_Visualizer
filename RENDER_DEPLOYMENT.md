# Render Deployment Guide

## Quick Setup

1. **Create a new Web Service on Render**
   - Connect your GitHub repository
   - Set the following environment variables in Render dashboard:
     - `NODE_ENV`: `production`
     - Any other `.env` variables your app needs

2. **Configure Build & Start Commands**
   - **Build Command**: `npm run build && npm install -g concurrently`
   - **Start Command**: `cd server && npm run build-and-start` or simply `cd server && npm start` (if client is already built)

   Alternatively, use a single **Start Command**: 
   ```
   npm install && cd client && npm install && npm run build && cd ../server && npm install && npm start
   ```

3. **File Structure**
   - Root `package.json` is for convenience (orchestrates installs/builds)
   - `client/` builds to `client/dist/`
   - `server/package.json` has scripts to build client and serve it statically
   - Server serves `client/dist/` as static files and falls back to `index.html` for SPA routing

4. **Deployment Flow on Render**
   - Render installs dependencies at root level
   - Build command compiles React client
   - Start command runs Node server which serves the built static files
   - Server's catch-all route handles React Router navigation

## Local Testing

```bash
# Install all dependencies
npm run install-all

# Build client
npm run build

# Start server (serves built client)
npm start
```

## Troubleshooting

- **"Not Found" on refresh**: Verify `client/dist/index.html` exists and server is serving it with the catch-all route
- **Missing environment variables**: Check Render dashboard for `.env` configuration
- **Build fails**: Check Render logs to see which step failed (install, build, or start)
- **CORS issues**: Server has CORS enabled for all origins (adjust origin in `server.js` if needed)

# Deployment Guide for Vercel

## Files Added for Vercel Deployment

### 1. `vercel.json` (Root)
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2. `frontend/vercel.json`
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 3. `frontend/public/_redirects`
```
/*    /index.html   200
```

## What These Files Fix

### The Problem
- When users visit `/videos` directly or refresh the page, Vercel tries to find a physical file at that path
- Since React Router handles routing client-side, the file doesn't exist
- This causes a 404 error

### The Solution
- **vercel.json**: Tells Vercel to serve `index.html` for all routes
- **_redirects**: Fallback for other hosting platforms
- **Catch-all route**: Added `path="*"` route in App.jsx as final fallback

## Deployment Steps

1. **Build the project:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel:**
   - Connect your GitHub repo to Vercel
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Deploy

3. **Environment Variables:**
   - Add your backend API URL to Vercel environment variables
   - Set `VITE_BACKEND_URI` if needed

## Testing

After deployment, test these scenarios:
- ✅ Visit homepage directly
- ✅ Navigate to `/videos` from homepage
- ✅ Refresh page on `/videos` route
- ✅ Visit `/videos` directly via URL
- ✅ Browser back/forward buttons work

## Troubleshooting

If you still get 404 errors:

1. **Check Vercel Function Logs:**
   - Go to Vercel dashboard → Functions tab
   - Check for any errors

2. **Verify Build Output:**
   - Ensure `dist` folder contains `index.html`
   - Check that all assets are properly built

3. **Clear Browser Cache:**
   - Hard refresh (Ctrl+F5)
   - Clear browser cache

4. **Check Environment Variables:**
   - Ensure all required env vars are set in Vercel

## Alternative Hosting Platforms

If using other platforms:

### Netlify
- The `_redirects` file will handle routing
- No additional config needed

### GitHub Pages
- Add `404.html` that redirects to `index.html`

### Firebase Hosting
- Configure `firebase.json` with rewrites

## Notes

- The routing fix is production-safe and won't affect development
- All routes now properly handle direct access and page refreshes
- The catch-all route ensures users never see a blank page
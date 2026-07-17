<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/6385c5c1-a009-4b26-ba51-c84e6bc0a86c

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Environment Variables

For the secure authenticated watchlist function to work in production (Vercel), make sure the following environment variables are set in your Vercel Dashboard:
- `DATABASE_URL`: Your Neon PostgreSQL connection string (pointing to Frankfurt).
- `FIREBASE_PROJECT_ID`: The project ID of your Firebase app.
- `FIREBASE_CLIENT_EMAIL`: The client email from your Firebase service account.
- `FIREBASE_PRIVATE_KEY`: The private key from your Firebase service account (keep all `\n` characters in Vercel settings as is).


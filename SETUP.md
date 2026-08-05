# One-time setup (non-code, done in your own accounts)

These two steps can't be done by Claude — they require your own Google and Cloudflare logins.

## 1. Email signup → Google Sheet

The "Registrer" form on the homepage posts to a Cloudflare Pages Function
(`functions/subscribe.ts`), which forwards each signup to a Google Sheet via
a small Apps Script webhook.

1. Create a new Google Sheet, e.g. "The Convention — Nerdetroppen signups", with a header row: `email | submittedAt`.
2. In the Sheet, go to **Extensions → Apps Script**.
3. Delete the placeholder code and paste in the contents of [`docs/apps-script-subscribe.gs`](./docs/apps-script-subscribe.gs).
4. Click **Deploy → New deployment**, choose type **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone** (required so Cloudflare can post to it anonymously)
5. Click **Deploy**, authorize the script when prompted, and copy the resulting Web App URL (ends in `/exec`).
6. In the Cloudflare Pages dashboard, open this project → **Settings → Environment variables**, and add:
   - Name: `SHEETS_WEBHOOK_URL`
   - Value: the URL from step 5
   - Apply to both **Production** and **Preview**.
7. Redeploy (or trigger a new deploy) so the Function picks up the variable.

Until this is done, the form will show a friendly error ("Signup is not configured yet") instead of failing silently.

## 2. Instagram feed widget

The homepage Instagram section is a placeholder until a widget ID is added.

1. Create a free account at [snapwidget.com](https://snapwidget.com/) (or a similar embed service) connected to `@_theconvention`.
2. Create a feed widget and copy its widget ID from the embed code (`snapwidget.com/embed/<ID>`).
3. Add it to `src/data/site.ts`:
   ```ts
   instagramWidgetId: "your-id-here",
   ```

# Security Review And Recovery Notes

## Scope

- Deployment target assumed to be the root static site: `index.html`, `styles.css`, `app.js`
- Legacy copies exist in `gratitude-web/` and `Archive/`
- Project purpose inferred from `PROJECT_BRIEF.md`

## Findings Addressed

- Removed the exposed GoatCounter bearer token from the production page design and replaced insecure visitor fetching with local-only prompt counting.
- Removed inline event handlers and `javascript:` links so the site can run under a tighter Content Security Policy.
- Replaced risky `innerHTML` rendering with DOM-safe `textContent` rendering for community notes.
- Added `rel="noopener noreferrer"` to external links and popup sharing protections.
- Added spam-resistance and basic content-safety guidance to both Formspree forms.
- Added deploy-time security headers for hosts that support `_headers` or `vercel.json`.
- Added keyboard-friendly modal behavior, focus management, escape-to-close, backdrop close, and a skip link.
- Added reduced-motion support and a no-JavaScript fallback notice.

## Manual Follow-Up

- Rotate or revoke the previously exposed GoatCounter API token in the GoatCounter dashboard. The token was present in historical HTML copies before this hardening pass.
- If any archived HTML files are ever published, review them first. They are historical artifacts, not production-ready deployables.
- Confirm Formspree dashboard spam controls and email routing are configured as intended.

## Restart Checklist

1. Start the local preview server with `npm run preview`.
2. In a second terminal, run `npm run verify`.
3. Open the root page and test prompt rotation, overlays, forms, sharing, and theme switching if you want an additional manual pass.
4. Re-run a text search for `Authorization`, `innerHTML`, `javascript:void`, and `onclick=`.
5. Before deployment, confirm the host applies `_headers` or `vercel.json` headers.
6. If local HTTP preview is unavailable, run the verifier against a file URL instead.

## Quick Commands

```powershell
npm run preview
npm run verify
rg -n "Authorization|innerHTML|javascript:void|onclick=" .
```

### File URL Fallback

```powershell
node verify-site.mjs "file:///C:/path/to/project/index.html"
```

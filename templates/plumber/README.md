# Plumbing Website Template

This folder contains a static HTML/CSS template designed for a Dublin-based plumbing business. It can be hosted locally or deployed to a platform such as Vercel.

## Features

- **Shared partials** (`header`, `footer`, `topbar`, `mobilecta`) loaded via `includes.js`.
- Dynamic link and asset rewriting:
  - Use `data-link="page.html"` on `<a>` elements.
  - Use `data-src="path/to/image"` on `<img>` elements.
  - Use `data-href="plumber.css"` on `<link>` tags for CSS.
  - Paths are automatically prefixed with the script's directory (`basePath`) so the template works from a subfolder or root.
- Utility CSS classes (`.mt-8`, `.mt-10`, etc.) for spacing.
- Minimal, mobile-friendly design with accessibility improvements.
- JSON‑LD schema for business and services; automatic canonical/Open Graph meta tags via JavaScript.

## Deployment

1. **Copy files** into the root of your static site or configure your hosting to serve this directory.
2. Ensure `assets/` and `partials/` directories are published alongside HTML files.
3. No build step required; `includes.js` handles templating on the client.

> _Tip:_ If you deploy to a subpath (e.g. `https://example.com/plumber/`), the dynamic rewriting will adjust links automatically.

## Customization

- Edit business details in the schema blocks in `<head>` sections.
- Update phone numbers, WhatsApp links, and email addresses throughout the HTML or in the partials.
- Replace the form `action` attribute with your endpoint (Formspree, custom backend, etc.).
- Modify colors by adjusting CSS variables in `plumber.css`.

## Maintenance

Because the header, footer, and other common elements are stored in `partials/`, updating them in one place propagates across all pages without manual copy/paste.

## Notes

- The root `index.html` outside this folder (in repo root) is unrelated; it's a marketing site for Ryder Web Solutions.
- When pushing changes to GitHub, connected hosts like Vercel will automatically redeploy.

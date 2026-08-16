# JAY / NATHI — Luxury Creator Website

A static GitHub Pages portfolio for JAY / NATHI, built with semantic HTML, CSS and vanilla JavaScript. A C# API and Java/Spring starter are included as optional backend foundations for a future contact form or campaign tooling.

## IMPORTANT: fixing the missing-image problem

GitHub Pages is case-sensitive and the deployed artifact must contain `index.html` at the top level. This package is intentionally **flat**: upload the contents of this folder into the root of your GitHub repository, not the outer folder itself. The image folder must sit beside `index.html`:

```
index.html
styles.css
script.js
favicon.svg
assets/
  hero-beach.webp
  hero-beach.png
  ...
```

The HTML uses relative paths like `./assets/hero-beach.webp`, so the images continue to work on a GitHub Pages project site.

## GitHub Pages

The included workflow deploys the repository root on every push to `main`.

1. Put these files in the repository root.
2. Push to `main`.
3. In **Settings → Pages**, choose **GitHub Actions** as the source.
4. Wait for the workflow to finish in the Actions tab.
5. Open the Pages URL shown by GitHub.

If the repository is named `<username>.github.io`, the site is normally available at `https://<username>.github.io/`. A project repository uses `https://<username>.github.io/<repository>/` unless you add a custom domain.

## Personalisation

Replace `YOUR-CREATOR-EMAIL@example.com` in `index.html` with your creator email before publishing.

Update the TikTok URL if your handle differs from `@jaeh___`.

## Backend options

GitHub Pages serves the static frontend. The C# and Java folders are starter API projects for a future deployment on a separate backend host.

# JAY / NATHI — Creator Website

A personal creator portfolio for Nkosinathi Mathenjwa, built with HTML, CSS and vanilla JavaScript.

The frontend presents fashion and lifestyle content, a visual portfolio, creator statistics and collaboration contact details.

## Frontend features

- Responsive layouts and mobile navigation.
- Scroll-based reveals and animated number counters.
- A visual portfolio with WebP images and PNG fallbacks.
- Email, Instagram and TikTok contact links.
- A GitHub Actions workflow for publishing the static site to GitHub Pages.

## View locally

Run from the repository root:

```bash
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | Website content and structure |
| `styles.css` | Layout, visual design and responsive styles |
| `script.js` | Mobile navigation, scroll effects and counters |
| `assets/` | Portfolio images |
| `favicon.svg` | Site icon |
| `.github/workflows/static.yml` | GitHub Pages deployment |
| `Program.cs`, `JayNathi.CreatorApi.csproj` | Optional C# API prototype |
| `pom.xml`, `src-main.txt` | Java/Spring starter reference |

## GitHub Pages

The deployment workflow packages the frontend files and image assets. In the repository's **Settings → Pages**, choose **GitHub Actions** as the source, then use the deployment URL shown in the Actions run.

Keep `assets/` next to `index.html`. The site uses relative image paths so it can run under a GitHub Pages project URL.

## Backend status

The published frontend is a static site. Contact links open the visitor's email application; the frontend does not submit to an API.

The C# files are a starter API with creator information and a sample contact endpoint. The endpoint currently validates input and returns a response; it does not send email or persist messages.

The Java example in `src-main.txt` is a reference that must be placed in the Java source directory before it can be built. Neither backend is deployed by the Pages workflow.

**Author:** Nkosinathi Mathenjwa

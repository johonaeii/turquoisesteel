# Turquoise Steel Site Audit (Phase 0)

Audited 2026-10-19 against the live site `https://turquoisesteel.live` and the `main` branch at `047a9a8`.
No code was changed for this audit.

Effort: **S** = under an hour, **M** = a few hours, **L** = a day or more.

## Repo map

| Item | Finding |
| --- | --- |
| Stack | **Vite 5 + React 18 single-page app.** It is not plain HTML. All page content renders client-side from `src/App.jsx` into `<div id="root">`. |
| Files | `index.html` (the only build entry), `src/App.jsx` (all sections, ~900 lines), `src/style.css`, `src/main.jsx`, `thank-you.html` (repo root), `public/images/*` |
| Pages | One real page (`/`), with sections reached by anchor links: `#music #video #shows #booking #subscribe #contact`. `thank-you.html` exists in the repo but **is not built** (see Bug 4). |
| Build / hosting | `netlify.toml`: `npm run build` publishes `dist`, and a catch-all rewrite sends `/* → /index.html` (200). There is no `_redirects` or `_headers` file. |
| Bandsintown | **Not the official widget.** `BandsintownTourDates` in `src/App.jsx` fetches `https://rest.bandsintown.com/artists/id_15599939/events?app_id=js_<hostname>&date=upcoming` and renders the list in React. The API works today: it returns `[]` for upcoming dates and 16 past events (2025-07-12 to 2026-10-11). |
| Forms | Netlify Forms `newsletter` (email) and `contact` (name, email, message). Both have hidden copies in `index.html` so Netlify can detect them, a honeypot (`bot-field`), and `action="/thank-you.html"`. |
| Meta | `<title>`, meta description, `theme-color`, and one 64px PNG favicon. Nothing else. |
| Assets | `homeland-poster.png` 812×816, **1.2 MB**. `background.jpg` 1440×1920, 288 KB. `band-logo.png` 512×512, 80 KB. `favicon-64.png` and `favicon-64.svg` (the SVG is unused). `splash.jpg` is byte-identical to `background.jpg` and unused. |
| Fonts | System fonts only, no webfonts. The display stack (`Baskerville Old Face`, `Palatino Linotype`, `Book Antiqua`) and the script stack (`Segoe Script`…) are Windows fonts, so Mac, iOS, Android, and Linux fall back to a different serif and cursive. |
| Console | No errors or warnings at 375, 768, 1440, or 1900px. |

## Lighthouse baseline (mobile, live site)

| Page | Perf | A11y | Best Practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` (run 1) | 96 | 100 | 79 | 92 | 2.5 s | 0 | 10 ms |
| `/` (run 2) | 75 | 100 | 79 | 92 | 8.1 s | 0 | 10 ms |
| `/thank-you.html`\* | 62 | 100 | 79 | 92 | 13.7 s | 0 | 0 ms |

\* This URL actually serves the home page (Bug 4). Performance varies a lot from run to run because of the 1.2 MB poster PNG.
Best Practices loses points for third-party cookies from the Spotify embeds (`sp_t`, `sp_landing`). SEO loses points for an invalid `robots.txt` (Bug 5).

---

## 1. Bugs

| # | Issue | Confirmed cause | Effort |
| --- | --- | --- | --- |
| 1.1 | **Hero heading clips or fades the last "E".** It happens at **≥ ~700px**, not just at 1900px. | `.title` is `font-size: clamp(3.7rem, 8.5vw, 6.7rem)` (107px on desktop) with `max-width: 11ch`. At 1440px, "TURQUOISE" is 682px wide but the `h1` box is 590px, so the text runs **92px past the `h1`** and **33px into the poster column**. The heading uses `background-clip: text` with a transparent fill, and the gradient only paints inside the `h1` box, so glyphs past the box turn invisible. That is the fade. At 768px the text overflows the box by 56px with the same result. How wide the text is depends on which fallback font the visitor has, so the clip is worse or better per OS. | S |
| 1.2 | **Large empty gap above the hero on desktop.** | The gap from the nav to the "Homeland era" kicker is **286px** at 1440px. Of that, **197px** comes from `.hero__layout { align-items: end }`: the left copy (836px tall) is pinned to the bottom of the taller right stack (1032px). The rest is `.hero { padding-top: 94px }` plus `.hero__content` top padding (up to 78px). | S |
| 1.3 | **Cover art says "Coming 2/20/26".** The copy says "Homeland out now." | **Image problem, report only.** The text is baked into `public/images/homeland-poster.png`. The file also looks like a cropped screenshot: there is a small UI artifact in the bottom-right corner, it is 812×816 rather than square, and it is a 1.2 MB PNG. **Needs:** a final, clean square cover from the band. Note: the site copy "Release date February 20, 2026" agrees with the poster, so only the "Coming" wording is stale. | — (band) |
| 1.4 | **Form confirmation page is missing from the build.** | Vite only builds `index.html`, so `thank-you.html` never reaches `dist/`. After a fan subscribes or a booker sends the contact form, Netlify shows the action URL `/thank-you.html`, and the catch-all rewrite serves **the home page**. The visitor gets no confirmation and may think the form failed. Verified live: `/thank-you.html` returns the home-page HTML. | S |
| 1.5 | **`robots.txt`, `sitemap.xml`, `favicon.ico`, and any made-up URL return the home page with status 200.** | The catch-all rewrite `/* → /index.html` in `netlify.toml`. Lighthouse reports `robots.txt` invalid (39 errors). Every unknown URL is a soft 404. The site has no client-side router, so the rewrite does nothing useful. | S |
| 1.6 | **Empty Shows panel.** | When the API returns `[]`, the panel shows one line ("No upcoming Turquoise Steel dates are listed…") plus a "Track future shows" button. The panel is 84px of content stretched to **435px** on desktop, because grid rows stretch to the height of the sidebar. | S–M |
| 1.7 | **"Open artist page" and "Stream the catalog" go to Spotify *search results*, not the artist page.** | `ARTIST_SPOTIFY_URL = open.spotify.com/search/Turquoise%20Steel`. The band's own Bandsintown profile lists the real artist page `open.spotify.com/artist/4ULJRHYFwd02rdOecRAa00`, plus `youtube.com/@TurquoiseSteel` and Apple Music. **Needs approval** to use these, since they don't appear on the site today. | S |
| 1.8 | Newsletter signups would see "Your message is on its way" on the thank-you page. | `thank-you.html` is one page shared by both forms, and its copy is written for the contact form. | S |

## 2. Booking-conversion problems

| # | Issue | Detail | Effort |
| --- | --- | --- | --- |
| 2.1 | **The empty Shows panel says "inactive" to a booker.** | The band is actually busy: Bandsintown lists **16 shows in the last 15 months**. They include Crawdaddy Blues Festival (May 2026), Canyon Blues & Jazz Memorial Day Blues Festival (May 2026), Harvest Wine & Music Festival (Sep 2026), Bands of Enchantment Live Filming (Sep 18 2026), and JUNO (Oct 11 2026), plus bills with Levi Platero, DK Harrell, and Ally Venable. None of this is visible on the site. **Decision for you:** the brief says to seed `data/past-shows.json` by hand with one entry. The same component could also read `date=past` from Bandsintown, so past shows stay current with no manual upkeep. (Note: Bandsintown has no KiMo Theatre venue for Sept 18. The band typed the event name into the venue field.) | S–M |
| 2.2 | **Shows sidebar has five CTA-looking elements.** | Three tags styled like buttons ("Official tickets", "Set reminders", "Booking inquiries") plus two buttons ("View full calendar", "Booking info"). In the empty state, the panel adds a sixth ("Track future shows"). "Booking info" goes to `#contact`, not `#booking`. | S |
| 2.3 | **Nav has three booking/contact items.** | "Booking" and "Book a Show" both link to `#booking`, and "Contact" sits next to them. The footer repeats "Booking". | S |
| 2.4 | **No booking page and no booking-specific inquiry.** | "Book the band" leads to the general contact form (name, email, message), which has no event type, date, city, or budget. Bookers can't qualify themselves, and the band gets thin leads. | L (Phase 2) |
| 2.5 | **No press materials.** | No one-sheet, press photos, logo download, stage plot, or rider. These are table stakes for festival and casino buyers. | M (Phase 2, needs files) |
| 2.6 | **Brief conflict: set length and travel.** | The site already states "Live sets: 45 to 90 minutes" and "Travel: Southwest and regional routing". Phase 2 marks set lengths and travel radius `[[NEEDS]]`. **Decision for you:** reuse the existing copy, or replace it with a placeholder until the band confirms? | — |
| 2.7 | Hero CTAs are fan-only. | "Hear Homeland" and "See upcoming shows" appear, but there is no booking CTA above the fold. The nav "Book a Show" button covers this, but it hides on scroll. | S |
| 2.8 | Fan list split risk. | The existing form is named `newsletter`. Phase 3 introduces `fan-list`. **Decision for you:** keep `newsletter` as the single list, or start `fan-list` and export the old entries once. | — |

## 3. SEO and link sharing

| # | Issue | Detail | Effort |
| --- | --- | --- | --- |
| 3.1 | **Content is client-rendered only.** | The served HTML has no headings or body text, only `<div id="root">`. Google runs JavaScript, but link-preview bots (iMessage, Facebook, Slack, LinkedIn) and many other crawlers don't. All title, description, OG, and JSON-LD tags therefore **must be static in each page's HTML `<head>`**, not injected by React. Prerendering would add a build step, which is out of scope, so I'm flagging it only. | — |
| 3.2 | Only one indexable URL. | Everything is anchors on `/`. `/booking` and `/live` need their own HTML entries (Vite multi-page `build.rollupOptions.input`. This is configuration only, with no new dependency). | M |
| 3.3 | No canonical URL. | — | S |
| 3.4 | No Open Graph or Twitter card tags, and no share image. | No suitable 1200×630 image exists: the photos are 1440×1920 portrait and the poster is square with stale text. → `[[NEEDS: share image]]` | S |
| 3.5 | Incomplete favicon set. | Only a 64px PNG is linked. No `favicon.ico` (that path serves HTML), no `apple-touch-icon`, no 32/16 sizes, no web manifest. An unused `favicon-64.svg` exists. | S |
| 3.6 | No structured data. | For `sameAs`, the on-site links are Instagram (a profile ✓), Bandsintown (a profile ✓), a YouTube **video** URL (not a profile), and a Spotify **search** URL (not a profile). Only Instagram and Bandsintown are valid `sameAs` values unless 1.7 is approved. | S |
| 3.7 | No `sitemap.xml` or valid `robots.txt`. | See 1.5. | S |
| 3.8 | `thank-you.html` has no description and no `noindex`. | — | S |

## 4. Accessibility and performance

| # | Issue | Detail | Effort |
| --- | --- | --- | --- |
| 4.1 | **Contrast: body text passes AA.** It reads faint partly because of the fallback font weight. | Measured on the actual card backgrounds: `--muted` (release-card description, card body) is **6.3–6.5:1**, `--muted-strong` (hero paragraph) is **9.6–10:1**, `--sand` eyebrows are **5.4–5.7:1**, and turquoise text is **5.4–6.9:1**. All pass AA (4.5:1). **Fails:** form placeholder text at **3.0:1**. Suggestion: raise `--muted` alpha from .72 to about .80 (≈7.3:1, AAA) and placeholders to about .62. | S |
| 4.2 | Focus states exist but have gaps. | `a`, `button`, `input`, and `textarea` get a 2px bone outline, but `select` (needed for Phase 2) is not covered. The nav hides on scroll-down, so a keyboard user tabbing into it can land on invisible links. Fix: show the nav on `:focus-within`. | S |
| 4.3 | Heading order and alt text are OK. | Lighthouse A11y is 100. Every meaningful image has accurate alt text (checked against the images), and decorative logos use `alt=""`. | — |
| 4.4 | **Images are far heavier than needed.** | The 1.2 MB poster PNG is loaded eagerly and is the LCP image. `background.jpg` (1440×1920) is shown at 220px wide, and the 512px logo is shown at 54px. Lighthouse estimates **1.3 MB savings with WebP** and **838 KB with right-sized images**. Rule 5 says not to alter image files. Adding **new** resized/WebP copies would leave the originals untouched. **Needs your approval.** | M |
| 4.5 | Third-party embeds load on page load. | Two Spotify iframes and one YouTube iframe (lazy, but still near the fold on desktop). They set third-party cookies, which costs Best Practices 79. A click-to-load facade (the same pattern Phase 2 asks for on the booking video) would fix both. | M |
| 4.6 | Unneeded preconnects. | Preconnects go to Spotify, YouTube, and Bandsintown `www`, none of which are above the fold. This competes with the LCP image. | S |
| 4.7 | Fonts differ by OS. | See Repo map. On iPhone and Mac the display serif and the script "stamp" font render as generic fallbacks. Shipping one self-hosted webfont would be a new asset, so this is your call. | M |
| 4.8 | Unused files. | `splash.jpg` (duplicate) and `favicon-64.svg`. The SVG can be reused in the favicon set. | S |

## Open questions before Phase 1

1. Use the band's Bandsintown-listed Spotify artist, YouTube channel, and Apple Music URLs (1.7 / 3.6)?
2. Past shows: hand-maintained JSON only (as the brief says), or also pull past dates from Bandsintown (2.1)?
3. Set length and travel: keep the existing "45 to 90 minutes" and "Southwest and regional" copy, or use placeholders (2.6)?
4. OK to add resized/WebP **copies** of images, leaving the originals untouched (4.4)?
5. Who is "Jona" for `NEEDS.md` ownership? I'm assuming it's you, the developer.

# NEEDS

Every `[[NEEDS: …]]` placeholder on the site, and other missing content. **Band** = Turquoise Steel / John Harvey. **Jona** = developer.

| Placeholder | File | What's missing | Who provides |
| --- | --- | --- | --- |
| `[[NEEDS: more past shows]]` | `src/App.jsx` (`RecentlyPlayed`), data in `data/past-shows.json` | Notable past shows that aren't on Bandsintown (venue, city, date). Bandsintown dates fill in automatically. | Band |
| `[[NEEDS: share image]]` | `index.html`, `thank-you.html` (HTML comments in `<head>`) | A 1200×630 JPG for link previews. Save as `public/images/share.jpg`, then add the `og:image` and `twitter:image` tags shown in the comment. | Band supplies photo/art, Jona adds it |
| Updated cover art (not a placeholder) | `public/images/homeland-poster.png` | The cover still says "Coming 2/20/26", and the file looks like a cropped screenshot. Needs a clean, final square cover. After replacing it, regenerate the `homeland-poster-*.webp` copies. | Band |

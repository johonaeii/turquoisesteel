# NEEDS

Every `[[NEEDS: …]]` placeholder on the site, and other missing content. **Band** = Turquoise Steel / John Harvey. **Jona** = developer.

| Placeholder | File | What's missing | Who provides |
| --- | --- | --- | --- |
| `[[NEEDS: more past shows]]` | `src/shared.jsx` (`RecentlyPlayed`, shown on home and `/booking/`), data in `data/past-shows.json` | Notable past shows that aren't on Bandsintown (venue, city, date). Bandsintown dates fill in automatically. | Band |
| `[[NEEDS: share image]]` | `index.html`, `thank-you.html`, `booking/index.html`, `booking/thanks/index.html` (HTML comments in `<head>`) | A 1200×630 JPG for link previews. Save as `public/images/share.jpg`, then add the `og:image` and `twitter:image` tags shown in the comment. | Band supplies photo/art, Jona adds it |
| Updated cover art (not a placeholder) | `public/images/homeland-poster.png` | The cover still says "Coming 2/20/26", and the file looks like a cropped screenshot. Needs a clean, final square cover. After replacing it, regenerate the `homeland-poster-*.webp` copies. | Band |
| `[[NEEDS: Bands of Enchantment performance video URL]]` | `src/BookingPage.jsx` (`BOOKING_VIDEO_ID`) | YouTube link to the Bands of Enchantment performance. Only the video ID is needed (the part after `v=`). | Band supplies link, Jona adds it |
| `[[NEEDS: lineup size]]` | `src/BookingPage.jsx` (`QUICK_FACTS`) | How many musicians perform (and whether smaller configurations are available). | Band |
| `[[NEEDS: travel radius]]` | `src/BookingPage.jsx` (`QUICK_FACTS`) | How far the band will travel. The site currently says only "Southwest and regional routing". | Band |
| `[[NEEDS: file]]` × 5 | `src/BookingPage.jsx` (`PRESS_FILES`) | One-sheet PDF, hi-res press photos (ZIP), logo files (ZIP), stage plot PDF, and tech rider PDF. Upload them to `public/press/` using the filenames in `PRESS_FILES`, then set `available: true`. | Band supplies files, Jona uploads |
| `[[NEEDS: confirm ranges with band]]` | `src/BookingPage.jsx` (`BUDGET_RANGES`) | The budget ranges to offer in the booking form's dropdown. "Prefer to discuss" stays as an option. | Band |

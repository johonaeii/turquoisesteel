import { useEffect, useState } from "react";
import localPastShows from "../data/past-shows.json";

export const ARTIST_SPOTIFY_URL = "https://open.spotify.com/artist/4ULJRHYFwd02rdOecRAa00";
export const APPLE_MUSIC_URL = "https://music.apple.com/us/artist/turquoise-steel/1727025196";
export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@TurquoiseSteel";
export const YOUTUBE_LIVE_URL = "https://www.youtube.com/watch?v=DOsFYZJGd3w";
export const CONTACT_EMAIL = "turquoisesteel505@gmail.com";
export const BOOKING_HREF = "#booking";

export const NAV_LINKS = [
  { href: "#music", label: "Music", className: "nav__link" },
  { href: "#video", label: "Video", className: "nav__link" },
  { href: "#shows", label: "Shows", className: "nav__link" },
  { href: "#contact", label: "Contact", className: "nav__link" },
  { href: BOOKING_HREF, label: "Book a Show", className: "nav__cta" }
];

export const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/turquoise_steel", label: "Instagram" },
  { href: YOUTUBE_CHANNEL_URL, label: "YouTube" },
  { href: ARTIST_SPOTIFY_URL, label: "Spotify" },
  { href: APPLE_MUSIC_URL, label: "Apple Music" }
];

export const BANDSINTOWN_URL = "https://www.bandsintown.com/a/15599939-turquoise-steel";
export const BANDSINTOWN_ARTIST_ID = "id_15599939";
export const BANDSINTOWN_API_BASE = `https://rest.bandsintown.com/artists/${BANDSINTOWN_ARTIST_ID}/events`;

export const MOBILE_MENU_QUERY = "(max-width: 900px)";
export const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric"
});

export const MONTH_DAY_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric"
});

export const DAY_FORMATTER = new Intl.DateTimeFormat("en-US", {
  day: "numeric"
});

// Fixed to the production domain: Bandsintown returns no events for some app ids (e.g. js_localhost).
export function getBandsintownAppId() {
  return "js_turquoisesteel.live";
}

export function parseDateOnly(value) {
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatDateRange(startValue, endValue = startValue) {
  const start = parseDateOnly(startValue);
  const end = parseDateOnly(endValue || startValue);

  if (start.getTime() === end.getTime()) {
    return DATE_FORMATTER.format(start);
  }

  const sameMonth = start.getMonth() === end.getMonth();
  const sameYear = start.getFullYear() === end.getFullYear();

  if (sameMonth && sameYear) {
    return `${MONTH_DAY_FORMATTER.format(start)}-${DAY_FORMATTER.format(end)}, ${start.getFullYear()}`;
  }

  if (sameYear) {
    return `${MONTH_DAY_FORMATTER.format(start)} - ${DATE_FORMATTER.format(end)}`;
  }

  return `${DATE_FORMATTER.format(start)} - ${DATE_FORMATTER.format(end)}`;
}

export const POSTER_WEBP = "/images/homeland-poster-480.webp 480w, /images/homeland-poster-812.webp 812w";
export const LOGO_WEBP = "/images/band-logo-160.webp";
export const LOGO_SMALL = "/images/band-logo-160.png";

// WebP copies with the original file as the fallback <img>.
export function Picture({ webp, sizes, ...imgProps }) {
  return (
    <picture>
      <source type="image/webp" srcSet={webp} sizes={sizes} />
      <img {...imgProps} />
    </picture>
  );
}

export const RECENT_SHOWS_LIMIT = 8;
export const ARTIST_NAME = "Turquoise Steel";

export async function fetchBandsintownEvents(date, signal) {
  const params = new URLSearchParams({ app_id: getBandsintownAppId(), date });
  const response = await fetch(`${BANDSINTOWN_API_BASE}?${params.toString()}`, {
    headers: { Accept: "application/json" },
    signal
  });

  if (!response.ok) {
    throw new Error(`Bandsintown returned ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export function squashName(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

// The band enters the event name in Bandsintown's venue field, so it is used as the event title.
export function normalizePastBandsintownEvent(event) {
  const eventName = (event.title || event.venue?.name || `${ARTIST_NAME} live`).replace(/\s+/g, " ").trim();
  const coBill = (event.lineup || []).filter(
    (artist) => artist !== ARTIST_NAME && !squashName(eventName).includes(squashName(artist))
  );

  return {
    date: (event.starts_at || event.datetime).slice(0, 10),
    event: eventName,
    venue: "",
    city: event.venue?.location || [event.venue?.city, event.venue?.region].filter(Boolean).join(", "),
    coBill
  };
}

// Local entries win over Bandsintown entries on the same date (they carry venue details).
export function mergePastShows(localShows, bandsintownShows) {
  const byDate = new Map();
  bandsintownShows.forEach((show) => byDate.set(show.date, show));
  localShows.forEach((show) => byDate.set(show.date, { coBill: [], ...show }));

  return [...byDate.values()].sort((a, b) => b.date.localeCompare(a.date));
}

export function useRecentShows(limit = RECENT_SHOWS_LIMIT) {
  const [bandsintownShows, setBandsintownShows] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    fetchBandsintownEvents("past", controller.signal)
      .then((events) => {
        if (!controller.signal.aborted) {
          setBandsintownShows(events.map(normalizePastBandsintownEvent));
        }
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          console.error("Unable to load past Bandsintown dates", error);
        }
      });

    return () => controller.abort();
  }, []);

  return mergePastShows(localPastShows, bandsintownShows).slice(0, limit);
}

export function RecentlyPlayed({ limit, ctaHref = BOOKING_HREF, heading = "Recently played" }) {
  const shows = useRecentShows(limit);

  return (
    <div className="recentShows">
      {heading ? <h3 className="h3">{heading}</h3> : null}
      <ul className="shows" aria-label="Recently played shows">
        {shows.map((show) => (
          <li key={`${show.date}-${show.event}`} className="show show--past">
            <div className="show__dateBlock">
              <span className="show__date">{formatDateRange(show.date)}</span>
              <span className="show__location">{show.city}</span>
            </div>

            <div className="show__details">
              <span className="show__venue">{show.event}</span>
              {show.venue ? <span className="show__meta">{show.venue}</span> : null}
              {show.coBill.length ? <span className="show__meta">With {show.coBill.join(", ")}</span> : null}
            </div>
          </li>
        ))}
        <li className="show show--placeholder">[[NEEDS: more past shows]]</li>
      </ul>

      <div className="panel__actions">
        <a className="btn btn--primary" href={ctaHref}>
          Book Turquoise Steel for your event
        </a>
      </div>
    </div>
  );
}

export function SectionIntro({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={`section__head${align === "center" ? " section__head--center" : ""}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="h2">{title}</h2>
      {description ? <p className="p">{description}</p> : null}
    </div>
  );
}

export function SiteNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(MOBILE_MENU_QUERY).matches;
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      const y = window.scrollY;
      const nearTop = y < 18;

      if (nearTop) {
        setIsNavHidden(false);
      } else if (y > lastY + 6) {
        setIsNavHidden(true);
        setIsMenuOpen(false);
      } else if (y < lastY - 6) {
        setIsNavHidden(false);
      }

      lastY = y;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MENU_QUERY);

    const syncMenuMode = () => {
      setIsMobileMenu(mediaQuery.matches);

      if (!mediaQuery.matches) {
        setIsMenuOpen(false);
      }
    };

    syncMenuMode();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncMenuMode);
      return () => mediaQuery.removeEventListener("change", syncMenuMode);
    }

    mediaQuery.addListener(syncMenuMode);
    return () => mediaQuery.removeListener(syncMenuMode);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = isMenuOpen && isMobileMenu ? "hidden" : "";

    return () => {
      root.style.overflow = "";
    };
  }, [isMenuOpen, isMobileMenu]);

  const handleMenuClick = (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`nav${isNavHidden ? " nav--hidden" : ""}`} role="banner">
      <div className="nav__inner">
        <a className="brand" href="#top" aria-label="Turquoise Steel Home">
          <span className="brand__mark" aria-hidden="true">
            <Picture webp={LOGO_WEBP} src={LOGO_SMALL} width="512" height="512" alt="" decoding="async" />
          </span>
          <span className="brand__text">
            <span className="brand__eyebrow">Desert blues from Navajo country</span>
            <span className="brand__name">Turquoise Steel</span>
          </span>
        </a>

        <button
          className={`nav__toggle${isMenuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-controls="navMenu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((value) => !value)}
        >
          <span className="nav__toggleBars" aria-hidden="true"></span>
        </button>

        <nav
          className={`nav__menu${isMenuOpen ? " is-open" : ""}`}
          id="navMenu"
          aria-label="Primary"
          onClick={handleMenuClick}
        >
          {NAV_LINKS.map((link) => (
            <a key={`${link.href}-${link.label}`} className={link.className} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__title">Turquoise Steel</p>
          <p className="footer__copy">
            Copyright {year} Turquoise Steel. Navajo family blues-rock from Albuquerque, New Mexico.
          </p>
        </div>

        <div className="footer__links">
          <a href="#music">Music</a>
          <a href="#shows">Shows</a>
          <a href={BOOKING_HREF}>Booking</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}

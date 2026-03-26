import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#music", label: "Music", className: "nav__link" },
  { href: "#video", label: "Video", className: "nav__link" },
  { href: "#shows", label: "Shows", className: "nav__link" },
  { href: "#booking", label: "Booking", className: "nav__link" },
  { href: "#contact", label: "Contact", className: "nav__link" },
  { href: "#booking", label: "Book a Show", className: "nav__cta" }
];

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/turquoise_steel", label: "Instagram" },
  { href: "https://www.youtube.com/watch?v=DOsFYZJGd3w", label: "YouTube" },
  { href: "https://open.spotify.com/search/Turquoise%20Steel", label: "Spotify" }
];

const SHOWS = [
  {
    date: "May 5, 2026",
    venue: "Rhythm Room",
    location: "Phoenix, AZ",
    tickets: "https://www.bandsintown.com/e/1038427053-levi-platero-at-rhythm-room",
    cta: "Tickets"
  },
  {
    date: "May 16-17, 2026",
    venue: "Crawdaddy Blues Festival 2026",
    location: "Madrid, NM",
    tickets: "https://www.bandsintown.com/f/212111",
    cta: "Tickets"
  },
  {
    date: "May 24, 2026",
    venue: "Canyon Blues & Jazz Memorial Day Blues Festival 2026",
    location: "Placitas, NM",
    tickets: "https://www.bandsintown.com/f/208551",
    cta: "Tickets"
  }
];

const BANDSINTOWN_URL = "https://www.bandsintown.com/a/15599939-turquoise-steel";

const HERO_PILLS = [
  { label: "Home base", value: "Albuquerque, NM" },
  { label: "Sound", value: "Blues, rock, soul" },
  { label: "Live sets", value: "45 to 90 minutes" }
];

const HERO_FACTS = [
  { label: "Current release", value: "Homeland" },
  { label: "Release date", value: "February 20, 2026" },
  { label: "Routing", value: "Southwest + regional" }
];

const FEATURED_TRACKS = [
  {
    eyebrow: "Top track",
    title: "Navajo Outlaw",
    description: "On the dirt, on the rez, on the road, on the run.",
    embedTitle: "Spotify embed for Navajo Outlaw",
    embedSrc: "https://open.spotify.com/embed/track/7Eks90sec4CaJCiD5kK1iG?utm_source=generator",
    primaryHref: "https://open.spotify.com/track/7Eks90sec4CaJCiD5kK1iG",
    primaryLabel: "Play on Spotify",
    secondaryHref: "https://open.spotify.com/search/Turquoise%20Steel",
    secondaryLabel: "Browse artist page"
  },
  {
    eyebrow: "Latest single",
    title: "Hitchhiking Blues",
    description: "Not knowing where you're going, but knowing you'll meet dirt and rez cars.",
    embedTitle: "Spotify embed for Hitchhiking Blues",
    embedSrc: "https://open.spotify.com/embed/track/6yDxt1kXjggMO4TFYxQfVi?utm_source=generator",
    primaryHref: "https://open.spotify.com/search/Turquoise%20Steel",
    primaryLabel: "Follow on Spotify",
    secondaryHref: "https://open.spotify.com/track/6yDxt1kXjggMO4TFYxQfVi",
    secondaryLabel: "Save this track"
  }
];

const RELEASE_TAGS = ["Released February 20, 2026", "Desert-blues energy", "Turquoise grit"];

const BOOKING_POINTS = [
  "Family-led live act rooted in Navajo country storytelling and blues tradition.",
  "Flexible set times for festivals, listening rooms, community events, and private bookings.",
  "Direct communication for routing, technical details, and availability."
];

function SectionIntro({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={`section__head${align === "center" ? " section__head--center" : ""}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="h2">{title}</h2>
      {description ? <p className="p">{description}</p> : null}
    </div>
  );
}

function SiteNav({ isMenuOpen, isNavHidden, onToggleMenu, onMenuClick }) {
  return (
    <header className={`nav${isNavHidden ? " nav--hidden" : ""}`} role="banner">
      <div className="nav__inner">
        <a className="brand" href="#top" aria-label="Turquoise Steel Home">
          <span className="brand__mark" aria-hidden="true">
            <img src="/images/band-logo.png" width="52" height="52" alt="" />
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
          onClick={onToggleMenu}
        >
          <span className="nav__toggleBars" aria-hidden="true"></span>
        </button>

        <nav
          className={`nav__menu${isMenuOpen ? " is-open" : ""}`}
          id="navMenu"
          aria-label="Primary"
          onClick={onMenuClick}
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

function HeroSection() {
  return (
    <section id="top" className="hero">
      <div className="hero__backdrop" aria-hidden="true">
        <img
          src="/images/background.jpg"
          alt=""
          className="hero__backdropImage"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <div className="hero__scrim" aria-hidden="true"></div>
      <div className="hero__mesh" aria-hidden="true"></div>

      <div className="container hero__content">
        <div className="hero__layout">
          <div className="hero__copy">
            <p className="kicker">Desert blues from Navajo country</p>
            <h1 className="title">Turquoise Steel</h1>
            <p className="subtitle">
              Electric blues and desert rock with turquoise grit, road dust, and enough soul for late-night rooms,
              festival stages, and open-sky sets.
            </p>

            <div className="hero__actions">
              <a className="btn btn--primary" href="#music">
                Listen now
              </a>
              <a className="btn btn--ghost" href="#shows">
                See upcoming shows
              </a>
            </div>

            <ul className="hero__pills" aria-label="Band highlights">
              {HERO_PILLS.map((pill) => (
                <li key={pill.label} className="hero__pill">
                  <span className="hero__pillLabel">{pill.label}</span>
                  <strong>{pill.value}</strong>
                </li>
              ))}
            </ul>

            <div className="hero__release" role="note">
              <p className="hero__releaseLabel">Current release</p>
              <div className="hero__releaseRow">
                <div>
                  <p className="hero__releaseTitle">Homeland</p>
                  <p className="p p--muted">Released February 20, 2026.</p>
                </div>
                <a
                  className="link link--arrow"
                  href="https://open.spotify.com/search/Turquoise%20Steel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open artist page
                </a>
              </div>
            </div>
          </div>

          <div className="hero__stack">
            <figure className="posterCard">
              <div className="posterCard__frame">
                <img
                  src="/images/homeland-poster.png"
                  alt="Turquoise Steel Homeland poster featuring a desert landscape, silver typography, and turquoise stone details."
                  className="posterCard__image"
                />
              </div>
              <figcaption className="posterCard__meta">
                <p className="panel__eyebrow">Featured release</p>
                <h2 className="h3">Worn silver, turquoise stone, open desert.</h2>
                <p className="p p--muted">The artwork for Homeland carries the same wide-open Southwest spirit as the music.</p>
              </figcaption>
            </figure>

            <article className="crestCard">
              <div className="crestCard__mark">
                <img
                  src="/images/band-logo.png"
                  alt="Turquoise Steel emblem with crossed hammers and feathers."
                  className="crestCard__logo"
                />
              </div>
              <div className="crestCard__body">
                <p className="panel__eyebrow">Road-ready snapshot</p>
                <div className="hero__facts">
                  {HERO_FACTS.map((fact) => (
                    <div key={fact.label} className="statCard">
                      <span className="statCard__label">{fact.label}</span>
                      <strong className="statCard__value">{fact.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function MusicSection() {
  return (
    <section id="music" className="section">
      <div className="container">
        <SectionIntro
          eyebrow="Listen"
          title="New release energy, old-road soul"
          description="Songs for long roads, late nights, and open desert skies."
        />

        <article className="panel panel--feature musicFeature">
          <div className="musicFeature__art">
            <img src="/images/homeland-poster.png" alt="Homeland poster art for Turquoise Steel." />
          </div>

          <div className="musicFeature__body">
            <p className="panel__eyebrow">Homeland era</p>
            <h3 className="h3">Blues grit, desert air, and stories from home.</h3>
            <p className="p p--muted">
              From silver-edged slide work to turquoise-soaked atmosphere, these songs carry the spirit of the Southwest.
            </p>

            <div className="tagRow">
              {RELEASE_TAGS.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="panel__actions">
              <a
                className="btn btn--primary"
                href="https://open.spotify.com/search/Turquoise%20Steel"
                target="_blank"
                rel="noopener noreferrer"
              >
                Stream the catalog
              </a>
              <a className="btn btn--ghost" href="#subscribe">
                Get release updates
              </a>
            </div>
          </div>
        </article>

        <div className="grid grid--2 trackGrid">
          {FEATURED_TRACKS.map((track, index) => (
            <article key={track.title} className={`panel${index === 1 ? " panel--tinted" : ""}`}>
              <p className="panel__eyebrow">{track.eyebrow}</p>
              <h3 className="h3">{track.title}</h3>
              <p className="p p--muted">{track.description}</p>

              <div className="embed">
                <iframe
                  className="embed__frame embed__frame--spotify"
                  title={track.embedTitle}
                  src={track.embedSrc}
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>

              <div className="panel__actions">
                <a className="btn btn--secondary" href={track.primaryHref} target="_blank" rel="noopener noreferrer">
                  {track.primaryLabel}
                </a>
                <a className="btn btn--ghost" href={track.secondaryHref} target="_blank" rel="noopener noreferrer">
                  {track.secondaryLabel}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section id="video" className="section section--alt">
        <div className="container videoShell">
          <div className="videoShell__copy">
            <SectionIntro
              eyebrow="Watch"
              title="See the grit, volume, and room feel live"
              description="Get a feel for the live energy, the room, and the sound before the next show."
            />

            <div className="panel panel--soft">
              <p className="panel__eyebrow">Latest clip</p>
              <h3 className="h3">Turquoise Steel Live</h3>
              <p className="p p--muted">A live performance clip from the road.</p>

            <div className="panel__actions">
              <a
                className="btn btn--secondary"
                href="https://www.youtube.com/watch?v=DOsFYZJGd3w"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>

        <article className="panel panel--wide panel--video">
          <div className="embed embed--video">
            <iframe
              className="embed__frame"
              src="https://www.youtube.com/embed/DOsFYZJGd3w"
              title="Turquoise Steel live video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </article>
      </div>
    </section>
  );
}

function ShowsSection() {
  return (
    <section id="shows" className="section">
      <div className="container">
        <SectionIntro
          eyebrow="Shows"
          title="Upcoming dates across the Southwest"
          description="Catch the next show and head straight to the official ticket page for each event."
        />

        <div className="grid grid--shows">
          <div className="panel">
            <ul className="shows" aria-label="Show dates">
              {SHOWS.map((show) => (
                <li key={`${show.date}-${show.venue}`} className="show">
                  <div className="show__dateBlock">
                    <span className="show__date">{show.date}</span>
                    <span className="show__location">{show.location}</span>
                  </div>

                  <div className="show__details">
                    <span className="show__venue">{show.venue}</span>
                  </div>

                  <div className="show__right">
                    <a
                      className="btn btn--small btn--ghost"
                      href={show.tickets}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {show.cta}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="panel panel--accent showsAside">
            <p className="panel__eyebrow">Need more dates?</p>
            <h3 className="h3">See the full calendar or reach out about upcoming bookings.</h3>
            <p className="p p--muted">Follow the full show schedule, set reminders, and stay close to new announcements.</p>

            <div className="tagRow">
              <span className="tag">Official tickets</span>
              <span className="tag">Set reminders</span>
              <span className="tag">Booking inquiries</span>
            </div>

            <div className="panel__actions">
              <a
                className="btn btn--primary"
                href={BANDSINTOWN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View full calendar
              </a>
              <a className="btn btn--ghost" href="#contact">
                Booking info
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function BookingSection() {
  return (
    <section id="booking" className="section section--alt">
      <div className="container">
        <SectionIntro
          eyebrow="Booking"
          title="Built for festivals, listening rooms, and community stages"
          description="Turquoise Steel brings desert blues, road-tested rock, and family chemistry to rooms big and small."
        />

        <div className="grid grid--booking">
          <article className="panel">
            <p className="panel__eyebrow">Why promoters reach out</p>
            <h3 className="h3">A live set grounded in family chemistry and road-tested blues.</h3>
            <ul className="featureList">
              {BOOKING_POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>

          <article className="panel panel--bronze bookingCard">
            <p className="panel__eyebrow">Quick facts</p>
            <div className="bookingCard__grid">
              <div>
                <span className="bookingCard__label">Travel</span>
                <strong>Southwest and regional routing</strong>
              </div>
              <div>
                <span className="bookingCard__label">Set length</span>
                <strong>45 to 90 minutes</strong>
              </div>
              <div>
                <span className="bookingCard__label">Best fit</span>
                <strong>Festivals, listening rooms, community events</strong>
              </div>
            </div>

            <div className="panel__actions">
              <a className="btn btn--primary" href="#contact">
                Book the band
              </a>
              <a className="btn btn--ghost" href="mailto:turquoisesteel505@gmail.com">
                Email directly
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function SubscribeSection() {
  return (
    <section id="subscribe" className="section section--cta">
      <div className="container">
        <div className="cta">
          <div className="cta__copy">
            <div className="cta__crest" aria-hidden="true">
              <img src="/images/band-logo.png" alt="" width="88" height="88" />
            </div>

            <div>
              <p className="eyebrow">Stay on the trail</p>
              <h2 className="h2">Join for show drops, release news, and the next round of videos.</h2>
              <p className="p p--muted">Low-noise updates straight from the band.</p>
            </div>
          </div>

          <form
            className="cta__form"
            name="newsletter"
            method="post"
            action="/thank-you.html"
            data-netlify="true"
            netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="newsletter" />
            <p className="sr-only" hidden>
              <label htmlFor="newsletterBotField">Do not fill this out</label>
              <input id="newsletterBotField" name="bot-field" type="text" tabIndex="-1" autoComplete="off" />
            </p>
            <label className="sr-only" htmlFor="newsletterEmail">
              Email
            </label>
            <input
              id="newsletterEmail"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
            <button className="btn btn--primary" type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionIntro
          eyebrow="Contact"
          title="Reach Turquoise Steel directly"
          description="For booking requests, collaborations, and questions about the music, send a note and the band will be in touch."
        />

        <div className="grid grid--contact">
          <article className="panel">
            <p className="panel__eyebrow">Send a message</p>
            <form
              className="form"
              name="contact"
              method="post"
              action="/thank-you.html"
              data-netlify="true"
              netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="sr-only" hidden>
                <label htmlFor="contactBotField">Do not fill this out</label>
                <input id="contactBotField" name="bot-field" type="text" tabIndex="-1" autoComplete="off" />
              </p>

              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" autoComplete="name" required />
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" inputMode="email" autoComplete="email" required />
              </div>

              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="6" required></textarea>
              </div>

              <button className="btn btn--secondary" type="submit">
                Send message
              </button>
            </form>
          </article>

          <aside className="panel panel--tinted contactCard">
            <p className="panel__eyebrow">Direct contact</p>
            <h3 className="h3">Keep it simple.</h3>
            <p className="p p--muted">
              Email:{" "}
              <a className="link" href="mailto:turquoisesteel505@gmail.com">
                turquoisesteel505@gmail.com
              </a>
            </p>

            <div className="divider"></div>

            <div className="contactCard__stack">
              <div>
                <p className="contactCard__label">Best for</p>
                <p className="p p--muted">Booking holds, event logistics, and questions about the music.</p>
              </div>
              <div>
                <p className="contactCard__label">Follow along</p>
                <ul className="social">
                  {SOCIAL_LINKS.map((social) => (
                    <li key={social.label}>
                      <a className="link link--arrow" href={social.href} target="_blank" rel="noopener noreferrer">
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__title">Turquoise Steel</p>
          <p className="footer__copy">Copyright {year} Turquoise Steel. Blues and rock from Navajo country.</p>
        </div>

        <div className="footer__links">
          <a href="#music">Music</a>
          <a href="#shows">Shows</a>
          <a href="#booking">Booking</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);

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
    const root = document.documentElement;
    root.style.overflow = isMenuOpen && window.innerWidth <= 900 ? "hidden" : "";

    return () => {
      root.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuClick = (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <SiteNav
        isMenuOpen={isMenuOpen}
        isNavHidden={isNavHidden}
        onToggleMenu={() => setIsMenuOpen((value) => !value)}
        onMenuClick={handleMenuClick}
      />

      <main id="main">
        <HeroSection />
        <MusicSection />
        <VideoSection />
        <ShowsSection />
        <BookingSection />
        <SubscribeSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}

export default App;

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#music", label: "Music", className: "nav__link" },
  { href: "#video", label: "Video", className: "nav__link" },
  { href: "#shows", label: "Shows", className: "nav__link" },
  { href: "#booking", label: "Booking", className: "nav__link" },
  { href: "#subscribe", label: "Email", className: "nav__link" },
  { href: "#contact", label: "Contact", className: "nav__link" },
  { href: "#booking", label: "Book Us", className: "nav__cta" }
];

const SHOWS = [
  {
    date: "Apr 24, 2026",
    venue: "Rezz Rock n Blues - Flock of Moons",
    location: "Albuquerque, NM",
    tickets: "mailto:turquoisesteel505@gmail.com?subject=Tickets%20Inquiry%20-%20Apr%2024%2C%202026"
  },
  {
    date: "May 17, 2026",
    venue: "Crawdaddy Blues Fest",
    location: "New Mexico",
    tickets: "mailto:turquoisesteel505@gmail.com?subject=Tickets%20Inquiry%20-%20May%2017%2C%202026"
  },
  {
    date: "May 24, 2026",
    venue: "Canyon Blues",
    location: "New Mexico",
    tickets: "mailto:turquoisesteel505@gmail.com?subject=Tickets%20Inquiry%20-%20May%2024%2C%202026"
  }
];

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/turquoise_steel", label: "Instagram" },
  { href: "https://www.youtube.com/watch?v=DOsFYZJGd3w", label: "YouTube" },
  { href: "https://open.spotify.com/search/Turquoise%20Steel", label: "Spotify" }
];

const HERO_FACTS = [
  { label: "Based in", value: "Albuquerque, NM" },
  { label: "Sound", value: "Blues, rock, soul" },
  { label: "Booking", value: "45 to 90 minute sets" }
];

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
          <span className="brand__icon" aria-hidden="true">
            <img src="/images/favicon-64.svg" width="40" height="40" alt="" />
          </span>
          <span className="brand__text">
            <span className="brand__eyebrow">Navajo blues band</span>
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
      <div className="hero__bg" aria-hidden="true">
        <img
          src="/images/splash.jpg"
          alt=""
          className="hero__bgImage"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <div className="hero__overlay" aria-hidden="true"></div>

      <div className="container hero__content">
        <div className="hero__layout">
          <div className="hero__main">
            <p className="kicker">Navajo Family Blues Band</p>
            <h1 className="title">Turquoise Steel</h1>
            <p className="subtitle">
              Electric blues and desert rock built for festival stages, intimate rooms, and late-night sets.
            </p>

            <div className="hero__actions">
              <a className="btn btn--primary" href="#music">
                Listen now
              </a>
              <a className="btn btn--ghost" href="#shows">
                See upcoming shows
              </a>
            </div>

            <div className="chip" role="note">
              <span className="chip__dot" aria-hidden="true"></span>
              <span>New music, videos, and booking info </span>
            </div>
          </div>

          <aside className="hero__panel" aria-label="Band overview">
            <p className="hero__panelLabel">Current snapshot</p>
            <div className="hero__facts">
              {HERO_FACTS.map((fact) => (
                <div key={fact.label} className="statCard">
                  <span className="statCard__label">{fact.label}</span>
                  <strong className="statCard__value">{fact.value}</strong>
                </div>
              ))}
            </div>

            <div className="hero__spotlight">
              <p className="hero__spotlightLabel">Featured track</p>
              <h2 className="hero__spotlightTitle">Hitchhiking Blues</h2>
              <p className="p p--muted">
                Latest release              </p>
              <a
                className="link link--arrow"
                href="https://open.spotify.com/track/6yDxt1kXjggMO4TFYxQfVi"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open on Spotify
              </a>
            </div>
          </aside>
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
          title="Music that lasts longer than dirt"
          description="Follow our Spotify profile for the latest releases, and keep an eye on this section for featured tracks and albums that deserve a deeper listen."
        />

        <div className="grid grid--2">
          <article className="panel">
            <p className="panel__eyebrow">Top track</p>
            <h3 className="h3">Navajo Outlaw</h3>
            <p className="p p--muted">On the dirt, on the rez, on the road, on the run.</p>

            <div className="embed">
              <iframe
                title="Spotify embed for Navajo Outlaw"
                style={{ borderRadius: "18px" }}
                src="https://open.spotify.com/embed/track/7Eks90sec4CaJCiD5kK1iG?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>

            <div className="panel__actions">
              <a
                className="btn btn--secondary"
                href="https://open.spotify.com/track/7Eks90sec4CaJCiD5kK1iG"
                target="_blank"
                rel="noopener noreferrer"
              >
                Play on Spotify
              </a>
              <a
                className="btn btn--ghost"
                href="https://open.spotify.com/search/Turquoise%20Steel"
                target="_blank"
                rel="noopener noreferrer"
              >
                Browse artist page
              </a>
            </div>
          </article>

          <article className="panel panel--tinted">
            <p className="panel__eyebrow">Latest release</p>
            <h3 className="h3">Hitchhiking Blues</h3>
            <p className="p p--muted">Not knowing where you're going, but knowing you'll meet dirt and rez cars.</p>

            <div className="embed">
              <iframe
                title="Spotify embed for Hitchhiking Blues"
                style={{ borderRadius: "18px" }}
                src="https://open.spotify.com/embed/track/6yDxt1kXjggMO4TFYxQfVi?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>

            <div className="panel__actions">
              <a
                className="btn btn--secondary"
                href="https://open.spotify.com/search/Turquoise%20Steel"
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow on Spotify
              </a>
              <a
                className="btn btn--ghost"
                href="https://open.spotify.com/track/6yDxt1kXjggMO4TFYxQfVi"
                target="_blank"
                rel="noopener noreferrer"
              >
                Save this track
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section id="video" className="section section--alt">
      <div className="container">
        <SectionIntro
          eyebrow="Watch"
          title="Watch our latest video"
          description="Live performance footage from the road."
        />

        <article className="panel panel--wide">
          <div className="panel__split">
            <div>
              <p className="panel__eyebrow">Live clip</p>
              <h3 className="h3">Turquoise Steel Live</h3>
              <p className="p p--muted">
                See us live
              </p>
            </div>

            <div className="panel__actions panel__actions--compact">
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

          <div className="embed embed--16x9">
            <iframe
              src="https://www.youtube.com/embed/DOsFYZJGd3w"
              title="YouTube video player"
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
          title="Upcoming dates and booking info"
          description="Key details like date, location, and ticket links are front and center, with a clear path to the full calendar."
        />

        <div className="panel">
          <ul className="shows" aria-label="Show dates">
            {SHOWS.map((show) => (
              <li key={show.date} className="show">
                <div className="show__dateBlock">
                  <span className="show__date">{show.date}</span>
                  <span className="show__location">{show.location}</span>
                </div>

                <div className="show__details">
                  <span className="show__venue">{show.venue}</span>
                </div>

                <div className="show__right">
                  <a className="btn btn--small btn--ghost" href={show.tickets}>
                    Tickets
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <div className="panel__actions panel__actions--right">
            <a
              className="btn btn--secondary"
              href="mailto:turquoisesteel505@gmail.com?subject=Upcoming%20Shows%20Request"
            >
              Request full calendar
            </a>
          </div>
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
          title="Turquoise Steel is available for bookings in 2026."
          description="Electric blues and desert rock built for festival stages, intimate rooms, and late-night sets."
        />

        <div className="grid grid--booking">
          <article className="panel">
            <p className="panel__eyebrow">Why book Turquoise Steel</p>
            <h3 className="h3">Built for intimate rooms and bigger community stages</h3>
            <ul className="featureList">
              {BOOKING_POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>

          <article className="panel panel--accent bookingCard">
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
                <span className="bookingCard__label">Genres</span>
                <strong>Blues, rock, alt-country textures</strong>
              </div>
            </div>

            <div className="panel__actions">
              <a className="btn btn--primary" href="#contact">
                Book the band
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
            <p className="eyebrow">Email list</p>
            <h2 className="h2">Join for show announcements, new releases, and unreleased demos.</h2>
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
          title="A cleaner contact area with a better mobile layout."
          description="Forms, direct email, and social links now sit inside a more balanced two-column section that collapses neatly for smaller screens."
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
            <h3 className="h3">Keep the conversation simple</h3>
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
                <p className="p p--muted">Booking requests, event questions, and schedule details.</p>
              </div>
              <div>
                <p className="contactCard__label">Social links</p>
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
          <p className="footer__copy">© {year} Turquoise Steel. Live blues and rock from Navajo country.</p>
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

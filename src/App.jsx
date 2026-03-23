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
    venue: "Rezz Rock n Blues • Flock of Moons | Albuquerque, NM",
    tickets: "mailto:turquoisesteel505@gmail.com?subject=Tickets%20Inquiry%20-%20Mar%2015%2C%202026"
  },
  {
    date: "May 17, 2026",
    venue: "Crawdaddy Blues Fest",
    tickets: "mailto:turquoisesteel505@gmail.com?subject=Tickets%20Inquiry%20-%20Apr%2002%2C%202026"
  },
  {
    date: "May 24, 2026",
    venue: "Canyon Blues",
    tickets: "mailto:turquoisesteel505@gmail.com?subject=Tickets%20Inquiry%20-%20Apr%2020%2C%202026"
  }
];

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/turquoise_steel", label: "Instagram" },
  { href: "https://www.youtube.com/watch?v=DOsFYZJGd3w", label: "YouTube" },
  { href: "https://open.spotify.com/search/Turquoise%20Steel", label: "Spotify" }
];

function SiteNav({ isMenuOpen, isNavHidden, onToggleMenu, onMenuClick }) {
  return (
    <header className={`nav${isNavHidden ? " nav--hidden" : ""}`} id="siteNav" role="banner">
      <div className="nav__inner">
        <a className="brand" href="#top" aria-label="Turquoise Steel Home">
          <span className="brand__icon" aria-hidden="true">
            <img src="/images/favicon-64.svg" width="40" height="40" alt="" />
          </span>
          <span className="brand__name">Turquoise Steel</span>
        </a>

        <button
          className="nav__toggle"
          id="navToggle"
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
        <div className="hero__card">
          <p className="kicker">Navajo Family Blues Band</p>
          <h1 className="title">Turquoise Steel</h1>
          <p className="subtitle">Rock from the rez that rocks</p>

          <div className="hero__actions">
            <a className="btn btn--primary" href="#music">
              Listen
            </a>
            <a className="btn btn--ghost" href="#subscribe">
              Join email list
            </a>
          </div>

          <div className="chip" role="note">
            <span className="chip__dot" aria-hidden="true"></span>
            <span>Electrifying blues band from Navajo country</span>
          </div>

          <div className="hero__meta">
            <span className="metaPill">Albuquerque, NM</span>
            <span className="metaPill">Blues / Rock</span>
            <span className="metaPill">30–90 min sets</span>
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
        <div className="section__head">
          <h2 className="h2">Music</h2>
          <p className="p">Latest release</p>
        </div>

        <div className="grid grid--2">
          <article className="panel">
            <h3 className="h3">Spotify • Top Track</h3>
            <p className="p p--muted">Top track spotlight: Navajo Outlaw.</p>

            <div className="embed">
              <iframe
                title="Second platform embed"
                style={{ borderRadius: "12px" }}
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
                Open in Spotify
              </a>
              <a
                className="btn btn--ghost"
                href="https://open.spotify.com/track/7Eks90sec4CaJCiD5kK1iG"
                target="_blank"
                rel="noopener noreferrer"
              >
                Share track
              </a>
            </div>
          </article>

          <article className="panel">
            <h3 className="h3">Spotify • Latest Release</h3>
            <p className="p p--muted">Featured single: Hitchhiking Blues.</p>

            <div className="embed">
              <iframe
                title="Spotify embed"
                style={{ borderRadius: "12px" }}
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
                Save the track
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
        <div className="section__head">
          <h2 className="h2">Video</h2>
          <p className="p">Our live clip</p>
        </div>

        <article className="panel">
          <h3 className="h3">Turquoise Steel Live</h3>

          <div className="embed embed--16x9">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/DOsFYZJGd3w"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>

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
        </article>
      </div>
    </section>
  );
}

function ShowsSection() {
  return (
    <section id="shows" className="section">
      <div className="container">
        <div className="section__head">
          <h2 className="h2">Upcoming Shows</h2>
          <p className="p"></p>
        </div>

        <div className="panel">
          <ul className="shows" aria-label="Show dates">
            {SHOWS.map((show) => (
              <li key={show.date} className="show">
                <div className="show__left">
                  <span className="show__date">{show.date}</span>
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
              See all
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
        <div className="section__head">
          <h2 className="h2">Booking</h2>
          <p className="p">Quick facts for promoters.</p>
        </div>

        <div className="grid grid--2">
          <article className="panel">
            <h3 className="h3">At a glance</h3>
            <ul className="bullets">
              <li>Based in Albuquerque, NM • Travel radius: TBD</li>
              <li>Genre tags: Blues / Rock / Alt</li>
              <li>Typical set length: 45–60 minutes</li>
            </ul>
          </article>

          <article className="panel panel--accent">
            <h3 className="h3">Ready to book?</h3>
            <p className="p p--muted">Availability</p>
            <div className="panel__actions">
              <a className="btn btn--primary" href="#contact">
                Book us
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
            <h2 className="h2">Join the mailing list</h2>
            <p className="p">Get show announcements + unreleased demos.</p>
          </div>

          <form
            className="cta__form"
            name="newsletter"
            method="post"
            action="/"
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
        <div className="section__head">
          <h2 className="h2">Contact</h2>
          <p className="p">Fast contact form + direct email + repeat socials.</p>
        </div>

        <div className="grid grid--2">
          <article className="panel">
            <form
              className="form"
              name="contact"
              method="post"
              action="/"
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

          <aside className="panel">
            <h3 className="h3">Direct</h3>
            <p className="p p--muted">
              Email: <a className="link" href="mailto:turquoisesteel505@gmail.com">turquoisesteel505@gmail.com</a>
            </p>

            <div className="divider"></div>

            <h3 className="h3">Social</h3>
            <ul className="social">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a className="link" href={social.href} target="_blank" rel="noopener noreferrer">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="divider"></div>

            <p className="p p--muted">Follow our socials</p>
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
        <p>
          © <span>{year}</span> Turquoise Steel
        </p>
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
    root.style.overflow = isMenuOpen && window.innerWidth <= 860 ? "hidden" : "";

    return () => {
      root.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 860) {
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

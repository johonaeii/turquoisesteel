import { useState } from "react";
import { CONTACT_EMAIL, RecentlyPlayed, SectionIntro, SiteNav, Footer } from "./shared";

// [[NEEDS: Bands of Enchantment performance video URL]] Paste the YouTube video ID here (the part after "v=").
const BOOKING_VIDEO_ID = "";

const PITCH =
  "Navajo family blues-rock from Albuquerque: blues, rock, soul, and Southwest storytelling in a live show suited to festivals, listening rooms, community stages, and late-night sets.";

const QUICK_FACTS = [
  { label: "Hometown", value: "Albuquerque, NM" },
  { label: "Genre", value: "Blues-rock: blues, rock, soul, and Southwest storytelling" },
  { label: "Best fit", value: "Festivals, listening rooms, community stages, late-night sets" },
  { label: "Lineup size", value: "[[NEEDS: lineup size]]", needs: true },
  { label: "Set lengths", value: "45 to 90 minutes" },
  { label: "Travel radius", value: "[[NEEDS: travel radius]]", needs: true }
];

// Set `available: true` once the file is uploaded to public/press/.
const PRESS_FILES = [
  { label: "One-sheet", format: "PDF", href: "/press/turquoise-steel-one-sheet.pdf", available: false },
  { label: "Hi-res press photos", format: "ZIP", href: "/press/turquoise-steel-press-photos.zip", available: false },
  { label: "Logo", format: "ZIP", href: "/press/turquoise-steel-logo.zip", available: false },
  { label: "Stage plot", format: "PDF", href: "/press/turquoise-steel-stage-plot.pdf", available: false },
  { label: "Tech rider", format: "PDF", href: "/press/turquoise-steel-tech-rider.pdf", available: false }
];

const SHORT_BIO =
  "Turquoise Steel is a Navajo family blues-rock band from Albuquerque, New Mexico. The band blends blues, rock, soul, and Southwest storytelling into a live show suited to festivals, listening rooms, community stages, and late-night sets. Their current release, Homeland, brings together desert blues, road-tested songs, and the band's roots in Navajo country.";

const LONG_BIO = [
  "Turquoise Steel is a Navajo family band from Albuquerque, New Mexico, blending blues, rock, soul, and Southwest storytelling into a distinct live sound. Their current release, Homeland, released February 20, 2026, brings together desert blues, road-tested songs, and the band's roots in Navajo country, capturing the family chemistry, songwriting, and regional identity that define Turquoise Steel onstage. The top track, “Navajo Outlaw” (“on the dirt, on the rez, on the road, on the run”), and the latest single, “Hitchhiking Blues,” carry the band's blues foundation and rock drive.",
  "Onstage, Turquoise Steel brings musicianship, family chemistry, and Southwest identity to festivals, listening rooms, community events, private events, and special programs, with sets from 45 to 90 minutes. Recent stages include the Crawdaddy Blues Festival, the Canyon Blues & Jazz Memorial Day Blues Festival, the Harvest Wine & Music Festival, and Bands of Enchantment at Albuquerque's KiMo Theatre."
];

const EVENT_TYPES = ["Festival", "Casino", "Venue/Bar", "Private Event", "Community/Cultural Event", "Other"];
const BUDGET_RANGES = ["[[NEEDS: confirm ranges with band]]", "Prefer to discuss"];

// Loads the YouTube player only after a click; until then it is a static thumbnail.
function VideoFacade({ videoId, title }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!videoId) {
    return (
      <div className="videoFacade videoFacade--placeholder">
        <span>[[NEEDS: Bands of Enchantment performance video URL]]</span>
      </div>
    );
  }

  if (isPlaying) {
    return (
      <div className="videoFacade">
        <iframe
          className="embed__frame"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  return (
    <button className="videoFacade" type="button" onClick={() => setIsPlaying(true)} aria-label={`Play video: ${title}`}>
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        width="480"
        height="360"
        loading="lazy"
        decoding="async"
      />
      <span className="videoFacade__play" aria-hidden="true"></span>
    </button>
  );
}

function EpkHero() {
  return (
    <section className="section epkHero">
      <div className="container epkHero__layout">
        <div className="epkHero__copy">
          <p className="eyebrow">Booking &amp; press kit</p>
          <h1 className="h2 epkHero__title">Book Turquoise Steel</h1>
          <p className="subtitle">{PITCH}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#inquiry">
              Send a booking inquiry
            </a>
            <a className="btn btn--ghost" href="#press">
              Press kit downloads
            </a>
          </div>
        </div>

        <div className="panel panel--wide panel--video">
          <p className="panel__eyebrow">Live at Bands of Enchantment</p>
          <VideoFacade videoId={BOOKING_VIDEO_ID} title="Turquoise Steel live at Bands of Enchantment" />
        </div>
      </div>
    </section>
  );
}

function QuickFacts() {
  return (
    <section id="facts" className="section section--alt">
      <div className="container">
        <SectionIntro eyebrow="Quick facts" title="At a glance" />
        <dl className="factGrid">
          {QUICK_FACTS.map((fact) => (
            <div key={fact.label} className="factGrid__item">
              <dt className="bookingCard__label">{fact.label}</dt>
              <dd className={fact.needs ? "needs" : undefined}>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function RecentShows() {
  return (
    <section id="recent" className="section">
      <div className="container">
        <SectionIntro eyebrow="Live history" title="Recently played" />
        <div className="panel">
          <RecentlyPlayed ctaHref="#inquiry" heading={null} />
        </div>
      </div>
    </section>
  );
}

function PressDownloads() {
  return (
    <section id="press" className="section section--alt">
      <div className="container">
        <SectionIntro eyebrow="Press" title="Press kit downloads" />
        <ul className="pressList">
          {PRESS_FILES.map((file) => (
            <li key={file.label} className="pressList__item">
              <span className="pressList__label">
                {file.label} <span className="pressList__format">{file.format}</span>
              </span>
              {file.available ? (
                <a className="btn btn--small btn--ghost" href={file.href} download>
                  Download
                </a>
              ) : (
                <span className="needs">[[NEEDS: file]]</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Bio() {
  return (
    <section id="bio" className="section">
      <div className="container">
        <SectionIntro eyebrow="Bio" title="About Turquoise Steel" />
        <div className="grid grid--booking">
          <article className="panel">
            <h3 className="h3">Long bio</h3>
            {LONG_BIO.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="p bio__text">
                {paragraph}
              </p>
            ))}
          </article>
          <article className="panel panel--tinted">
            <h3 className="h3">Short bio</h3>
            <p className="p bio__text">{SHORT_BIO}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function InquiryForm() {
  return (
    <section id="inquiry" className="section section--alt">
      <div className="container">
        <SectionIntro
          eyebrow="Booking inquiry"
          title="Tell us about your event"
          description="Share the basics and the band will follow up about availability, routing, and technical details."
        />

        <div className="grid grid--contact grid--start">
          <article className="panel">
            <form
              className="form form--booking"
              name="booking"
              method="post"
              action="/booking/thanks/"
              data-netlify="true"
              netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="booking" />
              <p className="sr-only" hidden>
                <label htmlFor="bookingBotField">Do not fill this out</label>
                <input id="bookingBotField" name="bot-field" type="text" tabIndex="-1" autoComplete="off" />
              </p>

              <div className="field">
                <label htmlFor="bookingName">Name</label>
                <input id="bookingName" name="name" type="text" autoComplete="name" required />
              </div>

              <div className="field">
                <label htmlFor="bookingOrg">Organization</label>
                <input id="bookingOrg" name="organization" type="text" autoComplete="organization" />
              </div>

              <div className="field">
                <label htmlFor="bookingEventType">Event type</label>
                <select id="bookingEventType" name="event-type" required defaultValue="">
                  <option value="" disabled>
                    Choose one
                  </option>
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="bookingDates">Preferred date(s)</label>
                <input id="bookingDates" name="preferred-dates" type="text" placeholder="e.g. June 12 or June 12-14" />
              </div>

              <div className="field">
                <label htmlFor="bookingCityVenue">City and venue</label>
                <input id="bookingCityVenue" name="city-venue" type="text" />
              </div>

              <div className="field">
                <label htmlFor="bookingAudience">Expected audience size</label>
                <input id="bookingAudience" name="audience-size" type="text" inputMode="numeric" />
              </div>

              <div className="field">
                <label htmlFor="bookingBudget">Budget range</label>
                <select id="bookingBudget" name="budget" defaultValue="">
                  <option value="" disabled>
                    Choose a range
                  </option>
                  {BUDGET_RANGES.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="bookingEmail">Email</label>
                <input id="bookingEmail" name="email" type="email" inputMode="email" autoComplete="email" required />
              </div>

              <div className="field">
                <label htmlFor="bookingPhone">Phone</label>
                <input id="bookingPhone" name="phone" type="tel" inputMode="tel" autoComplete="tel" />
              </div>

              <div className="field field--full">
                <label htmlFor="bookingMessage">Message</label>
                <textarea id="bookingMessage" name="message" rows="5"></textarea>
              </div>

              <div className="field--full">
                <button className="btn btn--primary" type="submit">
                  Send booking inquiry
                </button>
              </div>
            </form>
          </article>

          <aside className="panel panel--tinted contactCard">
            <p className="panel__eyebrow">Prefer email?</p>
            <h3 className="h3">Write to the band directly.</h3>
            <p className="p p--muted">
              <a className="link" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

function BookingPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <SiteNav />

      <main id="main">
        <EpkHero />
        <QuickFacts />
        <RecentShows />
        <PressDownloads />
        <Bio />
        <InquiryForm />
      </main>

      <Footer />
    </>
  );
}

export default BookingPage;

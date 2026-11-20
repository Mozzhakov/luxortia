import Eyebrow from "./eyebrow";

const images = {
  business: "/images/business_content.webp",
  event: "/images/event_content.webp",
  social_media: "/images/sm_content.webp",
  personal: "/images/personal_content.webp",
};

const services = [
  [
    "01",
    "BUSINESS CONTENT",
    "Restaurants, beauty, automotive, local businesses & more.",
    images.business,
  ],
  [
    "02",
    "EVENT COVERAGE",
    "Conferences, celebrations, corporate & weddings.",
    images.event,
  ],
  [
    "03",
    "SOCIAL MEDIA CONTENT",
    "Reels, TikToks, short-form videos that get attention.",
    images.social_media,
  ],
  [
    "04",
    "PERSONAL CONTENT",
    "Video portraits, lifestyle & personal projects.",
    images.personal,
  ],
];

export default function Services() {
  return (
    <section id="services" className="services section-glow">
      <div className="container services-layout">
        <div className="services-intro">
          <Eyebrow>SERVICES</Eyebrow>

          <h2>
            WHAT
            <br />I DO<span className="dot">.</span>
          </h2>

          <p>
            From scroll-stopping social content
            <br />
            to full-scale event coverage —
            <br />I bring your vision to life.
          </p>
        </div>

        <div className="service-list">
          {services.map(([num, title, copy, image]) => (
            <article className="service-row" key={num}>
              <b>{num}</b>

              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>

              <div
                className="service-image"
                style={{
                  backgroundImage: `url(${image})`,
                }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

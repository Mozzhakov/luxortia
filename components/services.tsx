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
    "Videos that showcase your products, services, and what makes your business worth choosing.",
    images.business,
  ],
  [
    "02",
    "EVENT COVERAGE",
    "Capture the highlights, atmosphere, and moments you’ll want to relive or share.",
    images.event,
  ],
  [
    "03",
    "SOCIAL MEDIA CONTENT",
    "Ready-to-post videos that keep your social media active and showcase what you offer.",
    images.social_media,
  ],
  [
    "04",
    "PERSONAL CONTENT",
    "Beautifully captured memories of the people, milestones, and moments that matter to you.",
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
          {/* Not sure where to start? I’ll help you figure it out.
From planning the shoot to delivering your finished video, I’ll guide you through the process. */}
          <p>
            Not sure where to start?
            <br />
            I’ll help you figure it out.
            <br />
            From planning the shoot to delivering your finished video,
            <br />
            I’ll guide you through the process.
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
          <p className="service-afterword">
            Available for one-time projects and ongoing content partnerships.
          </p>
        </div>
      </div>
    </section>
  );
}

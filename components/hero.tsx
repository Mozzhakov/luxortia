import { ArrowUpRight } from "lucide-react";

const heroImage = "/images/hero_image.webp";

export default function Hero() {
  return (
    <section
      id="top"
      className="hero section-photo"
      style={
        {
          "--photo": `url(${heroImage})`,
        } as React.CSSProperties
      }
    >
      <div className="hero-overlay" />

      <div className="container hero-content">
        <div className="hero-copy">
          <div className="availability">
            HOUSTON, TX <i /> AVAILABLE FOR PROJECTS
          </div>

          <h1>
            CONTENT
            <br />
            CREATOR
            {/* <span className="dot">.</span> */}
          </h1>
          {/* I create videos that help
           businesses stand out and turn 
           special moments into lasting memories. */}
          <p className="hero-description">
            I create videos that help businesses
            <br className="desktop" /> stand out and turn special moments
            <br className="desktop" /> into lasting memories.
          </p>

          <p className="signature">Yana Mozzhakova</p>

          <div className="signature-line" />
        </div>

        <div className="hero-card glass-card">
          <span>
            Creating content
            <br />
            that works.
          </span>

          <div className="card-line" />

          <small>CREATIVE APPROACH</small>
          <small>THOUGHTFUL PLANNING</small>
          <small>QUALITY CONTENT</small>

          <ArrowUpRight className="card-arrow" size={18} />
        </div>

        <div className="scroll-indicator">
          <span />
          SCROLL
        </div>
      </div>
    </section>
  );
}

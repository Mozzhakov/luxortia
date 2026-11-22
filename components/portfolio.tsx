"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import AccentTitle from "./accent-title";
import Eyebrow from "./eyebrow";

type PortfolioItem = {
  id: string;
  number: string;
  title: string;
  tags: string[];
  image: string;
};

type VideoItem = {
  key: string;
  name: string;
  url: string;
  size: number;
  lastModified: string | null;
};

const portfolio: PortfolioItem[] = [
  {
    id: "food",
    number: "01",
    title: "FOOD &\nHOSPITALITY",
    tags: ["Restaurants", "Cafés", "Bars"],
    image: "/images/food.webp",
  },
  {
    id: "beauty",
    number: "02",
    title: "BEAUTY\n& WELLNESS",
    tags: ["Beauty brands", "Skincare"],
    image: "/images/beauty.webp",
  },
  {
    id: "events",
    number: "03",
    title: "EVENTS\n& WEDDINGS",
    tags: ["Corporate events", "Weddings"],
    image: "/images/events.webp",
  },
  {
    id: "people",
    number: "04",
    title: "PEOPLE &\nLIFESTYLE",
    tags: ["Families", "Stories", "Moments"],
    image: "/images/people.webp",
  },
  {
    id: "automotive",
    number: "05",
    title: "AUTOMOTIVE\n& FITNESS",
    tags: ["Cars", "Fitness brands"],
    image: "/images/automotive.webp",
  },
];

export default function Portfolio() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [current, setCurrent] = useState<string | null>(null);
  const [displayedId, setDisplayedId] = useState<string | null>(null);

  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  const currentPortfolio = portfolio.find((item) => item.id === displayedId);

  const loadVideos = async (category: string) => {
    try {
      setLoadingVideos(true);
      setVideoError(null);
      setVideos([]);

      const response = await fetch(`/api/videos/${category}`);

      if (!response.ok) {
        throw new Error("Failed to load videos");
      }

      const data: VideoItem[] = await response.json();

      setVideos(data);
    } catch (error) {
      console.error("Failed to load portfolio videos:", error);

      setVideos([]);
      setVideoError("Failed to load videos");
    } finally {
      setLoadingVideos(false);
    }
  };

  const handleCardClick = async (id: string) => {
    if (current === id) {
      setCurrent(null);

      setTimeout(() => {
        setDisplayedId(null);
        setVideos([]);
        setVideoError(null);
      }, 750);

      return;
    }

    setDisplayedId(id);
    setCurrent(id);

    await loadVideos(id);
  };

  const closePortfolio = () => {
    setCurrent(null);

    setTimeout(() => {
      setDisplayedId(null);
      setVideos([]);
      setVideoError(null);
    }, 750);
  };

  const scrollPortfolio = (direction: "left" | "right") => {
    const container = scrollRef.current;

    if (!container) return;

    const firstCard = container.querySelector<HTMLElement>(".portfolio-card");

    if (!firstCard) return;

    const styles = window.getComputedStyle(container);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;

    const scrollAmount = firstCard.offsetWidth + gap;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="work" className="portfolio section-glow">
      <div className="container portfolio-layout">
        <div className="portfolio-intro">
          <Eyebrow>WORK</Eyebrow>

          <h2>
            <AccentTitle>PORTFOLIO</AccentTitle>
          </h2>
          {/* Explore real projects and see what we could create for your business, event, or personal story. */}
          <p>
            Explore real projects
            <br />
            and see what we could create
            <br />
            for your business, event, or personal story.
          </p>

          <div className="mini-line" />

          <div className="keywords">
            CINEMATIC <i>/</i> AUTHENTIC <i>/</i> IMPACTFUL
          </div>

          <div className="slider-controls">
            <button
              type="button"
              aria-label="Previous portfolio category"
              onClick={() => scrollPortfolio("left")}
            >
              <ArrowLeft />
            </button>

            <button
              type="button"
              aria-label="Next portfolio category"
              onClick={() => scrollPortfolio("right")}
            >
              <ArrowRight />
            </button>
          </div>

          <div className="progress">
            <span />
            <em>01 — 05</em>
          </div>
        </div>

        <div className="portfolio-scroll" ref={scrollRef}>
          {portfolio.map((item) => {
            const isCurrent = current === item.id;

            return (
              <button
                type="button"
                key={item.id}
                className={`portfolio-card ${isCurrent ? "current" : ""}`}
                aria-pressed={isCurrent}
                onClick={() => handleCardClick(item.id)}
                style={
                  {
                    "--photo": `url(${item.image})`,
                  } as React.CSSProperties
                }
              >
                <div className="card-shade" />

                <div className="card-top">
                  <small>{item.number}</small>

                  <h3>
                    {item.title.split("\n").map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </h3>

                  <ArrowRight size={18} />
                </div>

                <p>
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className={`portfolio-videos ${current ? "open" : ""}`}>
        <div className="container">
          {currentPortfolio && (
            <>
              <div className="portfolio-videos-header">
                <div>
                  <span className="portfolio-videos-number">
                    {currentPortfolio.number}
                  </span>

                  <h3>
                    {currentPortfolio.title.replace("\n", " ")}
                    <span className="dot">.</span>
                  </h3>
                </div>

                <button
                  type="button"
                  className="portfolio-videos-close"
                  onClick={closePortfolio}
                >
                  CLOSE
                </button>
              </div>

              {loadingVideos && (
                <p className="portfolio-videos-status">Loading videos...</p>
              )}

              {videoError && (
                <p className="portfolio-videos-status">{videoError}</p>
              )}

              {!loadingVideos && !videoError && videos.length === 0 && (
                <p className="portfolio-videos-status">No videos yet.</p>
              )}

              {!loadingVideos && !videoError && videos.length > 0 && (
                <div className="portfolio-video-grid">
                  {videos.map((video, index) => (
                    <div className="portfolio-video" key={video.key}>
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        src={video.url}
                      />

                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="portfolio-quote">
        <span>
          DIFFERENT STORIES.
          <br />
          SAME VISION.
        </span>

        <blockquote>“Every project deserves its own story.”</blockquote>

        <span>
          LET&apos;S CREATE
          <br />
          YOURS.
        </span>
      </div>
    </section>
  );
}

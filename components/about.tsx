import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";

import Eyebrow from "./eyebrow";

const aboutImage = "images/about_image.webp";

export default function About() {
  return (
    <section id="about" className="about">
      <div
        className="about-image"
        style={{
          backgroundImage: `url(${aboutImage})`,
        }}
      />

      <div className="container about-layout">
        <div />

        <div className="about-copy">
          <Eyebrow>ABOUT ME</Eyebrow>

          <h2>
            HI, I&apos;M YANA <span className="dot">.</span>
          </h2>

          <p>
            I&apos;m a content creator based in Houston,
            <br />
            specializing in cinematic mobile content
            <br />
            for brands, events and people.
          </p>

          <p>
            I believe in real moments, beautiful details
            <br />
            and content that drives results.
          </p>

          <a
            href="#contact"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "outline-button",
            )}
          >
            LET'S WORK TOGETHER
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </div>

        <div className="features glass-card">
          {[
            "Mobile-first approach",
            "Cinematic visual style",
            "Fast & reliable",
            "Creative & detail-oriented",
          ].map((feature) => (
            <p key={feature}>
              <i />
              {feature}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

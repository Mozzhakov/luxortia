"use client";

import { useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

import { Button } from "@/components/button";

import Eyebrow from "./eyebrow";

export default function Contact() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section id="contact" className="contact section-glow">
      <div className="container contact-layout">
        <div className="contact-info">
          <Eyebrow>LET&apos;S WORK TOGETHER</Eyebrow>

          <h2>
            LET&apos;S CREATE
            <br />
            SOMETHING
            <br />
            WORTH WATCHING<span className="dot">.</span>
          </h2>

          <div className="contact-links">
            <a
              href="https://instagram.com/mozzhakova_/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="instagram-mark" aria-hidden="true">
                <FaInstagram />
              </span>
              @mozzhakova_
            </a>

            <span />

            <a href="mailto:contact@luxortia.com">
              <Mail />
              contact@luxortia.com
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <input
              aria-label="Your name"
              name="name"
              placeholder="YOUR NAME"
              required
            />

            <input
              aria-label="Email or phone"
              name="contact"
              placeholder="EMAIL OR PHONE"
              required
            />
          </div>

          <select
            aria-label="Type of project"
            name="projectType"
            defaultValue=""
          >
            <option value="" disabled>
              TYPE OF PROJECT
            </option>

            <option value="brand">Content for brands</option>
            <option value="event">Event coverage</option>
            <option value="social">Social media content</option>
            <option value="personal">Personal content</option>
          </select>

          <div className="textarea-wrap">
            <textarea
              aria-label="Tell me about your project"
              name="message"
              maxLength={500}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="TELL ME ABOUT YOUR PROJECT"
            />

            <span>{message.length}/500</span>
          </div>

          <Button type="submit" size="lg" className="outline-button filled">
            Send message
            <ArrowUpRight data-icon="inline-end" />
          </Button>
        </form>
      </div>
    </section>
  );
}

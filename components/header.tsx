"use client";

import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";

import Logo from "./logo";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Logo />

      <nav className={open ? "nav open" : "nav"} aria-label="Main navigation">
        {["Work", "Services", "About", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setOpen(false)}
          >
            {item}
          </a>
        ))}
      </nav>

      <a
        href="#contact"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "outline-button header-cta",
        )}
      >
        Start a project
        <ArrowUpRight data-icon="inline-end" />
      </a>

      <ButtonMenu open={open} setOpen={setOpen} />
    </header>
  );
}

function ButtonMenu({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      className="menu-button"
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={() => setOpen((current) => !current)}
    >
      {open ? <X /> : <Menu />}
    </button>
  );
}

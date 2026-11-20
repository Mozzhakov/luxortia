import { ArrowUpRight } from "lucide-react";

import Logo from "./logo";

export default function Footer() {
  return (
    <footer>
      <Logo />

      <span>© 2025 YANA MOZZHAKOVA. ALL RIGHTS RESERVED.</span>

      <a href="#top">
        BACK TO TOP
        <ArrowUpRight size={14} />
      </a>
    </footer>
  );
}

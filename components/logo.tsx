import Image from "next/image";

const logoSrc = "/images/logo_lurortia.png";
export default function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Yana Mozzhakova video home">
      <Image src={logoSrc} alt="Luxortia logo" width={100} height={100} />
    </a>
  );
}

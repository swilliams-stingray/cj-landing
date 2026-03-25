import Image from "next/image";
import { SocialIcons } from "@/components/SocialIcons";
import { RotatingWords } from "@/components/RotatingWords";

export default function HoldingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero / Centre Block */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        {/* CJ Logo Mark */}
        <div
          className="fade-in-up mb-8"
          style={{ animationDelay: "0ms" }}
        >
          <Image
            src="/logo.jpg"
            alt="The Caymanian Journal"
            width={112}
            height={112}
            className="h-20 w-20 rounded-xl md:h-28 md:w-28"
            priority
          />
        </div>

        {/* Masthead */}
        <h1
          className="fade-in-up mb-3 text-center font-[family-name:var(--font-old-standard)] text-2xl font-bold uppercase tracking-[0.15em] text-text-primary md:text-4xl lg:text-[2.5rem]"
          style={{ animationDelay: "100ms" }}
        >
          The Caymanian Journal.
        </h1>

        {/* Tagline */}
        <p
          className="fade-in-up mb-8 text-center font-[family-name:var(--font-marion)] text-sm uppercase tracking-[0.2em] text-text-secondary md:text-base"
          style={{ animationDelay: "200ms" }}
        >
          Fearless. Fair. Independent.
        </p>

        {/* Divider */}
        <hr
          className="fade-in-up mb-8 w-20 border-t border-border"
          style={{ animationDelay: "300ms" }}
        />

        {/* Launching Soon */}
        <p
          className="fade-in-up mb-10 text-center font-serif text-xl font-bold uppercase tracking-[0.3em] text-accent-navy md:text-2xl"
          style={{ animationDelay: "400ms" }}
        >
          Launching Soon
        </p>

        {/* Rotating Words */}
        <div
          className="fade-in-up mb-10"
          style={{ animationDelay: "500ms" }}
        >
          <RotatingWords />
        </div>

        {/* Promo Video */}
        <div
          className="fade-in-up mb-10 w-full max-w-[640px] overflow-hidden rounded-lg"
          style={{ aspectRatio: "16/9", animationDelay: "600ms" }}
        >
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/W8usHMNdbHA"
            title="Promo Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Social Icons */}
        <div className="fade-in-up" style={{ animationDelay: "700ms" }}>
          <SocialIcons />
        </div>
      </main>

      {/* Footer */}
      <footer
        className="fade-in-up border-t bg-bg-surface px-4 py-6"
        style={{ borderColor: "var(--border-color)", animationDelay: "800ms" }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Stingray Logo */}
          <a
            href="https://stingraymedia.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://stingraymedia.com/wp-content/uploads/2024/11/logo-2.png"
              alt="Stingray Media"
              className="h-20 w-auto"
            />
          </a>

          {/* Copyright */}
          <p className="text-center text-xs uppercase tracking-[0.1em] text-text-secondary">
            &copy; 2026 The Caymanian Journal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

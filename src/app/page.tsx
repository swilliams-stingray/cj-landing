import { SocialIcons } from "@/components/SocialIcons";

export default function HoldingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero / Centre Block */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        {/* CJ Logo Mark */}
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-xl bg-accent-navy md:h-28 md:w-28">
          <span className="font-[family-name:var(--font-old-standard)] text-3xl font-bold text-white md:text-4xl">
            CJ
          </span>
        </div>

        {/* Masthead */}
        <h1 className="mb-3 text-center font-[family-name:var(--font-old-standard)] text-2xl font-bold uppercase tracking-[0.15em] text-text-primary md:text-4xl lg:text-[2.5rem]">
          The Caymanian Journal
        </h1>

        {/* Tagline */}
        <p className="mb-8 text-center font-[family-name:var(--font-marion)] text-sm uppercase tracking-[0.2em] text-text-secondary md:text-base">
          Fearless. Fair. Independent.
        </p>

        {/* Divider */}
        <hr className="mb-8 w-20 border-t border-border" />

        {/* Launching Soon */}
        <p className="mb-10 text-center font-serif text-xl font-bold uppercase tracking-[0.3em] text-accent-navy md:text-2xl">
          Launching Soon
        </p>

        {/* Promo Video Placeholder */}
        <div className="mb-10 flex w-full max-w-[640px] items-center justify-center rounded-lg border border-border bg-bg-surface" style={{ aspectRatio: "16/9" }}>
          <svg className="h-12 w-12 text-text-secondary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>

        {/* Social Icons */}
        <SocialIcons />
      </main>

      {/* Footer */}
      <footer
        className="border-t bg-bg-surface px-4 py-6"
        style={{ borderColor: "var(--border-color)" }}
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

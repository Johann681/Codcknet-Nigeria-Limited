"use client";

export default function Error({ reset }: { reset: () => void }) {
  return <main className="page-error"><img className="loading-mark" src="/images/image.png" alt="Codcknet logo" /><h1>Something needs attention.</h1><p>We could not load this page right now.</p><button className="hero-button" onClick={() => reset()}>TRY AGAIN</button></main>;
}

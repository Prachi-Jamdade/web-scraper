"use client";
import { useState } from "react";
import { config } from 'dotenv';
config(); 

export default function Home() {
  const [result, setResults] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleOnClick() {
    try {
      const isLocal = !!process.env.NEXT_PUBLIC_CHROME_EXECUTABLE_PATH;
    console.log("ENV: ", process.env.NEXT_PUBLIC_CHROME_EXECUTABLE_PATH);
      const results = await fetch("api/scraper", {
        method: "POST",
        
        body: JSON.stringify({}),
      });

      setResults(results);
      setError(null); 
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message);
      setResults(null); 
    }
  }

  return (
    <main className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold mb-8">Let&apos;s scrape something!</h1>
          <p className="mb-2">
            Click the button to test out your new scraper.
          </p>
          <p className="text-sm text-zinc-700 italic mb-6">
            Psst. Make sure you <a className="text-blue-500 underline" href="https://spacejelly.dev" target="_blank">build it first</a>!
          </p>
          <button className="btn btn-primary mb-6" onClick={handleOnClick}>
            Get Started
          </button>

          {error && (
            <div className="text-red-500 mb-4">Error: {error}</div>
          )}

          {result && (
            <div className="grid">
              <pre className="bg-zinc-200 text-left py-4 px-5 rounded overflow-x-scroll">
                <code>{JSON.stringify(result, null, 2)}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

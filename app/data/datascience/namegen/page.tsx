// pages/index.js
'use client'
import Head from 'next/head';
import { useState } from 'react';
import { generateStartupName } from './generateName';
import { middles, prefixes, suffixes } from './wordList';

export default function Home() {
  const [names, setNames] = useState<string[]>([]);
  const [numNames, setNumNames] = useState(20);
  const [loading, setLoading] = useState(false);

  const generateNames = () => {
    setLoading(true);
    const generatedNames = new Set();

    while (generatedNames.size < numNames) {
      const name = generateStartupName(prefixes, middles, suffixes);
      generatedNames.add(name);
    }

    setNames(Array.from(generatedNames) as string[]);
    setLoading(false);
  };

  const handleGenerate = () => {
    generateNames();
  };

  interface HomeProps {}

  const handleCopy = (name: string): void => {
    navigator.clipboard.writeText(name).then(() => {
      alert(`Copied "${name}" to clipboard!`);
    }).catch(err => {
      console.error('Failed to copy!', err);
    });
  };

  return (
    <div>
      <Head>
        <title>Startup Name Generator</title>
        <meta name="description" content="Generate unique and creative startup names" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Startup Name Generator
        </h1>

        <div>
          <label htmlFor="numNames">Number of Names:</label>
          <input
            type="number"
            id="numNames"
            value={numNames}
            onChange={(e) => setNumNames(parseInt(e.target.value))}
            min="1"
            max="100"
          />
          <button onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Names'}
          </button>
        </div>

        <div>
          {names.length > 0 ? (
            <ul>
              {names.map((name, index) => (
                <li key={index}>
                  <span>{name}</span>
                  <button onClick={() => handleCopy(name)}>Copy</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No names generated yet. Click Generate Names to start!</p>
          )}
        </div>
      </main>

      <footer>
        <a
          href="https://github.com/yourusername/startup-name-generator"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Next.js
        </a>
      </footer>
    </div>
  );
}

// pages/index.js

import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { prefixes, middles, suffixes } from '../data/wordLists';
import { generateStartupName } from '../utils/generateName';

export default function Home() {
  const [names, setNames] = useState([]);
  const [numNames, setNumNames] = useState(20);
  const [loading, setLoading] = useState(false);

  const generateNames = () => {
    setLoading(true);
    const generatedNames = new Set();

    while (generatedNames.size < numNames) {
      const name = generateStartupName(prefixes, middles, suffixes);
      generatedNames.add(name);
    }

    setNames(Array.from(generatedNames));
    setLoading(false);
  };

  const handleGenerate = () => {
    generateNames();
  };

  const handleCopy = (name) => {
    navigator.clipboard.writeText(name).then(() => {
      alert(`Copied "${name}" to clipboard!`);
    }).catch(err => {
      console.error('Failed to copy!', err);
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Startup Name Generator</title>
        <meta name="description" content="Generate unique and creative startup names" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Startup Name Generator
        </h1>

        <div className={styles.controls}>
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

        <div className={styles.namesList}>
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
            <p>No names generated yet. Click "Generate Names" to start!</p>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
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

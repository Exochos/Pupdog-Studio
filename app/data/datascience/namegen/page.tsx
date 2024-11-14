/* eslint-disable react/no-unescaped-entities */
// pages/index.tsx

'use client';

import Head from 'next/head';
import { useEffect, useState } from 'react';
import { generateStartupName } from './generateName';
import Notification from './Notification';
import { middles, prefixes, suffixes } from './wordList';
const Home: React.FC = () => {
  const [names, setNames] = useState<string[]>([]);
  const [numNames, setNumNames] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const generateNames = () => {
    setLoading(true);
    const generatedNames = new Set<string>();

    while (generatedNames.size < numNames) {
      const name = generateStartupName(prefixes, middles, suffixes);
      generatedNames.add(name);
    }

    setNames(Array.from(generatedNames));
    setLoading(false);
    setNotification({ message: 'Names generated successfully!', type: 'success' });
  };

  const handleGenerate = () => {
    generateNames();
  };

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(name)
      .then(() => {
        setNotification({ message: `Copied "${name}" to clipboard!`, type: 'success' });
      })
      .catch((err) => {
        console.error('Failed to copy!', err);
        setNotification({ message: 'Failed to copy!', type: 'error' });
      });
  };

  // Automatically dismiss notifications after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="min-h-screen bg-base-100 flex flex-col justify-center items-center">
      <Head>
        <title>Startup Name Generator</title>
        <meta name="description" content="Generate unique and creative startup names" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <main className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Startup Name Generator</h1>

        <div className="form-control mb-4">
          <label htmlFor="numNames" className="label">
            <span className="label-text">Number of Names:</span>
          </label>
          <input
            type="number"
            id="numNames"
            value={numNames}
            onChange={(e) => setNumNames(parseInt(e.target.value))}
            min={1}
            max={100}
            className="input input-bordered w-full"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
        >
          {loading ? 'Generating...' : 'Generate Names'}
        </button>

        <div className="mt-6">
          {names.length > 0 ? (
            <ul className="space-y-4">
              {names.map((name, index) => (
                <li key={index} className="flex justify-between items-center bg-base-200 p-4 rounded-lg">
                  <span className="text-lg">{name}</span>
                  <button
                    onClick={() => handleCopy(name)}
                    className="btn btn-outline btn-secondary btn-sm"
                  >
                    Copy
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No names generated yet. Click "Generate Names" to start!</p>
          )}
        </div>
      </main>

      <footer className="mt-8">
        <a
          href="https://github.com/yourusername/startup-name-generator"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Powered by Pupdog Studio
        </a>
      </footer>
    </div>
  );
};

export default Home;

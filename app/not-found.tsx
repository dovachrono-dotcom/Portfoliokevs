'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Create the audio element once
  useEffect(() => {
    const audio = new Audio('/fah.mp3');
    audioRef.current = audio;

    // Try autoplay immediately
    audio.play()
      .then(() => setHasInteracted(true))
      .catch(() => {
      });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Replay sound from the beginning every single call
  const replaySound = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    audio.play()
      .then(() => setHasInteracted(true))
      .catch(() => { });
  };

  return (
    <div className={styles.nfOverlay} onClick={replaySound}>
      <div className={styles.nfModal} onClick={(e) => e.stopPropagation()}>

        <img src="/error.png" alt="404 Error" className={styles.nfImage} />

        {/* Replay sound button */}
        <button
          className={styles.nfSoundBtn}
          onClick={replaySound}
        >
          {hasInteracted ? '▶ Play this to fix the 404' : '▶ Play this to fix the 404'}
        </button>
        <h1 className={styles.nfTitle}>404 – Page Not Found</h1>
        <p className={styles.nfText}>Oops !Nasaag kas multiverse bai</p>
        <Link href="/" className={styles.nfHomeButton}>← Go Home</Link>
      </div>
    </div>
  );
}

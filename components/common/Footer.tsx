"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { NAV_LINKS, PORTFOLIO } from "@/lib/portfolio";
import DoodleCrewFooter, { type CrewMember } from "@/components/ui/doodle-crew-footer";

const crew: CrewMember[] = [
  { kind: "yeti", letter: 0, seat: "front", offset: -.32, name: "Bruno", says: "Keep building." },
  { kind: "bird", letter: 1, seat: "top", offset: .02, name: "Pip", says: "Say hello!" },
  { kind: "ghost", letter: 2, seat: "behind", offset: .08, scale: .85, name: "Boo", says: "Hi there." },
  { kind: "kid", letter: 3, seat: "top", offset: -.05, scale: .9, name: "Juno", says: "One step at a time." },
  { kind: "cat", letter: 4, seat: "front", offset: .35, scale: .9, flip: true, name: "Patch", says: "Thanks for stopping by." },
];

export function Footer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [audioStatus, setAudioStatus] = useState("");
  async function toggleAudio() {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); return; }
    try { await audioRef.current.play(); setPlaying(true); setAudioStatus(""); }
    catch { setAudioStatus("Audio could not play. You can try again."); }
  }
  return (
    <>
      <DoodleCrewFooter
        id="site-footer"
        wordmark="KEVIN"
        brand="Kevin C. Mercado"
        blurb="Built with curiosity, from the Philippines."
        tagline="Thoughtful code. Useful experiences."
        columns={[
          { title: "Explore", links: [...NAV_LINKS.map((link) => ({ ...link })), { label: "Download CV", href: PORTFOLIO.cv, download: true }] },
          { title: "Elsewhere", links: [...PORTFOLIO.social.map((link) => ({ label: link.label, href: link.url })), { label: "Email me", href: `mailto:${PORTFOLIO.email}` }] },
        ]}
        actions={[]}
        copyright={`© ${new Date().getFullYear()} Kevin C. Mercado`}
        legal={[]}
        socials={[]}
        crew={crew}
        doodles={["star", "bolt", "sparkle", "plane", "heart"]}
        doodleCount={8}
        palette={{ background: "hsl(var(--background))", ink: "hsl(var(--foreground))", accent: "hsl(var(--primary))" }}
        fontFamily="var(--font-sora), sans-serif"
        serifFamily="var(--font-inter), sans-serif"
        height="0px"
        compact
        transparent
        utility={<div>
          <button type="button" onClick={toggleAudio} aria-pressed={playing}>{playing ? <Volume2 size={16} aria-hidden="true" /> : <VolumeX size={16} aria-hidden="true" />} Sound {playing ? "on" : "off"}</button>
          {audioStatus && <p role="status">{audioStatus}</p>}
        </div>}
      />
      <audio ref={audioRef} loop preload="none" src="/bgm1.mp3" onError={() => { setPlaying(false); setAudioStatus("Audio is unavailable. Please try again later."); }} />
    </>
  );
}

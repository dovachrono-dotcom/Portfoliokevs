"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { PORTFOLIO } from "@/lib/portfolio";
import styles from "@/app/page.module.css";

export function ContactActions() {
  const [status, setStatus] = useState("");
  const emailRef = useRef<HTMLAnchorElement>(null);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(PORTFOLIO.email);
      setStatus("Email copied. Ready when you are.");
    } catch {
      setStatus("Select and copy the email address, or tap it to open your email app.");
      emailRef.current?.focus();
    }
  }

  return (
    <div className={styles.contactActions}>
      <div className={styles.emailRow}>
        <a ref={emailRef} href={`mailto:${PORTFOLIO.email}`} className={styles.emailLink}>{PORTFOLIO.email}<ArrowUpRight size={21} aria-hidden="true" /></a>
        <button className={styles.copyButton} onClick={copyEmail} type="button" aria-label="Copy email address">{status.startsWith("Email copied") ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}</button>
      </div>
      <p className={styles.copyStatus} role="status" aria-live="polite">{status || "Say hello. My inbox is open."}</p>
    </div>
  );
}

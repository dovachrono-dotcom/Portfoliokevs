"use client";

import { useRef } from "react";
import { Check, Copy, Facebook, Github, Linkedin, Mail, Phone } from "lucide-react";
import { PORTFOLIO } from "@/lib/portfolio";
import { ScrollText } from "@/components/common/ScrollText";
import { ContactForm } from "./ContactForm";
import { PointerFigure } from "./PointerFigure";
import { useContactClipboard } from "./useContactClipboard";
import styles from "./Contact.module.css";

const phone = { value: PORTFOLIO.phone.display, href: PORTFOLIO.phone.href };
const socials = [
  { label: "LinkedIn", href: PORTFOLIO.social[1].url, Icon: Linkedin },
  { label: "GitHub", href: PORTFOLIO.social[0].url, Icon: Github },
  { label: "Facebook", href: PORTFOLIO.social[2].url, Icon: Facebook },
];

function SocialLinks({ className }: { className: string }) {
  return (
    <div className={`${styles.socials} ${className}`}>
      <p>You can also reach out through my socials</p>
      <div>{socials.map(({ label, href, Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={styles.socialLink}><Icon size={20} aria-hidden="true" /></a>)}</div>
    </div>
  );
}

export function ContactContent() {
  const { copied, announcement, copy } = useContactClipboard();
  const emailRef = useRef<HTMLAnchorElement>(null);
  const phoneRef = useRef<HTMLAnchorElement>(null);

  async function copyValue(kind: "email" | "phone") {
    const success = await copy(kind, kind === "email" ? PORTFOLIO.email : phone.value);
    if (success) return;
    const link = kind === "email" ? emailRef.current : phoneRef.current;
    if (!link) return;
    link.focus();
    const range = document.createRange();
    range.selectNodeContents(link);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }

  return (
    <section className={styles.page} aria-labelledby="contact-page-heading">
      <div className={styles.leftColumn}>
        <div className={styles.introBlock}>
          <ScrollText as="h1" id="contact-page-heading" className={styles.heading}>Let’s Talk.</ScrollText>
          <ScrollText className={styles.intro}>Have a project in mind or just want to say hi? I’m always open to new opportunities and collaborations.</ScrollText>
        </div>
        <div className={styles.cardsBlock}>
          <div className={styles.contactCard}>
            <span className={styles.iconTile}><Mail size={22} aria-hidden="true" /></span>
            <div className={styles.contactText}><p>Email me at</p><a ref={emailRef} href={"mailto:" + PORTFOLIO.email} className={styles.contactValue}>{PORTFOLIO.email}</a></div>
            <button type="button" className={styles.copyButton} onClick={() => void copyValue("email")} aria-label="Copy email address">{copied === "email" ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}</button>
          </div>
          <div className={styles.contactCard}>
            <span className={styles.iconTile}><Phone size={22} aria-hidden="true" /></span>
            <div className={styles.contactText}><p>Call or text lang sa</p><a ref={phoneRef} href={phone.href} className={styles.contactValue}>{phone.value}</a></div>
            <button type="button" className={styles.copyButton} onClick={() => void copyValue("phone")} aria-label="Copy phone number">{copied === "phone" ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}</button>
          </div>
          <p id="contact-copy-status" className={styles.copyFeedback} role="status" aria-live="polite">{announcement}</p>
        </div>
        <SocialLinks className={styles.desktopSocials} />
        <div className={styles.figureTrack}><div className={styles.figureArea}><PointerFigure /></div></div>
      </div>
      <div className={styles.formCard}><ContactForm onCopyEmail={() => copyValue("email")} emailCopied={copied === "email"} /></div>
      <SocialLinks className={styles.mobileSocials} />
    </section>
  );
}

"use client";

import { useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import { Check, Send } from "lucide-react";
import { PORTFOLIO } from "@/lib/portfolio";
import styles from "./Contact.module.css";

type Field = "firstName" | "lastName" | "email" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;
const fields: Field[] = ["firstName", "lastName", "email", "message"];

function fieldError(name: Field, value: string, typeMismatch = false) {
  if (name === "firstName" && !value.trim()) return "Please enter your first name.";
  if (name === "email" && !value.trim()) return "Please enter your email address.";
  if (name === "email" && typeMismatch) return "Please enter a valid email address.";
  if (name === "message" && !value.trim()) return "Please enter a message.";
  return "";
}

export function ContactForm({ onCopyEmail, emailCopied, disabled = false }: { onCopyEmail: () => Promise<void>; emailCopied: boolean; disabled?: boolean }) {
  const [values, setValues] = useState<Values>({ firstName: "", lastName: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("");
  const name = [values.firstName.trim(), values.lastName.trim()].filter(Boolean).join(" ");
  const body = values.message.trim() + "\n\nFrom: " + name + "\nReply to: " + values.email.trim();
  const draftHref = "mailto:" + PORTFOLIO.email + "?subject=" + encodeURIComponent("Portfolio inquiry from " + name) + "&body=" + encodeURIComponent(body);

  function update(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.currentTarget.name as Field;
    const value = event.currentTarget.value;
    const error = fieldError(field, value, event.currentTarget.validity.typeMismatch);
    setValues((current) => ({ ...current, [field]: value }));
    setStatus("");
    if (touched[field] || submitted) setErrors((current) => ({ ...current, [field]: error }));
  }

  function blur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.currentTarget.name as Field;
    const error = fieldError(field, event.currentTarget.value, event.currentTarget.validity.typeMismatch);
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: error }));
  }

  function openDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (disabled) return;
    const nextErrors: Errors = {};
    for (const field of fields) {
      const input = event.currentTarget.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement;
      const error = fieldError(field, values[field], input.validity.typeMismatch);
      if (error) nextErrors[field] = error;
    }
    setSubmitted(true);
    setErrors(nextErrors);
    const firstInvalid = fields.find((field) => nextErrors[field]);
    if (firstInvalid) {
      const input = event.currentTarget.elements.namedItem(firstInvalid);
      if (input instanceof HTMLElement) input.focus();
      return;
    }
    setStatus("Your email app should open with a draft ready to send.");
    window.location.href = draftHref;
  }

  return (
    <form className={styles.form} action={draftHref} onSubmit={openDraft} noValidate aria-label="Contact Kevin">
      <div className={styles.nameFields}>
        <div className={styles.field}>
          <label htmlFor="first-name">First Name</label>
          <input id="first-name" name="firstName" autoComplete="given-name" required maxLength={100} type="text" placeholder="Kevin" value={values.firstName} onChange={update} onBlur={blur} disabled={disabled} aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? "first-name-error" : undefined} />
          {errors.firstName && <p id="first-name-error" className={styles.fieldError}>{errors.firstName}</p>}
        </div>
        <div className={styles.field}>
          <label htmlFor="last-name">Last Name</label>
          <input id="last-name" name="lastName" autoComplete="family-name" maxLength={100} type="text" placeholder="Mercado" value={values.lastName} onChange={update} onBlur={blur} disabled={disabled} aria-invalid={!!errors.lastName} />
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="contact-email">Email Address</label>
        <input id="contact-email" name="email" autoComplete="email" required maxLength={254} type="email" placeholder="kevin@example.com" value={values.email} onChange={update} onBlur={blur} disabled={disabled} aria-invalid={!!errors.email} aria-describedby={errors.email ? "contact-email-error" : undefined} />
        {errors.email && <p id="contact-email-error" className={styles.fieldError}>{errors.email}</p>}
      </div>
      <div className={styles.field}>
        <label htmlFor="contact-message">Your Message</label>
        <div className={styles.messageWrap}>
          <textarea id="contact-message" name="message" required maxLength={2000} rows={5} placeholder="How can I help you?" value={values.message} onChange={update} onBlur={blur} disabled={disabled} aria-invalid={!!errors.message}
            aria-describedby={[errors.message ? "contact-message-error" : "", values.message.length > 400 ? "contact-message-count" : ""].filter(Boolean).join(" ") || undefined} />
          {values.message.length > 400 && <span id="contact-message-count" className={styles.characterCount} aria-live="polite" aria-atomic="true">{values.message.length} / 2,000</span>}
        </div>
        {errors.message && <p id="contact-message-error" className={styles.fieldError}>{errors.message}</p>}
      </div>
      <div className={styles.formActions}>
        <button type="submit" disabled={disabled} data-glow="button" className={styles.submit}>Open email draft <Send size={17} aria-hidden="true" /></button>
        <p className={styles.deliveryNote} role="status" aria-live="polite">{status || "This opens a draft in your email app. Send it there to deliver your message."}</p>
        {status && <a className={styles.fallbackLink} href={"mailto:" + PORTFOLIO.email} onClick={(event) => { event.preventDefault(); void onCopyEmail(); }}>{"Didn't open? Copy the email address"}{emailCopied && <Check size={15} aria-hidden="true" />}</a>}
      </div>
    </form>
  );
}

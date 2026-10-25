"use client";

import { useCallback, useEffect, useRef, useState } from "react";

async function writeClipboard(value: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    return legacyCopy(value);
  }
  return legacyCopy(value);
}

function legacyCopy(value: string) {
  const active = document.activeElement;
  const field = document.createElement("textarea");
  field.value = value;
  field.readOnly = true;
  field.setAttribute("aria-hidden", "true");
  field.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0";
  document.body.appendChild(field);
  field.select();
  let success = false;
  try {
    success = document.execCommand("copy");
  } catch {
    success = false;
  } finally {
    field.remove();
    if (active instanceof HTMLElement) active.focus({ preventScroll: true });
  }
  return success;
}

export function useContactClipboard() {
  const [copied, setCopied] = useState<"email" | "phone" | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const timer = useRef<number | undefined>(undefined);
  const request = useRef(0);
  useEffect(() => () => {
    window.clearTimeout(timer.current);
    request.current += 1;
  }, []);

  const copy = useCallback(async (kind: "email" | "phone", value: string) => {
    const attempt = ++request.current;
    const success = await writeClipboard(value);
    if (attempt !== request.current) return success;
    window.clearTimeout(timer.current);
    setCopied(success ? kind : null);
    setAnnouncement(success ? kind === "email" ? "Email copied" : "Number copied" : "Copy unavailable. Select the value and copy it manually.");
    if (success) timer.current = window.setTimeout(() => setCopied(null), 1500);
    return success;
  }, []);
  return { copied, announcement, copy };
}

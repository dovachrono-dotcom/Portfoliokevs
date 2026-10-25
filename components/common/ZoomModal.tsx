"use client";

import Image from "next/image";
import { X, ExternalLink } from "lucide-react";
import { Dialog } from "radix-ui";
import { useState, type ReactElement } from "react";
import styles from "./ZoomModal.module.css";

interface ZoomModalProps {
  imageUrl: string;
  title: string;
  description: string;
  children: ReactElement;
}

export function ZoomModal({ imageUrl, title, description, children }: ZoomModalProps) {
  const [imageState, setImageState] = useState<"loading" | "ready" | "error">("loading");

  return (
    <Dialog.Root onOpenChange={(open) => { if (open) setImageState("loading"); }}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <div className={styles.header}>
            <div>
              <Dialog.Title className={styles.title}>{title}</Dialog.Title>
              <Dialog.Description className={styles.description}>{description}</Dialog.Description>
            </div>
            <Dialog.Close className={styles.close} aria-label="Close certificate preview">
              <X size={21} aria-hidden="true" />
            </Dialog.Close>
          </div>
          <div className={styles.imageFrame}>
            {imageState === "loading" && <p role="status" className={styles.imageStatus}>Loading certificate…</p>}
            {imageState === "error" ? (
              <p role="status" className={styles.imageStatus}>The preview couldn’t load. Use “Open original” below to view the certificate.</p>
            ) : (
              <Image src={imageUrl} alt={`${title} certificate`} fill sizes="(max-width: 1100px) 95vw, 1060px" className={styles.image} onLoad={() => setImageState("ready")} onError={() => setImageState("error")} />
            )}
          </div>
          <div className={styles.footer}>
            <span>Press Escape to close</span>
            <a href={imageUrl} target="_blank" rel="noopener noreferrer">Open original <span className="sr-only">(opens in a new tab)</span><ExternalLink size={16} aria-hidden="true" /></a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

import Image from "next/image";
import { RESUME_DATA } from "@/lib/data";
import { Award, ExternalLink, Maximize2 } from "lucide-react";
import { ZoomModal } from "@/components/common/ZoomModal";
import styles from "./About.module.css";

export function Certificates() {
  if (!RESUME_DATA.certificates.length) return null;

  return (
    <section aria-labelledby="certifications-heading" className={styles.section}>
      <h2 id="certifications-heading" className={styles.sectionTitle}>
        <Award size={20} aria-hidden="true" /> Certifications
      </h2>
      <div className={styles.certificates}>
        {RESUME_DATA.certificates.map((cert) => (
          <article key={cert.name} className={styles.certificate}>
            <div className={styles.certificateThumbnail}>
              <Image src={cert.imageUrl} alt="" fill sizes="72px" />
            </div>
            <div className={styles.certificateInfo}>
              <h3>{cert.name}</h3>
              <p className={styles.meta}>{cert.issuer} · {cert.date}</p>
              <ZoomModal imageUrl={cert.fullCertificateUrl} title={cert.name} description={`${cert.issuer} · ${cert.date}`}>
                <button type="button" className={styles.certificateView} aria-label={`View ${cert.name} certificate`}>
                  View certificate <Maximize2 size={15} aria-hidden="true" />
                </button>
              </ZoomModal>
            </div>
            <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" className={styles.certificateExternal} aria-label={`Open ${cert.name} certificate in a new tab`}>
              <ExternalLink size={18} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

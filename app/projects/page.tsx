import { ProjectsList } from "@/components/features/projects/ProjectsList";
import { ScrollText } from "@/components/common/ScrollText";
import styles from "@/components/features/projects/Projects.module.css";
import { MotionProvider } from "@/components/provider/MotionProvider";

export default function ProjectsPage() {
  return (
    <MotionProvider>
    <div className={styles.page}>
      <header>
          <ScrollText as="h1" className={styles.heading}>My Projects</ScrollText>
          <ScrollText className={`${styles.intro} text-muted-foreground`}>
            Web and mobile applications I’ve built, from side projects to my school and capstone thesis work.
          </ScrollText>
      </header>
        <ProjectsList />
    </div>
    </MotionProvider>
  );
}

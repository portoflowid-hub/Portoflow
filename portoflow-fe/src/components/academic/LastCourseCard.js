// src/components/academic/LastCourseCard.js

import Image from 'next/image';
import styles from '@/styles/academic/Academic.module.css';
import { coursesData } from '@/data/academicData';

const LastCourseCard = () => {
  // Anggap kursus terakhir adalah kursus pertama dari data
  const lastCourse = coursesData[0];

  return (
    <div className={styles.lastCourseCard}>
      <Image src={lastCourse.image} alt={lastCourse.title} layout="fill" objectFit="cover" className={styles.cardBgImage} />
      <div className={styles.cardOverlay}></div>
      <div className={styles.lastCourseContent}>
        <span className={styles.lastCourseLabel}>Your last course</span>
        <h2 className={styles.lastCourseTitle}>{lastCourse.title}</h2>
        <p className={styles.lastCourseEpisode}>{lastCourse.episode}</p>
      </div>
    </div>
  );
};

export default LastCourseCard;
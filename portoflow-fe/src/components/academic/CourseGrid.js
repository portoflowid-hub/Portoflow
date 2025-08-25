// src/components/academic/CourseGrid.js

import Image from 'next/image';
import styles from '@/styles/academic/Academic.module.css';

const CourseGrid = ({ courses }) => {
  return (
    <div className={styles.courseGrid}>
      {courses.map(course => (
        <div key={course.id} className={styles.courseCard}>
          <Image src={course.image} alt={course.title} layout="fill" objectFit="cover" className={styles.cardBgImage} />
          <div className={styles.cardOverlay}></div>
          <h3 className={styles.courseCardTitle}>{course.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default CourseGrid;
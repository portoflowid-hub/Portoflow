import Image from 'next/image';
import styles from '@/styles/academic/Academic.module.css';

const LastCourseCard = ({ course }) => {
  if (!course) {
    // Tampilkan sesuatu jika tidak ada kursus terakhir
    return <div className={styles.lastCourseCard}>Tidak ada kursus untuk ditampilkan.</div>;
  }

  return (
    <div className={styles.lastCourseCard}>
      {/* Gunakan imageUrl dari data backend */}
      <Image src={course.imageUrl || '/default-course-image.png'} alt={course.title} layout="fill" objectFit="cover" className={styles.cardBgImage} />
      <div className={styles.cardOverlay}></div>
      <div className={styles.lastCourseContent}>
        <span className={styles.lastCourseLabel}>Your last course</span>
        <h2 className={styles.lastCourseTitle}>{course.title}</h2>
        {/* Sesuaikan dengan data yang ada, misal 'level' atau 'category' */}
        <p className={styles.lastCourseEpisode}>{course.category || course.level}</p>
      </div>
    </div>
  );
};

export default LastCourseCard;
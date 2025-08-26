import { useRef } from 'react';
import Image from 'next/image';
import styles from '@/styles/academic/Academic.module.css';
import { newVideosData } from '@/data/academicData';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const NewVideos = () => {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className={styles.newVideosSection}>
      <div className={styles.newVideosHeader}>
        <div className={styles.newVideosTitle}>
          <span className={styles.liveDot}></span>
          New Video
        </div>
        <div className={styles.navButtonsContainer}>
          <button onClick={() => scroll('left')} className={styles.navButton}><BsChevronLeft /></button>
          <button onClick={() => scroll('right')} className={styles.navButton}><BsChevronRight /></button>
        </div>
      </div>
      <div className={styles.videosCarousel} ref={carouselRef}>
        {newVideosData.map(video => (
          <div key={video.id} className={styles.courseCard}>
            <Image src={video.image} alt={video.title} layout="fill" objectFit="cover" className={styles.cardBgImage} />
            <div className={styles.cardOverlay}></div>
            <h3 className={styles.courseCardTitle}>{video.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewVideos;
import styles from '../../styles/home/Hero.module.css';
import { BsStars } from 'react-icons/bs';

const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.pill}>
        <BsStars color="yellow" />
        <span>Unlock Your Potential, Shape Your Future</span>
      </div>
      <h1 className={styles.headline}>
        Career-Focused and Skill-Driven Education for Real-World Success
      </h1>
      <button className={styles.ctaButton}>
        Explore Now!
      </button>
      <div className={styles.videoPlaceholder}>
        {/* video atau gambar */}
        <img src="/images/iseng.jpg" alt="anime girl" />
      </div>
    </div>
  );
};

export default Hero;
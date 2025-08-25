import styles from '../../styles/home/Vision.module.css';
import { BsStars } from 'react-icons/bs';
// import { PiEye } from 'react-icons/pi';

const Vision = () => {
  return (
    <section className={styles.visionSection}>
      <div className={styles.pill}>
        {/* <PiEye /> Our Vision */}
        <BsStars color="yellow" />
        Our Vision
      </div>
      <h2 className={styles.headline}>
        Bangun keahlian profesional dan kesiapan industri melalui pembelajaran terfokus dan aplikatif.
      </h2>
      <div className={styles.videoContainer}>
        {/* tag <video> */}
        <img src="/images/iseng.jpg" alt="Workshop discussion"/>
        {/* <source src="https://www.youtube.com/watch?v=example" type="video/mp4" /> */}
      </div>
    </section>
  );
};

export default Vision;
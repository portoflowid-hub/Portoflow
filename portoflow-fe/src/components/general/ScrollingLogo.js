import { motion, useScroll, useTransform } from 'framer-motion';
import styles from '../../styles/general/ScrollingLogo.module.css';

const pathS = "M 50 110 C 10 90, 90 70, 50 50";
const pathLine = "M 50 110 C 50 90, 50 70, 50 50";


export default function ScrollingLogo() {
  const { scrollYProgress } = useScroll();
  const pathData = useTransform(scrollYProgress, [0, 0.2], [pathS, pathLine]);
  const circleY = useTransform(scrollYProgress, [0, 0.2], [50, 50]);

  return (
    <div className={styles.logoContainer}>
      
      <svg width="1000" height="1000" viewBox="0 0 100 120">
        <motion.path
          d={pathData}
          fill="transparent"
          stroke="#FFFFFF"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <motion.circle
          cx="50"
          cy={circleY}
          r="10"
          fill="#FFD60A"
        />
      </svg>
    </div>
  );
}
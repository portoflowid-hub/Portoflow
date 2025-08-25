import styles from '../../styles/home/Partners.module.css';
import { 
  BsPalette2, 
  BsCodeSlash, 
  BsHddNetworkFill, 
  BsRobot, 
  BsGraphUp, 
  BsPhone 
} from 'react-icons/bs';

const areas = [
  { name: 'UI/UX Design', icon: <BsPalette2 /> },
  { name: 'Web Development', icon: <BsCodeSlash /> },
  { name: 'Computer Network', icon: <BsHddNetworkFill /> },
  { name: 'Machine Learning', icon: <BsRobot /> },
  { name: 'Data Science', icon: <BsGraphUp /> },
  { name: 'Mobile Development', icon: <BsPhone /> },
];

const Partners = () => {
  return (
    <section className={styles.partnersSection}>
      <div className={styles.container}>
        {areas.map((area) => (
          <div key={area.name} className={styles.partnerItem}>
            <span className={styles.icon}>{area.icon}</span>
            <span className={styles.name}>{area.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partners;
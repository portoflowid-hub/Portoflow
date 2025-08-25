import styles from '../../styles/general/Footer.module.css';
import { BsInstagram, BsYoutube, BsLinkedin, BsWhatsapp } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.logoArea}>
            <img src="/images/logo/LogoPortoflow.svg" alt="portoflow logo" width={50} className="m-2.5" />
            <span>PortoFlow</span>
          </div>
          <p className={styles.address}>
            Jl. Babarsari No.2, Caturtunggal, Kec. Depok, Kab. Sleman, 
            Daerah Istimewa Yogyakarta 55281
          </p>
        </div>
        <div className={styles.legal}>
          <div className={styles.socialIcons}>
            <a href="/" target="_blank" rel="noopener noreferrer"><BsInstagram /></a>
            <a href="/" target="_blank" rel="noopener noreferrer"><BsYoutube /></a>
            <a href="/" target="_blank" rel="noopener noreferrer"><BsLinkedin /></a>
            <a href="/" target="_blank" rel="noopener noreferrer"><BsWhatsapp /></a>
          </div>
          <p className={styles.copyright}>
            © 2025 PortoFlow. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
"use client";

import Image from 'next/image';
import Link from 'next/link'; 
import styles from '../../styles/home/Focus.module.css';
import { BsArrowRight } from 'react-icons/bs';

const focusAreas = [
  {
    title: 'Career Roadmap',
    imageUrl: 'https://i.ibb.co/6rC2w4x/undraw-directions-re-kj52.png',
    link: '/career' 
  },
  {
    title: 'Academy',
    imageUrl: 'https://i.ibb.co/3m8s7mG/undraw-online-learning-re-qw08.png',
    link: '/academy' 
  },
  {
    title: 'Portofolio',
    imageUrl: 'https://i.ibb.co/Z6f0Z9w/undraw-portfolio-update-re-jqnp.png',
    link: '/portfolio'
  }
];

const Focus = () => {
  return (
    <section className={styles.focusSection}>
      <h2 className={styles.headline}>Main Focus of PortoFlow</h2>
      <div className={styles.cardsContainer}>
        {focusAreas.map((item) => (
          <div key={item.title} className={styles.card}>
            <div className={styles.imageContainer}>
              <Image src='/images/iseng.jpg' alt={item.title} width={180} height={150} />
            </div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            
            <Link href={item.link} className={styles.detailButton}>
              <BsArrowRight /> See Detail
            </Link>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Focus;
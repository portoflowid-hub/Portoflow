"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import styles from '../../styles/career/Career.module.css'; // Kita gunakan style ini lagi
import { BsChevronDown, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { allCareerData } from '../../data/careerData';

// untuk menerima prop onCardClick untuk memberitahu parent
const CareerExplorer = ({ onCardClick }) => {
  // State untuk dropdown field (Informatika, dll)
  const [selectedField, setSelectedField] = useState('Informatika');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const carouselRef = useRef(null);

  const handleFieldSelect = (field) => {
    setSelectedField(field);
    setDropdownOpen(false);
  };

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
    
    <section className={styles.explorerSection}>
      <h1 className={styles.headline}>Career-Path and Description</h1>
      
      <div className={styles.dropdownContainer}>
        <button 
          className={styles.dropdownButton}
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          {selectedField} <BsChevronDown />
        </button>
        {isDropdownOpen && (
          <ul className={styles.dropdownMenu}>
            {Object.keys(allCareerData).map((field) => (
              <li key={field} onClick={() => handleFieldSelect(field)}>
                {field}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Carousel dan tombol navigasi */}
      <div className={styles.carouselWrapper}>
        <div className={styles.carousel} ref={carouselRef}>
          {allCareerData[selectedField].map((career) => (
            <div 
              key={career.title} 
              className={styles.card}
              onClick={() => onCardClick(career)} // Saat diklik, panggil fungsi dari parent
            >
              <Image 
                src={career.image} 
                alt={career.title} 
                layout="fill"
                objectFit="cover"
                className={styles.cardImage}
              />
              <div className={styles.cardOverlay}></div>
              <h3 className={styles.cardTitle}>{career.title}</h3>
            </div>
          ))}
        </div>
        <button className={`${styles.navButton} ${styles.prevButton}`} onClick={() => scroll('left')}>
          <BsChevronLeft />
        </button>
        <button className={`${styles.navButton} ${styles.nextButton}`} onClick={() => scroll('right')}>
          <BsChevronRight />
        </button>
      </div>
    </section>
  );
};

export default CareerExplorer;
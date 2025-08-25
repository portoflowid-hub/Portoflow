import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/general/Navbar';
import Footer from '../components/general/Footer';
import CareerExplorer from '../components/career/CareerExplorer';
import CareerDetailView from '../components/career/CareerDetailView';
import styles from '../styles/career/Career.module.css';

const CareerPage = () => {
  const [selectedCareer, setSelectedCareer] = useState(null);
  const detailRef = useRef(null);

  const handleCareerSelect = (careerData) => {
    // Jika user mengklik kartu yang sama, tutup detailnya. Jika beda, ganti detailnya.
    setSelectedCareer(prev => (prev && prev.slug === careerData.slug ? null : careerData));
  };

  useEffect(() => {
    if (selectedCareer && detailRef.current) {
      // delay dikit agar DOM sempat update sebelum scroll
      setTimeout(() => {
        detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [selectedCareer]);

  return (
    <>
      <Head>
        <title>Career Path - PortoFlow</title>
      </Head>
      <div className={styles.pageWrapper}>
        <Navbar />
        <main className={styles.mainContent}>
          {/* Komponen explorer dengan semua fungsionalitasnya */}
          <CareerExplorer onCardClick={handleCareerSelect} />

          {/* area untuk menampika detail */}
          <div ref={detailRef}>
            {selectedCareer && <CareerDetailView careerData={selectedCareer} />}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CareerPage;
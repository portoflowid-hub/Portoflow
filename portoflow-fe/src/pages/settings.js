// src/pages/settings.js

import Head from 'next/head';
import Navbar from '../components/general/Navbar'; // Pastikan path benar
import Footer from '../components/general/Footer'; // Asumsi Anda punya komponen Footer
import ThemeSwitcher from '../components/settings/ThemeSwitcher';
import styles from '../styles/settings/Settings.module.css';

const SettingsPage = () => {
  return (
    <>
      <Head>
        <title>Pengaturan - PortoFlow</title>
      </Head>
      <Navbar />
      <main className={styles.container}>
        <h1 className={styles.title}>Pengaturan</h1>
        
        <div className={styles.settingItem}>
          <span className={styles.settingLabel}>Mode Gelap</span>
          <ThemeSwitcher />
        </div>

        {/* Anda bisa menambahkan pengaturan lain di sini */}

      </main>
      <Footer />
    </>
  );
};

export default SettingsPage;
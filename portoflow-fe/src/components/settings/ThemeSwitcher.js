// src/components/settings/ThemeSwitcher.js

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import styles from '../../styles/settings/Settings.module.css'; // Akan kita buat

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <label className={styles.switch}>
      <input 
        type="checkbox" 
        onChange={toggleTheme} 
        checked={theme === 'dark'}
      />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};

export default ThemeSwitcher;
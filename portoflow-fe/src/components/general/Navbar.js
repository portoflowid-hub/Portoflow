// src/components/home/Navbar.js (MODIFIKASI PENUH)

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import styles from '../../styles/general/Navbar.module.css';

// 1. Impor ikon baru untuk Pengaturan
import { BsBoxArrowRight, BsGearFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';


const Navbar = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const profilePic = user?.profilePic || '/images/iseng.jpg';

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
            <img src="/images/logo/LogoPortoflow.svg" alt="portoflow logo" width={50} className="m-2.5" />
            <span>PortoFlow</span>
        </Link>
        <div className={styles.navLinks}>
          <Link href="/career">Career</Link>
          <Link href="/academic">Academic</Link>
          <Link href="/community">Community</Link>
        </div>
        <div className={styles.navActions}>
          {user ? (
            <div className={styles.profileContainer} ref={dropdownRef}>
              <button 
                className={styles.profileAvatarButton} 
                onClick={() => setIsDropdownOpen(prev => !prev)}
              >
                <Image src={profilePic} alt="Profile" width={40} height={40} className={styles.profileIcon} />
              </button>

              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link href="/dashboard" className={styles.dropdownItem} onClick={() => setIsDropdownOpen(false)}>
                    <FaUser size={18} />
                    <span>Dashboard</span>
                  </Link>
                  
                  {/* 2. TAMBAHKAN LINK PENGATURAN DI SINI */}
                  <Link href="#" className={styles.dropdownItem} onClick={() => setIsDropdownOpen(false)}>
                    <BsGearFill size={18} />
                    <span>Pengaturan</span>
                  </Link>

                  <div className={styles.separator}></div>
                  <button onClick={logout} className={styles.dropdownItem}>
                    <BsBoxArrowRight size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className={styles.loginBtn}>Login</Link>
              <Link href="/register" className={styles.signupBtn}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
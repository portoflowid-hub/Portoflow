// src/components/home/Navbar.js

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; // Sesuaikan path jika perlu
import Image from 'next/image';
import styles from '../../styles/general/Navbar.module.css'; // Sesuaikan path jika perlu

const Navbar = () => {
  const { user, logout } = useAuth();

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
          {/* <Link href="/portfolio">Portfolio</Link> */}
          <Link href="/about">About Us</Link>
        </div>
        <div className={styles.navActions}>
          {user ? (
            // JIKA SUDAH LOGIN
            <>
              <Link href="/dashboard" className={styles.profileLink}>
                <Image src="/images/iseng.jpg" alt="Profile" width={40} height={40} className={styles.profileIcon} />
              </Link>
              <button onClick={logout} className={styles.logoutBtn}>Logout</button>
            </>
          ) : (
            // JIKA BELUM LOGIN
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
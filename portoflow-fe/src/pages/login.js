// src/pages/login.js

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/login/AuthForm.module.css';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // Ambil fungsi login dari context

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Panggil fungsi login dari context dengan token
        login(data.accessToken);
      } else {
        setError(data.message || 'Login gagal. Periksa kembali email dan password Anda.');
      }
    } catch (err) {
      setError('Gagal terhubung ke server. Pastikan server backend berjalan.');
    }
  };

  return (
    <>
      <Head>
        <title>Login - PortoFlow</title>
      </Head>
      <div className={styles.pageWrapper}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Selamat Datang Kembali</h1>
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} required />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} required />
            </div>
            {error && <p style={{color: 'red', fontSize: '0.9rem'}}>{error}</p>}
            <button type="submit" className={styles.submitButton}>Masuk</button>
          </form>

          <div className={styles.separator}>ATAU</div>
          <button type="button" className={styles.googleButton}><FcGoogle size={22} /> Lanjutkan dengan Google</button>
          <p className={styles.redirectText}>Belum punya akun? <Link href="/register">Daftar sekarang</Link></p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
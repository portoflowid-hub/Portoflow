import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/login/AuthForm.module.css';
import { FcGoogle } from 'react-icons/fc';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE; // 🔑 pakai env var
      const response = await fetch(`${API_BASE}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          username,
          email,
          password,
          dateOfBirth,
          gender,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registrasi berhasil! Anda akan diarahkan ke halaman login.');
        router.push('/login');
      } else {
        setError(data.message || 'Registrasi gagal. Silakan coba lagi.');
      }
    } catch (err) {
      setError('Gagal terhubung ke server. Pastikan server backend berjalan.');
    }
  };

  return (
    <>
      <Head>
        <title>Daftar - PortoFlow</title>
      </Head>
      <div className={styles.pageWrapper}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Buat Akun Baru</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="fullName" className={styles.label}>Nama Lengkap</label>
              <input 
                type="text" 
                id="fullName" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                className={styles.input} 
                required 
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.label}>Username</label>
              <input 
                type="text" 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className={styles.input} 
                required 
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className={styles.input} 
                required 
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="dateOfBirth" className={styles.label}>Tanggal Lahir</label>
              <input 
                type="date" 
                id="dateOfBirth" 
                value={dateOfBirth} 
                onChange={(e) => setDateOfBirth(e.target.value)} 
                className={styles.input} 
                required 
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="gender" className={styles.label}>Jenis Kelamin</label>
              <select 
                id="gender" 
                value={gender} 
                onChange={(e) => setGender(e.target.value)} 
                className={styles.input} 
                required
              >
                <option value="" disabled>Pilih Jenis Kelamin</option>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className={styles.input} 
                required 
              />
            </div>

            {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
            <button type="submit" className={styles.submitButton}>Daftar</button>
          </form>

          <div className={styles.separator}>ATAU</div>
          <button type="button" className={styles.googleButton}>
            <FcGoogle size={22} /> Daftar dengan Google
          </button>
          <p className={styles.redirectText}>
            Sudah punya akun? <Link href="/login">Masuk sekarang</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

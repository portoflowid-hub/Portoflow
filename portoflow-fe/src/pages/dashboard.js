// src/pages/dashboard.js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode'; // <-- PERUBAHAN 1: Cara impor
import Head from 'next/head';
import Navbar from '../components/general/Navbar';
import Footer from '../components/general/Footer';
import ProfileHeader from '../components/dashboard/ProfileHeader';
import DashboardContent from '../components/dashboard/ProjectGrid';
import styles from '../styles/dashboard/Dashboard.module.css';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        router.push('/login');
        return;
      }

      try {
        // <-- PERUBAHAN 2: Cara pemanggilan fungsi
        const decodedToken = jwtDecode(token); 
        const userId = decodedToken.id;

        const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          localStorage.removeItem('accessToken');
          router.push('/login');
          return;
        }

        const data = await response.json();
        setUser(data.data);

      } catch (error) {
        console.error("Failed to fetch or decode token:", error);
        localStorage.removeItem('accessToken');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard - {user.fullName}</title>
      </Head>
      <div className={styles.pageWrapper}>
        <Navbar />
        <main className={styles.container}>
          <ProfileHeader user={user} />
          <DashboardContent 
            projects={user.projects || []} 
            certificates={user.certificates || []} 
          />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DashboardPage;
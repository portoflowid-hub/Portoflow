// src/pages/dashboard.js (MODIFIKASI PENUH)

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';
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
  }, []); // Dependency [router] dihapus karena tidak esensial untuk re-fetching

  // FUNGSI BARU: Untuk menangani penambahan data dari komponen anak
  const handleDataAdded = (newItem, type) => {
    setUser(currentUser => {
      const updatedUser = { ...currentUser };
      
      if (type === 'project') {
        // Menambahkan item baru ke depan array agar muncul di paling atas
        updatedUser.projects = [newItem, ...(currentUser.projects || [])];
      }
      // Nanti bisa ditambahkan untuk 'certificate' dan 'experience'
      // else if (type === 'certificate') { ... }
      
      return updatedUser;
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; // Atau komponen skeleton/loading yang lebih baik
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
          {/* PERUBAHAN: Teruskan prop `onDataAdded` dan `experiences` */}
          <DashboardContent 
            projects={user.projects || []} 
            certificates={user.certificates || []}
            experiences={user.experiences || []}
            onDataAdded={handleDataAdded}
          />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DashboardPage;
// src/components/dashboard/ProfileHeader.js

import Image from 'next/image';
import styles from '../../styles/dashboard/Dashboard.module.css';

const ProfileHeader = ({ user }) => {
  // Tambahkan pengecekan ini untuk mencegah error saat data belum ada
  if (!user) {
    return null;
  }
  
  // Gunakan foto profil default jika belum diatur
  const profilePic = user.profilePic || '/images/iseng.jpg'; // Anda perlu siapkan gambar ini di folder /public

  return (
    <div className={styles.profileHeader}>
      <div className={styles.profileInfo}>
        <div className={styles.profilePicWrapper}>
          <Image src={profilePic} alt={user.fullName} layout="fill" objectFit="cover" />
        </div>
        <div>
          <h1 className={styles.profileName}>{user.fullName}</h1>
          <div className={styles.profileStats}>
            <span><b>{user.stats?.connection || 0}</b> Connection</span>
            <span><b>{user.projects?.length || 0}</b> Project</span>
            {/* Perbaiki jumlah sertifikat */}
            <span><b>{user.certificates?.length || 0}</b> Sertifikat</span> 
          </div>
          {/* Tampilkan bio jika ada, jika tidak tampilkan pesan */}
          <p className={styles.profileBio}>{user.bio || 'Bio belum diatur'}</p>
        </div>
      </div>
      <button className={styles.connectButton}>Connect</button>
    </div>
  );
};

export default ProfileHeader;
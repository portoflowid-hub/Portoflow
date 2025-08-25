import { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/dashboard/Dashboard.module.css';
import { BsPersonFill, BsPeopleFill, BsHeart, BsChat, BsShare, BsBookmark, BsLink45Deg } from 'react-icons/bs';

// Sub-komponen untuk menampilkan satu kartu Proyek
const ProjectCard = ({ project }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImageWrapper}>
        <Image src={project.image} alt={project.name} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{project.name}</h3>
          {project.type === 'group' ? <BsPeopleFill title="Group Project"/> : <BsPersonFill title="Solo Project"/>}
        </div>
        <p className={styles.cardDescription}>{project.description}</p>
        <div className={styles.cardMeta}>
          <span>{project.date}</span>
          <a href={project.link} target="_blank" rel="noopener noreferrer">Lihat Proyek</a>
        </div>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.cardActions}>
          <button><BsHeart/></button>
          <button><BsChat/></button>
          <button><BsShare/></button>
        </div>
        <button><BsBookmark/></button>
      </div>
    </div>
  );
};

// Sub-komponen baru untuk menampilkan satu kartu Sertifikat
const CertificateCard = ({ certificate }) => (
    <div className={styles.certificateCard}>
      <div className={styles.cardImageWrapper}>
        <Image src={certificate.image} alt={certificate.name} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.certificateBody}>
        <h3 className={styles.cardTitle}>{certificate.name}</h3>
        <div className={styles.certificateMeta}>
          <p className={styles.cardDescription}>{certificate.description}</p>
          <div className={styles.certificateActions}>
            <button><BsHeart/></button>
            <button><BsBookmark/></button>
          </div>
        </div>
        <div className={styles.certificateFooter}>
          <span>{certificate.date}</span>
          <a href={certificate.link} target="_blank" rel="noopener noreferrer">
            <BsLink45Deg /> Lihat Kredensial
          </a>
        </div>
      </div>
    </div>
  );

// Komponen utama
// props 'projects' dan 'certificates'
const DashboardContent = ({ projects, certificates }) => {
  // State untuk melacak tab mana yang sedang aktif
  const [activeTab, setActiveTab] = useState('project');

  return (
    <div className={styles.mainContent}>
      <div className={styles.contentTabs}>
        {/* Tombol tab untuk Project */}
        <button 
          className={`${styles.tabButton} ${activeTab === 'project' ? styles.active : ''}`}
          onClick={() => setActiveTab('project')}
        >
          Project
        </button>
        {/* Tombol tab untuk Sertifikat */}
        <button 
          className={`${styles.tabButton} ${activeTab === 'certificate' ? styles.active : ''}`}
          onClick={() => setActiveTab('certificate')}
        >
          Sertifikat
        </button>
      </div>

      {/* Rendering Konten Secara Kondisional */}
      {activeTab === 'project' ? (
        // Jika tab 'project' aktif, tampilkan grid proyek
        <div className={styles.projectGrid}>
          {projects.map(project => <ProjectCard key={project.id} project={project} />)}
        </div>
      ) : (
        // Jika tab 'certificate' aktif, tampilkan grid sertifikat
        <div className={styles.projectGrid}>
          {certificates.map(cert => <CertificateCard key={cert.id} certificate={cert} />)}
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
// src/components/dashboard/ProjectGrid.js

import { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/dashboard/Dashboard.module.css';
import { BsPersonFill, BsPeopleFill, BsHeart, BsChat, BsShare, BsBookmark, BsLink45Deg, BsBuilding } from 'react-icons/bs';

// Sub-komponen untuk menampilkan satu kartu Proyek
const ProjectCard = ({ project }) => (
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

// Sub-komponen untuk menampilkan satu kartu Sertifikat
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

// Sub-komponen baru untuk Kartu Pengalaman
const ExperienceCard = ({ experience }) => (
  <div className={styles.experienceCard}>
    <div className={styles.experienceIcon}>
      <BsBuilding />
    </div>
    <div className={styles.experienceContent}>
      <h3 className={styles.cardTitle}>{experience.role}</h3>
      <div className={styles.experienceMeta}>
        <span>{experience.company}</span>
        <span>{experience.dateRange}</span>
      </div>
      <p className={styles.cardDescription}>{experience.description}</p>
    </div>
  </div>
);

// Komponen utama sekarang menerima prop 'experiences'
const DashboardContent = ({ projects, certificates, experiences }) => {
  const [activeTab, setActiveTab] = useState('project');

  // Fungsi untuk me-render konten berdasarkan tab yang aktif
  const renderContent = () => {
    switch (activeTab) {
      case 'project':
        // Cek jika data projects ada dan tidak kosong
        return projects && projects.length > 0 ? (
          projects.map(project => <ProjectCard key={project.id} project={project} />)
        ) : (
          <p className={styles.emptyStateText}>Belum ada proyek yang ditambahkan.</p>
        );
      case 'certificate':
        // Cek jika data certificates ada dan tidak kosong
        return certificates && certificates.length > 0 ? (
          certificates.map(cert => <CertificateCard key={cert.id} certificate={cert} />)
        ) : (
          <p className={styles.emptyStateText}>Belum ada sertifikat yang ditambahkan.</p>
        );
      case 'experience':
        // Cek jika data experiences ada dan tidak kosong
        return experiences && experiences.length > 0 ? (
          experiences.map(exp => <ExperienceCard key={exp.id} experience={exp} />)
        ) : (
          <p className={styles.emptyStateText}>Belum ada pengalaman yang ditambahkan.</p>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.contentTabs}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'project' ? styles.active : ''}`} 
          onClick={() => setActiveTab('project')}
        >
          Project
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'certificate' ? styles.active : ''}`} 
          onClick={() => setActiveTab('certificate')}
        >
          Sertifikat
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'experience' ? styles.active : ''}`} 
          onClick={() => setActiveTab('experience')}
        >
          Pengalaman
        </button>
      </div>

      <div className={styles.projectGrid}>
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardContent;
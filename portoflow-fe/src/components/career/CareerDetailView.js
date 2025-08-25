import styles from '../../styles/career/CareerDetailView.module.css';

const CareerDetailView = ({ careerData }) => {
  // Jika tidak ada careerData (belum ada yang dipilih), jangan render
  if (!careerData) return null;

  return (
    <div className={styles.detailWrapper}>
      <h2 className={styles.headline}>{careerData.title}</h2>
      
      <div className={styles.videoContainer}>
        <iframe
          src={`https://www.youtube.com/embed/${careerData.videoUrl}`}
          title={careerData.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <p className={styles.description}>{careerData.description}</p>

      <div className={styles.tasksSection}>
        <span className={styles.sectionPill}>Pekerjaan Utama {careerData.title}</span>
        <div className={styles.tasksGrid}>
          {careerData.mainTasks.map(task => <div key={task} className={styles.taskPill}>{task}</div>)}
        </div>
      </div>

      <div className={styles.roadmapSection}>
        <span className={styles.sectionPill}>Roadmap {careerData.title}</span>
        <div className={styles.roadmapContainer}>
          {careerData.roadmap.map((item, index) => (
            <div key={index} className={styles.roadmapItem}>
              <div className={styles.roadmapDot}></div>
              <div className={styles.roadmapContent}>
                <h3 className={styles.roadmapLevel}>{item.level}</h3>
                <ul className={styles.roadmapSkills}>
                  {item.skills.map(skill => <li key={skill}>{skill}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerDetailView;
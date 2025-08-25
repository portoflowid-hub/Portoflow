// src/pages/academic.js

import { useState, useMemo } from 'react';
import Head from 'next/head';
import Navbar from '../components/general/Navbar';
import Footer from '../components/general/Footer';
import FilterBar from '@/components/academic/FilterBar';
import LastCourseCard from '@/components/academic/LastCourseCard';
import CourseGrid from '@/components/academic/CourseGrid';
import { coursesData } from '@/data/academicData';
import NewVideos from '@/components/academic/NewVideos';
import styles from '@/styles/academic/Academic.module.css';

const AcademicPage = () => {
  const [selectedField, setSelectedField] = useState("All");
  const [searchTerm, setSearchTerm] = useState('');

  // Logika untuk memfilter kursus tetap di sini, karena ini adalah tugas halaman
  const filteredCourses = useMemo(() => {
    return coursesData
      .filter(course => {
        if (selectedField === 'All') return true;
        return course.category === selectedField;
      })
      .filter(course => {
        return course.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
  }, [selectedField, searchTerm]);

  return (
    <div className={styles.pageWrapper}>
      <Head>
        <title>Courses Academic - PortoFlow</title>
      </Head>
      <Navbar />

      <main className={styles.container}>
        <h1 className={styles.headline}>Courses Academic</h1>

        <FilterBar 
          selectedField={selectedField}
          setSelectedField={setSelectedField}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <LastCourseCard />
        
        <CourseGrid courses={filteredCourses} />

        <NewVideos />
      </main>

      <Footer />
    </div>
  );
};

export default AcademicPage;
// src/components/academic/FilterBar.js

import styles from '@/styles/academic/Academic.module.css';
import { BsChevronDown, BsSearch } from 'react-icons/bs';
import { courseCategories } from '@/data/academicData';

const FilterBar = ({ selectedField, setSelectedField, searchTerm, setSearchTerm }) => {
  return (
    <div className={styles.filterBar}>
      <div className={styles.dropdownContainer}>
        <button className={styles.dropdownButton}>
          {selectedField} <BsChevronDown />
        </button>
        <select 
          className={styles.dropdownSelect} 
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
        >
          {courseCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
      <div className={styles.searchContainer}>
        <BsSearch className={styles.searchIcon} />
        <input 
          type="text" 
          placeholder="Cari Courses" 
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterBar;
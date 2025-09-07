// src/components/dashboard/AddProjectForm.js

import { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/dashboard/AddForm.module.css';

const AddProjectForm = ({ onClose, onSuccess }) => {
  // State untuk setiap field dalam form
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // State untuk error dan status loading
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fungsi untuk handle perubahan pada input gambar
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Buat URL sementara untuk preview gambar
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Fungsi yang dijalankan saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !image) {
      setError('Semua field (termasuk gambar) wajib diisi.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    // Karena kita mengunggah file, kita harus menggunakan FormData
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('projectImage', image); // 'projectImage' harus cocok dengan nama field di backend (multer)
    // Tambahkan field lain jika ada, misal:
    // formData.append('link', projectLink);
    // formData.append('type', projectType);

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:5000/api/projects', { // PASTIKAN ENDPOINT BENAR
        method: 'POST',
        headers: {
          // 'Content-Type' JANGAN di-set manual, browser akan otomatis menentukannya
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Gagal menambahkan proyek.');
      }

      // Jika berhasil, panggil fungsi onSuccess dari parent (ProjectGrid.js)
      onSuccess(data.data); // Asumsi backend mengembalikan data proyek baru di `data.data`

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="name" className={styles.label}>Nama Proyek</label>
        <input 
          id="name" 
          type="text" 
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="description" className={styles.label}>Deskripsi</label>
        <textarea 
          id="description" 
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      <div className={styles.inputGroup}>
        <label htmlFor="image" className={styles.label}>Gambar Proyek</label>
        <input 
          id="image" 
          type="file" 
          accept="image/*"
          className={styles.input}
          onChange={handleImageChange}
        />
        {imagePreview && (
          <Image src={imagePreview} alt="Preview" width={400} height={200} className={styles.imagePreview} />
        )}
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? 'Menyimpan...' : 'Simpan Proyek'}
      </button>
    </form>
  );
};

export default AddProjectForm;
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../components/general/Navbar';
import Footer from '../components/general/Footer';
import styles from '../styles/comunity/Community.module.css';
import { FiSearch } from 'react-icons/fi';
import { filters, liveEvents, communityPosts, friendList, communityForums } from '../data/communityData';
import FilterBar from '../components/community/FilterBar';
import LiveHighlight from '../components/community/LiveHighlight';
import PostCard from '../components/community/PostCard';
import Sidebar from '../components/community/Sidebar';


export default function Community() {
    const [activeFilter, setActiveFilter] = useState('Jaringan Komputer');
    const [currentSlide, setCurrentSlide] = useState(0);

    // Note: Logika untuk auto-slide

    return (
        <>
            <Navbar />
            <Head>
                <title>Community - PortoFlow</title>
                <meta name="description" content="Community page for learning and sharing" />
            </Head>

            <div className={styles.communityContainer}>
                <header className={styles.header}>
                    <h1>Comunity</h1>
                </header>

                <FilterBar
                    styles={styles}
                    filters={filters}
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                />

                <LiveHighlight
                    styles={styles}
                    events={liveEvents}
                    currentSlide={currentSlide}
                />

                <main className={styles.mainContent}>
                    {/* Kolom Feed Utama */}
                    <div className={styles.feedColumn}>
                        <div className={styles.searchBar}>
                            <FiSearch className={styles.searchIcon} />
                            <input type="text" placeholder="Cari pertanyaan..." />
                        </div>

                        <div className={styles.addQuestion}>
                            <Image src="/user-avatar.png" alt="Your Avatar" width={40} height={40} className={styles.userAvatar} />
                            <input type="text" placeholder="Tambahkan pertanyaan..." />
                            <button>Kirim</button>
                        </div>

                        <div className={styles.postFeed}>
                            {communityPosts.map(post => (
                                <PostCard key={post.id} styles={styles} post={post} />
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <Sidebar
                        styles={styles}
                        friends={friendList}
                        forums={communityForums}
                    />
                </main>
            </div>
            <Footer />
        </>
    );
}
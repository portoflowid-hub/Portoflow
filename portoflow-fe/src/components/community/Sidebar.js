import Image from 'next/image';

const Sidebar = ({ styles, friends, forums }) => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarSection}>
                <h3>Daftar Teman</h3>
                <ul className={styles.friendList}>
                    {friends.map(friend => (
                        <li key={friend.id}>
                            <Image src="/user-avatar.png" alt={friend.name} width={32} height={32} className={styles.userAvatar} />
                            <span>{friend.name}</span>
                            {friend.online && <div className={styles.onlineIndicator}></div>}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.sidebarSection}>
                <h3>Forum Komunitas</h3>
                <ul className={styles.forumList}>
                    {forums.map(forum => (
                        <li key={forum.id}>
                            <Image src={forum.icon} alt={forum.name} width={32} height={32} className={styles.forumIcon} />
                            <span>{forum.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
import Image from 'next/image';
import { FiMessageCircle, FiThumbsUp, FiShare2, FiMoreVertical } from 'react-icons/fi';

const PostCard = ({ styles, post }) => {
    return (
        <div className={styles.postCard}>
            <div className={styles.postHeader}>
                <Image src={post.avatar} alt={post.author} width={40} height={40} className={styles.userAvatar} />
                <div className={styles.postAuthorInfo}>
                    <span>{post.author}</span>
                    <small>{post.timestamp}</small>
                </div>
                <FiMoreVertical className={styles.moreOptionsIcon} />
            </div>
            <p className={styles.postContent}>{post.content}</p>
            <div className={styles.postFooter}>
                <span><FiThumbsUp /> {post.views}</span>
                <span><FiMessageCircle /> {post.comments}</span>
                <span><FiShare2 /> {post.shares}</span>
            </div>
        </div>
    );
};

export default PostCard;
import Image from 'next/image';

const LiveHighlight = ({ styles, events, currentSlide }) => {
    const currentEvent = events[currentSlide];

    return (
        <div className={styles.liveNowSection}>
            <div className={styles.liveNowCard} style={{ backgroundImage: `url(/images/iseng.jpg)` }}>
                <div className={styles.liveNowOverlay}>
                    <span className={styles.liveNowBadge}>Live Now</span>
                    <h2>{currentEvent.title}</h2>
                    <p>{currentEvent.subtitle}</p>
                </div>
            </div>
            <div className={styles.sliderDots}>
                {events.map((_, index) => (
                    <span key={index} className={currentSlide === index ? styles.dotActive : styles.dot}></span>
                ))}
            </div>
        </div>
    );
};

export default LiveHighlight;
import Skeleton from "react-loading-skeleton"
import styles from './SkeletonVinhoCard.module.css'

function SkeletonVinhoCard({ cards }) {
    return (
        Array(cards)
            .fill(0)
            .map((item, i) =>
                <div className={styles.vinho_card} key={i}>
                    <p><Skeleton /></p>
                    <p><Skeleton /></p>
                    <p><Skeleton /></p>
                </div >
            )

    )
}

export default SkeletonVinhoCard
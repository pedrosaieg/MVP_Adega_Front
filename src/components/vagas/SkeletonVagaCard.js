import Skeleton from "react-loading-skeleton"
import styles from './SkeletonVagaCard.module.css'

function SkeletonVagaCard({ cards }) {
    return (
        Array(cards)
            .fill(0)
            .map((item, i) =>
                <div className={styles.vaga_card} key={i}>
                    <p><Skeleton /></p>
                    <p><Skeleton /></p>
                    <p><Skeleton /></p>
                    <p><Skeleton /></p>
                </div >
            )

    )
}

export default SkeletonVagaCard
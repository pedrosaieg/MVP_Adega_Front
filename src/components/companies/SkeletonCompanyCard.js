import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import styles from './SkeletonCompanyCard.module.css'

function SkeletonCompanyCard({ cards }) {
    return (
        Array(cards)
            .fill(0)
            .map((item, i) =>
                <div className={styles.company_card} key={i}>
                    <SkeletonTheme baseColor='#5e35b1' highlightColor='#7a5a8f'>
                        <h4><Skeleton /></h4>
                    </SkeletonTheme>
                    <p><Skeleton /></p>
                    <p><Skeleton /></p>
                    <p><Skeleton /></p>
                    <p><Skeleton /></p>
                </div >
            )

    )
}

export default SkeletonCompanyCard
import { FaGithub } from 'react-icons/fa'

import styles from './Footer.module.css'


function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.info}>
                <ul className={styles.social_list}>
                    <a href="https://github.com/pedrosaieg?tab=repositories"><li><FaGithub /></li></a>
                </ul>
                <p className={styles.copyright}><span>adega</span> &copy; Pedro Saieg</p>
            </div>
        </footer >
    )
}

export default Footer
import { FaGithub } from 'react-icons/fa'

import styles from './Footer.module.css'


function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <a href="https://github.com/pedrosaieg?tab=repositories"><li><FaGithub /></li></a>
            </ul>
            <p className={styles.copyright}><span>Adega</span> &copy; Pedro Saieg</p>
        </footer >
    )
}

export default Footer
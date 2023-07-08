import styles from './Landing.module.css'

import { motion } from 'framer-motion'

import LinkButton from '../layout/LinkButton'

function Landing() {
    return (
        <motion.div
            inition={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
        >
            <div className={styles.divider}>
                <div className={styles.left} >
                </div>

                <div className={styles.right}>
                    <div className={styles.landing_banner}>
                        <h1>sua adega </h1>
                        <h1>ao seu alcance</h1>
                        <h1>em qualquer lugar.</h1>
                    </div>
                    <div className={styles.button_container}>
                        <LinkButton className={styles.button_spacing} to="/categories" text="Entrar" ></LinkButton>
                        <LinkButton to="/" text="Criar conta" ></LinkButton>
                    </div>
                </div>
            </div>

        </motion.div>
    )
}

export default Landing
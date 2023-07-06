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
                <div className={styles.landing_banner}>
                    <h1>Sua adega </h1>
                    <h1>ao seu alcance</h1>
                    <h1>em qualquer lugar</h1>
                </div>
                <div className={styles.button_container}>
                        <LinkButton to="/categories" text="Entrar" ></LinkButton>
                        <LinkButton to="/" text="Criar conta" ></LinkButton>
                </div>

        </motion.div>
    )
}

export default Landing
import { Link } from 'react-router-dom'

import styles from './Navbar.module.css'

import Container from './Container'
import logo from '../../img/logo.png'

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">
                    <div className={styles.img_container}>
                        {<img src={logo} alt="logo" />}
                    </div>

                </Link>
            </Container>
        </nav>
    )
}

export default Navbar
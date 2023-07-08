import { BrowserRouter as Router } from 'react-router-dom'

import Container from './components/layout/Container'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import AnimatedRoutes from './components/layout/AnimatedRoutes'
import { SkeletonTheme } from 'react-loading-skeleton'

import styles from './App.module.css'

function App() {
  return (
    <div className="App">
      <div className={styles.image} >
        <SkeletonTheme baseColor='#c4c2bb' highlightColor='#525252'>
          <Router>
            <div>
              <Navbar />
            </div>
            <Container customClass="min-height">
              <AnimatedRoutes />
            </Container>
            <Footer />
          </Router>
        </SkeletonTheme>
        <ToastContainer />
      </div>
    </div >
  );
}

export default App;

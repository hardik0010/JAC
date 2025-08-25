import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Projects from './pages/Projects'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'

function App() {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    // Immediate scroll to top for instant feedback
    window.scrollTo(0, 0)
    
    // Then apply smooth scrolling if supported
    const scrollToTopSmooth = () => {
      // Check if smooth scrolling is supported
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      }
    }
    
    // Small delay to ensure smooth transition
    const timeoutId = setTimeout(scrollToTopSmooth, 50)
    
    // Cleanup function to cancel pending scroll operations
    return () => {
      clearTimeout(timeoutId)
      // Cancel any ongoing smooth scroll
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo(0, 0)
      }
    }
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon, Building2, Phone } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-primary-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-white/20 dark:border-gray-700/20' 
        : 'bg-primary-white dark:bg-gray-900'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-primary-orange text-primary-white w-10 h-10 rounded-lg flex items-center justify-center mr-3">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-display font-bold text-primary-dark dark:text-primary-white">
                JAY AMBE
              </h1>
              <p className="text-xs text-primary-orange font-medium uppercase tracking-wider">CONSTRUCTION</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative font-medium text-sm transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-primary-orange'
                    : 'text-text-dark dark:text-primary-white hover:text-primary-orange'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-orange rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Theme Toggle, Call Now & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Call Now Button */}
            <a 
              href="tel:+1234567890" 
              className="hidden md:flex items-center gap-2 btn-primary text-sm px-4 py-2"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-dark-border transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-primary-dark" />
              ) : (
                <Sun className="w-5 h-5 text-primary-white" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-dark-border transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-primary-dark dark:text-primary-white" />
              ) : (
                <Menu className="w-5 h-5 text-primary-dark dark:text-primary-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2 border-t border-gray-200 dark:border-dark-border">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'bg-primary-orange text-primary-white'
                    : 'text-primary-dark dark:text-primary-white hover:bg-gray-100 dark:hover:bg-dark-card'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* Mobile Call Now Button */}
            <a 
              href="tel:+1234567890" 
              className="flex items-center gap-2 btn-primary mx-4 mt-4"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

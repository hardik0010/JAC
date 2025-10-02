import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, PhoneCall } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
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
        ? 'bg-primary-white/80 backdrop-blur-xl shadow-lg border-b border-white/20' 
        : 'bg-primary-white'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            onClick={() => setIsOpen(false)}
          >
            <div className="bg-primary-black text-primary-white w-40 h-5 flex items-center justify-center">
              <img 
                src="/logo.jpg" 
                alt="JAC Logo" 
                // className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative font-heading font-medium text-sm transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-accent-gray'
                    : 'text-text-dark hover:text-accent-gray'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-gray rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Call Now & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Call Now Button - Desktop */}
            <a 
              href="tel:+919586822668" 
              className="hidden md:flex items-center justify-center p-2 text-primary-dark hover:text-accent-gray transition-all duration-300"
              aria-label="Call Now"
            >
              <PhoneCall className="w-6 h-6" />
            </a>

            {/* Mobile Call Button & Menu Button */}
            <div className="flex items-center space-x-2 lg:hidden">
              <a 
                href="tel:+919586822668" 
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                aria-label="Call Now"
              >
                <PhoneCall className="w-5 h-5 text-primary-dark" />
              </a>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-5 h-5 text-primary-dark" />
                ) : (
                  <Menu className="w-5 h-5 text-primary-dark" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'max-h-96 opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible'
        } overflow-hidden`}>
          <div className="py-6 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-heading font-medium text-lg transition-colors duration-300 ${
                    isActive(link.path)
                      ? 'text-accent-gray'
                      : 'text-text-dark hover:text-accent-gray'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

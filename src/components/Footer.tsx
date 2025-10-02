import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { name: 'Residential Construction', path: '/services' },
      { name: 'Commercial Projects', path: '/services' },
      { name: 'Turn-key Projects', path: '/services' },
      { name: 'RCC & Masonry Works', path: '/services' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Projects', path: '/projects' },
      { name: 'Gallery', path: '/gallery' },
      { name: 'Contact', path: '/contact' },
    ]
  }

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61576567311914&mibextid=wwXIfr&mibextid=wwXIfr', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/jayambeconstruction?igsh=eW5lMGZhMHA1bzU0&utm_source=qr', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/jay-ambe-construction-04/', label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-primary-dark text-primary-white py-20">
      <div className="container-custom">
        {/* Mobile Layout - Only Company Info and Contact Info */}
        <div className="grid grid-cols-1 gap-12 mb-12 md:hidden">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="bg-accent-gray text-primary-white w-40 h-7 flex items-center justify-center mr-3">
                <img 
                  src="/footer-logo.jpg" 
                  alt="JAC Logo" 
                  // className="w-full h-full object-cover"
                />
              </div>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Building dreams and creating landmarks with excellence, quality, and innovation. 
              Your trusted partner in construction for over 15 years, specializing in high-rise buildings.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent-gray hover:text-primary-white transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
                         <h4 className="text-lg font-heading font-semibold mb-6 text-primary-white">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-accent-gray p-2 rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-primary-white" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">
                    1304, 13TH FLOOR GANESH GLORY<br />
                    NEAR BSNL OFFICE, JAGATPUR-CHENPUR ROAD<br />
                    S.G.HIGHWAY, JAGATPUR<br />
                    AHMEDABAD-382481, GUJARAT
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-accent-gray p-2 rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-primary-white" />
                </div>
                <a 
                  href="tel:+919586822668" 
                  className="text-gray-300 hover:text-primary-white transition-colors duration-300 text-sm"
                >
                  +91 95868 22668
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-accent-gray p-2 rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-primary-white" />
                </div>
                <a 
                  href="mailto:info@jayambeconstruction.com" 
                  className="text-gray-300 hover:text-primary-white transition-colors duration-300 text-sm"
                >
                  info@jayambeconstruction.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - All sections */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="bg-accent-gray text-primary-white w-40 h-7 flex items-center justify-center mr-3">
                <img 
                  src="/footer-logo.jpg" 
                  alt="JAC Logo" 
                  // className="w-full h-full object-cover"
                />
              </div>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Building dreams and creating landmarks with excellence, quality, and innovation. 
              Your trusted partner in construction for over 15 years, specializing in high-rise buildings.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent-gray hover:text-primary-white transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
                         <h4 className="text-lg font-heading font-semibold mb-6 text-primary-white">Our Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-primary-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
                         <h4 className="text-lg font-heading font-semibold mb-6 text-primary-white">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-primary-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
                         <h4 className="text-lg font-heading font-semibold mb-6 text-primary-white">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-accent-gray p-2 rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-primary-white" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">
                    1304, 13TH FLOOR GANESH GLORY<br />
                    NEAR BSNL OFFICE, JAGATPUR-CHENPUR ROAD<br />
                    S.G.HIGHWAY, JAGATPUR<br />
                    AHMEDABAD-382481, GUJARAT
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-accent-gray p-2 rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-primary-white" />
                </div>
                <a 
                  href="tel:+919586822668" 
                  className="text-gray-300 hover:text-primary-white transition-colors duration-300 text-sm"
                >
                  +91 95868 22668
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-accent-gray p-2 rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-primary-white" />
                </div>
                <a 
                  href="mailto:info@jayambeconstruction.com" 
                  className="text-gray-300 hover:text-primary-white transition-colors duration-300 text-sm"
                >
                  info@jayambeconstruction.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Jay Ambe Construction. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/contact" className="text-gray-400 hover:text-primary-white text-sm transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/admin" className="text-gray-400 hover:text-primary-white text-sm transition-colors duration-300">
                Admin Portal
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-primary-white text-sm transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer



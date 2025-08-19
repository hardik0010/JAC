import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Building2, Home as HomeIcon, Wrench, Users, Award, Phone, Mail, Check, ChevronLeft, ChevronRight, FileText } from 'lucide-react'
import { useState, useRef } from 'react'
import { useTheme } from '../contexts/ThemeContext'

const Home = () => {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0)
  const servicesScrollRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  const services = [
    {
      id: 1,
      title: 'Residential Construction',
      description: 'Custom homes and residential projects built to your exact specifications with premium quality materials.',
      features: ['Custom Home Design', 'New Home Construction', 'Home Additions', 'Luxury Finishes'],
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      icon: HomeIcon
    },
    {
      id: 2,
      title: 'Commercial Projects',
      description: 'Office buildings, retail spaces, and commercial facilities designed for modern business needs.',
      features: ['Office Buildings', 'Retail Spaces', 'Industrial Facilities', 'Mixed-Use Development'],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      icon: Building2
    },
    {
      id: 3,
      title: 'Renovation & Interiors',
      description: 'Complete renovation services and interior design solutions to transform your existing space.',
      features: ['Full Home Renovation', 'Kitchen Remodeling', 'Bathroom Upgrades', 'Interior Design'],
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      icon: Wrench
    },
    {
      id: 4,
      title: 'Project Management',
      description: 'Comprehensive project management ensuring timely delivery and quality control throughout every phase.',
      features: ['Project Planning', 'Timeline Management', 'Quality Assurance', 'Budget Control'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      icon: Users
    }
  ]

  const stats = [
    { number: '150+', label: 'Projects Completed', icon: Award },
    { number: '25+', label: 'Years Experience', icon: Building2 },
    { number: '50+', label: 'Team Members', icon: Users },
    { number: '100%', label: 'Client Satisfaction', icon: Award }
  ]

  const scrollServices = (direction: 'left' | 'right') => {
    if (servicesScrollRef.current) {
      const scrollAmount = 458 // Width of one card (450px) plus gap (8px)
      const newScrollLeft = servicesScrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
      servicesScrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
          }}
        ></div>
        
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/70 to-primary-dark/70"></div>

        {/* Content */}
        <div className="relative z-10 container-custom text-center text-primary-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              Building Dreams,
              <span className="block text-primary-orange">Creating Landmarks</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Professional construction services delivering excellence in every project. 
              From concept to completion, we build your vision with precision and quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/projects" className="btn-primary inline-flex items-center justify-center">
                <ArrowRight className="mr-2 w-5 h-5" />
                View Projects
              </Link>
              <Link to="/contact" className="btn-outline-white inline-flex items-center justify-center">
                <Phone className="mr-2 w-5 h-5" />
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-dark text-primary-white relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80')`
            }}
          ></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-15">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-primary-orange flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary-white" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-primary-orange mb-2 font-display">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Horizontal Scroll */}
      <section className={`py-24 relative ${theme === 'dark' ? 'bg-dark-bg' : 'bg-light-gray'}`}>
                 {/* Background Pattern */}
         <div className={`absolute inset-0 ${theme === 'dark' ? 'opacity-20' : 'opacity-10'}`}>
           <div 
             className="w-full h-full bg-cover bg-center bg-fixed"
             style={{
               backgroundImage: `url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
             }}
           ></div>
         </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-display font-bold mb-4 ${theme === 'dark' ? 'text-primary-white' : 'text-primary-dark'}`}>
              Our <span className="text-primary-orange">Services</span>
            </h2>
            <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-primary-white/90' : 'text-text-light'}`}>
              Comprehensive construction solutions tailored to meet your specific needs. 
              We specialize in delivering quality results across all project types.
            </p>
          </motion.div>

          {/* Horizontal Scrollable Services */}
          <div className="relative -mx-4 px-4">
            <div 
              ref={servicesScrollRef}
              className="flex gap-8 overflow-x-auto pb-10 scroll-smooth scrollbar-thin scrollbar-thumb-primary-orange scrollbar-track-transparent px-4"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#FBB500 transparent' }}
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`${theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-primary-white border-border-gray'} rounded-2xl overflow-hidden min-w-[450px] max-w-[450px] shadow-lg border hover:shadow-xl hover:-translate-y-2 transition-all duration-400 group flex-shrink-0`}
                >
                  <div className="relative h-64">
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${service.image}')` }}
                    ></div>
                    
                                         <div className="absolute top-4 left-4 bg-primary-orange text-primary-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm">
                       {String(service.id).padStart(2, '0')}
                     </div>
                     <div className={`absolute bottom-4 right-4 ${theme === 'dark' ? 'bg-dark-card/90' : 'bg-white/90'} text-primary-orange w-14 h-14 rounded-xl flex items-center justify-center`}>
                       <service.icon className="w-6 h-6" />
                     </div>
                  </div>
                  <div className="p-8">
                    <h3 className={`text-2xl font-bold mb-4 font-display ${theme === 'dark' ? 'text-primary-white' : 'text-primary-dark'}`}>
                      {service.title}
                    </h3>
                    <p className={`text-base leading-relaxed mb-6 ${theme === 'dark' ? 'text-primary-white/80' : 'text-text-light'}`}>
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className={`flex items-center text-base ${theme === 'dark' ? 'text-primary-white/90' : 'text-text-dark'}`}>
                          <Check className="w-4 h-4 text-primary-orange mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link 
                      to="/services" 
                      className="inline-flex items-center text-primary-orange font-semibold text-base hover:gap-2 transition-all duration-300"
                    >
                      Learn More <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-10">
            <button 
              onClick={() => scrollServices('left')}
              className={`w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center hover:scale-110 ${
                theme === 'dark' 
                  ? 'border-dark-border text-primary-white hover:bg-primary-orange hover:border-primary-orange' 
                  : 'border-border-gray text-text-dark hover:bg-primary-orange hover:border-primary-orange hover:text-primary-white'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scrollServices('right')}
              className={`w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center hover:scale-110 ${
                theme === 'dark' 
                  ? 'border-dark-border text-primary-white hover:bg-primary-orange hover:border-primary-orange' 
                  : 'border-border-gray text-text-dark hover:bg-primary-orange hover:border-primary-orange hover:text-primary-white'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-orange text-primary-white relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
            }}
          ></div>
        </div>
        
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-primary-white/95 mb-10 max-w-3xl mx-auto leading-relaxed">
              Let's discuss your construction needs and bring your vision to life. 
              Our team is ready to help you create something extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-white inline-flex items-center justify-center">
                <FileText className="mr-2 w-5 h-5" />
                Get Free Quote
              </Link>
              <a href="tel:+1234567890" className="btn-outline-white inline-flex items-center justify-center">
                <Phone className="mr-2 w-5 h-5" />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home

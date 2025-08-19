import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Building2, Home as HomeIcon, Wrench, Users, Award, Phone, Mail, Check, FileText } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const Home = () => {
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
        <div className={`absolute inset-0 bg-gradient-to-br ${theme === 'dark' ? 'from-primary-dark/80 to-primary-dark/80' : 'from-primary-dark/70 to-primary-dark/70'}`}></div>

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
            <p className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-100' : 'text-gray-200'}`}>
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
      <section className={`py-20 relative ${theme === 'dark' ? 'bg-primary-dark' : 'bg-primary-dark'} text-primary-white`}>
        {/* Background Pattern */}
        <div className={`absolute inset-0 ${theme === 'dark' ? 'opacity-10' : 'opacity-5'}`}>
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
                <div className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-300'}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
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

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  transition: { duration: 0.2 }
                }}
                className={`${theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-primary-white border-border-gray'} overflow-hidden shadow-lg border group cursor-pointer transform transition-all duration-500 hover:shadow-xl`}
              >
                <div className="relative h-48 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center transform transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url('${service.image}')` }}
                  ></div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className={`absolute bottom-4 right-4 ${theme === 'dark' ? 'bg-dark-card/90' : 'bg-white/90'} text-primary-orange w-14 h-14 rounded-xl flex items-center justify-center transform transition-all duration-200 group-hover:scale-110`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-3 font-display ${theme === 'dark' ? 'text-primary-white' : 'text-primary-dark'} group-hover:text-primary-orange transition-colors duration-200`}>
                    {service.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-4 ${theme === 'dark' ? 'text-primary-white/80' : 'text-text-light'}`}>
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 2).map((feature, idx) => (
                      <li key={idx} className={`flex items-center text-sm ${theme === 'dark' ? 'text-primary-white/90' : 'text-text-dark'}`}>
                        <Check className="w-3 h-3 text-primary-orange mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to="/services" 
                    className={`inline-flex items-center font-semibold text-sm hover:gap-3 transition-all duration-200 relative z-10 ${
                      theme === 'dark' 
                        ? 'text-primary-orange group-hover:text-primary-orange' 
                        : 'text-primary-orange group-hover:text-primary-dark'
                    }`}
                  >
                    Learn More <ArrowRight className="ml-2 w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 relative ${theme === 'dark' ? 'bg-primary-orange' : 'bg-primary-orange'} text-primary-white`}>
        {/* Background Pattern */}
        <div className={`absolute inset-0 ${theme === 'dark' ? 'opacity-15' : 'opacity-10'}`}>
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
            <p className={`text-lg mb-10 max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-primary-white' : 'text-primary-white/95'}`}>
              Let's discuss your construction needs and bring your vision to life. 
              Our team is ready to help you create something extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className={`inline-flex items-center justify-center px-8 py-4 font-semibold rounded-lg transition-all duration-300 ${theme === 'dark' ? 'bg-white text-primary-orange hover:bg-gray-100' : 'bg-white text-primary-orange hover:bg-gray-100'}`}>
                <FileText className="mr-2 w-5 h-5" />
                Get Free Quote
              </Link>
              <a href="tel:+1234567890" className={`inline-flex items-center justify-center px-8 py-4 font-semibold rounded-lg border-2 transition-all duration-300 ${theme === 'dark' ? 'border-white text-white hover:bg-white hover:text-primary-orange' : 'border-white text-white hover:bg-white hover:text-primary-orange'}`}>
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

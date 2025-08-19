import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Building2, 
  Home, 
  Wrench, 
  MapPin, 
  Calendar,
  ArrowRight,
  Filter
} from 'lucide-react'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'Modern Office Complex',
      category: 'commercial',
      location: 'Downtown Business District',
      year: '2023',
      description: 'A state-of-the-art office complex featuring sustainable design, modern amenities, and flexible workspaces.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: ['LEED Certified', 'Smart Building Technology', 'Green Roof', 'EV Charging Stations']
    },
    {
      id: 2,
      title: 'Luxury Residential Villa',
      category: 'residential',
      location: 'Exclusive Hillside Community',
      year: '2023',
      description: 'Custom luxury villa with premium finishes, smart home integration, and breathtaking views.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: ['Smart Home System', 'Wine Cellar', 'Home Theater', 'Infinity Pool']
    },
    {
      id: 3,
      title: 'Shopping Center Renovation',
      category: 'renovation',
      location: 'Central Mall District',
      year: '2022',
      description: 'Complete renovation and modernization of a 50,000 sq ft shopping center with enhanced retail experience.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: ['Modern Facade', 'Energy Efficient', 'Enhanced Lighting', 'New Food Court']
    },
    {
      id: 4,
      title: 'Multi-Family Housing Complex',
      category: 'residential',
      location: 'Urban Development Zone',
      year: '2022',
      description: 'Contemporary multi-family housing complex with 120 units, community amenities, and sustainable design.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: ['Community Center', 'Fitness Facilities', 'Rooftop Garden', 'Secure Parking']
    },
    {
      id: 5,
      title: 'Industrial Warehouse Facility',
      category: 'commercial',
      location: 'Industrial Park',
      year: '2022',
      description: 'Large-scale industrial warehouse with advanced logistics systems and sustainable building practices.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: ['Automated Systems', 'Solar Panels', 'Loading Docks', 'Climate Control']
    },
    {
      id: 6,
      title: 'Historic Building Restoration',
      category: 'renovation',
      location: 'Historic District',
      year: '2021',
      description: 'Careful restoration of a historic landmark building while preserving its architectural integrity.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: ['Historical Preservation', 'Modern Amenities', 'Structural Reinforcement', 'Period Details']
    },
    {
      id: 7,
      title: 'Healthcare Facility',
      category: 'commercial',
      location: 'Medical District',
      year: '2021',
      description: 'Modern healthcare facility designed for patient comfort and medical efficiency.',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: ['Patient-Centered Design', 'Advanced Medical Equipment', 'Healing Gardens', 'Accessibility Features']
    },
    {
      id: 8,
      title: 'Eco-Friendly Home',
      category: 'residential',
      location: 'Green Community',
      year: '2021',
      description: 'Net-zero energy home built with sustainable materials and renewable energy systems.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: ['Solar Power', 'Rainwater Harvesting', 'Natural Materials', 'Energy Efficient']
    }
  ]

  const filters = [
    { id: 'all', label: 'All Projects', icon: Building2 },
    { id: 'residential', label: 'Residential', icon: Home },
    { id: 'commercial', label: 'Commercial', icon: Building2 },
    { id: 'renovation', label: 'Renovation', icon: Wrench }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary-orange/10 to-primary-black/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Our <span className="gradient-text">Projects</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-padding bg-gray-50 dark:bg-dark-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">
              Browse by <span className="gradient-text">Category</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeFilter === filter.id
                      ? 'bg-primary-orange text-primary-black shadow-medium'
                      : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-primary-orange/10 hover:text-primary-orange'
                  }`}
                >
                  <filter.icon className="w-5 h-5" />
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card overflow-hidden group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{project.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{project.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-primary-black dark:text-primary-white group-hover:text-primary-orange transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-primary-orange mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.features.slice(0, 3).map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-2 py-1 bg-primary-orange/10 text-primary-orange text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {project.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-300 text-xs rounded-full">
                          +{project.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="inline-flex items-center text-primary-orange font-semibold hover:text-primary-orange/80 transition-colors duration-300">
                    View Details
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                No projects found in this category. Please try another filter.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-primary-black text-primary-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold text-primary-orange mb-2">
                150+
              </div>
              <div className="text-gray-300">
                Projects Completed
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold text-primary-orange mb-2">
                25+
              </div>
              <div className="text-gray-300">
                Years Experience
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold text-primary-orange mb-2">
                50+
              </div>
              <div className="text-gray-300">
                Team Members
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold text-primary-orange mb-2">
                100%
              </div>
              <div className="text-gray-300">
                Client Satisfaction
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-orange to-primary-orange/80">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-black mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-primary-black/80 mb-8 max-w-2xl mx-auto">
              Let's discuss your construction needs and create something extraordinary together. 
              Our team is ready to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-secondary bg-primary-black text-primary-white border-primary-black hover:bg-primary-black/90">
                Get Free Quote
              </a>
              <a href="tel:+1234567890" className="btn-secondary bg-transparent text-primary-black border-primary-black hover:bg-primary-black hover:text-primary-white">
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Projects

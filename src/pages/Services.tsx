import { motion } from 'framer-motion'
import { 
  Home, 
  Building2, 
  Wrench, 
  Users, 
  HardHat, 
  Ruler, 
  Shield, 
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: Home,
      title: 'Residential Construction',
      description: 'Custom homes and residential projects built to your exact specifications with premium quality materials and expert craftsmanship.',
      features: [
        'Custom home design and construction',
        'Multi-family residential projects',
        'Luxury homes and estates',
        'Sustainable and eco-friendly building',
        'Complete interior finishing',
        'Landscaping and outdoor spaces'
      ],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    },
    {
      icon: Building2,
      title: 'Commercial Projects',
      description: 'Modern commercial buildings, office spaces, and retail facilities designed for functionality, aesthetics, and long-term value.',
      features: [
        'Office buildings and corporate headquarters',
        'Retail spaces and shopping centers',
        'Industrial facilities and warehouses',
        'Healthcare and educational buildings',
        'Restaurants and hospitality venues',
        'Mixed-use developments'
      ],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    },
    {
      icon: Wrench,
      title: 'Renovation & Interiors',
      description: 'Transform your existing space with our comprehensive renovation and interior design services that maximize functionality and style.',
      features: [
        'Complete home renovations',
        'Kitchen and bathroom remodeling',
        'Interior design and decoration',
        'Structural modifications',
        'Energy efficiency upgrades',
        'Historical restoration'
      ],
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    },
    {
      icon: Users,
      title: 'Project Management',
      description: 'Comprehensive project management services ensuring your construction project is completed on time, within budget, and to the highest standards.',
      features: [
        'Full project lifecycle management',
        'Budget planning and cost control',
        'Timeline management and scheduling',
        'Quality assurance and control',
        'Stakeholder communication',
        'Risk management and mitigation'
      ],
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    },
    {
      icon: HardHat,
      title: 'Construction Consulting',
      description: 'Expert consulting services to help you make informed decisions about your construction projects and investments.',
      features: [
        'Feasibility studies and site analysis',
        'Construction cost estimation',
        'Building code compliance review',
        'Sustainability and green building consulting',
        'Construction technology recommendations',
        'Project optimization strategies'
      ],
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    },
    {
      icon: Ruler,
      title: 'Design & Planning',
      description: 'Comprehensive architectural design and planning services to bring your vision to life with innovative and practical solutions.',
      features: [
        'Architectural design and planning',
        '3D modeling and visualization',
        'Building permit assistance',
        'Site planning and development',
        'Sustainable design integration',
        'Construction documentation'
      ],
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    }
  ]

  const whyChooseUs = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Rigorous quality control processes ensure every project meets the highest standards.'
    },
    {
      icon: Clock,
      title: 'Timely Delivery',
      description: 'We pride ourselves on completing projects on schedule without compromising quality.'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our experienced professionals bring decades of combined construction expertise.'
    },
    {
      icon: CheckCircle,
      title: 'Client Satisfaction',
      description: '100% client satisfaction rate with long-term relationships built on trust.'
    }
  ]

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
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Comprehensive construction solutions tailored to meet your specific needs. 
              From concept to completion, we deliver excellence in every project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border shadow-lg overflow-hidden group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-primary-orange rounded-lg flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-primary-black" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-primary-black dark:text-primary-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle className="w-4 h-4 text-primary-orange mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="inline-flex items-center text-primary-orange font-semibold hover:text-primary-orange/80 transition-colors duration-300">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gray-50 dark:bg-dark-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Why <span className="gradient-text">Choose Us</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We combine decades of experience with innovative construction techniques 
              to deliver exceptional results that exceed expectations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary-orange/20 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-primary-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary-black dark:text-primary-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-black text-primary-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your construction needs and create a customized solution 
              that perfectly fits your vision and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">
                Get Free Quote
              </a>
              <a href="tel:+1234567890" className="btn-secondary text-primary-white border-primary-white hover:bg-primary-white hover:text-primary-black">
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services

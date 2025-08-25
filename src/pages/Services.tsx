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
      icon: Building2,
      title: 'High-Rise Construction',
      description: 'Specialized expertise in constructing buildings ranging from 14 to 22 floors with precision engineering and quality craftsmanship.',
      features: [
        '14-22 floor high-rise buildings',
        'Structural engineering excellence',
        'Quality control systems',
        'Safety compliance standards',
        'Modern construction techniques',
        'Timely project delivery'
      ],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    },
    {
      icon: Home,
      title: 'Residential Projects',
      description: 'Comprehensive residential construction services from individual homes to large-scale apartment complexes and housing societies.',
      features: [
        'Individual homes and villas',
        'Apartment complexes',
        'Housing societies',
        'Luxury residences',
        'Affordable housing',
        'Custom home design'
      ],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    },
    {
      icon: Wrench,
      title: 'Turn-Key Projects',
      description: 'Complete project delivery from concept to completion, taking full responsibility for delivering finished projects within defined timeframes.',
      features: [
        'End-to-end project management',
        'Design and planning',
        'Construction execution',
        'Quality assurance',
        'Timeline management',
        'Handover and documentation'
      ],
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    },
    {
      icon: Users,
      title: 'RCC & Masonry Works',
      description: 'Expert reinforced concrete construction and masonry work including plastering, ensuring structural integrity and aesthetic finish.',
      features: [
        'Reinforced concrete structures',
        'Masonry construction',
        'Plastering and finishing',
        'Structural reinforcement',
        'Quality material usage',
        'Skilled craftsmanship'
      ],
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    },
    {
      icon: HardHat,
      title: 'All Labor Contracts',
      description: 'Comprehensive labor services for construction projects, providing skilled workforce for various construction phases.',
      features: [
        'Skilled construction workers',
        'Project-specific teams',
        'Quality workmanship',
        'Timely completion',
        'Cost-effective solutions',
        'Flexible contract terms'
      ],
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    },
    {
      icon: Ruler,
      title: 'Project Management',
      description: 'Professional project management services ensuring your construction project is completed on time, within budget, and to the highest standards.',
      features: [
        'Project planning and scheduling',
        'Budget management',
        'Quality control',
        'Risk management',
        'Stakeholder coordination',
        'Progress monitoring'
      ],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    }
  ]

  const whyChooseUs = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Rigorous quality control processes ensure every project meets the highest standards of construction excellence.'
    },
    {
      icon: Clock,
      title: 'Timely Delivery',
      description: 'We pride ourselves on completing projects on schedule without compromising quality or safety standards.'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our experienced professionals bring 15+ years of combined expertise in high-rise construction.'
    },
    {
      icon: CheckCircle,
      title: 'Client Satisfaction',
      description: '100% client satisfaction rate with long-term relationships built on trust and quality delivery.'
    }
  ]

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-accent-gray/10 to-primary-black/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Specialized construction services in high-rise buildings, turn-key projects, and RCC & masonry works. 
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
                className="bg-white border border-gray-200 shadow-lg overflow-hidden group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-accent-gray rounded-lg flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-primary-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-heading font-bold mb-4 text-primary-black">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-accent-gray mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="inline-flex items-center text-accent-gray font-semibold hover:text-accent-gray/80 transition-colors duration-300">
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
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
              Why <span className="gradient-text">Choose Us</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We combine 15+ years of experience with innovative construction techniques 
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
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-accent-gray/20 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-accent-gray" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3 text-primary-black">
                  {item.title}
                </h3>
                <p className="text-gray-600">
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
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
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
              <a href="tel:+919586822668" className="btn-secondary text-primary-white border-primary-white hover:bg-primary-white hover:text-primary-black">
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

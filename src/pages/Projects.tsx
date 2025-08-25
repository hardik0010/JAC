import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Building2, 
  Home, 
  MapPin, 
  ArrowRight
} from 'lucide-react'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'VELTIS THE SECOND',
      category: 'residential',
      location: 'Khoraj, Gandhinagar',
      year: '2024',
      description: 'A prestigious residential project featuring 2,30,000 sq.ft. area with B+G+14 storeys, delivered as a turn-key project for ALT 53 Developers LLP.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: ['Turn-key Project', 'B+G+14 Storeys', '2,30,000 SQ.FT', 'Ongoing']
    },
    {
      id: 2,
      title: 'ARISE AURA',
      category: 'commercial',
      location: 'Gota, Ahmedabad',
      year: '2024',
      description: 'Modern commercial complex spanning 46,000 sq.ft. with B+G+7 storeys, delivered as a complete turn-key solution for ARISE GROUP.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: ['Turn-key Project', 'B+G+7 Storeys', '46,000 SQ.FT', 'Ongoing']
    },
    {
      id: 3,
      title: '24 HIG NIDHI APARTMENT PART 1',
      category: 'residential',
      location: 'Shashtrinagar, Ahmedabad',
      year: '2024',
      description: 'Residential complex with 2B+G+13 storeys covering 1,60,000 sq.ft., featuring RCC & masonry-plaster with material for ART NIRMAN.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: ['RCC & Masonry', '2B+G+13 Storeys', '1,60,000 SQ.FT', 'Ongoing']
    },
    {
      id: 4,
      title: 'THE ONE',
      category: 'residential',
      location: 'Randesan, Gandhinagar',
      year: '2024',
      description: 'Massive residential project spanning 4,75,000 sq.ft. with 2B+G+18 storeys, featuring RCC & masonry-plaster for RADHE GROUP & SAVALIYA GROUP.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: ['RCC & Masonry', '2B+G+18 Storeys', '4,75,000 SQ.FT', 'Ongoing']
    },
    {
      id: 5,
      title: 'ARISE VIBRANT',
      category: 'residential',
      location: 'Chharodi, Ahmedabad',
      year: '2024',
      description: 'Large-scale residential development covering 7,50,000 sq.ft. with 2B+G+14 storeys, featuring RCC & masonry-plaster for ARISE GROUP.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: ['RCC & Masonry', '2B+G+14 Storeys', '7,50,000 SQ.FT', 'Ongoing']
    },
    {
      id: 6,
      title: 'SAKAR PARADISE',
      category: 'residential',
      location: 'Khoraj, Gandhinagar',
      year: '2024',
      description: 'Residential project spanning 3,75,000 sq.ft. with 2B+G+14 storeys, featuring RCC & masonry-plaster for SAKAR GROUP.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: ['RCC & Masonry', '2B+G+14 Storeys', '3,75,000 SQ.FT', 'Ongoing']
    },
    {
      id: 7,
      title: 'SHREE VISHNUDHARA ESSENCE',
      category: 'residential',
      location: 'Thaltej, Ahmedabad',
      year: '2024',
      description: 'Residential complex covering 3,50,000 sq.ft. with 2B+G+14 storeys, featuring RCC & masonry-plaster for ART NIRMAN.',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: ['RCC & Masonry', '2B+G+14 Storeys', '3,50,000 SQ.FT', 'Ongoing']
    },
    {
      id: 8,
      title: 'OMKAR ENCLAVES',
      category: 'residential',
      location: 'Ranip, Ahmedabad',
      year: '2023',
      description: 'Completed residential project spanning 2,50,000 sq.ft. with B+G+14 storeys, featuring RCC & masonry-plaster for OHM ENTERPRISE.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: ['RCC & Masonry', 'B+G+14 Storeys', '2,50,000 SQ.FT', 'Completed']
    },
    {
      id: 9,
      title: 'STAR ELEGANCE',
      category: 'residential',
      location: 'Zundal, Ahmedabad',
      year: '2023',
      description: 'Completed residential project covering 55,000 sq.ft. with B+G+7 storeys, delivered as an all-labor contract for RD DEVELOPERS.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: ['All Labor Contract', 'B+G+7 Storeys', '55,000 SQ.FT', 'Completed']
    },
    {
      id: 10,
      title: 'ALTIMUS',
      category: 'commercial',
      location: 'Navarangpura, Ahmedabad',
      year: '2023',
      description: 'Completed commercial project spanning 2,50,000 sq.ft. with 2B+G+18 storeys, featuring RCC & masonry-plaster for SOCH DEVELOPERS.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: ['RCC & Masonry', '2B+G+18 Storeys', '2,50,000 SQ.FT', 'Completed']
    },
    {
      id: 11,
      title: 'SUMEL 10',
      category: 'residential',
      location: 'Saraspur, Ahmedabad',
      year: '2022',
      description: 'Completed residential project with G+4 storeys, featuring RCC & masonry-plaster for H.N. SAFAL.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: ['RCC & Masonry', 'G+4 Storeys', 'Residential', 'Completed']
    },
    {
      id: 12,
      title: 'ANANTARA',
      category: 'residential',
      location: 'Shaibag, Ahmedabad',
      year: '2022',
      description: 'Completed residential project with B+G+11 storeys, featuring RCC & masonry-plaster for A. SHRIDHAR.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: ['RCC & Masonry', 'B+G+11 Storeys', 'Residential', 'Completed']
    }
  ]

  const filters = [
    { id: 'all', label: 'All Projects', icon: Building2 },
    { id: 'residential', label: 'Residential', icon: Home },
    { id: 'commercial', label: 'Commercial', icon: Building2 },
    { id: 'renovation', label: 'Completed', icon: Building2 }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : activeFilter === 'renovation'
    ? projects.filter(project => project.features.includes('Completed'))
    : projects.filter(project => project.category === activeFilter)

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}

      {/* Filter Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8">
              Browse by <span className="gradient-text">Category</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeFilter === filter.id
                      ? 'bg-accent-gray text-primary-white shadow-medium'
                      : 'bg-white text-gray-600 hover:bg-accent-gray/10 hover:text-accent-gray'
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
                className="bg-white border border-gray-200 shadow-lg overflow-hidden group"
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
                        <span className="text-sm">{project.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold mb-3 text-primary-black group-hover:text-accent-gray transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="text-sm font-heading font-semibold text-accent-gray mb-2">Project Details:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-2 py-1 bg-accent-gray/10 text-accent-gray text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="inline-flex items-center text-accent-gray font-semibold hover:text-accent-gray/80 transition-colors duration-300">
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
              <p className="text-gray-600 text-lg">
                No projects found in this category. Please try another filter.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      

      {/* CTA Section */}
      
    </div>
  )
}

export default Projects

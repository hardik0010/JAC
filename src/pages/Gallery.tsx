import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Building2,
  Home,
  Wrench,
  Play,
  Download,
  Share2
} from 'lucide-react'

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const galleryItems = [
    {
      id: 1,
      title: 'Modern Office Complex',
      category: 'commercial',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'State-of-the-art office building with sustainable design'
    },
    {
      id: 2,
      title: 'Luxury Villa Construction',
      category: 'residential',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Custom luxury home with premium finishes'
    },
    {
      id: 3,
      title: 'Shopping Center Renovation',
      category: 'renovation',
      type: 'video',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Complete renovation of retail space'
    },
    {
      id: 4,
      title: 'Construction Site Progress',
      category: 'commercial',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Work-in-progress shot of major project'
    },
    {
      id: 5,
      title: 'Interior Finishing',
      category: 'residential',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'High-end interior finishing work'
    },
    {
      id: 6,
      title: 'Industrial Facility',
      category: 'commercial',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Large-scale industrial construction'
    },
    {
      id: 7,
      title: 'Kitchen Renovation',
      category: 'renovation',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Modern kitchen renovation project'
    },
    {
      id: 8,
      title: 'Multi-Family Housing',
      category: 'residential',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Contemporary apartment complex'
    },
    {
      id: 9,
      title: 'Construction Equipment',
      category: 'commercial',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Heavy machinery on construction site'
    },
    {
      id: 10,
      title: 'Bathroom Remodel',
      category: 'renovation',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Luxury bathroom renovation'
    },
    {
      id: 11,
      title: 'Exterior Finishing',
      category: 'residential',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Exterior facade completion'
    },
    {
      id: 12,
      title: 'Project Completion',
      category: 'commercial',
      type: 'video',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Final walkthrough of completed project'
    }
  ]

  const filters = [
    { id: 'all', label: 'All Projects', icon: Building2 },
    { id: 'residential', label: 'Residential', icon: Home },
    { id: 'commercial', label: 'Commercial', icon: Building2 },
    { id: 'renovation', label: 'Renovation', icon: Wrench }
  ]

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter)

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

          {/* Gallery Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="break-inside-avoid group"
              >
                <div className="card overflow-hidden cursor-pointer" onClick={() => setSelectedImage(item.image)}>
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {item.type === 'video' && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-16 h-16 bg-accent-gray rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-primary-white ml-1" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white font-heading font-semibold mb-1">{item.title}</h3>
                      <p className="text-gray-200 text-sm">{item.description}</p>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-2">
                        <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent-gray hover:text-primary-white transition-colors duration-300">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent-gray hover:text-primary-white transition-colors duration-300">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-600 text-lg">
                No images found in this category. Please try another filter.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Gallery"
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-accent-gray text-primary-white rounded-full flex items-center justify-center hover:bg-accent-gray/90 transition-colors duration-300"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* CTA Section */}
    </div>
  )
}

export default Gallery

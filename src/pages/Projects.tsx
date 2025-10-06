import { useState, useEffect, useRef, useCallback, Component, ErrorInfo, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import { 
  Building2, 
  Home, 
  MapPin, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search
} from 'lucide-react'

// Error Boundary Component
class ProjectsErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Projects component error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="pt-16 lg:pt-20 min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h3>
              <p className="text-red-600 mb-4">The projects page encountered an error.</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

interface ProjectImage {
  url: string;
  cloudinaryId: string;
  caption: string;
  isMain?: boolean;
}

interface Project {
  _id: string;
  projectName: string;
  projectDescription: string;
  typeOfProject: string;
  client: string;
  area: string;
  status: string;
  location: string;
  mapLink?: string;
  images: ProjectImage[];
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalProjects: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set())
  const filterRef = useRef<HTMLDivElement>(null)
  
  const {
    data: projectsData,
    loading,
    error,
    execute: fetchProjects
  } = useApi(async () => {
    let url = `${API_BASE}/projects?page=${currentPage}&limit=6`
    if (activeFilter !== 'all') {
      if (activeFilter === 'completed') {
        url += '&status=completed'
      } else if (activeFilter === 'ongoing') {
        url += '&status=ongoing'
      } else {
        url += `&type=${activeFilter}`
      }
    }
    if (searchQuery) {
      url += `&search=${encodeURIComponent(searchQuery)}`
    }
    const response = await fetch(url)
    if (!response.ok) throw new Error('Failed to fetch projects')
    return response.json()
  })

  const projects = projectsData?.projects || []
  const pagination = projectsData?.pagination

  // Debug logging
  console.log('Projects component rendering with:', { projects, loading, error, currentPage })

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5002/api'

  // Initial load effect - only runs once
  useEffect(() => {
    fetchProjects().catch(err => {
      console.error('Error in initial load:', err);
    });
  }, []); // Empty dependency array for initial load only

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
      setCurrentPage(1); // Reset to first page when searching
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch projects when search query, page, or filter changes
  useEffect(() => {
    // Skip the initial empty state
    if (searchQuery === '' && currentPage === 1 && activeFilter === 'all') {
      return;
    }

    const fetchData = async () => {
      try {
        await fetchProjects();
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };

    fetchData();
  }, [currentPage, activeFilter, searchQuery]) // Removed fetchProjects from dependencies

  // Handle click outside to close filter dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Toggle description expansion
  const toggleDescription = (projectId: string) => {
    const newExpanded = new Set(expandedDescriptions)
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId)
    } else {
      newExpanded.add(projectId)
    }
    setExpandedDescriptions(newExpanded)
  }

  // Truncate description to first line
  const truncateDescription = (description: string, maxLength: number = 100) => {
    if (description.length <= maxLength) return description
    return description.substring(0, maxLength).trim() + '...'
  }

  const filters = [
    { id: 'all', label: 'All Projects', icon: Building2 },
    { id: 'residential', label: 'Residential', icon: Home },
    { id: 'commercial', label: 'Commercial', icon: Building2 },
    { id: 'ongoing', label: 'Ongoing', icon: Building2 },
    { id: 'completed', label: 'Completed', icon: Building2 }
  ]

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId)
    setCurrentPage(1)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
  }

  // Error boundary - if there's an error, show it
  if (error && projects.length === 0) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Projects</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => {
                // setError(null)
                // fetchProjects() // Temporarily disabled
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Clear Error
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show loading state immediately if no projects
  if (loading && projects.length === 0) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading projects...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait...</p>
        </div>
      </div>
    )
  }

  // Safety check - ensure we have valid data
  if (!Array.isArray(projects)) {
    console.error('Projects is not an array:', projects)
    // Set default empty array instead of causing an error
    // setProjects([])
    return (
      <div className="pt-16 lg:pt-20 min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Data Error</h3>
            <p className="text-yellow-600 mb-4">Invalid projects data received.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    )
  }

  console.log('Rendering Projects component with projects:', projects.length, 'projects:', projects)
  
  return (
    <div className="pt-16 lg:pt-20 bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Projects</h1>
            <p className="text-lg text-gray-600">Discover our portfolio of successful projects</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">{error}</p>
                  <button 
                    onClick={() => {/* setError(null) */}}
                    className="mt-2 text-xs text-yellow-600 hover:text-yellow-800 underline"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="flex-1 max-w-md">
                <form onSubmit={handleSearch} className="relative">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search projects, clients, or locations..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    {searchInput && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchInput('');
                          setSearchQuery('');
                          setCurrentPage(1);
                        }}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Filter Dropdown */}
              <div className="relative" ref={filterRef}>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                >
                  <span>Filter by Category</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                {showFilters && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="py-2">
                      {filters.map((filter) => (
                        <button
                          key={filter.id}
                          onClick={() => {
                            handleFilterChange(filter.id);
                            setShowFilters(false);
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
                            activeFilter === filter.id
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-700'
                          }`}
                        >
                          <filter.icon className="w-5 h-5" />
                          <span>{filter.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects && projects.length > 0 ? projects.map((project, index) => {
              // Safety check for each project
              if (!project || !project._id) {
                console.error('Invalid project:', project)
                return null
              }
              return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 shadow-lg overflow-hidden group"
              >
                <div className="relative h-64 overflow-hidden">
                  {project.images && project.images.length > 0 ? (
                    <ProjectImageCarousel images={project.images} />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Building2 className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        {project.mapLink ? (
                          <a
                            href={project.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm hover:underline cursor-pointer"
                            title="Click to open in Google Maps"
                          >
                            {project.location}
                          </a>
                        ) : (
                          <span className="text-sm">{project.location}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          project.status === 'ongoing' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-blue-500 text-white'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {project.projectName}
                  </h3>
                  <p className="text-gray-600 mb-3 leading-relaxed">
                    <strong>Client:</strong> {project.client}
                  </p>
                  <div className="text-gray-600 mb-4 leading-relaxed text-sm">
                    {expandedDescriptions.has(project._id) ? (
                      <div>
                        <p>{project.projectDescription}</p>
                        <button
                          onClick={() => toggleDescription(project._id)}
                          className="text-blue-600 hover:text-blue-800 text-xs font-medium mt-2"
                        >
                          Show Less
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p>{truncateDescription(project.projectDescription)}</p>
                        {project.projectDescription.length > 100 && (
                          <button
                            onClick={() => toggleDescription(project._id)}
                            className="text-blue-600 hover:text-blue-800 text-xs font-medium mt-2"
                          >
                            Read More
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-blue-600 mb-2">Project Details:</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div><strong>Area:</strong> {project.area}</div>
                      <div><strong>Type:</strong> <span className="capitalize">{project.typeOfProject}</span></div>
                      <div><strong>Images:</strong> {project.images ? project.images.length : 0}</div>
                    </div>
                  </div>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300"
                  >
                    Contact for more info
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
              )
            }) : (
              <div className="col-span-full text-center py-12">
                <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No projects available</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-12 flex justify-center"
            >
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        page === currentPage
                          ? 'bg-accent-gray text-white'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Page Info */}
          {pagination && (
            <div className="text-center mt-4 text-gray-600">
              <p>
                Showing page {pagination.currentPage} of {pagination.totalPages} 
                ({pagination.totalProjects} total projects)
              </p>
            </div>
          )}

          {projects.length === 0 && !loading && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No Projects Found</h3>
                <p className="text-gray-600 mb-4">
                  No projects match your current search or filters.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('')
                    setSearchInput('')
                    setActiveFilter('all')
                    setCurrentPage(1)
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

// Image Carousel Component
const ProjectImageCarousel = ({ images }: { images: ProjectImage[] }) => {
  // Find main image index, default to 0 if not found
  const mainImageIndex = images.findIndex(img => img.isMain);
  const [currentImageIndex, setCurrentImageIndex] = useState(mainImageIndex >= 0 ? mainImageIndex : 0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <Building2 className="w-16 h-16 text-gray-400" />
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <img
        src={images[0].url}
        alt={images[0].caption || 'Project Image'}
        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
      />
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Main Image */}
      <img
        src={images[currentImageIndex].url}
        alt={images[currentImageIndex].caption || 'Project Image'}
        className="w-full h-full object-cover object-center group-hover:scale-110 transition-all duration-500"
      />
      
      {/* Image Caption - Only show for non-main images */}
      {images[currentImageIndex].caption && !images[currentImageIndex].isMain && (
        <div className="absolute bottom-16 left-4 right-4 text-center">
          <p className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
            {images[currentImageIndex].caption}
          </p>
        </div>
      )}
      
      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};


const ProjectsWithErrorBoundary = () => (
  <ProjectsErrorBoundary>
    <Projects />
  </ProjectsErrorBoundary>
)

export default ProjectsWithErrorBoundary;

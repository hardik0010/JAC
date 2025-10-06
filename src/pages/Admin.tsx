import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Plus, Edit, Trash2, LogOut, Settings, BarChart3, Building2, Users, FileText, RefreshCw, Download } from 'lucide-react';

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

interface ProjectImage {
  url: string;
  cloudinaryId: string;
  caption: string;
}

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  type: string;
  image: string;
  description?: string;
}

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
  experience: string;
  specialization: string[];
}

interface DashboardStats {
  totalProjects: number;
  ongoingProjects: number;
  completedProjects: number;
  residentialProjects: number;
  commercialProjects: number;
}

interface Admin {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  
  // Login state
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Password change state
  const [showPasswordChangeForm, setShowPasswordChangeForm] = useState(false);
  const [passwordChangeForm, setPasswordChangeForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // Dashboard state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  
  // Project form state
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    projectName: '',
    projectDescription: '',
    typeOfProject: 'residential',
    client: '',
    area: '',
    status: 'ongoing',
    location: '',
    mapLink: '',
    mainImage: null as File | null,
    images: [] as File[],
    imageCaptions: [] as string[],
    existingImages: [] as ProjectImage[],
    imagesToDelete: [] as string[]
  });

  // Loading states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isRemovingImage, setIsRemovingImage] = useState<string | null>(null);

  // Gallery form state
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: '',
    type: '',
    description: '',
    image: null as File | null
  });

  // Service form state
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    icon: '',
    features: ['']
  });

  // Team form state
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [teamForm, setTeamForm] = useState({
    name: '',
    position: '',
    bio: '',
    experience: '',
    specialization: [''],
    image: null as File | null
  });

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

  // Check authentication on mount
  useEffect(() => {
    if (token) {
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  // Refetch data when page changes
  useEffect(() => {
    if (token && currentPage > 0) {
      fetchDashboardData();
    }
  }, [currentPage, token]);

  // Check authentication status
  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_BASE}/admin/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAdmin(data.admin);
        setIsAuthenticated(true);
        fetchDashboardData();
      } else {
        localStorage.removeItem('adminToken');
        setToken(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('adminToken');
      setToken(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const [statsResponse, projectsResponse, galleryResponse, servicesResponse, teamResponse] = await Promise.all([
        fetch(`${API_BASE}/admin/dashboard`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/projects?page=${currentPage}&limit=6`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/admin/gallery`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/admin/services`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/admin/team`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.stats);
      }

      if (projectsResponse.ok) {
        const projectsData = await projectsResponse.json();
        setProjects(projectsData.projects);
        setTotalPages(projectsData.pagination.totalPages);
        setTotalProjects(projectsData.pagination.totalProjects);
      }

      if (galleryResponse.ok) {
        const galleryData = await galleryResponse.json();
        setGallery(galleryData.gallery);
      }

      if (servicesResponse.ok) {
        const servicesData = await servicesResponse.json();
        setServices(servicesData.services);
      }

      if (teamResponse.ok) {
        const teamData = await teamResponse.json();
        setTeam(teamData.team);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    // Prevent multiple simultaneous login attempts
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        setToken(data.token);
        setAdmin(data.admin);
        setIsAuthenticated(true);
        await fetchDashboardData();
        console.log('Admin logged in successfully');
      } else {
        setLoginError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('adminToken');
    setToken(null);
    setAdmin(null);
    setIsAuthenticated(false);
    setActiveTab('dashboard');
    
    // Reset all form states
    setLoginForm({ username: '', password: '' });
    setLoginError('');
    setPasswordChangeForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordChangeError('');
    setPasswordChangeSuccess('');
    
    // Clear all data
    setProjects([]);
    setGallery([]);
    setServices([]);
    setTeam([]);
    setStats(null);
    
    console.log('Admin logged out successfully');
  };

  // Handle password change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeError('');
    setPasswordChangeSuccess('');
    
    // Client-side validation
    if (passwordChangeForm.newPassword !== passwordChangeForm.confirmPassword) {
      setPasswordChangeError('New passwords do not match');
      return;
    }

    if (passwordChangeForm.newPassword.length < 8) {
      setPasswordChangeError('New password must be at least 8 characters long');
      return;
    }

    setIsChangingPassword(true);
    
    try {
      const response = await fetch(`${API_BASE}/admin/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordChangeForm.currentPassword,
          newPassword: passwordChangeForm.newPassword
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setPasswordChangeSuccess('Password changed successfully!');
        setPasswordChangeForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setTimeout(() => {
          setShowPasswordChangeForm(false);
          setPasswordChangeSuccess('');
        }, 2000);
      } else {
        setPasswordChangeError(data.message);
      }
    } catch (error) {
      setPasswordChangeError('Failed to change password. Please try again.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    
    return {
      score: strength,
      label: strength < 2 ? 'Weak' : strength < 4 ? 'Medium' : 'Strong',
      color: strength < 2 ? 'red' : strength < 4 ? 'yellow' : 'green'
    };
  };

  // Handle project form submission
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    console.log('Starting project submission...');
    
    try {
      const formData = new FormData();
      formData.append('projectName', projectForm.projectName);
      formData.append('projectDescription', projectForm.projectDescription);
      formData.append('typeOfProject', projectForm.typeOfProject);
      formData.append('client', projectForm.client);
      formData.append('area', projectForm.area);
      formData.append('status', projectForm.status);
      formData.append('location', projectForm.location);
      
      if (projectForm.mapLink) {
        formData.append('mapLink', projectForm.mapLink);
      }
      
      // Add main image with size logging
      if (projectForm.mainImage) {
        console.log('Adding main image:', projectForm.mainImage.name, 'Size:', (projectForm.mainImage.size / 1024 / 1024).toFixed(2), 'MB');
        formData.append('mainImage', projectForm.mainImage);
      }
      
      // Add additional images with size logging
      if (projectForm.images.length > 0) {
        console.log(`Adding ${projectForm.images.length} additional images`);
        projectForm.images.forEach((image, index) => {
          console.log(`Image ${index + 1}:`, image.name, 'Size:', (image.size / 1024 / 1024).toFixed(2), 'MB');
          formData.append('images', image);
        });
      }
      
      // Add image captions
      if (projectForm.imageCaptions.length > 0) {
        formData.append('imageCaptions', JSON.stringify(projectForm.imageCaptions));
      }
      
      // Add existing images data for updates
      if (editingProject && projectForm.existingImages.length > 0) {
        formData.append('existingImages', JSON.stringify(projectForm.existingImages));
      }
      
      // Add images to delete
      if (projectForm.imagesToDelete.length > 0) {
        formData.append('imagesToDelete', JSON.stringify(projectForm.imagesToDelete));
      }

      const url = editingProject 
        ? `${API_BASE}/projects/${editingProject._id}`
        : `${API_BASE}/projects`;
      
      const method = editingProject ? 'PUT' : 'POST';
      
      console.log(`Submitting to ${method} ${url}`);
      console.log('Form data prepared, starting upload...');
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      console.log('Upload completed, processing response...');

      if (response.ok) {
        console.log('Project saved successfully!');
        setShowProjectForm(false);
        setEditingProject(null);
        setProjectForm({
          projectName: '',
          projectDescription: '',
          typeOfProject: 'residential',
          client: '',
          area: '',
          status: 'ongoing',
          location: '',
          mapLink: '',
          mainImage: null,
          images: [],
          imageCaptions: [],
          existingImages: [],
          imagesToDelete: []
        });
        await fetchDashboardData();
        alert(editingProject ? 'Project updated successfully!' : 'Project created successfully!');
      } else {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Project submission failed:', error);
      alert('Failed to save project. Please try again.');
    } finally {
      setIsSubmitting(false);
      console.log('Project submission process completed');
    }
  };

  // Handle project deletion
  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setIsDeleting(projectId);
      try {
        const response = await fetch(`${API_BASE}/projects/${projectId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          fetchDashboardData();
          alert('Project deleted successfully!');
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Project deletion failed:', error);
        alert('Failed to delete project. Please try again.');
      } finally {
        setIsDeleting(null);
      }
    }
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Edit project
  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectForm({
      projectName: project.projectName,
      projectDescription: project.projectDescription,
      typeOfProject: project.typeOfProject,
      client: project.client,
      area: project.area,
      status: project.status,
      location: project.location,
      mapLink: project.mapLink || '',
      mainImage: null,
      images: [],
      imageCaptions: [],
      existingImages: project.images || [],
      imagesToDelete: []
    });
    setShowProjectForm(true);
  };

  // Handle CSV export
  const handleExportCSV = async () => {
    try {
      const response = await fetch(`${API_BASE}/projects/export/csv`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `projects-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const errorData = await response.json();
        alert(`Error exporting CSV: ${errorData.message}`);
      }
    } catch (error) {
      console.error('CSV export failed:', error);
      alert('Failed to export CSV.');
    }
  };

  // Gallery form handlers
  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      Object.entries(galleryForm).forEach(([key, value]) => {
        if (value !== null && value !== '') {
          if (key === 'image' && value instanceof File) {
            formData.append(key, value);
          } else if (typeof value === 'string') {
            formData.append(key, value);
          }
        }
      });

      const url = editingGalleryItem 
        ? `${API_BASE}/admin/gallery/${editingGalleryItem._id}`
        : `${API_BASE}/admin/gallery`;
      
      const method = editingGalleryItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        // setShowGalleryForm(false);
        setEditingGalleryItem(null);
        setGalleryForm({
          title: '',
          category: '',
          type: '',
          description: '',
          image: null
        });
        fetchDashboardData();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Gallery form submission failed:', error);
      alert('Failed to save gallery item.');
    }
  };

  const handleEditGalleryItem = (item: GalleryItem) => {
    setEditingGalleryItem(item);
    setGalleryForm({
      title: item.title,
      category: item.category,
      type: item.type,
      description: item.description || '',
      image: null
    });
    // setShowGalleryForm(true);
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      try {
        const response = await fetch(`${API_BASE}/admin/gallery/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          fetchDashboardData();
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Delete gallery item failed:', error);
        alert('Failed to delete gallery item.');
      }
    }
  };

  // Service form handlers
  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(
        editingService 
          ? `${API_BASE}/admin/services/${editingService._id}`
          : `${API_BASE}/admin/services`,
        {
          method: editingService ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(serviceForm)
        }
      );

      if (response.ok) {
        // setShowServiceForm(false);
        setEditingService(null);
        setServiceForm({
          title: '',
          description: '',
          icon: '',
          features: ['']
        });
        fetchDashboardData();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Service form submission failed:', error);
      alert('Failed to save service.');
    }
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setServiceForm({
      title: service.title,
      description: service.description,
      icon: service.icon,
      features: service.features && service.features.length > 0 ? service.features : ['']
    });
    // setShowServiceForm(true);
  };

  const handleDeleteService = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        const response = await fetch(`${API_BASE}/admin/services/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          fetchDashboardData();
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Delete service failed:', error);
        alert('Failed to delete service.');
      }
    }
  };

  // Team form handlers
  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      Object.entries(teamForm).forEach(([key, value]) => {
        if (value !== null && value !== '') {
          if (key === 'image' && value instanceof File) {
            formData.append(key, value);
          } else if (key === 'specialization' && Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else if (typeof value === 'string') {
            formData.append(key, value);
          }
        }
      });

      const url = editingTeamMember 
        ? `${API_BASE}/admin/team/${editingTeamMember._id}`
        : `${API_BASE}/admin/team`;
      
      const method = editingTeamMember ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        setShowTeamForm(false);
        setEditingTeamMember(null);
        setTeamForm({
          name: '',
          position: '',
          bio: '',
          experience: '',
          specialization: [''],
          image: null
        });
        fetchDashboardData();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Team form submission failed:', error);
      alert('Failed to save team member.');
    }
  };

  const handleEditTeamMember = (member: TeamMember) => {
    setEditingTeamMember(member);
    setTeamForm({
      name: member.name,
      position: member.position,
      bio: member.bio,
      experience: member.experience,
      specialization: member.specialization && member.specialization.length > 0 ? member.specialization : [''],
      image: null
    });
    setShowTeamForm(true);
  };

  const handleDeleteTeamMember = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        const response = await fetch(`${API_BASE}/admin/team/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          fetchDashboardData();
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Delete team member failed:', error);
        alert('Failed to delete team member.');
      }
    }
  };

  // Helper functions for dynamic arrays
  const addFeature = () => {
    setServiceForm(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    setServiceForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setServiceForm(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const addSpecialization = () => {
    setTeamForm(prev => ({
      ...prev,
      specialization: [...prev.specialization, '']
    }));
  };

  const removeSpecialization = (index: number) => {
    setTeamForm(prev => ({
      ...prev,
      specialization: prev.specialization.filter((_, i) => i !== index)
    }));
  };

  const updateSpecialization = (index: number, value: string) => {
    setTeamForm(prev => ({
      ...prev,
      specialization: prev.specialization.map((spec, i) => i === index ? value : spec)
    }));
  };

  // Helper function for aspect ratio optimization
  const optimizeImageAspectRatio = (file: File, maxWidth: number = 800, quality: number = 0.8): Promise<File> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        try {
          // Set consistent aspect ratio for project cards (16:9)
          const targetAspectRatio = 16 / 9;
          const imageAspectRatio = img.width / img.height;
          
          let { width, height } = img;
          
          // Resize to fit within maxWidth while maintaining aspect ratio
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          
          // Crop to target aspect ratio if needed
          if (imageAspectRatio > targetAspectRatio) {
            // Image is wider than target - crop width
            const cropWidth = height * targetAspectRatio;
            const cropX = (width - cropWidth) / 2;
            width = cropWidth;
            
            canvas.width = width;
            canvas.height = height;
            
            // Draw cropped image
            ctx?.drawImage(img, cropX, 0, width, height, 0, 0, width, height);
          } else if (imageAspectRatio < targetAspectRatio) {
            // Image is taller than target - crop height
            const cropHeight = width / targetAspectRatio;
            const cropY = (height - cropHeight) / 2;
            height = cropHeight;
            
            canvas.width = width;
            canvas.height = height;
            
            // Draw cropped image
            ctx?.drawImage(img, 0, cropY, width, height, 0, 0, width, height);
          } else {
            // Perfect aspect ratio - just resize
            canvas.width = width;
            canvas.height = height;
            ctx?.drawImage(img, 0, 0, width, height);
          }
          
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const optimizedFile = new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });
                resolve(optimizedFile);
              } else {
                resolve(file);
              }
            },
            'image/jpeg',
            quality
          );
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  // Image optimization utility to reduce file size before upload
  const optimizeImage = async (file: File, maxWidth: number = 800, quality: number = 0.8): Promise<File> => {
    // Check if it's a HEIC/HEIF file
    const isHeic = file.type === 'image/heic' || 
                   file.type === 'image/heif' || 
                   file.name.toLowerCase().endsWith('.heic') || 
                   file.name.toLowerCase().endsWith('.heif');

    if (isHeic) {
      try {
        console.log('Converting HEIC file:', file.name);
        
        // Add timeout to prevent hanging
        const conversionPromise = (async () => {
          const heic2any = (await import('heic2any')).default;
          const convertedBlob = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.7 // Reduce quality to decrease file size
          }) as Blob;
          
          // Create a new File object with JPEG type
          const convertedFile = new File([convertedBlob], file.name.replace(/\.(heic|heif)$/i, '.jpg'), {
            type: 'image/jpeg',
            lastModified: file.lastModified
          });
          
          console.log('HEIC file converted to JPEG:', convertedFile.name, 'Size:', (convertedFile.size / 1024 / 1024).toFixed(2), 'MB');
          
          // Now apply the same aspect ratio optimization as regular images
          return await optimizeImageAspectRatio(convertedFile, maxWidth, quality);
        })();
        
        // Add 30-second timeout
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('HEIC conversion timed out after 30 seconds')), 30000);
        });
        
        return await Promise.race([conversionPromise, timeoutPromise]) as File;
      } catch (error) {
        console.error('HEIC conversion failed:', error);
        throw new Error(`Failed to convert HEIC image: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // For regular images, use canvas optimization
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        try {
          // Set consistent aspect ratio for project cards (16:9 or 4:3)
          const targetAspectRatio = 16 / 9; // Landscape orientation for project cards
          const imageAspectRatio = img.width / img.height;
          
          let { width, height } = img;
          
          // Resize to fit within maxWidth while maintaining aspect ratio
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          
          // Crop to target aspect ratio if needed
          if (imageAspectRatio > targetAspectRatio) {
            // Image is wider than target - crop width
            const cropWidth = height * targetAspectRatio;
            const cropX = (width - cropWidth) / 2;
            width = cropWidth;
            
            canvas.width = width;
            canvas.height = height;
            
            // Draw cropped image
            ctx?.drawImage(img, cropX, 0, width, height, 0, 0, width, height);
          } else if (imageAspectRatio < targetAspectRatio) {
            // Image is taller than target - crop height
            const cropHeight = width / targetAspectRatio;
            const cropY = (height - cropHeight) / 2;
            height = cropHeight;
            
            canvas.width = width;
            canvas.height = height;
            
            // Draw cropped image
            ctx?.drawImage(img, 0, cropY, width, height, 0, 0, width, height);
          } else {
            // Perfect aspect ratio - just resize
            canvas.width = width;
            canvas.height = height;
            ctx?.drawImage(img, 0, 0, width, height);
          }
          
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const optimizedFile = new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });
                console.log('Image optimized:', optimizedFile.name, 'Size:', (optimizedFile.size / 1024 / 1024).toFixed(2), 'MB', 'Dimensions:', `${Math.round(width)}x${Math.round(height)}`);
                resolve(optimizedFile);
              } else {
                resolve(file); // Fallback to original if optimization fails
              }
            },
            'image/jpeg',
            quality
          );
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  // Handle main image upload
  const handleMainImageUpload = async (file: File) => {
    setIsUploadingImage(true);
    try {
      console.log('Starting image optimization for:', file.name);
      const optimizedFile = await optimizeImage(file);
      console.log('Image optimization completed:', optimizedFile.name);
      setProjectForm(prev => ({
        ...prev,
        mainImage: optimizedFile
      }));
    } catch (error) {
      console.error('Image optimization failed:', error);
      // Show user-friendly error message
      alert(`Image processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setProjectForm(prev => ({
        ...prev,
        mainImage: file
      }));
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Handle additional images upload
  const handleImageUpload = async (files: FileList) => {
    setIsUploadingImage(true);
    try {
      const fileArray = Array.from(files);
      const optimizedFiles: File[] = [];
      
      console.log(`Starting optimization for ${fileArray.length} images`);
      
      // Optimize images before adding to form
      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        try {
          console.log(`Processing image ${i + 1}/${fileArray.length}:`, file.name);
          const optimizedFile = await optimizeImage(file);
          optimizedFiles.push(optimizedFile);
          console.log(`Image ${i + 1} optimization completed`);
        } catch (error) {
          console.error(`Image ${i + 1} optimization failed:`, error);
          // Show user-friendly error message for this specific image
          alert(`Failed to process image "${file.name}": ${error instanceof Error ? error.message : 'Unknown error'}`);
          optimizedFiles.push(file); // Use original if optimization fails
        }
      }
      
      console.log(`All images processed. Adding ${optimizedFiles.length} images to form`);
      setProjectForm(prev => ({
        ...prev,
        images: [...prev.images, ...optimizedFiles],
        imageCaptions: [...prev.imageCaptions, ...optimizedFiles.map(() => '')]
      }));
    } catch (error) {
      console.error('Image upload process failed:', error);
      alert(`Image upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Handle removing existing image
  const handleRemoveExistingImage = (cloudinaryId: string) => {
    setIsRemovingImage(cloudinaryId);
    try {
      setProjectForm(prev => ({
        ...prev,
        existingImages: prev.existingImages.filter(img => img.cloudinaryId !== cloudinaryId),
        imagesToDelete: [...prev.imagesToDelete, cloudinaryId]
      }));
    } finally {
      setIsRemovingImage(null);
    }
  };

  // Handle removing new image
  const handleRemoveNewImage = (index: number) => {
    setProjectForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imageCaptions: prev.imageCaptions.filter((_, i) => i !== index)
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Jay Ambe Construction Admin Portal
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleLogin}>
              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                  {loginError}
                </div>
              )}
              
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-6 space-y-4 sm:space-y-0">
            <div className="flex items-center">
              <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <h1 className="ml-2 sm:ml-3 text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Jay Ambe Construction - Admin Portal</h1>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <button
                onClick={() => navigate('/')}
                className="w-full sm:w-auto text-gray-600 hover:text-gray-900 text-sm font-medium px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                ← Back to Site
              </button>
              <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
                <span className="text-xs sm:text-sm text-gray-500">Welcome, {admin?.username}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 w-full sm:w-auto justify-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex flex-wrap space-x-2 sm:space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
              { id: 'projects', name: 'Projects', icon: Building2 },
              { id: 'gallery', name: 'Gallery', icon: FileText },
              { id: 'services', name: 'Services', icon: Settings },
              { id: 'team', name: 'Team', icon: Users },
              { id: 'settings', name: 'Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm flex items-center whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{tab.name}</span>
                <span className="sm:hidden">{tab.name.substring(0, 3)}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats && (
                <>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Building2 className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Total Projects</dt>
                            <dd className="text-lg font-medium text-gray-900">{stats.totalProjects}</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <FileText className="h-6 w-6 text-green-400" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Ongoing</dt>
                            <dd className="text-lg font-medium text-gray-900">{stats.ongoingProjects}</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <FileText className="h-6 w-6 text-blue-400" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Completed</dt>
                            <dd className="text-lg font-medium text-gray-900">{stats.completedProjects}</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Users className="h-6 w-6 text-purple-400" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Residential</dt>
                            <dd className="text-lg font-medium text-gray-900">{stats.residentialProjects}</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Recent Projects */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Projects</h3>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                >
                  View all
                </button>
              </div>
              <ul className="divide-y divide-gray-200">
                {projects.slice(0, 5).map((project) => (
                  <li key={project._id} className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {project.images && project.images.length > 0 ? (
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={project.images[0]?.url || '/placeholder.jpg'} 
                              alt={project.projectName} 
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <Building2 className="h-5 w-5 text-gray-600" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{project.projectName}</div>
                          <div className="text-sm text-gray-500">{project.client}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          project.status === 'ongoing' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {project.status}
                        </span>
                        <span className="text-sm text-gray-500">{project.location}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Projects Management</h2>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setCurrentPage(1);
                    fetchDashboardData();
                  }}
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </button>
                <button
                  onClick={() => {
                    setEditingProject(null);
                    setProjectForm({
                      projectName: '',
                      projectDescription: '',
                      typeOfProject: 'residential',
                      client: '',
                      area: '',
                      status: 'ongoing',
                      location: '',
                      mapLink: '',
                      mainImage: null,
                      images: [],
                      imageCaptions: [],
                      existingImages: [],
                      imagesToDelete: []
                    });
                    setShowProjectForm(true);
                  }}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </button>
                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </button>
              </div>
            </div>

            {/* Projects Table */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Map Link</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <tr key={project._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {project.images && project.images.length > 0 ? (
                                <img 
                                  className="h-10 w-10 rounded-full object-cover" 
                                  src={project.images[0]?.url || '/placeholder.jpg'} 
                                  alt={project.projectName} 
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                  <Building2 className="h-5 w-5 text-gray-600" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{project.projectName}</div>
                              <div className="text-sm text-gray-500">{project.area}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                          <div className="truncate" title={project.projectDescription}>
                            {project.projectDescription}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.client}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                            {project.typeOfProject}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            project.status === 'ongoing' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {project.mapLink ? (
                            <a
                              href={project.mapLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline"
                              title="Open in Google Maps"
                            >
                              View Map
                            </a>
                          ) : (
                            <span className="text-gray-400">No map link</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEditProject(project)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                            title="Edit Project"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project._id)}
                            disabled={isDeleting === project._id}
                            className={`text-red-600 hover:text-red-900 ${isDeleting === project._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                            title="Delete Project"
                          >
                            {isDeleting === project._id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                        <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-lg font-medium">No projects found</p>
                        <p className="text-sm">Get started by adding your first project.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing page {currentPage} of {totalPages} ({totalProjects} total projects)
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-2 border rounded-md text-sm font-medium ${
                        pageNum === currentPage
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Gallery Management</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setCurrentPage(1);
                    fetchDashboardData();
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </button>
                <button
                  onClick={() => {
                    setEditingGalleryItem(null);
                    setGalleryForm({
                      title: '',
                      category: '',
                      type: '',
                      description: '',
                      image: null
                    });
                    // setShowGalleryForm(true);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Gallery Item
                </button>
              </div>
            </div>

            {/* Gallery Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery && gallery.length > 0 ? (
                gallery.map((item) => (
                  <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                      <p className="text-sm text-gray-500 mt-2">Category: {item.category}</p>
                      <p className="text-sm text-gray-500 mt-2">Type: {item.type}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                  <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium">No gallery items found</p>
                  <p className="text-sm">Get started by adding your first gallery item.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Services Management</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setCurrentPage(1);
                    fetchDashboardData();
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </button>
                <button
                  onClick={() => {
                    // TODO: Implement add service form
                    alert('Add Service functionality not yet implemented.');
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Service
                </button>
              </div>
            </div>

            {/* Services List */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Features</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services && services.length > 0 ? (
                    services.map((service) => (
                      <tr key={service._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {service.features && service.features.length > 0 ? service.features.join(', ') : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => {
                              // TODO: Implement edit service form
                              alert('Edit Service functionality not yet implemented.');
                            }}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              // TODO: Implement edit service form
                              alert('Delete Service functionality not yet implemented.');
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                        <Settings className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-lg font-medium">No services found</p>
                        <p className="text-sm">Get started by adding your first service.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setCurrentPage(1);
                    fetchDashboardData();
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </button>
                <button
                  onClick={() => {
                    // TODO: Implement add team member form
                    alert('Add Team Member functionality not yet implemented.');
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Team Member
                </button>
              </div>
            </div>

            {/* Team Members */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team && team.length > 0 ? (
                team.map((member) => (
                  <div key={member._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.position}</p>
                      <p className="text-sm text-gray-500 mt-2">Experience: {member.experience}</p>
                      <p className="text-sm text-gray-500 mt-2">Specialization: {member.specialization && member.specialization.join(', ')}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                  <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium">No team members found</p>
                  <p className="text-sm">Get started by adding your first team member.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            
            {/* Account Information */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Account Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <p className="mt-1 text-sm text-gray-900">{admin?.username}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{admin?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <p className="mt-1 text-sm text-gray-900 capitalize">{admin?.role}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Login</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {'Never'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Password Change */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Change Password</h3>
                  <button
                    onClick={() => {
                      setShowPasswordChangeForm(!showPasswordChangeForm);
                      setPasswordChangeError('');
                      setPasswordChangeSuccess('');
                    }}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {showPasswordChangeForm ? 'Cancel' : 'Change Password'}
                  </button>
                </div>

                {showPasswordChangeForm && (
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    {passwordChangeError && (
                      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                        {passwordChangeError}
                      </div>
                    )}
                    
                    {passwordChangeSuccess && (
                      <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
                        {passwordChangeSuccess}
                      </div>
                    )}

                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <div className="mt-1 relative">
                        <input
                          id="currentPassword"
                          name="currentPassword"
                          type={showCurrentPassword ? 'text' : 'password'}
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                          value={passwordChangeForm.currentPassword}
                          onChange={(e) => setPasswordChangeForm({ ...passwordChangeForm, currentPassword: e.target.value })}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <div className="mt-1 relative">
                        <input
                          id="newPassword"
                          name="newPassword"
                          type={showNewPassword ? 'text' : 'password'}
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                          value={passwordChangeForm.newPassword}
                          onChange={(e) => setPasswordChangeForm({ ...passwordChangeForm, newPassword: e.target.value })}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                        </button>
                      </div>
                      
                      {/* Password Strength Indicator */}
                      {passwordChangeForm.newPassword && (
                        <div className="mt-2">
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  getPasswordStrength(passwordChangeForm.newPassword).color === 'red' ? 'bg-red-500' :
                                  getPasswordStrength(passwordChangeForm.newPassword).color === 'yellow' ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${(getPasswordStrength(passwordChangeForm.newPassword).score / 5) * 100}%` }}
                              ></div>
                            </div>
                            <span className={`text-sm font-medium ${
                              getPasswordStrength(passwordChangeForm.newPassword).color === 'red' ? 'text-red-600' :
                              getPasswordStrength(passwordChangeForm.newPassword).color === 'yellow' ? 'text-yellow-600' : 'text-green-600'
                            }`}>
                              {getPasswordStrength(passwordChangeForm.newPassword).label}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-2 text-sm text-gray-500">
                        <p>Password must contain:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li className={passwordChangeForm.newPassword.length >= 8 ? 'text-green-600' : 'text-gray-500'}>
                            At least 8 characters
                          </li>
                          <li className={/[A-Z]/.test(passwordChangeForm.newPassword) ? 'text-green-600' : 'text-gray-500'}>
                            One uppercase letter
                          </li>
                          <li className={/[a-z]/.test(passwordChangeForm.newPassword) ? 'text-green-600' : 'text-gray-500'}>
                            One lowercase letter
                          </li>
                          <li className={/\d/.test(passwordChangeForm.newPassword) ? 'text-green-600' : 'text-gray-500'}>
                            One number
                          </li>
                          <li className={/[!@#$%^&*(),.?":{}|<>]/.test(passwordChangeForm.newPassword) ? 'text-green-600' : 'text-gray-500'}>
                            One special character
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <div className="mt-1 relative">
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                          value={passwordChangeForm.confirmPassword}
                          onChange={(e) => setPasswordChangeForm({ ...passwordChangeForm, confirmPassword: e.target.value })}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                        </button>
                      </div>
                      {passwordChangeForm.confirmPassword && passwordChangeForm.newPassword !== passwordChangeForm.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
                      )}
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowPasswordChangeForm(false);
                          setPasswordChangeForm({
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: ''
                          });
                          setPasswordChangeError('');
                          setPasswordChangeSuccess('');
                        }}
                        disabled={isChangingPassword}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isChangingPassword || passwordChangeForm.newPassword !== passwordChangeForm.confirmPassword || getPasswordStrength(passwordChangeForm.newPassword).score < 5}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      >
                        {isChangingPassword ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Changing...
                          </>
                        ) : (
                          'Change Password'
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Project Form Modal */}
      {showProjectForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Project Name</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={projectForm.projectName}
                    onChange={(e) => setProjectForm({ ...projectForm, projectName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Project Description</label>
                  <textarea
                    required
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={projectForm.projectDescription}
                    onChange={(e) => setProjectForm({ ...projectForm, projectDescription: e.target.value })}
                    placeholder="Enter detailed description of the project..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Type of Project</label>
                  <select
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={projectForm.typeOfProject}
                    onChange={(e) => setProjectForm({ ...projectForm, typeOfProject: e.target.value })}
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Client</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={projectForm.client}
                    onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Area</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={projectForm.area}
                    onChange={(e) => setProjectForm({ ...projectForm, area: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                    placeholder="e.g., KHORAJ, GANDHINAGAR or GOTA, AHMEDABAD"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Enter the area and city name for easy identification
                  </p>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Map Link (Optional)</label>
                    <input
                      type="url"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={projectForm.mapLink || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, mapLink: e.target.value })}
                      placeholder="https://maps.google.com/... or https://goo.gl/maps/..."
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Add Google Maps link for easy navigation to project location
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Project Images</label>
                  <div className="mt-1 space-y-6">
                    {/* Main Image Upload */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-700">Main Image (Featured Image)</p>
                      <p className="text-xs text-gray-500">This will be the primary image displayed for the project</p>
                      <div className="flex items-center space-x-4">
                        {projectForm.mainImage ? (
                          <div className="relative">
                            <img 
                              src={URL.createObjectURL(projectForm.mainImage)} 
                              alt="Main project image" 
                              className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                            />
                            <button
                              type="button"
                              onClick={() => setProjectForm(prev => ({ ...prev, mainImage: null }))}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No image</span>
                          </div>
                        )}
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleMainImageUpload(file);
                            }}
                            disabled={isUploadingImage}
                            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
                          />
                          {isUploadingImage && (
                            <p className="text-xs text-blue-600 mt-1">Uploading and optimizing image...</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Existing Images Display */}
                    {projectForm.existingImages.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-gray-700">Existing Images:</p>
                        <div className="grid grid-cols-2 gap-3">
                          {projectForm.existingImages.map((image, index) => (
                            <div key={image.cloudinaryId} className="relative p-3 border border-gray-200 rounded-lg">
                              <div className="relative">
                                <img 
                                  src={image.url} 
                                  alt={image.caption || 'Project Image'} 
                                  className="w-full h-20 object-cover rounded mb-2"
                                />
                                {/* {image.isMain && (
                                  <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                    Main
                                  </div>
                                )} */}
                              </div>
                                {/* {!image.isMain && ( */}
                                <input
                                  type="text"
                                  placeholder="Image caption"
                                  value={image.caption}
                                  onChange={(e) => {
                                    const updatedImages = [...projectForm.existingImages];
                                    updatedImages[index].caption = e.target.value;
                                    setProjectForm({ ...projectForm, existingImages: updatedImages });
                                  }}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                              {/* )} */}
                              <button
                                type="button"
                                onClick={() => handleRemoveExistingImage(image.cloudinaryId)}
                                disabled={isRemovingImage === image.cloudinaryId}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 disabled:opacity-50"
                              >
                                {isRemovingImage === image.cloudinaryId ? (
                                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                ) : (
                                  '×'
                                )}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* New Images Upload */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-700">Additional Images:</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files || new FileList())}
                        disabled={isUploadingImage}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
                      />
                      {isUploadingImage && (
                        <p className="text-xs text-blue-600">Uploading and optimizing images...</p>
                      )}
                      
                      {/* New Images Preview */}
                      {projectForm.images.length > 0 && (
                        <div className="space-y-3">
                          <p className="text-sm text-gray-600">New Images Preview:</p>
                          <div className="grid grid-cols-2 gap-3">
                            {projectForm.images.map((image, index) => (
                              <div key={index} className="relative p-3 border border-gray-200 rounded-lg">
                                <img 
                                  src={URL.createObjectURL(image)} 
                                  alt={`New image ${index + 1}`} 
                                  className="w-full h-20 object-cover rounded mb-2"
                                />
                                <input
                                  type="text"
                                  placeholder={`Caption for image ${index + 1}`}
                                  value={projectForm.imageCaptions[index] || ''}
                                  onChange={(e) => {
                                    const updatedCaptions = [...projectForm.imageCaptions];
                                    updatedCaptions[index] = e.target.value;
                                    setProjectForm({ ...projectForm, imageCaptions: updatedCaptions });
                                  }}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveNewImage(index)}
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowProjectForm(false)}
                    disabled={isSubmitting}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {editingProject ? 'Uploading & Updating...' : 'Uploading & Creating...'}
                      </>
                    ) : (
                      editingProject ? 'Update' : 'Create'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

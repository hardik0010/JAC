import { API_URL } from '../config/config';
const API_BASE_URL = API_URL;

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Projects API
  async getProjects(category = null, status = null) {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (status) params.append('status', status);
    
    return this.request(`/projects?${params.toString()}`);
  }

  async getProject(id) {
    return this.request(`/projects/${id}`);
  }

  async createProject(projectData) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  async updateProject(id, projectData) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
  }

  async deleteProject(id) {
    return this.request(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Gallery API
  async getGallery(category = null, type = null) {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (type) params.append('type', type);
    
    return this.request(`/gallery?${params.toString()}`);
  }

  async getGalleryItem(id) {
    return this.request(`/gallery/${id}`);
  }

  async createGalleryItem(galleryData) {
    return this.request('/gallery', {
      method: 'POST',
      body: JSON.stringify(galleryData),
    });
  }

  async updateGalleryItem(id, galleryData) {
    return this.request(`/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(galleryData),
    });
  }

  async deleteGalleryItem(id) {
    return this.request(`/gallery/${id}`, {
      method: 'DELETE',
    });
  }

  // Services API
  async getServices() {
    return this.request('/services');
  }

  async getService(id) {
    return this.request(`/services/${id}`);
  }

  async createService(serviceData) {
    return this.request('/services', {
      method: 'POST',
      body: JSON.stringify(serviceData),
    });
  }

  async updateService(id, serviceData) {
    return this.request(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(serviceData),
    });
  }

  async deleteService(id) {
    return this.request(`/services/${id}`, {
      method: 'DELETE',
    });
  }

  // Team API
  async getTeam() {
    return this.request('/team');
  }

  async getTeamMember(id) {
    return this.request(`/team/${id}`);
  }

  async createTeamMember(teamData) {
    return this.request('/team', {
      method: 'POST',
      body: JSON.stringify(teamData),
    });
  }

  async updateTeamMember(id, teamData) {
    return this.request(`/team/${id}`, {
      method: 'PUT',
      body: JSON.stringify(teamData),
    });
  }

  async deleteTeamMember(id) {
    return this.request(`/team/${id}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();

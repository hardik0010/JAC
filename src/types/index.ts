export interface Project {
  _id: string;
  projectName: string;
  projectDescription: string;
  typeOfProject: 'residential' | 'commercial' | 'renovation';
  client: string;
  area: string;
  status: 'ongoing' | 'completed';
  location: string;
  mapLink?: string;
  images: ProjectImage[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectImage {
  url: string;
  cloudinaryId: string;
  caption: string;
}

export interface GalleryItem {
  _id: string;
  title: string;
  category: 'residential' | 'commercial' | 'renovation';
  type: 'image' | 'video';
  image: string;
  description?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  icon: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  _id: string;
  name: string;
  position: string;
  image: string;
  experience: string;
  description: string;
  social?: {
    linkedin?: string;
    x?: string;
    facebook?: string;
    instagram?: string;
  };
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Load environment variables
require('dotenv').config();

const mongoose = require('mongoose');
const Project = require('../models/Project');
const Admin = require('../models/Admin');

const projects = [
  {
    projectName: 'VELTIS THE SECOND',
    projectDescription: 'A modern residential complex featuring luxury apartments with contemporary amenities and sustainable design principles.',
    typeOfProject: 'residential',
    client: 'ALT 53 DEVELOPERS LLP',
    area: '2,30,000 SQ.FT.',
    status: 'ongoing',
    location: 'KHORAJ, GANDHINAGAR',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        cloudinaryId: 'sample-1',
        caption: 'Main Building View'
      },
      {
        url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        cloudinaryId: 'sample-2',
        caption: 'Construction Progress'
      }
    ]
  },
  {
    projectName: 'ARISE AURA',
    projectDescription: 'A premium commercial development offering modern office spaces and retail facilities in a prime location.',
    typeOfProject: 'commercial',
    client: 'ARISE GROUP',
    area: '46,000 SQ.FT.',
    status: 'ongoing',
    location: 'GOTA, AHMEDABAD',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        cloudinaryId: 'sample-3',
        caption: 'Commercial Complex'
      }
    ]
  },
  {
    projectName: '24 HIG NIDHI APARTMENT PART 1',
    projectDescription: 'A high-rise residential project providing comfortable living spaces with modern amenities and community facilities.',
    typeOfProject: 'residential',
    client: 'ART NIRMAN',
    area: '1,60,000 SQ.FT.',
    status: 'ongoing',
    location: 'SHASHTRINAGAR, AHMEDABAD',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        cloudinaryId: 'sample-4',
        caption: 'Apartment Complex'
      },
      {
        url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80',
        cloudinaryId: 'sample-5',
        caption: 'Interior View'
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80',
        cloudinaryId: 'sample-6',
        caption: 'Exterior Design'
      }
    ]
  },
  {
    projectName: 'THE ONE',
    projectDescription: 'An exclusive residential development featuring luxury homes with premium amenities and modern architecture.',
    typeOfProject: 'residential',
    client: 'RADHE GROUP, SAVALIYA GROUP',
    area: '4,75,000 SQ.FT.',
    status: 'ongoing',
    location: 'RANDESAN, GANDHINAGAR',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80',
        cloudinaryId: 'sample-7',
        caption: 'Luxury Residential'
      }
    ]
  },
  {
    projectName: 'ARISE VIBRANT',
    projectDescription: 'A vibrant residential community offering modern living spaces with excellent connectivity and amenities.',
    typeOfProject: 'residential',
    client: 'ARISE GROUP',
    area: '7,50,000 SQ.FT.',
    status: 'ongoing',
    location: 'CHHARODI, AHMEDABAD',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        cloudinaryId: 'sample-8',
        caption: 'Modern Architecture'
      }
    ]
  },
  {
    projectName: 'SAKAR PARADISE',
    projectDescription: 'A paradise-like residential complex with beautiful landscaping and modern amenities for comfortable living.',
    typeOfProject: 'residential',
    client: 'SAKAR GROUP',
    area: '3,75,000 SQ.FT.',
    status: 'ongoing',
    location: 'KHORAJ, GANDHINAGAR',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        cloudinaryId: 'sample-9',
        caption: 'Paradise Complex'
      }
    ]
  },
  {
    projectName: 'SHREE VISHNUDHARA ESSENCE',
    projectDescription: 'An essence of luxury living with premium residential units and world-class amenities.',
    typeOfProject: 'residential',
    client: 'ART NIRMAN',
    area: '3,50,000 SQ.FT.',
    status: 'ongoing',
    location: 'THALTEJ, AHMEDABAD',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        cloudinaryId: 'sample-10',
        caption: 'Essence Project'
      }
    ]
  },
  {
    projectName: 'OMKAR ENCLAVES',
    projectDescription: 'A completed residential enclave offering peaceful living with modern amenities and green spaces.',
    typeOfProject: 'residential',
    client: 'OHM ENTERPRISE',
    area: '2,50,000 SQ.FT.',
    status: 'completed',
    location: 'RANIP, AHMEDABAD',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        cloudinaryId: 'sample-11',
        caption: 'Completed Project'
      }
    ]
  },
  {
    projectName: 'STAR ELEGANCE',
    projectDescription: 'An elegant residential project completed with sophisticated design and premium finishes.',
    typeOfProject: 'residential',
    client: 'RD DEVELOPERS',
    area: '55,000 SQ.FT.',
    status: 'completed',
    location: 'ZUNDAL, AHMEDABAD',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80',
        cloudinaryId: 'sample-12',
        caption: 'Elegant Design'
      }
    ]
  },
  {
    projectName: 'ALTIMUS',
    projectDescription: 'A completed commercial complex offering premium office spaces and retail facilities.',
    typeOfProject: 'commercial',
    client: 'SOCH DEVELOPERS',
    area: '2,50,000 SQ.FT.',
    status: 'completed',
    location: 'NAVARANGPURA, AHMEDABAD',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80',
        cloudinaryId: 'sample-13',
        caption: 'Commercial Excellence'
      }
    ]
  },
  {
    projectName: 'ARISE ATLANTIS',
    projectDescription: 'A completed residential project featuring luxury apartments with modern amenities and beautiful landscaping.',
    typeOfProject: 'residential',
    client: 'ARISE GROUP',
    area: '4,50,000 SQ.FT.',
    status: 'completed',
    location: 'GODREJ, AHMEDABAD',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        cloudinaryId: 'sample-14',
        caption: 'Atlantis Project'
      }
    ]
  },
  {
    projectName: 'SUMEL 10',
    projectDescription: 'A completed residential complex offering comfortable living spaces with modern amenities.',
    typeOfProject: 'residential',
    client: 'H.N. SAFAL',
    area: '2,50,000 SQ.FT.',
    status: 'completed',
    location: 'SARASPUR, AHMEDABAD',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        cloudinaryId: 'sample-15',
        caption: 'Sumel Complex'
      }
    ]
  },
  {
    projectName: 'ANANTARA',
    projectDescription: 'A completed residential project featuring elegant design and premium amenities.',
    typeOfProject: 'residential',
    client: 'A. SHRIDHAR',
    area: '1,00,000 SQ.FT.',
    status: 'completed',
    location: 'SHAHIBAG, AHMEDABAD',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        cloudinaryId: 'sample-16',
        caption: 'Anantara Project'
      }
    ]
  },
  {
    projectName: 'VISHNUDHARA GARDEN',
    projectDescription: 'A completed residential garden project with beautiful landscaping and modern amenities.',
    typeOfProject: 'residential',
    client: 'ART NIRMAN',
    area: '6,00,000 SQ.FT.',
    status: 'completed',
    location: 'GOTA, AHMEDABAD',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        cloudinaryId: 'sample-17',
        caption: 'Garden Project'
      }
    ]
  },
  {
    projectName: 'ARISE AMPLE',
    projectDescription: 'A completed residential project offering ample living spaces with modern amenities.',
    typeOfProject: 'residential',
    client: 'ARISE GROUP',
    area: '2,25,000 SQ.FT.',
    status: 'completed',
    location: 'SOLA, AHMEDABAD',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80',
        cloudinaryId: 'sample-18',
        caption: 'Ample Project'
      }
    ]
  },
  {
    projectName: 'PRIME STATUS',
    projectDescription: 'A completed residential project with prime location and status amenities.',
    typeOfProject: 'residential',
    client: 'DEVBHOOMI DEVELOPERS',
    area: '2,50,000 SQ.FT.',
    status: 'completed',
    location: 'GOTA, AHMEDABAD',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80',
        cloudinaryId: 'sample-19',
        caption: 'Prime Status'
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');

    // Insert new projects
    const insertedProjects = await Project.insertMany(projects);
    console.log(`Inserted ${insertedProjects.length} projects`);

    // Create default admin user
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (!existingAdmin) {
      const admin = new Admin({
        username: 'admin',
        email: 'admin@jayambeconstruction.com',
        password: 'admin123',
        role: 'super-admin'
      });
      await admin.save();
      console.log('Created default admin user (username: admin, password: admin123)');
    } else {
      console.log('Admin user already exists');
    }

    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

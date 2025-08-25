import { motion } from 'framer-motion'
import { 
  Building2, 
  Target, 
  Eye, 
  Award, 
  Users, 
  Linkedin,
  X
} from 'lucide-react'

const About = () => {
  const teamMembers = [
    {
      name: 'Darshak Patel',
      position: 'General Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      experience: '15+ years',
      description: 'Experienced leader overseeing operations and ensuring project excellence across all construction sites.',
      social: { linkedin: 'https://www.linkedin.com/company/jay-ambe-construction-04/', x: '#' }
    },
    {
      name: 'Jay Prajapati',
      position: 'Civil Engineer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      experience: '12+ years',
      description: 'Masters in Construction Management with expertise in high-rise building construction and project management.',
      social: { linkedin: 'https://www.linkedin.com/company/jay-ambe-construction-04/', x: '#' }
    },
    {
      name: 'Rahul Sinha',
      position: 'Founder',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      experience: '15+ years',
      description: 'Visionary founder with deep understanding of construction industry and commitment to quality.',
      social: { linkedin: 'https://www.linkedin.com/company/jay-ambe-construction-04/', x: '#' }
    },
    {
      name: 'Adit Patel',
      position: 'Project Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      experience: '10+ years',
      description: 'Dedicated project manager ensuring timely delivery and quality control across all construction phases.',
      social: { linkedin: 'https://www.linkedin.com/company/jay-ambe-construction-04/', x: '#' }
    }
  ]

  const timeline = [
    {
      year: '2010',
      title: 'Company Founded',
      description: 'Jay Ambe Construction was established in Ahmedabad, Gujarat, starting with RCC and masonry labor work for small-scale projects.'
    },
    {
      year: '2012',
      title: 'First Major Projects',
      description: 'Successfully completed low-rise projects, building reputation in Ahmedabad\'s competitive construction market.'
    },
    {
      year: '2015',
      title: 'High-Rise Expansion',
      description: 'Advanced to constructing 14 to 22-floor high-rise structures, handling complex challenges with confidence.'
    },
    {
      year: '2018',
      title: 'Turnkey Projects',
      description: 'Expanded into turnkey projects, taking full responsibility for delivering completed projects within defined timeframes.'
    },
    {
      year: '2020',
      title: 'Technology Integration',
      description: 'Adopted latest technologies and construction software for modern, efficient, and streamlined execution.'
    },
    {
      year: '2024',
      title: 'Industry Recognition',
      description: 'Established as a trusted name in high-rise construction with ongoing projects across Ahmedabad and Gandhinagar.'
    }
  ]

  const values = [
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'Uncompromising commitment to quality craftsmanship and materials in every project.'
    },
    {
      icon: Users,
      title: 'Trust & Integrity',
      description: 'Honest, transparent relationships with clients, partners, and team members built over years.'
    },
    {
      icon: Target,
      title: 'Timely Delivery',
      description: 'Consistent delivery of quality projects on time, meeting client expectations.'
    },
    {
      icon: Building2,
      title: 'Innovation',
      description: 'Embracing latest technologies and construction methods for modern, durable solutions.'
    }
  ]

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}

      {/* Company Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Our <span className="gradient-text">Story</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2010, Jay Ambe Construction began its journey in the construction industry through RCC and masonry labor work for small-scale projects. With dedication, skilled workmanship, and a focus on quality, we steadily built our reputation in Ahmedabad's competitive construction market.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                As time progressed, our successful completion of low-rise projects caught the attention of reputed names in the industry. Recognizing our work ethic, reliability, and commitment to delivering quality, clients entrusted us with larger, high-rise projects—marking a significant turning point in our growth. From constructing modest buildings, we advanced to constructing 14 to 22-floor high-rise structures, handling complex challenges with confidence.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, our journey stands as a testament to continuous growth driven by quality, trust, and commitment—qualities that remain the foundation of every project we undertake.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Construction site"
                className="rounded-xl shadow-strong"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent-gray text-primary-white p-6 rounded-xl">
                <div className="text-3xl font-heading font-bold">15+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <div className="w-16 h-16 bg-accent-gray/20 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-accent-gray" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-primary-black">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To grow as a leading construction company by consistently delivering quality projects on time, while continuing to fulfill our clients' visions with honesty, transparency, and professionalism.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <div className="w-16 h-16 bg-accent-gray/20 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-accent-gray" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-primary-black">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To be the trusted name in high-rise construction, specializing in projects ranging from 14 to 22 floors, while maintaining our commitment to ethical work practices, timely completion, and uncompromising quality.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
              Company <span className="gradient-text">Overview</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              JAY AMBE CONSTRUCTION is a trusted name in the construction industry, proudly based in Ahmedabad, Gujarat, India, since 2010. 
              We specialize in the construction of high-rise buildings—ranging from 14 to 22 floors—and handle a wide spectrum of projects, 
              including turn-key projects, all-labor contracts, and RCC-masonry works.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-accent-gray/20 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-accent-gray" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-primary-black">
                High-Rise Specialists
              </h3>
              <p className="text-gray-600">
                Expertise in constructing buildings ranging from 14 to 22 floors with precision and quality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-accent-gray/20 flex items-center justify-center">
                <Users className="w-8 h-8 text-accent-gray" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-primary-black">
                Turnkey Solutions
              </h3>
              <p className="text-gray-600">
                Complete project delivery from concept to completion within defined timeframes and quality standards.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-accent-gray/20 flex items-center justify-center">
                <Award className="w-8 h-8 text-accent-gray" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-primary-black">
                Trusted Partner
              </h3>
              <p className="text-gray-600">
                Long-standing relationships with clients built on trust, satisfaction, and consistent quality delivery.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
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
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape the way we work with clients, 
              partners, and our community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-accent-gray/20 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-accent-gray" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3 text-primary-black">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A timeline of our growth and achievements over the past 15 years in the construction industry.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-accent-gray/20"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="card p-6">
                      <div className="text-2xl font-heading font-bold text-accent-gray mb-2">{item.year}</div>
                      <h3 className="text-xl font-heading font-semibold mb-2 text-primary-black">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-accent-gray rounded-full border-4 border-white"></div>
                  </div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
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
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our experienced leadership team brings decades of combined expertise 
              in construction, architecture, and project management.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center group"
              >
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold mb-2 text-primary-black">
                    {member.name}
                  </h3>
                  <p className="text-accent-gray font-semibold mb-1">{member.position}</p>
                  <p className="text-sm text-gray-500 mb-3">{member.experience} Experience</p>
                  <p className="text-gray-600 text-sm mb-4">
                    {member.description}
                  </p>
                  <div className="flex justify-center space-x-3">
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-accent-gray hover:text-primary-white transition-colors duration-300"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={member.social.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-accent-gray hover:text-primary-white transition-colors duration-300"
                      aria-label="X"
                    >
                      <X className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      
    </div>
  )
}

export default About

import { motion } from 'framer-motion'
import { 
  Building2, 
  Target, 
  Eye, 
  Award, 
  Users, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Twitter
} from 'lucide-react'

const About = () => {
  const teamMembers = [
    {
      name: 'Rajesh Patel',
      position: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      experience: '25+ years',
      description: 'Visionary leader with decades of construction expertise and a passion for innovation.',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Priya Sharma',
      position: 'Chief Operations Officer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      experience: '20+ years',
      description: 'Operations expert ensuring every project meets the highest standards of quality and efficiency.',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Amit Kumar',
      position: 'Head of Architecture',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      experience: '18+ years',
      description: 'Creative architect bringing innovative design solutions to every project.',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Sneha Reddy',
      position: 'Project Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      experience: '15+ years',
      description: 'Dedicated project manager ensuring timely delivery and client satisfaction.',
      social: { linkedin: '#', twitter: '#' }
    }
  ]

  const timeline = [
    {
      year: '1998',
      title: 'Company Founded',
      description: 'Jay Ambe Construction was established with a vision to build quality structures.'
    },
    {
      year: '2005',
      title: 'First Major Project',
      description: 'Successfully completed our first large-scale commercial project.'
    },
    {
      year: '2010',
      title: 'Expansion Phase',
      description: 'Expanded operations to multiple cities and diversified service offerings.'
    },
    {
      year: '2015',
      title: 'Award Recognition',
      description: 'Received multiple industry awards for excellence in construction.'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Implemented advanced technology and sustainable building practices.'
    },
    {
      year: '2023',
      title: '25th Anniversary',
      description: 'Celebrated 25 years of building dreams and creating landmarks.'
    }
  ]

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every project, no matter the size or complexity.'
    },
    {
      icon: Users,
      title: 'Integrity',
      description: 'Honest, transparent relationships with clients, partners, and team members.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Embracing new technologies and sustainable building practices.'
    },
    {
      icon: Building2,
      title: 'Quality',
      description: 'Uncompromising commitment to quality craftsmanship and materials.'
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
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Our <span className="gradient-text">Story</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Founded in 1998, Jay Ambe Construction began with a simple mission: to build quality structures 
                that stand the test of time. What started as a small family business has grown into one of the 
                region's most trusted construction companies.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Over the past 25 years, we've completed over 150 projects across residential, commercial, and 
                industrial sectors. Our commitment to quality, innovation, and client satisfaction has earned us 
                a reputation for excellence in the construction industry.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Today, we continue to push boundaries with sustainable building practices, cutting-edge technology, 
                and a team of experienced professionals dedicated to bringing your vision to life.
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
              <div className="absolute -bottom-6 -left-6 bg-primary-orange text-primary-black p-6 rounded-xl">
                <div className="text-3xl font-bold">25+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-50 dark:bg-dark-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <div className="w-16 h-16 bg-primary-orange/20 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary-orange" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary-black dark:text-primary-white">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To deliver exceptional construction services that exceed client expectations while maintaining 
                the highest standards of quality, safety, and sustainability. We are committed to building 
                structures that not only meet today's needs but also serve future generations.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <div className="w-16 h-16 bg-primary-orange/20 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-primary-orange" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary-black dark:text-primary-white">
                Our Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To be the leading construction company known for innovation, sustainability, and excellence. 
                We envision a future where our projects not only transform skylines but also contribute 
                positively to communities and the environment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
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
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary-orange/20 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-primary-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary-black dark:text-primary-white">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
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
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A timeline of our growth and achievements over the past 25 years.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-orange/20"></div>
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
                      <div className="text-2xl font-bold text-primary-orange mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold mb-2 text-primary-black dark:text-primary-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-primary-orange rounded-full border-4 border-white dark:border-dark-bg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
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
                  <h3 className="text-xl font-bold mb-2 text-primary-black dark:text-primary-white">
                    {member.name}
                  </h3>
                  <p className="text-primary-orange font-semibold mb-1">{member.position}</p>
                  <p className="text-sm text-gray-500 mb-3">{member.experience} Experience</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {member.description}
                  </p>
                  <div className="flex justify-center space-x-3">
                    <a
                      href={member.social.linkedin}
                      className="w-8 h-8 bg-gray-100 dark:bg-dark-border rounded-full flex items-center justify-center hover:bg-primary-orange hover:text-primary-black transition-colors duration-300"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="w-8 h-8 bg-gray-100 dark:bg-dark-border rounded-full flex items-center justify-center hover:bg-primary-orange hover:text-primary-black transition-colors duration-300"
                    >
                      <Twitter className="w-4 h-4" />
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

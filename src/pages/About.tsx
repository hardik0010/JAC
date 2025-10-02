import { motion } from 'framer-motion'
import { 
  Building2, 
  Target, 
  Eye, 
  Award, 
  Users, 
  Star
} from 'lucide-react'

const About = () => {
  const founder = {
    name: 'Mr. Himanshu Prajapati',
    position: 'Founder & Managing Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    experience: '30+ years',
    description: 'With over 30 years of experience in construction and more than 15 years leading Jay Ambe Construction, Mr. Himanshu Prajapati has built a strong foundation rooted in quality, integrity, and client trust. His hands-on leadership continues to drive the company\'s growth and excellence in every project.',
    achievements: [
      '30+ years in construction industry',
      '15+ years leading Jay Ambe Construction',
      'Expertise in high-rise construction',
      'Commitment to quality and integrity'
    ]
  }

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
      description: 'Advanced to constructing 12 to 33-floor high-rise structures, handling complex challenges with confidence.'
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
       <section className="py-12 lg:py-16">
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
                As time progressed, our successful completion of low-rise projects caught the attention of reputed names in the industry. Recognizing our work ethic, reliability, and commitment to delivering quality, clients entrusted us with larger, high-rise projects—marking a significant turning point in our growth. From constructing modest buildings, we advanced to constructing 12 to 33 floor high-rise structures, handling complex challenges with confidence.
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
                src="src/assets/images/jay-ambe-construction-crane.jpg"
                alt="Jay Ambe Construction Crane - Our Construction Site"
                className="rounded-xl shadow-strong"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent-gray text-primary-white p-6 rounded-xl">
                <div className="text-3xl font-heading font-bold">25+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
       <section className="py-12 lg:py-16 bg-gray-50">
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
                To be the trusted name in high-rise construction, specializing in projects ranging from 12 to 33 floors, while maintaining our commitment to ethical work practices, timely completion, and uncompromising quality.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

        {/* Company Overview */}
        <section className="py-12 lg:py-16 bg-gray-50">
        <div className="container-custom">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Company Description */}
          <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
             >
                <h3 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-black">
                  Company <span className="text-accent-gray">Overview</span>
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
              JAY AMBE CONSTRUCTION is a trusted name in the construction industry, proudly based in Ahmedabad, Gujarat, India, since 2010. 
              We specialize in the construction of high-rise buildings—ranging from 12 to 33 floors—and handle a wide spectrum of projects, 
              including turn-key projects, all-labor contracts, and RCC-masonry works.
            </p>
          </motion.div>

            {/* Right Column - 3 Points Card */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              >
                                 <div className="bg-white p-8 shadow-lg border border-gray-100">
                   <div className="grid grid-cols-1 gap-8">
                     {/* First Row - 2 items */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       {/* High-Rise Specialists */}
                       <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-accent-gray/20 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-accent-gray" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-primary-black">
                High-Rise Specialists
              </h3>
              <p className="text-gray-600">
                Expertise in constructing buildings ranging from 12 to 33 floors with precision and quality.
              </p>
                       </div>

                       {/* Turnkey Solutions */}
                       <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-accent-gray/20 flex items-center justify-center">
                           <Target className="w-8 h-8 text-accent-gray" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-primary-black">
                Turnkey Solutions
              </h3>
              <p className="text-gray-600">
                           Complete project management from concept to completion, ensuring seamless execution.
                         </p>
                       </div>
                     </div>

                     {/* Second Row - 1 item */}
                     <div className="grid grid-cols-1">
                       {/* Trusted Partner */}
                       <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-accent-gray/20 flex items-center justify-center">
                <Award className="w-8 h-8 text-accent-gray" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-primary-black">
                Trusted Partner
              </h3>
              <p className="text-gray-600">
                           Building lasting relationships through quality work, transparency, and reliability.
              </p>
                       </div>
                     </div>
                   </div>
                 </div>
            </motion.div>
          </div>
        </div>
      </section>

             {/* Values */}
       <section className="py-12 lg:py-16 bg-gray-50">
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

             {/* Journey Section */}
       <section className="py-12 lg:py-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-gray/5 to-primary-black/5"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent-gray rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary-black rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A remarkable 15-year journey from humble beginnings to becoming industry leaders in high-rise construction.
            </p>
          </motion.div>

          {/* Journey Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                  viewport={{ once: true }}
                className="group relative"
              >
                                 {/* Card Background */}
                 <div className="relative bg-white p-8 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-500">
                   {/* Year Badge */}
                   <div className="absolute -top-6 left-8 bg-gradient-to-r from-accent-gray to-primary-black text-white px-6 py-3 rounded-lg font-heading font-bold text-lg shadow-lg">
                     {item.year}
                   </div>
                  
                  {/* Content */}
                  <div className="mt-8">
                    <h3 className="text-2xl font-heading font-bold mb-4 text-primary-black group-hover:text-accent-gray transition-colors duration-300">
                        {item.title}
                      </h3>
                    <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-accent-gray/10 rounded-full group-hover:bg-accent-gray/20 transition-colors duration-300"></div>
                  <div className="absolute bottom-4 left-4 w-4 h-4 bg-primary-black/10 rounded-full group-hover:bg-primary-black/20 transition-colors duration-300"></div>
                  </div>
                
                {/* Connection Lines for Desktop */}
                {index < timeline.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-accent-gray/30 to-transparent transform -translate-y-1/2"></div>
                )}
                </motion.div>
              ))}
            </div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center space-x-8 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg border border-white/20">
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-accent-gray">25+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-accent-gray">75,00,000+</div>
                <div className="text-sm text-gray-600">Sq. Ft. Delivered</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-accent-gray">33</div>
                <div className="text-sm text-gray-600">Floor Specialists</div>
          </div>
            </div>
          </motion.div>
        </div>
      </section>

             {/* Founder Section */}
       <section className="py-8 lg:py-12 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-4">
              Meet Our <span className="gradient-text">Founder</span>
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              The visionary leader behind Jay Ambe Construction's success story.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Image Section - Smaller */}
                <div className="relative flex-shrink-0">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Experience Badge */}
                  <div className="absolute -bottom-4 -right-4">
                    <div className="bg-accent-gray text-white px-4 py-2 rounded-lg shadow-lg">
                      <div className="text-lg font-heading font-bold">{founder.experience}</div>
                      <div className="text-xs">Experience</div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-6">
                    <div className="text-center md:text-left mb-4">
                      <h3 className="text-2xl lg:text-3xl font-heading font-bold text-primary-black">
                        {founder.name}
                      </h3>
                      <p className="text-lg text-accent-gray font-semibold">
                        {founder.position}
                      </p>
                    </div>
                    <div className="w-16 h-1 bg-gradient-to-r from-accent-gray to-primary-black rounded-full mx-auto md:mx-0 mb-6"></div>
                  </div>

                  <p className="text-base text-gray-600 leading-relaxed mb-6">
                    {founder.description}
                  </p>

                  {/* Achievements - Horizontal List */}
                  <div className="space-y-3 mb-6">
                    {founder.achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center md:justify-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                      >
                        <div className="w-6 h-6 bg-accent-gray/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Star className="w-3 h-3 text-accent-gray" />
                        </div>
                        <span className="text-sm text-gray-700 font-medium">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Leadership Quote */}
                  <div className="p-4 bg-gradient-to-r from-accent-gray/10 to-primary-black/10 rounded-lg border-l-4 border-accent-gray">
                    <blockquote className="text-base italic text-gray-700 leading-relaxed mb-2">
                      "Quality, integrity, and client trust are not just our values—they are the foundation 
                      upon which we build every project and every relationship."
                    </blockquote>
                    <cite className="text-sm font-semibold text-accent-gray">
                      — {founder.name}
                    </cite>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      
    </div>
  )
}

export default About

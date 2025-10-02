import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

// Initialize EmailJS with your public key
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '')
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle
} from 'lucide-react'

const Contact = () => {
  const form = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState('')

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Office Address',
      details: [
        '1304, 13TH FLOOR GANESH GLORY',
        'NEAR BSNL OFFICE, JAGATPUR-CHENPUR ROAD',
        'S.G.HIGHWAY, JAGATPUR',
        'AHMEDABAD-382481, GUJARAT'
      ]
    },
    {
      icon: Phone,
      title: 'Phone Number',
      details: [
        '+91 95868 22668',
        'Available Mon-Sat: 9:00 AM - 7:00 PM'
      ]
    },
    {
      icon: Mail,
      title: 'Email Address',
      details: [
        'info@jayambeconstruction.com',
        'We respond within 24 hours'
      ]
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: [
        'Monday - Saturday: 9:00 AM - 7:00 PM',
        'Sunday: Closed',
        'Emergency calls: 24/7'
      ]
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    if (!form.current) return

    try {
      // Check if env variables are loaded
      console.log('Checking configuration:', {
        hasServiceId: !!import.meta.env.VITE_EMAILJS_SERVICE_ID,
        hasTemplateId: !!import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        hasPublicKey: !!import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      })

      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
      )
      
      setSubmitSuccess(true)
      if (form.current) form.current.reset()
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (err: any) {
      const errorMessage = err?.text || 'Failed to send message. Please try again later.'
      setError(errorMessage)
      console.error('EmailJS Error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      {/* Contact Form & Info */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-heading font-bold mb-8">
                Send Us a <span className="gradient-text">Message</span>
              </h2>
              
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card p-8 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                     <h3 className="text-2xl font-heading font-bold text-primary-black mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 text-red-700 bg-red-100 rounded-lg">
                      {error}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gray focus:border-transparent bg-white text-gray-900"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gray focus:border-transparent bg-white text-gray-900"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                        id="email"
                        name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gray focus:border-transparent bg-white text-gray-900"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gray focus:border-transparent bg-white text-gray-900"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gray focus:border-transparent bg-white text-gray-900"
                    >
                      <option value="">Select Project Type</option>
                      <option value="residential">Residential Construction</option>
                      <option value="commercial">Commercial Projects</option>
                      <option value="turnkey">Turn-key Projects</option>
                      <option value="rcc-masonry">RCC & Masonry Works</option>
                      <option value="labor">All Labor Contracts</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Please describe your project requirements, timeline, and any specific details..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gray focus:border-transparent bg-white text-gray-900 resize-none"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-black border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-heading font-bold mb-8">
                Contact <span className="gradient-text">Information</span>
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="card p-6"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-accent-gray/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-accent-gray" />
                      </div>
                      <div>
                                                 <h3 className="text-lg font-heading font-semibold mb-2 text-primary-black">
                          {info.title}
                        </h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-600">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Contact */}
              
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Find Us on the <span className="gradient-text">Map</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Visit our office or let us know if you'd like us to come to your location for a consultation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="card overflow-hidden"
          >
            <div className="h-96 w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.113949689342!2d72.541278!3d23.113949689342064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDA2JzUwLjIiTiA3MsKwMzInMjQuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Jayambe Construction Office Location"
                className="rounded-lg"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      

      {/* CTA Section */}
    </div>
  )
}

export default Contact


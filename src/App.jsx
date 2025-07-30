import React from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Menu, 
  X, 
  Mail, 
  MapPin, 
  Users, 
  Clock, 
  Shield, 
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Headphones,
  Calculator,
  Palette,
  Code,
  Building,
  Truck,
  Heart,
  UserCheck,
  MessageSquare,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Award,
  Target,
  TrendingUp,
  Linkedin,
  Phone,
  Sparkles,
  Rocket,
  BarChart3,
  Settings,
  Database,
  Cloud
} from 'lucide-react'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import './App.css'

// Import images
import heroImage from './assets/HpM89PxlD3Ah.jpg'
import officeImage from './assets/ZX1tlAr1IyLN.jpg'
import techImage from './assets/7NlCrtjBOZFv.jpg'
import teamImage from './assets/XN3WZdfoJCO5.png'

// Floating Particles Component
const FloatingParticles = () => {
  return (
    <div className="particles-bg">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="particle" />
      ))}
    </div>
  )
}

// Morphing Background Shapes
const MorphingShapes = () => {
  return (
    <div className="morphing-bg">
      <div className="morphing-shape" />
      <div className="morphing-shape" />
    </div>
  )
}

// Animated Counter Component with Framer Motion
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = React.useState(0)
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })

  React.useEffect(() => {
    if (!isInView) return

    let startTime = null
    const startCount = 0
    const endCount = parseInt(end.replace(/\D/g, ''))

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      const currentCount = Math.floor(progress * endCount)
      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return (
    <motion.div 
      ref={ref}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      className="text-3xl font-bold text-blue-600 relative"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-2 border-blue-200 opacity-30"
      />
      {end.includes('+') ? `${count}+` : count}{suffix}
    </motion.div>
  )
}

// Interactive Services Slider with Framer Motion
const ServicesSlider = ({ services }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true)

  React.useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(services.length / 2))
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, services.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(services.length / 2))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(services.length / 2)) % Math.ceil(services.length / 2))
  }

  return (
    <div className="relative">
      {/* Slider Controls */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            {isAutoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </motion.button>
        </div>
        
        {/* Slide Indicators */}
        <div className="flex space-x-2">
          {Array.from({ length: Math.ceil(services.length / 2) }).map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-blue-300'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Services Grid with Animation */}
      <div className="overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2"
          >
            {services.slice(currentSlide * 2, currentSlide * 2 + 2).map((service, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="card-enhanced float-animation"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/95 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <motion.div 
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className="mx-auto w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white"
                    >
                      {service.icon}
                    </motion.div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{service.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: featureIndex * 0.1 }}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        variant="outline" 
                        className="w-full mt-4 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300"
                        onClick={() => smoothScroll('contact')}
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// Enhanced Testimonials Carousel
const TestimonialsCarousel = ({ testimonials }) => {
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true)

  React.useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTestimonial}
          initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="glass rounded-lg p-8 text-center relative overflow-hidden"
        >
          <MorphingShapes />
          <div className="relative z-10">
            {/* Stars */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Star className="h-6 w-6 text-yellow-400 fill-current" />
                </motion.div>
              ))}
            </motion.div>
            
            {/* Quote */}
            <motion.blockquote 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-700 mb-8 italic leading-relaxed"
            >
              "{testimonials[currentTestimonial].quote}"
            </motion.blockquote>
            
            {/* Author */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="border-t pt-6"
            >
              <div className="font-semibold text-gray-900 text-lg">
                {testimonials[currentTestimonial].author}
              </div>
              <div className="text-blue-600 font-medium">
                {testimonials[currentTestimonial].company}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center items-center mt-8 space-x-4"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
          className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
        >
          <ChevronLeft className="h-5 w-5" />
        </motion.button>
        
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-blue-300'
              }`}
            />
          ))}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
          className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      </motion.div>
    </div>
  )
}

// Interactive Stats with Progress Rings
const InteractiveStats = ({ stats }) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-2 gap-8 md:grid-cols-4"
    >
      {stats.map((stat, index) => (
        <motion.div 
          key={index}
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ delay: index * 0.2, duration: 0.8, type: "spring", bounce: 0.4 }}
          className="text-center group relative"
        >
          <div className="relative">
            <motion.div 
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full opacity-50"
            />
            <div className="relative z-10 p-6">
              <AnimatedCounter end={stat.number} />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: index * 0.2 + 0.5 }}
                className="text-sm text-gray-600 mt-1 group-hover:text-blue-600 transition-colors font-medium"
              >
                {stat.label}
              </motion.div>
            </div>
          </div>
          
          {/* Animated Progress Ring */}
          <motion.svg 
            className="absolute inset-0 w-full h-full -rotate-90"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 0.8 } : { pathLength: 0 }}
            transition={{ delay: index * 0.2, duration: 2, ease: "easeInOut" }}
          >
            <circle
              cx="50%"
              cy="50%"
              r="35%"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-gray-200"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="35%"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-blue-600"
              strokeDasharray="220"
              strokeDashoffset="44"
              initial={{ strokeDashoffset: 220 }}
              animate={isInView ? { strokeDashoffset: 44 } : { strokeDashoffset: 220 }}
              transition={{ delay: index * 0.2, duration: 2, ease: "easeInOut" }}
            />
          </motion.svg>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Floating Action Buttons with Enhanced Animations
const FloatingButtons = () => {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const openWhatsApp = () => {
    window.open('https://wa.me/18484666666?text=Hello! I would like to learn more about AHK Global Solutions services.', '_blank')
  }

  const openLinkedIn = () => {
    window.open('https://www.linkedin.com/company/ahk-global-solutions', '_blank')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed bottom-8 right-8 z-50 flex flex-col space-y-3"
        >
          {/* WhatsApp Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={openWhatsApp}
            className="group relative p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600"
          >
            <MessageSquare className="h-6 w-6" />
            <motion.span 
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded whitespace-nowrap"
            >
              Chat on WhatsApp
            </motion.span>
          </motion.button>

          {/* LinkedIn Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={openLinkedIn}
            className="group relative p-3 bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-800"
          >
            <Linkedin className="h-6 w-6" />
            <motion.span 
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded whitespace-nowrap"
            >
              Follow on LinkedIn
            </motion.span>
          </motion.button>

          {/* Scroll to Top Button */}
          <motion.button
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="group relative p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
          >
            <ChevronUp className="h-6 w-6" />
            <motion.span 
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded whitespace-nowrap"
            >
              Back to top
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Smooth scroll function
  const smoothScroll = (targetId) => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    setIsMenuOpen(false)
  }

  // Open booking popup
  const openBooking = () => {
    window.open('https://calendar.google.com/calendar/appointments/schedules/AcZssZ1w6ZriY-BMqHVxodz832A116IERoohbOXENmBLzLVlQb6N48NKzmWea7VyJQF9SLQJy2-PORiT?gv=true', 'booking', 'width=800,height=700,scrollbars=yes,resizable=yes')
  }

  const services = [
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Virtual Assistance",
      description: "Professional administrative support, call handling, scheduling, and CRM management",
      features: ["24/7 Call Answering", "Email & Calendar Management", "Lead Qualification", "Multi-language Support"]
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Accounting & Bookkeeping",
      description: "Complete financial management from basic bookkeeping to advanced reporting",
      features: ["UAE & USA Compliance", "Multi-entity Consolidation", "Payroll Management", "Financial Reporting"]
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Digital Marketing & Creative",
      description: "Full-service marketing from strategy to execution and creative content",
      features: ["Social Media Management", "Paid Advertising", "Graphic Design", "Video Production"]
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Technology Development",
      description: "Custom software development, mobile apps, and IT infrastructure support",
      features: ["MERN Stack Development", "Mobile Apps", "API Integrations", "Cloud Hosting"]
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Real Estate Support",
      description: "End-to-end property management and investor services",
      features: ["MLS Management", "Property Valuation", "Investor Leads", "Market Analytics"]
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Delivery Services",
      description: "Complete operations management for delivery businesses",
      features: ["Rider Recruitment", "Fleet Management", "24/7 Support", "Performance Analytics"]
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Healthcare Support",
      description: "HIPAA-compliant medical billing and patient data management",
      features: ["Claims Processing", "Insurance Verification", "Patient Data Entry", "AR Follow-up"]
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "HR & Recruitment",
      description: "Global talent acquisition and HR process outsourcing",
      features: ["Technical Recruitment", "Pre-screening Tests", "Onboarding Support", "HR Compliance"]
    }
  ]

  const industries = [
    {
      title: "Real Estate",
      description: "Comprehensive property management and investor support services",
      image: heroImage,
      features: ["Property Management", "MLS Support", "Investor Lead Generation", "Market Analytics"]
    },
    {
      title: "Delivery Services", 
      description: "Complete operational support for delivery and logistics companies",
      image: officeImage,
      features: ["Fleet Management", "Rider Recruitment", "24/7 Operations", "Performance Tracking"]
    },
    {
      title: "Healthcare",
      description: "HIPAA-compliant medical billing and administrative support",
      image: techImage,
      features: ["Medical Billing", "Claims Processing", "Patient Management", "Compliance Support"]
    }
  ]

  const stats = [
    { number: "500+", label: "Happy Clients" },
    { number: "24/7", label: "Support Available" },
    { number: "99%", label: "Client Satisfaction" },
    { number: "50+", label: "Countries Served" }
  ]

  const testimonials = [
    {
      quote: "AHK Global Solutions transformed our back office operations. Their virtual assistants are professional and efficient, handling everything from customer calls to complex data management.",
      author: "Sarah Johnson",
      company: "Tech Startup CEO",
      rating: 5
    },
    {
      quote: "The accounting services are top-notch. They handle our multi-entity books with precision and provide excellent reporting that helps us make informed business decisions.",
      author: "Michael Chen", 
      company: "Real Estate Investor",
      rating: 5
    },
    {
      quote: "Their real estate support services helped us scale our property management business significantly. The team understands our industry and delivers consistent results.",
      author: "Emma Rodriguez",
      company: "Property Management Firm",
      rating: 5
    },
    {
      quote: "Outstanding digital marketing support! They've increased our online presence and lead generation beyond our expectations. Highly professional team.",
      author: "David Thompson",
      company: "Healthcare Practice Owner",
      rating: 5
    },
    {
      quote: "The technology development team delivered our custom CRM solution on time and within budget. Their expertise in MERN stack is impressive.",
      author: "Lisa Wang",
      company: "E-commerce Business",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      <SpeedInsights />
      <Analytics />
      <FloatingParticles />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center cursor-pointer" 
              onClick={() => smoothScroll('home')}
            >
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold gradient-text">AHK Global</h1>
                <p className="text-xs text-gray-500">Solutions Limited</p>
              </div>
            </motion.div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['home', 'services', 'industries', 'about', 'contact'].map((item, index) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, color: '#2563eb' }}
                    onClick={() => smoothScroll(item)}
                    className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors capitalize"
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </nav>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="hidden md:block"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={openBooking}
                  className="bg-blue-600 hover:bg-blue-700 btn-primary"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Started
                </Button>
              </motion.div>
            </motion.div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 p-2 rounded-md transition-colors"
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: 90 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: -90 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {['home', 'services', 'industries', 'about', 'contact'].map((item, index) => (
                  <motion.button
                    key={item}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => smoothScroll(item)}
                    className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium w-full text-left capitalize"
                  >
                    {item}
                  </motion.button>
                ))}
                <div className="px-3 py-2">
                  <Button 
                    onClick={openBooking}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32 overflow-hidden">
        <MorphingShapes />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl"
              >
                Your Global
                <motion.span 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-blue-600 glow-text block"
                > 
                  Back Office Hub
                </motion.span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mt-6 text-xl text-gray-600 sm:max-w-3xl"
              >
                Comprehensive business support services combining human expertise with advanced automation. 
                Focus on growing your business while we handle the rest.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      size="lg" 
                      onClick={openBooking}
                      className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3 btn-primary shadow-lg"
                    >
                      <Rocket className="mr-2 h-5 w-5" />
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05, borderColor: '#2563eb' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => smoothScroll('services')}
                    className="inline-flex items-center justify-center text-lg px-8 py-3 border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50 rounded-md font-medium transition-all duration-200"
                  >
                    <BarChart3 className="mr-2 h-5 w-5" />
                    View Services
                  </motion.button>
                </div>
              </motion.div>
              
              {/* Special Offer Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="mt-6"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Badge className="bg-orange-100 text-orange-800 text-sm px-3 py-1 pulse-glow">
                    🎁 Special Offer: 3 Months Free Bookkeeping
                  </Badge>
                </motion.div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
            >
              <motion.div 
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.3 }}
                className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md"
              >
                <img
                  className="w-full rounded-lg"
                  src={heroImage}
                  alt="Professional office environment"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-lg"></div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
                >
                  <Sparkles className="h-4 w-4 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveStats stats={stats} />
        </div>
      </section>

      {/* Services Section with Interactive Slider */}
      <section id="services" className="py-20 bg-gray-50 relative">
        <MorphingShapes />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h2 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 sm:text-4xl gradient-text"
            >
              Our Core Service Pillars
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-4 text-xl text-gray-600"
            >
              Comprehensive back office solutions tailored to your business needs
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <ServicesSlider services={services} />
          </motion.div>
        </div>
      </section>

      {/* Why Choose AHK Section */}
      <section id="about" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl gradient-text">
                Why Choose AHK Global Solutions?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                We combine the best of human expertise with cutting-edge technology to deliver exceptional results.
              </p>
              
              <div className="mt-8 space-y-6 stagger-animation">
                {[
                  { icon: Users, title: "Human + Technology", desc: "Skilled professionals enhanced by AI and automation for optimal efficiency." },
                  { icon: Globe, title: "Global Reach", desc: "Serving clients across 50+ countries with local expertise and understanding." },
                  { icon: Clock, title: "24/7 Support", desc: "Round-the-clock availability to support your business operations." },
                  { icon: Zap, title: "Scalable Solutions", desc: "Flexible services that grow with your business needs and requirements." }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                    className="flex items-start group cursor-pointer"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="flex-shrink-0"
                    >
                      <item.icon className="h-6 w-6 text-blue-600" />
                    </motion.div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={openBooking}
                    className="bg-blue-600 hover:bg-blue-700 btn-primary"
                  >
                    <Target className="mr-2 h-5 w-5" />
                    Schedule a Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-12 lg:mt-0"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotateY: -5 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  className="w-full rounded-lg shadow-lg"
                  src={officeImage}
                  alt="Modern office workspace"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-20 bg-gray-50 relative">
        <MorphingShapes />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl gradient-text">
              Specialized Industry Solutions
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Tailored services for specific industry needs and requirements
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3"
          >
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="card-enhanced"
              >
                <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/95 backdrop-blur-sm">
                  <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      src={industry.image}
                      alt={industry.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{industry.title}</CardTitle>
                    <CardDescription>{industry.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {industry.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex}
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ delay: featureIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        onClick={() => smoothScroll('contact')}
                        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 btn-primary"
                      >
                        Learn More
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  className="w-full rounded-lg shadow-lg"
                  src={techImage}
                  alt="Technology and automation"
                />
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 mb-12 lg:mb-0"
            >
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl gradient-text">
                Powered by Advanced Technology
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Our technology stack ensures efficient, secure, and scalable operations for all your business needs.
              </p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
                className="mt-8 grid grid-cols-2 gap-4"
              >
                {[
                  { icon: Shield, title: "Zoho One", desc: "Complete business suite" },
                  { icon: Zap, title: "AI Integration", desc: "Smart automation" },
                  { icon: Code, title: "Custom Development", desc: "MERN & Python stack" },
                  { icon: Cloud, title: "Cloud Hosting", desc: "AWS & Azure" }
                ].map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-4 glass rounded-lg cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                    >
                      <tech.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    </motion.div>
                    <h3 className="font-medium">{tech.title}</h3>
                    <p className="text-sm text-gray-600">{tech.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with Interactive Carousel */}
      <section className="py-20 bg-gray-50 relative">
        <MorphingShapes />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl gradient-text">
              What Our Clients Say
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Trusted by businesses worldwide for exceptional service delivery
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <TestimonialsCarousel testimonials={testimonials} />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 relative overflow-hidden">
        <MorphingShapes />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white sm:text-4xl neon-glow"
          >
            Ready to Transform Your Back Office?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-4 text-xl text-blue-100"
          >
            Get started with our comprehensive back office solutions and focus on what matters most - growing your business.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Badge className="bg-orange-500 text-white text-lg px-4 py-2 mb-6">
                🎁 Special Offer: 3 Months Free Bookkeeping
              </Badge>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                onClick={openBooking}
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3 shadow-lg magnetic-btn"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            
            <motion.button 
              whileHover={{ scale: 1.05, borderColor: 'white' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => smoothScroll('services')}
              className="inline-flex items-center justify-center text-lg px-8 py-3 border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-600 rounded-md font-medium transition-all duration-200"
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              View Services
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            <div>
              <h3 className="text-lg font-semibold mb-4 gradient-text">Services</h3>
              <ul className="space-y-2 text-gray-300">
                {['Virtual Assistant', 'Accounting & Bookkeeping', 'Digital Marketing', 'Technology Development'].map((service, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5, color: '#ffffff' }}
                    transition={{ duration: 0.2 }}
                  >
                    <button onClick={() => smoothScroll('services')} className="hover:text-white transition-colors">
                      {service}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 gradient-text">Industries</h3>
              <ul className="space-y-2 text-gray-300">
                {['Real Estate', 'Delivery Services', 'Healthcare', 'Consulting'].map((industry, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5, color: '#ffffff' }}
                    transition={{ duration: 0.2 }}
                  >
                    <button onClick={() => smoothScroll('industries')} className="hover:text-white transition-colors">
                      {industry}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 gradient-text">Company</h3>
              <ul className="space-y-2 text-gray-300">
                {[
                  { label: 'About Us', action: () => smoothScroll('about') },
                  { label: 'Contact', action: () => smoothScroll('contact') },
                  { label: 'Careers', action: () => window.open('mailto:careers@ahksolution.com') },
                  { label: 'Privacy Policy', action: () => {} }
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5, color: '#ffffff' }}
                    transition={{ duration: 0.2 }}
                  >
                    <button onClick={item.action} className="hover:text-white transition-colors">
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 gradient-text">Contact Info</h3>
              <div className="space-y-2 text-gray-300">
                {[
                  { icon: Mail, text: 'info@ahksolution.com', action: () => window.open('mailto:info@ahksolution.com') },
                  { icon: Mail, text: 'careers@ahksolution.com', action: () => window.open('mailto:careers@ahksolution.com') },
                  { icon: MessageSquare, text: '+1 (848) 466-6666', action: () => window.open('https://wa.me/18484666666') },
                  { icon: MapPin, text: '2082 Michelson Dr, Irvine, CA 92612', action: null },
                  { icon: MapPin, text: 'Office 2304 Prime Tower, Business Bay, Dubai, UAE', action: null },
                  { icon: MapPin, text: '112 Hali Rd, Block B Gulberg 2, Lahore, Pakistan', action: null }
                ].map((contact, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ x: 5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center group cursor-pointer"
                    onClick={contact.action}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <contact.icon className="h-4 w-4 mr-2 group-hover:text-blue-400" />
                    </motion.div>
                    <span className="hover:text-white transition-colors">{contact.text}</span>
                  </motion.div>
                ))}
              </div>
              
              {/* Social Media */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
                <div className="flex space-x-3">
                  <motion.a 
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://www.linkedin.com/company/ahk-global-solutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-700 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
          >
            <p>&copy; 2025 AHK Global Solutions Limited. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <FloatingButtons />
    </div>
  )
}

export default App


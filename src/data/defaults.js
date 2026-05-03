import A from '../assets/images'
import { BLOGS } from './blogs'

export const DEFAULT_SITE_DATA = {
  hero: {
    title: 'Helping Every Child Reach',
    subtitle: 'Their Full Potential',
    description: 'Specialized therapy and developmental support for children with unique needs. Book your free baseline assessment today.',
    cta: 'Book Free Assessment',
    calendly: 'https://calendly.com/',
    image: A.heroChild
  },
  about: {
    heading: 'Leading Child Development Experts',
    content: 'We provide evidence-based therapies for children with Autism, ADHD, Speech Delays, and Sensory Processing challenges. Our multidisciplinary team works closely with families to ensure every child achieves their personal best.'
  },
  blogs: BLOGS,
  testimonials: [
    { name: 'Mrs. Priya Verma', location: 'New Delhi', text: 'Watching our child transform challenges into stepping stones with therapy that shows real progress daily.' },
    { name: 'Mr. Rahul Singh', location: 'Mumbai', text: 'Remarkable progress in just 6 months. Speech clarity has improved dramatically.' },
    { name: 'Mrs. Anita Sharma', location: 'Bengaluru', text: 'The difference in approach and results is night and day. Our daughter is thriving.' },
  ],
  map: {
    loc1: '28.623857, 77.364627',
    loc2: '28.641234, 77.357149'
  },
  contact: {
    phone: '+91 0000000000',
    whatsapp: '+91 0000000000',
    email: 'suryamclinic@gmail.com',
    schoolCalendly: 'https://calendly.com/',
    admissionForm: 'https://docs.google.com/forms/',
    locations: [
      {
        id: 1,
        name: 'Suryam Clinic — Sector 62',
        address: 'B-121, Sector 62, Noida, Uttar Pradesh, 201309',
        phone: '+91 98765 43210',
        email: 'srayamclinic@gmail.com',
        hours: 'Mon–Sat: 9:00 AM – 7:00 PM',
        mapsLink: 'https://www.google.com/maps?q=28.623857,77.364627',
      },
      {
        id: 2,
        name: 'Suryam Clinic — Indirapuram',
        address: 'C-45, Indirapuram, Ghaziabad, Uttar Pradesh, 201014',
        phone: '+91 98765 43211',
        email: 'srayamclinic@gmail.com',
        hours: 'Mon–Sat: 9:00 AM – 7:00 PM',
        mapsLink: 'https://www.google.com/maps?q=28.641234,77.357149',
      }
    ],
    socials: {
      linkedin: '#',
      facebook: '#',
      instagram: '#',
      twitter: '#',
      youtube: '#'
    }
  },
  leadSettings: {
    enabled: true,
    timer: 5000,
    emailRecipient: 'suryamchilddevelopmentclinic@gmail.com',
    smtp: {
      host: 'smtp.gmail.com',
      port: 587,
      user: 'suryamchilddevelopmentclinic@gmail.com',
      pass: 'aelu iqqq agrv bkzf'
    }
  },
  team: []
}

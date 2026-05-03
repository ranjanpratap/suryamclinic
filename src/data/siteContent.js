import A from '../assets/images'

export const HERO_CONTENT = {
  title: 'Helping Every Child Reach Their Full Potential',
  subtitle: 'At Suryam Clinic, we believe every child is special. Our specialized therapies are designed to help them thrive.',
  image: '__heroChild__',
  cta: 'Book Assessment',
}

export const SERVICES = [
  { id: 1, color: '#f4a92f', from: 'rgba(246,163,43,0)', to: '#f6a32b', img: A.img1208, title: 'Therapy Services', desc: 'Speech, occupational, physical, and sensory therapies designed to improve communication, movement, and daily skills.' },
  { id: 2, color: '#cdb8fe', from: 'rgba(205,184,254,0)', to: '#cdb8fe', img: A.img1209, title: 'Special Programs', desc: 'Structured programs like autism therapy, school readiness, and early intervention to support long-term development.' },
  { id: 3, color: '#45a3c5', from: 'rgba(69,163,197,0)', to: '#45a3c5', img: A.img1210, title: 'Counselling & Assessments', desc: "Professional guidance, psychological support, and detailed assessments to understand and support your child's needs." },
  { id: 4, color: '#93d9b5', from: 'rgba(147,217,181,0)', to: '#93d9b5', img: A.img1211, title: 'Special School', desc: 'A nurturing environment designed to support learning, growth, and independence.', badge: true },
]

export const TEAM = [
  { id: 1, name: 'Dr. Sarah Mitchell', role: 'Speech Therapist', img: A.img1208 },
  { id: 2, name: 'Dr. Priya Sharma', role: 'Occupational Therapist', img: A.img1209 },
  { id: 3, name: 'Dr. James Wilson', role: 'Child Psychologist', img: A.img1210 },
  { id: 4, name: 'Dr. Ananya Gupta', role: 'Special Educator', img: A.img1211 },
  { id: 5, name: 'Dr. Rohit Mehta', role: 'Physiotherapist', img: A.img1212 },
  { id: 6, name: 'Dr. Emily Chen', role: 'Behavioral Therapist', img: A.img1208 },
  { id: 7, name: 'Dr. Neha Kapoor', role: 'Autism Specialist', img: A.img1209 },
  { id: 8, name: 'Dr. Arjun Patel', role: 'Developmental Pediatrician', img: A.img1210 },
]

export const REVIEWS = [
  { id: 1, name: 'swarnima anand', date: 'Jul 24, 2025', rating: 5, text: 'The best place for my child. The place is so calm, and the staff is so humble and supportive.' },
  { id: 2, name: 'karthik reddy y', date: 'Jul 31, 2025', rating: 5, text: 'The experience was great and very helpful. The team is very professional and empathetic.' },
  { id: 3, name: 'shraya sood', date: 'Jul 22, 2025', rating: 5, text: 'Exceptional service and care. My child has shown significant progress since joining.' }
]

export const CONTACT_INFO = {
  phone: '+91 91234 56789',
  whatsapp: '+91 91234 56789',
  email: 'info@suryamclinic.com',
  address: 'Sector 62, Noida, Uttar Pradesh',
  googleForm: 'https://docs.google.com/forms/your-form-id',
  calendly: 'https://calendly.com/suryam-clinic/visit',
}

export const GALLERY_DATA = [
  { id: 1, img: 'https://picsum.photos/seed/gall1/400/400', title: 'Clinic Reception' },
  { id: 2, img: 'https://picsum.photos/seed/gall2/400/400', title: 'Therapy Room 1' },
  { id: 3, img: 'https://picsum.photos/seed/gall3/400/400', title: 'Outdoor Play Area' },
]

export const TESTIMONIALS = [
  { id: 1, name: 'Mehta Family', location: 'Noida', text: 'Suryam Clinic has been a blessing for our son. The occupational therapy sessions have remarkably improved his fine motor skills.', image: A.img1208 },
  { id: 2, name: 'The Gupta Family', location: 'Delhi', text: 'Choosing this special school was the best decision for our daughter. She is now more sociable.', image: A.img1209 },
]

export const LOCATIONS = [
  {
    id: 1,
    name: 'Suryam Clinic — Sector 62',
    address: 'B-Block, C-Block Road, Sector 62, Noida, UP 201309',
    phone: '+91 98765 43210',
    hours: 'Mon–Sat: 9:00 AM – 7:00 PM',
    lat: 28.625,
    lng: 77.37,
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=28.625,77.37',
    mapSrc: 'https://maps.google.com/maps?q=28.625,77.37&z=15&output=embed',
  }
]

export const FAQ_CATS = ['General', 'Therapy', 'Admissions']

export const FAQ_ITEMS = [
  { id: 1, category: 'General', q: 'What are the clinic timings?', a: 'We are open Monday to Saturday, 9:00 AM to 7:00 PM.' },
]

export const HOW_WE_WORK_STEPS = [
  { num: '01', title: 'Screening', desc: 'Initial assessment to understand needs.' },
  { num: '02', title: 'Evaluation', desc: 'Detailed diagnostic overview.' },
  { num: '03', title: 'Intervention', desc: 'Tailored therapy program.' },
]

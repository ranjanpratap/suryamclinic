import Hero from '../sections/Hero'
import Conditions from '../sections/Conditions'
import Services from '../sections/Services'
import HowWeWork from '../sections/HowWeWork'
import SchoolCTA from '../sections/SchoolCTA'
import Team from '../sections/Team'
import Reviews from '../sections/Reviews'
import Gallery from '../sections/Gallery'
import Testimonials from '../sections/Testimonials'
import FAQ from '../sections/FAQ'
import Contact from '../sections/Contact'
import StoreLocator from '../sections/StoreLocator'

export default function Home() {
  return (
    <>
      <Hero />
      <Conditions />
      <Services />
      <HowWeWork />
      <SchoolCTA id="1" />
      <Team />
      <Reviews />
      <Gallery />
      <Testimonials />
      <SchoolCTA id="2" />
      <FAQ />
      <Contact />
      <StoreLocator />
    </>
  )
}

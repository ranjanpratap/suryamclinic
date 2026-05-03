import AdmissionHero from '../sections/AdmissionHero'
import QualityEducation from '../sections/QualityEducation'
import WhyUs from '../sections/WhyUs'
import Gallery from '../sections/Gallery'
import SchoolCTA from '../sections/SchoolCTA'

export default function Admission() {
  const googleFormLink = 'https://docs.google.com/forms/your-form-id'
  const calendlyLink = 'https://calendly.com/your-calendly-id'

  return (
    <>
      <AdmissionHero formLink={googleFormLink} />
      <QualityEducation />
      <WhyUs />
      <Gallery />
      <SchoolCTA id="admission-cta" calendlyLink={calendlyLink} />
    </>
  )
}

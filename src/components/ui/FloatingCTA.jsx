import { useSiteData } from '../../context/SiteContext'

import A from '../../assets/images'

const FloatingCTA = () => {
  const { contact } = useSiteData()
  const phoneNumber = contact?.phone?.replace(/\D/g, '') || ''
  const whatsappNumber = contact?.whatsapp?.replace(/\D/g, '') || ''

  return (
    <div className="fixed bottom-8 right-6 z-[9999] flex flex-col gap-4">
      {/* Call Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="group relative flex items-center justify-center w-14 h-14 bg-white text-[#29abe2] rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 group border border-black/5"
        title="Call Us"
      >
        <span className="absolute right-full mr-3 bg-black/80 text-white text-xs px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Call Us
        </span>
        <img src={A.call1} alt="Call" className="w-6 h-6 object-contain" />
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
        title="WhatsApp Us"
      >
        <span className="absolute right-full mr-3 bg-black/80 text-white text-xs px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Chat with us
        </span>
        <img src={A.whatsappFloating} alt="WhatsApp" className="w-7 h-7 object-contain" />
      </a>
    </div>
  )
}

export default FloatingCTA

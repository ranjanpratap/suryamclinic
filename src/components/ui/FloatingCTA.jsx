import React from 'react'

const FloatingCTA = () => {
  const phoneNumber = '+919876543210' // Replace with actual number
  const whatsappNumber = '919876543210' // Replace with actual number (no +)

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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
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
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zM17.52 14.3c-.33-.17-1.93-.95-2.22-1.06-.3-.1-.51-.17-.71.13-.21.3-.81.67-1 .85-.18.18-.36.2-.69.03-.33-.17-1.42-.52-2.7-1.66-1-1-1.68-2.21-1.88-2.54-.2-.33-.02-.51.15-.68.15-.15.33-.36.49-.54.17-.18.23-.31.33-.51.1-.2.05-.38-.03-.54-.08-.17-.71-1.71-.97-2.33-.26-.6-.52-.52-.71-.53-.18 0-.39-.01-.61-.01-.22 0-.58.08-.88.41-.3.33-1.15 1.12-1.15 2.73 0 1.61 1.17 3.16 1.34 3.39.17.23 2.3 3.51 5.56 4.92.78.33 1.38.53 1.86.68.78.25 1.49.21 2.05.13.62-.1 1.93-.79 2.19-1.55.27-.77.27-1.43.19-1.56-.08-.13-.31-.2-.64-.37z" />
        </svg>
      </a>
    </div>
  )
}

export default FloatingCTA

import React, { useState, useEffect } from 'react';
import { X, Phone, User, ArrowRight, Star } from 'lucide-react';
import api from '../../api';

import { useSiteData } from '../../context/SiteContext';

const LeadPopup = () => {
  const { isLeadPopupOpen, closeLeadPopup, openLeadPopup } = useSiteData();
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem('hasSeenLeadPopup');
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        openLeadPopup();
      }, 5000); // 5 seconds delay

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    closeLeadPopup();
    sessionStorage.setItem('hasSeenLeadPopup', 'true');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError('Please fill all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await api.post('/leads', formData);
      setSubmitted(true);
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isLeadPopupOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-[#FFF8F3] rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-full transition-all"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-12 text-center">
          {/* Logo/Brand Icon placeholder */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg ring-4 ring-orange-100">
              S
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Still thinking about it?
            <span className="block text-lg md:text-xl font-normal text-gray-600 mt-2">
              Share a few details or call us directly — we're here to help, your way.
            </span>
          </h2>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 pointer-events-none">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-transparent focus:border-red-400 rounded-2xl shadow-sm outline-none transition-all text-gray-800 placeholder:text-gray-400"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 pointer-events-none">
                  <Phone size={18} />
                </div>
                <input
                  type="tel"
                  placeholder="+91 XXXXXXXXXX"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-transparent focus:border-red-400 rounded-2xl shadow-sm outline-none transition-all text-gray-800 placeholder:text-gray-400"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm animate-bounce">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1A2E6E] hover:bg-[#152559] text-white font-bold py-4 rounded-full shadow-lg shadow-blue-900/20 flex items-center justify-center gap-3 transition-all group active:scale-95 disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Get free consultation
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Social Proof */}
              <div className="flex flex-col items-center gap-2 mt-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span>4.7 <span className="text-blue-600 font-bold">G</span> rating</span>
                  <span className="text-gray-300">|</span>
                  <span>5000+ happy parents</span>
                </div>
                <div className="w-full h-[1px] bg-gray-200 mt-2" />
              </div>

              {/* Call Link */}
              <a 
                href="tel:+910000000000"
                className="inline-flex items-center gap-3 w-full justify-center py-4 bg-blue-50 text-blue-700 font-semibold rounded-full hover:bg-blue-100 transition-colors mt-4"
              >
                Call us
                <Phone size={18} className="fill-blue-700/20" />
              </a>
            </form>
          ) : (
            <div className="py-12 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star size={40} className="fill-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600">We've received your request and will contact you shortly.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadPopup;

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';
import { DEFAULT_SITE_DATA } from '../data/defaults';

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [siteData, setSiteData] = useState({
    hero: DEFAULT_SITE_DATA.hero,
    about: DEFAULT_SITE_DATA.about,
    blogs: DEFAULT_SITE_DATA.blogs,
    gallery: [],
    testimonials: DEFAULT_SITE_DATA.testimonials,
    map: DEFAULT_SITE_DATA.map,
    contact: DEFAULT_SITE_DATA.contact,
    leadSettings: DEFAULT_SITE_DATA.leadSettings,
    team: DEFAULT_SITE_DATA.team,
    loading: true,
  });

  const [isLeadPopupOpen, setIsLeadPopupOpen] = useState(false);

  const openLeadPopup = () => setIsLeadPopupOpen(true);
  const closeLeadPopup = () => setIsLeadPopupOpen(false);

  const fetchSection = async (key) => {
    try {
      const { data } = await api.get(`/settings/${key}`);
      const hasData = data && typeof data === 'object' && Object.keys(data).length > 0;
      
      // Merge with defaults to ensure full structure (e.g. locations, socials)
      return hasData 
        ? { ...DEFAULT_SITE_DATA[key], ...data } 
        : DEFAULT_SITE_DATA[key];
    } catch (err) {
      console.warn(`Could not fetch ${key}, using local fallback`);
      return DEFAULT_SITE_DATA[key];
    }
  };

  const loadAllData = async () => {
    try {
      const [hero, about, map, blogRes, testRes, gallRes, contact, leadSettings, teamRes] = await Promise.allSettled([
        fetchSection('hero'),
        fetchSection('about'),
        fetchSection('map'),
        api.get('/blogs'),
        api.get('/testimonials'),
        api.get('/gallery/homepage'),
        fetchSection('contact'),
        fetchSection('leadSettings'),
        api.get('/team')
      ]);

      setSiteData({
        hero: hero.status === 'fulfilled' ? hero.value : DEFAULT_SITE_DATA.hero,
        about: about.status === 'fulfilled' ? about.value : DEFAULT_SITE_DATA.about,
        map: map.status === 'fulfilled' ? map.value : DEFAULT_SITE_DATA.map,
        contact: contact.status === 'fulfilled' ? contact.value : DEFAULT_SITE_DATA.contact,
        leadSettings: leadSettings.status === 'fulfilled' ? leadSettings.value : DEFAULT_SITE_DATA.leadSettings,
        blogs: (blogRes.status === 'fulfilled' && blogRes.value?.data?.length > 0) 
                ? blogRes.value.data 
                : DEFAULT_SITE_DATA.blogs,
        testimonials: (testRes.status === 'fulfilled' && testRes.value?.data?.length > 0) 
                      ? testRes.value.data 
                      : DEFAULT_SITE_DATA.testimonials,
        gallery: (gallRes.status === 'fulfilled' && gallRes.value?.data?.length > 0)
                  ? gallRes.value.data
                  : [],
        team: (teamRes.status === 'fulfilled' && teamRes.value?.data?.length > 0)
                  ? teamRes.value.data
                  : DEFAULT_SITE_DATA.team,
        loading: false
      });
    } catch (err) {
      setSiteData(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  return (
    <SiteContext.Provider value={{ 
      ...siteData, 
      refresh: loadAllData,
      isLeadPopupOpen,
      openLeadPopup,
      closeLeadPopup
    }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteData = () => useContext(SiteContext);

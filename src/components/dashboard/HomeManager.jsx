import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, Typography, Box, Grid, TextField, Button,
  Accordion, AccordionSummary, AccordionDetails, Divider, IconButton,
  Alert, Skeleton
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Save as SaveIcon, CloudUpload as UploadIcon } from '@mui/icons-material';
import api from '../../api';

export default function HomeManager() {
  const [settings, setSettings] = useState({
    hero: { title: '', subtitle: '', cta: '', calendly: '', description: '', image: '' },
    about: { heading: '', content: '' },
    features: { title: '', items: [] },
    contact: { 
      phone: '', 
      whatsapp: '', 
      email: '', 
      schoolCalendly: '', 
      admissionForm: '',
      locations: [{}, {}],
      socials: {}
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const fetchSection = async (key) => {
    try {
      const { data } = await api.get(`/settings/${key}`);
      console.log(`FETCHED ${key}:`, data);
      if (data) {
        setSettings(prev => ({ 
          ...prev, 
          [key]: { ...prev[key], ...data } 
        }));
      }
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      await Promise.all([fetchSection('hero'), fetchSection('about'), fetchSection('contact')]);
      setLoading(false);
    };
    loadAll();
  }, []);

  const handleSave = async (key) => {
    console.log(`SAVING ${key} WITH CONTENT:`, settings[key]);
    setSaving(key);
    try {
      await api.post(`/settings/${key}`, settings[key]);
      setMsg({ type: 'success', text: `${key.toUpperCase()} saved!` });
    } catch (err) { 
      console.error('SAVE ERROR:', err);
      setMsg({ type: 'error', text: 'Error saving section' }); 
    }
    finally { setSaving(false); setTimeout(() => setMsg(null), 3000); }
  };

  const updateSetting = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  if (loading) return <Box sx={{ p: 4 }}><Skeleton height={400} /></Box>;

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>Home Page Content</Typography>
      
      {msg && <Alert severity={msg.type} sx={{ mb: 3 }}>{msg.text}</Alert>}

      <Grid container spacing={3}>
        {/* HERO SECTION */}
        <Grid item xs={12}>
          <Accordion elevation={0} sx={{ border: '1px solid #eee', borderRadius: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Hero Section</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth label="Heading Title" value={settings.hero.title}
                    onChange={(e) => updateSetting('hero', 'title', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth multiline rows={3} label="Hero Subtitle (Bold Part)" value={settings.hero.subtitle}
                    onChange={(e) => updateSetting('hero', 'subtitle', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth multiline rows={3} label="Main Description" value={settings.hero.description}
                    onChange={(e) => updateSetting('hero', 'description', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth label="Hero Image URL" value={settings.hero.image}
                    onChange={(e) => updateSetting('hero', 'image', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth label="CTA Button Text" value={settings.hero.cta}
                    onChange={(e) => updateSetting('hero', 'cta', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth label="Assessment Booking URL (Calendly)" value={settings.hero.calendly || ''}
                    placeholder="https://calendly.com/your-assessment-link"
                    onChange={(e) => updateSetting('hero', 'calendly', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button
                    variant="contained" disableElevation startIcon={<SaveIcon />}
                    onClick={() => handleSave('hero')} disabled={saving === 'hero'}
                    sx={{ bgcolor: '#29abe2', '&:hover': { bgcolor: '#2498c9' } }}
                  >
                    {saving === 'hero' ? 'Saving...' : 'Save Hero Section'}
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12}>
          <Accordion elevation={0} sx={{ border: '1px solid #eee', borderRadius: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Contact & Footer Settings</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: '#fafafa', p: 3 }}>
              <Grid container spacing={4}>
                {/* Global Contact Info */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="primary" sx={{ mb: 2, fontWeight: 'bold' }}>Global Contact Information</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField fullWidth label="Primary Phone" value={settings.contact?.phone || ''} onChange={(e) => updateSetting('contact', 'phone', e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField fullWidth label="WhatsApp Number" value={settings.contact?.whatsapp || ''} onChange={(e) => updateSetting('contact', 'whatsapp', e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField fullWidth label="General Email" value={settings.contact?.email || ''} onChange={(e) => updateSetting('contact', 'email', e.target.value)} />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Branch Locations */}
                <Grid item xs={12}>
                   <Divider sx={{ mb: 3 }} />
                   <Typography variant="subtitle2" color="primary" sx={{ mb: 2, fontWeight: 'bold' }}>Branch Locations (Footer)</Typography>
                   <Grid container spacing={3}>
                    {[0, 1].map((idx) => (
                      <Grid item xs={12} md={6} key={idx}>
                        <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 2, border: '1px solid #eee' }}>
                          <Typography variant="body2" sx={{ mb: 2, fontWeight: 'bold', color: 'text.secondary' }}>Branch {idx + 1} Configuration</Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                               <TextField fullWidth label="Clinic Name" value={settings.contact?.locations?.[idx]?.name || ''} 
                                  onChange={(e) => {
                                    const newLocs = [...(settings.contact.locations || [])];
                                    newLocs[idx] = { ...newLocs[idx], name: e.target.value };
                                    updateSetting('contact', 'locations', newLocs);
                                  }}
                               />
                            </Grid>
                            <Grid item xs={12}>
                               <TextField fullWidth multiline rows={2} label="Complete Address" value={settings.contact?.locations?.[idx]?.address || ''} 
                                  onChange={(e) => {
                                    const newLocs = [...(settings.contact.locations || [])];
                                    newLocs[idx] = { ...newLocs[idx], address: e.target.value };
                                    updateSetting('contact', 'locations', newLocs);
                                  }}
                               />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                               <TextField fullWidth label="Phone Number" value={settings.contact?.locations?.[idx]?.phone || ''}
                                  onChange={(e) => {
                                    const newLocs = [...(settings.contact.locations || [])];
                                    newLocs[idx] = { ...newLocs[idx], phone: e.target.value };
                                    updateSetting('contact', 'locations', newLocs);
                                  }}
                               />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                               <TextField fullWidth label="Opening Hours" value={settings.contact?.locations?.[idx]?.hours || ''}
                                  onChange={(e) => {
                                    const newLocs = [...(settings.contact.locations || [])];
                                    newLocs[idx] = { ...newLocs[idx], hours: e.target.value };
                                    updateSetting('contact', 'locations', newLocs);
                                  }}
                               />
                            </Grid>
                            <Grid item xs={12}>
                               <TextField fullWidth label="Google Maps Link" 
                                  placeholder="https://maps.app.goo.gl/..." 
                                  value={settings.contact?.locations?.[idx]?.mapsLink || ''} 
                                  onChange={(e) => {
                                    const newLocs = [...(settings.contact.locations || [])];
                                    newLocs[idx] = { ...newLocs[idx], mapsLink: e.target.value };
                                    updateSetting('contact', 'locations', newLocs);
                                  }}
                                  helperText="Paste the Google Maps share link for this location"
                               />
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    ))}
                   </Grid>
                </Grid>

                {/* Social Media */}
                <Grid item xs={12}>
                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="subtitle2" color="primary" sx={{ mb: 2, fontWeight: 'bold' }}>Social Media Profiles</Typography>
                  <Grid container spacing={2}>
                    {['facebook', 'instagram', 'twitter', 'linkedin', 'youtube'].map((platform) => (
                      <Grid item xs={12} sm={4} lg={2.4} key={platform}>
                        <TextField 
                          fullWidth size="small"
                          label={platform.charAt(0).toUpperCase() + platform.slice(1)} 
                          value={settings.contact?.socials?.[platform] || ''}
                          onChange={(e) => {
                            const newSocials = { ...(settings.contact.socials || {}) };
                            newSocials[platform] = e.target.value;
                            updateSetting('contact', 'socials', newSocials);
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                {/* Booking & Forms */}
                <Grid item xs={12}>
                   <Divider sx={{ mb: 3 }} />
                   <Typography variant="subtitle2" color="primary" sx={{ mb: 2, fontWeight: 'bold' }}>External Booking & Form Links</Typography>
                   <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="School Visit Booking (Calendly)" value={settings.contact?.schoolCalendly || ''} onChange={(e) => updateSetting('contact', 'schoolCalendly', e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Admission Application (Google Form)" value={settings.contact?.admissionForm || ''} onChange={(e) => updateSetting('contact', 'admissionForm', e.target.value)} />
                    </Grid>
                   </Grid>
                </Grid>

                <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained" size="large" disableElevation startIcon={<SaveIcon />}
                    onClick={() => handleSave('contact')} disabled={saving === 'contact'}
                    sx={{ bgcolor: '#29abe2', '&:hover': { bgcolor: '#2498c9' }, borderRadius: 2, px: 4 }}
                  >
                    {saving === 'contact' ? 'Saving...' : 'Save All Settings'}
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Box>
  );
}

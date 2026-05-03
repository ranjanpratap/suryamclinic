/* eslint-disable */
import React, { useState } from 'react';
import {
  Box, Typography, Paper, TextField, Button, Divider,
  Stack, Snackbar, Alert, Grid,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { useSiteData } from '../../context/SiteContext';

const ACCENT = '#29abe2';

const FIELDS = [
  { key: 'phone',      label: 'Primary Phone Number',  hint: 'Shown in the header and reviews section' },
  { key: 'whatsapp',   label: 'WhatsApp Number',       hint: 'Used for the floating WhatsApp CTA button' },
  { key: 'email',      label: 'Email Address',         hint: 'Contact form destination email' },
  { key: 'googleForm', label: 'Google Form URL',       hint: 'Admission / book assessment form link' },
  { key: 'calendly',   label: 'Calendly Link',         hint: 'Appointment scheduling page URL' },
  { key: 'googleMaps', label: 'Google Maps URL',       hint: 'General clinic location link (for footer)' },
];

export default function GeneralContact() {
  const { contact, update } = useSiteData();
  const [local, setLocal] = useState({ ...contact });
  const [ok, setOk] = useState(false);

  const save = () => { update('contact', local); setOk(true); };
  const change = (key, val) => setLocal(prev => ({ ...prev, [key]: val }));

  return (
    <Box py={4}>
      <Typography variant="h4" fontWeight={900} sx={{ mb: 1, letterSpacing: '-0.02em' }}>Contact Settings</Typography>
      <Typography color="text.secondary" mb={4}>
        Update phone numbers, links, and communication channels used across the website.
      </Typography>

      <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 4, overflow: 'hidden' }}>
        <Box sx={{ px: 4, py: 3, bgcolor: '#f9fafb', borderBottom: '1px solid #f0f0f0' }}>
          <Typography fontWeight={800}>Communication Channels</Typography>
          <Typography variant="caption" color="text.secondary">Click Save to apply changes to the live website</Typography>
        </Box>
        <Box p={4}>
          <Stack spacing={0}>
            {FIELDS.map((f, idx) => (
              <Box key={f.key}>
                <Grid container spacing={3} alignItems="center" py={2.5}>
                  <Grid item xs={12} sm={4}>
                    <Typography fontWeight={700} fontSize={14}>{f.label}</Typography>
                    <Typography variant="caption" color="text.secondary">{f.hint}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      fullWidth
                      size="small"
                      value={local[f.key] || ''}
                      onChange={e => change(f.key, e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                </Grid>
                {idx < FIELDS.length - 1 && <Divider />}
              </Box>
            ))}
          </Stack>
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button variant="contained" size="large" startIcon={<SaveIcon />} onClick={save}
              sx={{ borderRadius: 3, px: 5, textTransform: 'none', fontWeight: 800, bgcolor: ACCENT, '&:hover': { bgcolor: '#1d94cc' } }}>
              Save Contact Settings
            </Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar open={ok} autoHideDuration={3000} onClose={() => setOk(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ fontWeight: 700 }}>Contact settings updated!</Alert>
      </Snackbar>
    </Box>
  );
}

import React, { useState } from 'react';
import {
  Box, Typography, Paper, TextField, Button, Stack, Grid, IconButton,
  Snackbar, Alert, Tooltip, Chip, Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  LocationOn as PinIcon,
  Save as SaveIcon,
  MyLocation as LocIcon,
} from '@mui/icons-material';
import { useSiteData } from '../../context/SiteContext';

const ACCENT = '#29abe2';

function buildMapUrls(lat, lng) {
  return {
    mapsUrl: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
    mapSrc:  `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`,
  };
}

export default function LocationManager() {
  const { locations, update } = useSiteData();
  const [local, setLocal] = useState(locations.map(l => ({ ...l })));
  const [ok, setOk] = useState(false);

  const save = () => { update('locations', local); setOk(true); };

  const change = (i, field, val) => {
    const arr = [...local];
    arr[i] = { ...arr[i], [field]: val };
    // Auto-recompute map URLs when lat/lng changes
    if (field === 'lat' || field === 'lng') {
      const lat = field === 'lat' ? val : arr[i].lat;
      const lng = field === 'lng' ? val : arr[i].lng;
      if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
        const { mapsUrl, mapSrc } = buildMapUrls(lat, lng);
        arr[i] = { ...arr[i], mapsUrl, mapSrc };
      }
    }
    setLocal(arr);
  };

  const addLocation = () => {
    const newId = local.length > 0 ? Math.max(...local.map(l => l.id)) + 1 : 1;
    setLocal([...local, {
      id: newId,
      name: 'New Suryam Clinic',
      address: 'Enter full address here',
      phone: '+91 98765 00000',
      hours: 'Mon–Sat: 9:00 AM – 7:00 PM',
      lat: 28.6139,
      lng: 77.2090,
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=28.6139,77.2090',
      mapSrc: 'https://maps.google.com/maps?q=28.6139,77.2090&z=15&output=embed',
    }]);
  };

  const remove = (i) => {
    if (local.length <= 1) { alert('At least one location is required.'); return; }
    setLocal(local.filter((_, idx) => idx !== i));
  };

  return (
    <Box py={4}>
      <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={1}>
        <Box>
          <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: '-0.02em' }}>Location Manager</Typography>
          <Typography color="text.secondary" mt={0.5}>
            Add, edit, or remove clinic locations shown on the homepage map.
          </Typography>
        </Box>
        <Chip label={`${local.length} location${local.length !== 1 ? 's' : ''}`}
          sx={{ bgcolor: `${ACCENT}15`, color: ACCENT, fontWeight: 800, fontSize: 13 }} />
      </Box>

      <Box sx={{ bgcolor: '#fffbeb', border: '1px solid #fde68a', borderRadius: 3, p: 2.5, mb: 4 }}>
        <Typography variant="caption" fontWeight="bold" color="#92400e" display="block">
          💡 How to get exact coordinates
        </Typography>
        <Typography variant="caption" color="#92400e">
          Open Google Maps → right-click your clinic location → click the coordinates shown at the top of the popup. Enter them below.
        </Typography>
      </Box>

      <Stack spacing={3}>
        {local.map((loc, i) => (
          <Paper key={loc.id} elevation={0}
            sx={{ border: '1px solid #e5e7eb', borderRadius: 4, overflow: 'hidden' }}>
            {/* Header */}
            <Box sx={{ px: 3, py: 2, bgcolor: '#f9fafb', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Box sx={{ width: 32, height: 32, borderRadius: 2, bgcolor: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PinIcon sx={{ color: '#fff', fontSize: 18 }} />
                </Box>
                <Typography fontWeight={800}>Location {i + 1}</Typography>
              </Box>
              <Tooltip title="Delete location">
                <IconButton onClick={() => remove(i)}
                  sx={{ color: '#ef4444', '&:hover': { bgcolor: '#fef2f2' } }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Body */}
            <Box p={3}>
              <Grid container spacing={2.5}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Location Name" value={loc.name}
                    onChange={e => change(i, 'name', e.target.value)}
                    helperText='e.g. "Suryam Clinic — Sector 62"' />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Full Address" value={loc.address}
                    onChange={e => change(i, 'address', e.target.value)}
                    helperText='Street, City, State, Pincode' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Phone Number" value={loc.phone}
                    onChange={e => change(i, 'phone', e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Working Hours" value={loc.hours}
                    onChange={e => change(i, 'hours', e.target.value)} />
                </Grid>

                <Grid item xs={12}>
                  <Divider><Typography variant="caption" fontWeight="bold" color="text.secondary">Map Coordinates</Typography></Divider>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField fullWidth type="number" label="Latitude" value={loc.lat}
                    onChange={e => change(i, 'lat', parseFloat(e.target.value))}
                    inputProps={{ step: 'any' }}
                    helperText="e.g. 28.6139" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth type="number" label="Longitude" value={loc.lng}
                    onChange={e => change(i, 'lng', parseFloat(e.target.value))}
                    inputProps={{ step: 'any' }}
                    helperText="e.g. 77.2090" />
                </Grid>

                {/* Map preview */}
                <Grid item xs={12}>
                  <Typography variant="caption" fontWeight="bold" color="text.secondary" display="block" mb={1}>Map Preview</Typography>
                  <Box sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid #e5e7eb', height: 200 }}>
                    <iframe
                      key={`${loc.lat}-${loc.lng}`}
                      src={loc.mapSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      title={loc.name}
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary" mt={0.5} display="block">
                    Map auto-updates when you change latitude/longitude
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        ))}

        {/* Add new location */}
        <Paper elevation={0} onClick={addLocation}
          sx={{
            border: '2px dashed #e5e7eb', borderRadius: 4, p: 4, cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5,
            transition: 'all 0.2s', '&:hover': { borderColor: ACCENT, bgcolor: '#f0f9ff' }
          }}>
          <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: `${ACCENT}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AddIcon sx={{ color: ACCENT, fontSize: 28 }} />
          </Box>
          <Typography fontWeight={700} color={ACCENT}>Add New Location</Typography>
          <Typography variant="caption" color="text.secondary">Click to add another clinic branch</Typography>
        </Paper>
      </Stack>

      {/* Save button */}
      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Button variant="contained" size="large" startIcon={<SaveIcon />} onClick={save}
          sx={{ borderRadius: 3, px: 5, textTransform: 'none', fontWeight: 800, fontSize: '0.95rem', bgcolor: ACCENT, '&:hover': { bgcolor: '#1d94cc' } }}>
          Save All Locations
        </Button>
      </Box>

      <Snackbar open={ok} autoHideDuration={3000} onClose={() => setOk(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ fontWeight: 700 }}>
          ✅ Locations updated on homepage map!
        </Alert>
      </Snackbar>
    </Box>
  );
}

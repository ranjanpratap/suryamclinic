import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, Typography, Box, Grid, TextField, Button,
  Paper, IconButton, Avatar, List, ListItem, ListItemText, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions, Chip
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, RateReview as ReviewIcon } from '@mui/icons-material';
import api from '../../api';

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', text: '', video: '', location: '' });

  const fetchT = async () => {
    try {
      const { data } = await api.get('/testimonials');
      setTestimonials(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchT(); }, []);

  const handleSave = async () => {
    try {
      await api.post('/testimonials', formData);
      fetchT();
      setOpen(false);
      setFormData({ name: '', text: '', video: '', location: '' });
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      fetchT();
    } catch (err) { console.error(err); }
  }

  return (
    <Box>
       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Testimonials</Typography>
        <Button variant="contained" startIcon={<AddIcon />} disableElevation onClick={() => setOpen(true)} sx={{ bgcolor: '#29abe2', '&:hover': { bgcolor: '#2498c9' } }}>
          Add Testimonial
        </Button>
      </Box>

      <Grid container spacing={3}>
        {testimonials.map((t) => (
          <Grid item xs={12} sm={6} key={t.id}>
            <Card elevation={0} sx={{ border: '1px solid #eee', borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: '#29abe2' }}>{t.name?.[0] || '?'}</Avatar>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{t.name}</Typography>
                  </Box>
                  <IconButton color="error" size="small" onClick={() => handleDelete(t.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 1 }}>
                  "{t.text}"
                </Typography>
                {t.video && (
                  <Chip label="Video Attached" size="small" color="primary" variant="outlined" />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 'bold' }}>Add Testimonial</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth label="Person Name" value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth label="Location" value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth label="Video URL (YouTube or Direct Link)" value={formData.video}
                onChange={(e) => setFormData({ ...formData, video: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth multiline rows={4} label="Review Content" value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disableElevation sx={{ bgcolor: '#29abe2', '&:hover': { bgcolor: '#2498c9' } }}>
            Save Testimonial
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

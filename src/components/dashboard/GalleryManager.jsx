import React, { useState, useEffect } from 'react';
import {
  Paper, Typography, Box, Grid, Card, CardMedia, CardActions, IconButton,
  Button, TextField, MenuItem, Select, FormControl, InputLabel,
  ImageList, ImageListItem, Chip
} from '@mui/material';
import { Delete as DeleteIcon, CloudUpload as UploadIcon } from '@mui/icons-material';
import api from '../../api';

export default function GalleryManager() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const fetchGallery = async () => {
    try {
      const { data } = await api.get('/gallery/homepage');
      setImages(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchGallery(); }, []);

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    setUploading(true);

    try {
      // Upload files sequentially to avoid hitting Vercel's 4.5MB request payload limit
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('section', 'homepage');
        formData.append('images', files[i]);
        
        await api.post('/gallery/upload', formData);
      }
      fetchGallery();
    } catch (err) { 
      console.error('Upload error:', err);
      alert('An error occurred during upload. Some images may not have been saved.');
    } finally { 
      setUploading(false); 
      event.target.value = ''; // Reset input so the same files can be selected again
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      fetchGallery();
    } catch (err) { console.error(err); }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Gallery Management</Typography>
        
        <Button
            component="label"
            variant="contained"
            disableElevation
            startIcon={<UploadIcon />}
            disabled={uploading}
            sx={{ bgcolor: '#29abe2', '&:hover': { bgcolor: '#2498c9' } }}
          >
            {uploading ? 'Uploading...' : 'Bulk Upload'}
            <input type="file" multiple hidden onChange={handleFileUpload} accept="image/*" />
        </Button>
      </Box>

      <Paper elevation={0} sx={{ p: 3, border: '1px solid #eee', borderRadius: 2 }}>
        {images.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="body1" color="text.secondary">No images in this gallery yet.</Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {images.map((img) => (
              <Grid item xs={6} sm={4} md={3} key={img.id}>
                <Card sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={img.url}
                    alt="Gallery"
                    sx={{ transition: '0.3s', '&:hover': { scale: '1.1' } }}
                  />
                  <Box
                    sx={{
                      position: 'absolute', top: 0, right: 0, p: 0.5,
                      background: 'rgba(255,255,255,0.7)', borderBottomLeftRadius: 8
                    }}
                  >
                    <IconButton size="small" color="error" onClick={() => handleDelete(img.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
}

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

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            resolve(new File([blob], file.name, { type: 'image/jpeg' }));
          }, 'image/jpeg', 0.7); 
        };
      };
    });
  };

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    setUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        // Compress image before uploading to avoid 413 Content Too Large error in production
        const compressedFile = await compressImage(files[i]);
        
        const formData = new FormData();
        formData.append('section', 'homepage');
        formData.append('images', compressedFile);
        
        await api.post('/gallery/upload', formData);
      }
      fetchGallery();
    } catch (err) { 
      console.error('Upload error:', err);
      alert('An error occurred during upload. Please ensure files are not corrupted.');
    } finally { 
      setUploading(false); 
      event.target.value = ''; 
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

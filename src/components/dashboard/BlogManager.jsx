import React, { useState, useEffect } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableRow, TableContainer, TableHead,
  Typography, IconButton, Button, Box, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, Grid, Card, CardMedia, CircularProgress, 
  FormControl, InputLabel, Select, MenuItem, Chip
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Refresh as RefreshIcon, PhotoCamera } from '@mui/icons-material';
import api from '../../api';

export default function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({ 
    title: '', content: '', author: '', authorRole: '', 
    category: 'Tips', excerpt: '', readTime: '5 min read' 
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/blogs');
      setBlogs(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleOpen = (blog = null) => {
    if (blog) setCurrentBlog(blog);
    else setCurrentBlog({ 
      title: '', content: '', author: '', authorRole: '', 
      category: 'Tips', excerpt: '', readTime: '5 min read' 
    });
    setOpen(true);
  };

  const handleClose = () => { setOpen(false); setSelectedFile(null); };

  const handleSubmit = async () => {
    setSubmitting(true);
    const formData = new FormData();
    formData.append('title', currentBlog.title);
    formData.append('content', currentBlog.content);
    formData.append('author', currentBlog.author);
    formData.append('authorRole', currentBlog.authorRole || 'Team Specialist');
    formData.append('category', currentBlog.category);
    formData.append('excerpt', currentBlog.excerpt);
    formData.append('readTime', currentBlog.readTime);
    
    // Auto-generate display date
    const displayDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    formData.append('date', displayDate);

    if (selectedFile) formData.append('image', selectedFile);

    try {
      if (currentBlog.id) {
        await api.put(`/blogs/${currentBlog.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.post('/blogs', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      fetchBlogs();
      handleClose();
    } catch (err) { console.error(err); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog?')) return;
    try {
      await api.delete(`/blogs/${id}`);
      fetchBlogs();
    } catch (err) { console.error(err); }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Blog Management</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<RefreshIcon />} onClick={fetchBlogs}>Refresh</Button>
          <Button variant="contained" startIcon={<AddIcon />} disableElevation onClick={() => handleOpen()} sx={{ bgcolor: '#29abe2', '&:hover': { bgcolor: '#2498c9' } }}>
            Create New Post
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eee', borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#fafafa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Author</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} align="center"><CircularProgress size={24} sx={{ my: 4 }} /></TableCell></TableRow>
            ) : blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Box component="img" src={blog.image} sx={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 1, border: '1px solid #eee' }} />
                </TableCell>
                <TableCell sx={{ fontWeight: 'medium' }}>{blog.title}</TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>{blog.date || new Date(blog.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton size="small" color="primary" onClick={() => handleOpen(blog)}><EditIcon fontSize="small" /></IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(blog.id)}><DeleteIcon fontSize="small" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* CREATE/EDIT DIALOG */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontWeight: 'bold' }}>{currentBlog.id ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField 
                fullWidth label="Blog Title" value={currentBlog.title}
                onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth label="Author Name" value={currentBlog.author}
                onChange={(e) => setCurrentBlog({ ...currentBlog, author: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth label="Author Role" value={currentBlog.authorRole} placeholder="e.g. Psychologist"
                onChange={(e) => setCurrentBlog({ ...currentBlog, authorRole: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth label="Read Time" value={currentBlog.readTime} placeholder="e.g. 5 min read"
                onChange={(e) => setCurrentBlog({ ...currentBlog, readTime: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={currentBlog.category}
                  label="Category"
                  onChange={(e) => setCurrentBlog({ ...currentBlog, category: e.target.value })}
                >
                  {['Newsletter', 'Tips', 'Insight', 'Success Stories'].map(cat => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button component="label" variant="outlined" fullWidth startIcon={<PhotoCamera />} sx={{ height: '56px' }}>
                {selectedFile ? selectedFile.name : 'Choose Featured Image'}
                <input type="file" hidden onChange={(e) => setSelectedFile(e.target.files[0])} accept="image/*" />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth multiline rows={2} label="Short Excerpt" value={currentBlog.excerpt}
                onChange={(e) => setCurrentBlog({ ...currentBlog, excerpt: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth multiline rows={10} label="Blog Content (Main Article)" value={currentBlog.content}
                onChange={(e) => setCurrentBlog({ ...currentBlog, content: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            variant="contained" onClick={handleSubmit} disabled={submitting} 
            disableElevation sx={{ bgcolor: '#29abe2', '&:hover': { bgcolor: '#2498c9' } }}
          >
            {submitting ? 'Processing...' : (currentBlog.id ? 'Update Post' : 'Publish Post')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

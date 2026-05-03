import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Avatar,
  IconButton,
  TextField,
  MenuItem,
  Stack,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Add as AddIcon,
  ChevronLeft as BackIcon,
  PhotoCamera as PhotoIcon
} from '@mui/icons-material';

const MOCK_BLOGS = [
  { id: 1, title: 'Early Signs of Autism', category: 'Insight', date: 'March 10, 2025', author: 'Dr. Priya Sharma' },
  { id: 2, title: 'Speech Therapy Tips', category: 'Tips', date: 'Feb 22, 2025', author: 'Dr. Sarah Mitchell' },
  { id: 3, title: 'Success Stories', category: 'Success Stories', date: 'Jan 15, 2025', author: 'Suryam Team' },
];

export default function BlogAdmin() {
  const [view, setView] = useState('list'); // 'list' or 'editing'
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  if (view === 'editing') {
    return (
      <Box py={4}>
        <Stack direction="row" spacing={2} alignItems="center" mb={4}>
          <IconButton onClick={() => setView('list')}><BackIcon /></IconButton>
          <Typography variant="h4" fontWeight="800">Write New Article</Typography>
        </Stack>

        <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid #eee' }} elevation={0}>
           <Stack spacing={4}>
              <Box>
                 <Typography variant="caption" fontWeight="bold">Article Title</Typography>
                 <TextField fullWidth placeholder="Enter a catchy title..." variant="standard" inputProps={{ style: { fontSize: 24, fontWeight: 'bold' } }} sx={{ mt: 1 }} />
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                 <Box>
                    <Typography variant="caption" fontWeight="bold">Category</Typography>
                    <TextField select fullWidth variant="outlined" size="small" defaultValue="Insight">
                       {['Insight', 'Tips', 'Newsletter', 'Success Stories'].map(o => (
                         <MenuItem key={o} value={o}>{o}</MenuItem>
                       ))}
                    </TextField>
                 </Box>
                 <Box>
                    <Typography variant="caption" fontWeight="bold">Author Name</Typography>
                    <TextField fullWidth variant="outlined" size="small" placeholder="Writer name" />
                 </Box>
              </Box>

              <Box>
                 <Typography variant="caption" fontWeight="bold">Featured Cover Image</Typography>
                 <Paper sx={{ p: 4, mt: 1, textAlign: 'center', bgcolor: '#f5f7fa', border: '2px dashed #ccc', borderRadius: 2 }}>
                    <PhotoIcon sx={{ color: '#ccc', mb: 1 }} fontSize="large" />
                    <Typography variant="caption" display="block">Upload or Drag & Drop Cover Image</Typography>
                 </Paper>
              </Box>

              <Box sx={{ height: 400, mb: 10 }}>
                 <Typography variant="caption" fontWeight="bold" mb={1} display="block">Article Content (Rich Text)</Typography>
                 <ReactQuill 
                   style={{ height: 350 }} 
                   theme="snow"
                   placeholder="Start writing your article details here..."
                   modules={{
                     toolbar: [
                       [{ 'header': [1, 2, false] }],
                       ['bold', 'italic', 'underline','strike', 'blockquote'],
                       [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                       ['link', 'image'],
                       ['clean']
                     ],
                   }}
                 />
              </Box>

              <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
                 <Button variant="outlined" onClick={() => setView('list')}>Cancel</Button>
                 <Button variant="contained" sx={{ bgcolor: '#29abe2' }}>Publish Article</Button>
              </Stack>
           </Stack>
        </Paper>
      </Box>
    );
  }

  return (
    <Box py={4}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" mb={4}>
         <Box>
           <Typography variant="h4" fontWeight="800">Review Blogs</Typography>
           <Typography color="text.secondary">All published articles on the website</Typography>
         </Box>
         <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: '#29abe2' }} onClick={() => setView('editing')}>New Entry</Button>
      </Stack>

      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid #eee' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f7fa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>S No.</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Logo/Cover</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Article Details</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Publish Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Author</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_BLOGS.map((blog, i) => (
              <TableRow key={blog.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  <Avatar variant="rounded" src={`https://picsum.photos/seed/${blog.id*10}/200`} />
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold" variant="body2">{blog.title}</Typography>
                  <Typography variant="caption" color="text.secondary">{blog.category}</Typography>
                </TableCell>
                <TableCell variant="caption">{blog.date}</TableCell>
                <TableCell variant="caption">{blog.author}</TableCell>
                <TableCell align="right">
                   <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
                   <IconButton size="small" onClick={() => setIsDeleteOpen(true)} color="error"><DeleteIcon fontSize="small" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
         <DialogTitle>Confirm Delete</DialogTitle>
         <DialogContent>Are you sure you want to remove this blog post forever?</DialogContent>
         <DialogActions>
            <Button onClick={() => setIsDeleteOpen(false)}>No, Keep it</Button>
            <Button color="error" onClick={() => setIsDeleteOpen(false)}>Yes, Delete</Button>
         </DialogActions>
      </Dialog>
    </Box>
  );
}

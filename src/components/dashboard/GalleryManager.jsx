import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  IconButton, 
  ImageListItem, 
  ImageList, 
  ImageListItemBar,
  Stack,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Avatar
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  Add as AddIcon, 
  PhotoLibrary as GalleryIcon,
  CloudUpload as UploadIcon,
  Visibility as ViewIcon,
  Home as HomeIcon,
  School as EducationIcon
} from '@mui/icons-material';

const MOCK_GALLERY_IMAGES = [
  { id: 1, img: 'https://picsum.photos/seed/gall1/400/400', title: 'Clinic Reception' },
  { id: 2, img: 'https://picsum.photos/seed/gall2/400/400', title: 'Therapy Room 1' },
  { id: 3, img: 'https://picsum.photos/seed/gall3/400/400', title: 'Outdoor Play Area' },
  { id: 4, img: 'https://picsum.photos/seed/gall4/400/400', title: 'Consultation Cabin' },
  { id: 5, img: 'https://picsum.photos/seed/gall5/400/400', title: 'Awards Wall' },
  { id: 6, img: 'https://picsum.photos/seed/gall6/400/400', title: 'Waiting Lounge' },
];

export default function GalleryManager() {
  const [activeFolder, setActiveFolder] = useState('Home Page'); // 'Home Page', 'Admission Page'
  const [isUploading, setIsUploading] = useState(false);

  return (
    <Box py={4}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" mb={4}>
         <Box>
           <Typography variant="h4" fontWeight="800">Gallery Folders</Typography>
           <Typography color="text.secondary">Create and manage image collections for specific sections</Typography>
         </Box>
         <Button variant="contained" startIcon={<UploadIcon />} sx={{ bgcolor: '#29abe2' }}>Global Upload</Button>
      </Stack>

      {/* Directory Selector */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 4 }}>
         {[
           { name: 'Home Page', icon: <HomeIcon />, items: 12 },
           { name: 'Admission Page', icon: <EducationIcon />, items: 8 }
         ].map(f => (
           <Paper 
             key={f.name}
             onClick={() => setActiveFolder(f.name)}
             sx={{ 
               p: 4, 
               borderRadius: 4, 
               border: '2px solid', 
               borderColor: activeFolder === f.name ? '#29abe2' : '#eee',
               bgcolor: activeFolder === f.name ? '#29abe205' : '#fff',
               cursor: 'pointer',
               transition: 'all 0.2s',
               '&:hover': { borderColor: '#29abe2aa' }
             }} 
           elevation={0}>
              <Stack direction="row" alignItems="center" spacing={2}>
                 <Avatar sx={{ bgcolor: activeFolder === f.name ? '#29abe2' : '#f5f7fa', color: activeFolder === f.name ? '#fff' : '#aaa' }}>{f.icon}</Avatar>
                 <Box>
                    <Typography fontWeight="bold" sx={{ color: activeFolder === f.name ? '#29abe2' : '#333' }}>{f.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{f.items} Images total</Typography>
                 </Box>
              </Stack>
           </Paper>
         ))}
      </Box>

      {/* Image Manager */}
      <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid #eee' }} elevation={0}>
         <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6" fontWeight="bold">Viewing: {activeFolder}</Typography>
            <Button variant="contained" size="small" component="label" startIcon={<AddIcon />}>
                Add More Images
                <input type="file" hidden multiple />
            </Button>
         </Stack>
         
         <Divider sx={{ mb: 4 }} />

         <ImageList cols={4} gap={16}>
           {MOCK_GALLERY_IMAGES.map((item) => (
             <ImageListItem key={item.id} sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid #eee' }}>
               <img
                 src={`${item.img}?w=248&fit=crop&auto=format`}
                 srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                 alt={item.title}
                 loading="lazy"
               />
               <ImageListItemBar
                 title={item.title}
                 position="bottom"
                 actionIcon={
                   <IconButton
                     sx={{ color: '#fff' }}
                     onClick={() => {}}
                   >
                     <DeleteIcon fontSize="small" />
                   </IconButton>
                 }
                 actionPosition="right"
                 sx={{ 
                   background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                   p: 0.5
                 }}
               />
             </ImageListItem>
           ))}
         </ImageList>

         {MOCK_GALLERY_IMAGES.length === 0 && (
           <Box sx={{ py: 10, textAlign: 'center', bgcolor: '#f5f7fa', borderRadius: 2 }}>
             <GalleryIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
             <Typography color="text.secondary">This gallery is currently empty.</Typography>
           </Box>
         )}
      </Paper>
    </Box>
  );
}

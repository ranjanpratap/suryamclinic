import React, { useState, useEffect } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableRow, TableContainer, TableHead,
  Typography, IconButton, Button, Box, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, Grid, CircularProgress
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Refresh as RefreshIcon, PhotoCamera } from '@mui/icons-material';
import api from '../../api';

export default function TeamManager() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState({ name: '', role: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/team');
      setTeam(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTeam(); }, []);

  const handleOpen = (member = null) => {
    if (member) setCurrentMember(member);
    else setCurrentMember({ name: '', role: '' });
    setOpen(true);
  };

  const handleClose = () => { setOpen(false); setSelectedFile(null); };

  const handleSubmit = async () => {
    setSubmitting(true);
    const formData = new FormData();
    formData.append('name', currentMember.name);
    formData.append('role', currentMember.role);
    if (selectedFile) formData.append('image', selectedFile);

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      if (currentMember.id) {
        await api.put(`/team/${currentMember.id}`, formData, config);
      } else {
        await api.post('/team', formData, config);
      }
      fetchTeam();
      handleClose();
    } catch (err) { console.error(err); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this team member?')) return;
    try {
      await api.delete(`/team/${id}`);
      fetchTeam();
    } catch (err) { console.error(err); }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Team Management</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<RefreshIcon />} onClick={fetchTeam}>Refresh</Button>
          <Button variant="contained" startIcon={<AddIcon />} disableElevation onClick={() => handleOpen()} sx={{ bgcolor: '#29abe2', '&:hover': { bgcolor: '#2498c9' } }}>
            Add Member
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eee', borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#fafafa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Photo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={4} align="center"><CircularProgress size={24} sx={{ my: 4 }} /></TableCell></TableRow>
            ) : team.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <Box component="img" src={member.img} sx={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%', border: '1px solid #eee' }} />
                </TableCell>
                <TableCell sx={{ fontWeight: 'medium' }}>{member.name}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  <IconButton size="small" color="primary" onClick={() => handleOpen(member)}><EditIcon fontSize="small" /></IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(member.id)}><DeleteIcon fontSize="small" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 'bold' }}>{currentMember.id ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid item xs={12}>
              <TextField 
                fullWidth label="Full Name" value={currentMember.name}
                onChange={(e) => setCurrentMember({ ...currentMember, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth label="Professional Role" value={currentMember.role}
                onChange={(e) => setCurrentMember({ ...currentMember, role: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <Button component="label" variant="outlined" fullWidth startIcon={<PhotoCamera />} sx={{ height: '56px' }}>
                {selectedFile ? selectedFile.name : (currentMember.img ? 'Change Photo' : 'Upload member photo')}
                <input type="file" hidden onChange={(e) => setSelectedFile(e.target.files[0])} accept="image/*" />
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            variant="contained" onClick={handleSubmit} disabled={submitting} 
            disableElevation sx={{ bgcolor: '#29abe2', '&:hover': { bgcolor: '#2498c9' } }}
          >
            {submitting ? 'Saving...' : 'Save Member'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

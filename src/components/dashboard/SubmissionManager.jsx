import React, { useState, useEffect } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, IconButton, Chip, Box, Card, CardContent, Grid, Button
} from '@mui/material';
import { Delete as DeleteIcon, Refresh as RefreshIcon, ContentCopy as CopyIcon } from '@mui/icons-material';
import api from '../../api';

export default function SubmissionManager() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/submissions', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setSubmissions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSubmissions(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this submission?')) return;
    try {
      await api.delete(`/submissions/${id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      fetchSubmissions();
    } catch (err) { console.error(err); }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Sales & Form Submissions</Typography>
        <Button startIcon={<RefreshIcon />} onClick={fetchSubmissions} variant="outlined" size="small">Refresh</Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card elevation={0} sx={{ border: '1px solid #eee', bgcolor: 'rgba(41, 171, 226, 0.05)' }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">Total Submissions</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{submissions.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eee', borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#fafafa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Contact Info</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Message</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                <TableCell sx={{ fontWeight: 'medium' }}>{row.name}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{row.email}</Typography>
                    <Typography variant="caption" color="text.secondary">{row.phone}</Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ maxWidth: 300 }}>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{row.message}</Typography>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(row.row_id)} size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

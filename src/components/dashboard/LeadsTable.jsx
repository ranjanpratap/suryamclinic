import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Chip,
  IconButton,
  Button,
  Stack,
  Divider,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import { 
  DataGrid, 
  GridToolbar,
  GridActionsCellItem
} from '@mui/x-data-grid';
import { 
  Visibility as ViewIcon, 
  Delete as DeleteIcon, 
  Download as DownloadIcon,
  FilterList as FilterIcon,
  Done as DoneIcon,
  Feedback as FeedbackIcon,
  Call as CallIcon,
  School as EducationIcon,
  Article as BlogIcon
} from '@mui/icons-material';

const MOCK_LEADS = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul.s@gmail.com', phone: '+91 9123456789', source: 'Contact Form', date: '2026-03-28 14:15', status: 'Inquiry', message: 'I need to know more about the speech therapy for my 3 year old.' },
  { id: 2, name: 'Ananya Gupta', email: 'an.gup@yahoo.com', phone: '+91 8877665544', source: 'Admission Form', date: '2026-03-27 10:05', status: 'Follow Up', message: 'Applying for the next academic session. Looking for admission details.' },
  { id: 3, name: 'Amit Kumar', email: 'amit.k_test@gmail.com', phone: '+91 9900990099', source: 'Blog Lead', date: '2026-03-25 18:22', status: 'Completed', message: 'Requested free assessment after reading autism signs blog.' },
  { id: 4, name: 'Sneha Patel', email: 'sneha.patel@outlook.com', phone: '+91 7722772277', source: 'Contact Form', date: '2026-03-24 09:12', status: 'Inquiry', message: 'Clinic timings of Noida sector 62 location please.' },
];

export default function LeadsTable() {
  const [pageSize, setPageSize] = useState(5);

  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Full Name', width: 180, renderCell: (p) => <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{p.value}</Typography> },
    { 
      field: 'source', 
      headerName: 'Source Form', 
      width: 160, 
      renderCell: (params) => {
        const icon = params.value.includes('Contact') ? <CallIcon fontSize="small" sx={{ mr: 1 }} /> : 
                     params.value.includes('Admission') ? <EducationIcon fontSize="small" sx={{ mr: 1 }} /> : <BlogIcon fontSize="small" sx={{ mr: 1 }} />;
        return (
          <Box display="flex" alignItems="center">
            {icon}
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{params.value}</Typography>
          </Box>
        );
      } 
    },
    { field: 'email', headerName: 'Communication', width: 220, renderCell: (p) => (
      <Box>
        <Typography variant="caption" display="block" sx={{ fontWeight: 'bold' }}>{p.row.email}</Typography>
        <Typography variant="caption" color="text.secondary">{p.row.phone}</Typography>
      </Box>
    ) },
    { 
      field: 'status', 
      headerName: 'Current Status', 
      width: 140,
      renderCell: (params) => {
        const color = params.value === 'Completed' ? 'success' : params.value === 'Follow Up' ? 'warning' : 'primary';
        return <Chip label={params.value} color={color} size="small" sx={{ fontWeight: 'bold' }} />;
      }
    },
    { field: 'date', headerName: 'Submission Date', width: 160 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Manage',
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem icon={<ViewIcon />} label="View Details" tooltip="Detailed Analysis" />,
        <GridActionsCellItem icon={<DoneIcon />} label="Mark as Handled" color="success" />,
        <GridActionsCellItem icon={<DeleteIcon />} label="Remove Lead" color="error" />,
      ],
    },
  ];

  return (
    <Box py={4}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" mb={4}>
         <Box>
            <Typography variant="h4" fontWeight="800">Sales Dashboard</Typography>
            <Typography color="text.secondary">All form submissions and lead generation data</Typography>
         </Box>
         <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ borderRadius: 10, px: 3 }}>Export Report (CSV)</Button>
      </Stack>

      <Paper sx={{ height: 500, width: '100%', borderRadius: 4, overflow: 'hidden', border: '1px solid #eee' }} elevation={0}>
        <DataGrid
          rows={MOCK_LEADS}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          sx={{
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: '#f5f7fa',
              borderRadius: 0,
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f9f9f9',
            },
            '& .MuiDataGrid-row:hover': {
              bgcolor: '#f5f7fa',
            }
          }}
        />
      </Paper>

      <Stack sx={{ p: 4, mt: 4, bgcolor: '#f5f7fa', borderRadius: 4 }} direction="row" spacing={10}>
          <Box>
            <Typography variant="caption" fontWeight="bold" display="block" color="text.secondary">Active Conversion Rate</Typography>
            <Typography variant="h4" fontWeight="900">12.5%</Typography>
          </Box>
          <Box>
             <Typography variant="caption" fontWeight="bold" display="block" color="text.secondary">Total Inquiries (30d)</Typography>
             <Typography variant="h4" fontWeight="900" sx={{ color: '#29abe2' }}>240</Typography>
          </Box>
      </Stack>
    </Box>
  );
}

import React, { useState, useEffect } from 'react';
import {
  Box, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton,
  ListItem, ListItemButton, ListItemIcon, ListItemText, CssBaseline,
  Container, Avatar, Menu, MenuItem
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Article as BlogIcon,
  People as LeadsIcon,
  Collections as GalleryIcon,
  RateReview as ReviewIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  AccountCircle
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

// Dashboard Views (to be created)
import HomeManager from '../../components/dashboard/HomeManager';
import BlogManager from '../../components/dashboard/BlogManager';
import SubmissionManager from '../../components/dashboard/SubmissionManager';
import GalleryManager from '../../components/dashboard/GalleryManager';
import TestimonialManager from '../../components/dashboard/TestimonialManager';
import LeadManager from '../../components/dashboard/LeadManager';
import TeamManager from '../../components/dashboard/TeamManager';

const drawerWidth = 240;

const MENU_ITEMS = [
  { text: 'Home Content', icon: <HomeIcon />, view: 'home' },
  { text: 'Blog Posts', icon: <BlogIcon />, view: 'blog' },
  { text: 'Form Submissions', icon: <LeadsIcon />, view: 'sales' },
  { text: 'Gallery', icon: <GalleryIcon />, view: 'gallery' },
  { text: 'Testimonials', icon: <ReviewIcon />, view: 'testimonials' },
  { text: 'Lead Settings', icon: <SettingsIcon />, view: 'settings' },
  { text: 'Team Management', icon: <LeadsIcon />, view: 'team' },
];

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeView, setActiveView] = useState('home');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/dashboard/login');
  }, [navigate]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/dashboard/login');
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#29abe2' }}>
          Suryam Clinic
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {MENU_ITEMS.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={activeView === item.view}
              onClick={() => setActiveView(item.view)}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'rgba(41, 171, 226, 0.08)',
                  color: '#29abe2',
                  '& .MuiListItemIcon-root': { color: '#29abe2' },
                },
                m: 1, borderRadius: 2
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mt: 'auto' }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout} sx={{ m: 1, borderRadius: 2 }}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const renderView = () => {
    switch (activeView) {
      case 'home':         return <HomeManager />;
      case 'blog':         return <BlogManager />;
      case 'sales':        return <SubmissionManager />;
      case 'gallery':      return <GalleryManager />;
      case 'testimonials': return <TestimonialManager />;
      case 'settings':     return <LeadManager />;
      case 'team':         return <TeamManager />;
      default:             return <HomeManager />;
    }
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f5f7f9', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'white',
          borderBottom: '1px solid #eee',
          color: 'black'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
            {MENU_ITEMS.find(i => i.view === activeView)?.text}
          </Typography>
          
          <Box>
            <IconButton onClick={handleMenuOpen} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid #eee' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: 8 }}>
        <Container maxWidth="lg" sx={{ mt: 2 }}>
          {renderView()}
        </Container>
      </Box>
    </Box>
  );
}

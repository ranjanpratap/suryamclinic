import React, { useState } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemIcon, ListItemText,
  Typography, AppBar, Toolbar, Avatar, Divider,
  Container, Paper, Button, Stack, Chip,
} from '@mui/material';
import {
  Home as HomeIcon,
  Description as BlogIcon,
  ShoppingCart as SalesIcon,
  PhotoLibrary as GalleryIcon,
  Settings as SettingsIcon,
  Dashboard as DashIcon,
  ContactSupport as ContactIcon,
  LocationOn as LocationIcon,
  OpenInNew as LaunchIcon,
} from '@mui/icons-material';

import HomeSettings from '../components/dashboard/HomeSettings';
import BlogAdmin from '../components/dashboard/BlogAdmin';
import LeadsTable from '../components/dashboard/LeadsTable';
import GalleryManager from '../components/dashboard/GalleryManager';
import GeneralContact from '../components/dashboard/GeneralContact';
import LocationManager from '../components/dashboard/LocationManager';
import { useSiteData } from '../context/SiteContext';
import { BLOGS } from '../data/blogs';

// ── Overview Tab ─────────────────────────────────────────────────────────────
function OverviewTab() {
  const { team, reviews, testimonials, locations, faqItems } = useSiteData();

  const stats = [
    { label: 'Published Blogs',   val: BLOGS.length,         color: '#29abe2', sub: 'Live blog articles' },
    { label: 'Team Members',      val: team.length,          color: '#77bc52', sub: 'In the team marquee' },
    { label: 'Google Reviews',    val: reviews.length,       color: '#f6a32b', sub: 'Shown on homepage' },
    { label: 'Clinic Locations',  val: locations.length,     color: '#cdb8fe', sub: 'On the map section' },
    { label: 'Testimonials',      val: testimonials.length,  color: '#f0c85d', sub: 'In the carousel' },
    { label: 'FAQ Items',         val: faqItems.length,      color: '#45a3c5', sub: 'Q&As on homepage' },
  ];

  return (
    <Box py={4}>
      <Typography variant="h4" fontWeight={900} sx={{ mb: 0.5, letterSpacing: '-0.02em' }}>Welcome, Admin</Typography>
      <Typography color="text.secondary" mb={4}>Live snapshot of your clinic website's current content.</Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 3, mb: 6 }}>
        {stats.map(card => (
          <Paper key={card.label} elevation={0}
            sx={{ p: 4, border: '1px solid #eee', borderRadius: 4, transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' } }}>
            <Typography color="text.secondary" variant="caption" fontWeight={800} sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
              {card.label}
            </Typography>
            <Typography variant="h3" fontWeight={900} sx={{ color: card.color, my: 1, letterSpacing: '-0.03em' }}>
              {card.val}
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>{card.sub}</Typography>
          </Paper>
        ))}
      </Box>

      <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #eee', bgcolor: '#f9f9f9' }}>
        <Typography fontWeight={800} mb={2}>Quick Actions</Typography>
        <Stack direction="row" flexWrap="wrap" gap={2}>
          {[
            { label: 'Edit Hero', tab: 1 },
            { label: 'Manage Team', tab: 1 },
            { label: 'Add Blog Post', tab: 2 },
            { label: 'Add Location', tab: 6 },
            { label: 'Update FAQs', tab: 1 },
          ].map(a => (
            <Chip key={a.label} label={a.label} clickable
              sx={{ fontWeight: 700, bgcolor: '#29abe215', color: '#29abe2', '&:hover': { bgcolor: '#29abe225' } }} />
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}

const DRAWER_WIDTH = 280;

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);

  const MENU_ITEMS = [
    { label: 'Overview',          icon: <DashIcon />,     color: '#29abe2' },
    { label: 'Home Page',         icon: <HomeIcon />,     color: '#77bc52' },
    { label: 'Blogs',             icon: <BlogIcon />,     color: '#f6a32b' },
    { label: 'Sales & Leads',     icon: <SalesIcon />,    color: '#cdb8fe' },
    { label: 'Gallery Manager',   icon: <GalleryIcon />,  color: '#f0c85d' },
    { label: 'Contact Settings',  icon: <ContactIcon />,  color: '#45a3c5' },
    { label: 'Clinic Locations',  icon: <LocationIcon />, color: '#ef4444' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* ── Sidebar ── */}
      <Drawer variant="permanent" sx={{
        width: DRAWER_WIDTH, flexShrink: 0,
        '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box', borderRight: '1.5px solid #eee', bgcolor: '#fff', zIndex: 100 },
      }}>
        <Box sx={{ p: '48px 32px 24px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Box sx={{ width: 34, height: 34, bgcolor: '#29abe2', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DashIcon sx={{ color: '#fff', fontSize: 18 }} />
            </Box>
            <Typography variant="h6" fontWeight={900} sx={{ color: '#000', letterSpacing: '-0.04em', lineHeight: 1 }}>
              Suryam Console
            </Typography>
          </Box>
          <Typography variant="caption" fontWeight={700} color="text.secondary">ADMIN DASHBOARD</Typography>
        </Box>

        <List sx={{ px: 2, pt: 1 }}>
          {MENU_ITEMS.map((item, i) => (
            <ListItem key={item.label} onClick={() => setActiveTab(i)}
              sx={{
                borderRadius: 2.5, mb: 0.5, py: 1.4, cursor: 'pointer',
                bgcolor: activeTab === i ? '#29abe210' : 'transparent',
                color: activeTab === i ? '#29abe2' : '#6b7280',
                transition: 'all 0.15s',
                '&:hover': { bgcolor: activeTab === i ? '#29abe215' : '#f3f4f6' },
              }}>
              <ListItemIcon sx={{ color: activeTab === i ? '#29abe2' : '#9ca3af', minWidth: 42 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: activeTab === i ? 800 : 600, fontSize: '0.9rem', letterSpacing: '-0.01em' }}
              />
              {activeTab === i && (
                <Box sx={{ width: 4, height: 20, bgcolor: '#29abe2', borderRadius: 2 }} />
              )}
            </ListItem>
          ))}
        </List>

        <Box flexGrow={1} />
        <Divider />
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src="https://i.pravatar.cc/150?u=admin_suryam" sx={{ width: 42, height: 42, border: '2px solid #f3f4f6' }} />
          <Box>
            <Typography variant="body2" fontWeight={800}>Abhijeet P.</Typography>
            <Typography variant="caption" fontWeight={600} color="text.secondary">Super Administrator</Typography>
          </Box>
        </Box>
      </Drawer>

      {/* ── Main Content ── */}
      <Box component="main" sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f7fa' }}>
        {/* Top Header */}
        <AppBar position="sticky" elevation={0}
          sx={{ bgcolor: 'rgba(245,247,250,0.96)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #e5e7eb', color: '#111827' }}>
          <Toolbar sx={{ height: 76 }}>
            <Box flexGrow={1}>
              <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ letterSpacing: 1, textTransform: 'uppercase' }}>
                Current View
              </Typography>
              <Typography variant="h6" fontWeight={900} sx={{ letterSpacing: '-0.02em', mt: -0.25 }}>
                {MENU_ITEMS[activeTab].label}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1.5}>
              <Button variant="outlined" href="/" target="_blank" endIcon={<LaunchIcon />}
                sx={{ borderRadius: 3, px: 3, textTransform: 'none', fontWeight: 800, fontSize: '0.85rem', border: '2px solid #e5e7eb', color: '#374151', '&:hover': { border: '2px solid #29abe2', color: '#29abe2' } }}>
                View Site
              </Button>
              <Button variant="contained"
                sx={{ borderRadius: 3, px: 3, textTransform: 'none', fontWeight: 800, fontSize: '0.85rem', bgcolor: '#111827', '&:hover': { bgcolor: '#1f2937' } }}>
                Sign Out
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ pb: 10 }}>
          {activeTab === 0 && <OverviewTab />}
          {activeTab === 1 && <HomeSettings />}
          {activeTab === 2 && <BlogAdmin />}
          {activeTab === 3 && <LeadsTable />}
          {activeTab === 4 && <GalleryManager />}
          {activeTab === 5 && <GeneralContact />}
          {activeTab === 6 && <LocationManager />}
        </Container>
      </Box>
    </Box>
  );
}

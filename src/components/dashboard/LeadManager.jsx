import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Grid, Switch, FormControlLabel, 
  TextField, Button, Divider, Alert, CircularProgress 
} from '@mui/material';
import { Save as SaveIcon, Email as EmailIcon, Timer as TimerIcon } from '@mui/icons-material';
import api from '../../api';
import { useSiteData } from '../../context/SiteContext';

const LeadManager = () => {
  const { leadSettings: initialSettings, refresh } = useSiteData();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings);
    }
  }, [initialSettings]);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await api.post('/settings/leadSettings', settings);
      setSuccess(true);
      refresh();
    } catch (err) {
      setError('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  if (!settings) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Lead Generation Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Configure your automatic consultation popup and lead notification emails.
      </Typography>

      {success && <Alert severity="success" sx={{ mb: 3 }}>Settings saved successfully!</Alert>}
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Grid container spacing={4}>
        {/* Basic Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom display="flex" items="center" gap={1}>
              <TimerIcon color="primary" /> Popup Configuration
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <FormControlLabel
              control={
                <Switch 
                  checked={settings.enabled} 
                  onChange={(e) => setSettings({...settings, enabled: e.target.checked})}
                />
              }
              label={settings.enabled ? "Popup is Active" : "Popup is Disabled"}
              sx={{ mb: 2, display: 'block' }}
            />

            <TextField
              fullWidth
              label="Appearance Delay (milliseconds)"
              type="number"
              variant="outlined"
              value={settings.timer}
              onChange={(e) => setSettings({...settings, timer: parseInt(e.target.value)})}
              helperText="5000ms = 5 seconds"
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Notification Email"
              variant="outlined"
              value={settings.emailRecipient}
              onChange={(e) => setSettings({...settings, emailRecipient: e.target.value})}
              helperText="Leads will be sent to this address"
            />
          </Paper>
        </Grid>

        {/* SMTP Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom display="flex" items="center" gap={1}>
              <EmailIcon color="primary" /> SMTP / Email Server
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="SMTP Host"
                  value={settings.smtp.host}
                  onChange={(e) => setSettings({...settings, smtp: {...settings.smtp, host: e.target.value}})}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Port"
                  type="number"
                  value={settings.smtp.port}
                  onChange={(e) => setSettings({...settings, smtp: {...settings.smtp, port: parseInt(e.target.value)}})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="SMTP User / Email"
                  value={settings.smtp.user}
                  onChange={(e) => setSettings({...settings, smtp: {...settings.smtp, user: e.target.value}})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="SMTP Password / App Password"
                  type="password"
                  value={settings.smtp.pass}
                  onChange={(e) => setSettings({...settings, smtp: {...settings.smtp, pass: e.target.value}})}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              size="large"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
              onClick={handleSave}
              disabled={loading}
              sx={{ px: 4, py: 1.5, borderRadius: 2 }}
            >
              Save Configuration
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeadManager;

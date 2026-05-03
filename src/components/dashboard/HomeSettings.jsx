/* eslint-disable */
import React, { useState } from 'react';
import {
  Box, Typography, Paper, Accordion, AccordionSummary, AccordionDetails,
  TextField, Button, Stack, IconButton, Avatar, Grid, Chip, Snackbar, Alert,
  Divider, Tooltip,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Save as SaveIcon,
  Home as HomeIcon,
  Group as TeamIcon,
  Star as ReviewIcon,
  RecordVoiceOver as TestiIcon,
  Build as WorkIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useSiteData } from '../../context/SiteContext';

const ACCENT = '#29abe2';

function SaveBar({ onSave }) {
  return (
    <Box display="flex" justifyContent="flex-end" pt={3}>
      <Button
        variant="contained"
        startIcon={<SaveIcon />}
        onClick={onSave}
        sx={{ borderRadius: 3, px: 4, textTransform: 'none', fontWeight: 800, bgcolor: ACCENT, '&:hover': { bgcolor: '#1d94cc' } }}
      >
        Save Changes
      </Button>
    </Box>
  );
}

function HeroEditor() {
  const { hero, update } = useSiteData();
  const [local, setLocal] = useState({ ...hero });
  const [ok, setOk] = useState(false);
  const save = () => { update('hero', local); setOk(true); };
  return (
    <Accordion defaultExpanded elevation={0} sx={{ mb: 2, borderRadius: '16px !important', border: '1px solid #eee', '&:before': { display: 'none' }, overflow: 'hidden' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <HomeIcon sx={{ mr: 2, color: ACCENT }} />
        <Box>
          <Typography fontWeight={800}>Hero Banner</Typography>
          <Typography variant="caption" color="text.secondary">Main headline and sub-text</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="caption" fontWeight="bold" display="block" mb={1}>Headline Words (shown normally)</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {(local.titleWords || []).map((w, i) => (
                <TextField key={i} size="small" value={w}
                  onChange={e => { const arr = [...(local.titleWords || [])]; arr[i] = e.target.value; setLocal({ ...local, titleWords: arr }); }}
                  sx={{ width: 120 }} />
              ))}
            </Stack>
          </Box>
          <Box>
            <Typography variant="caption" fontWeight="bold" display="block" mb={1}>Bold Words (shown in bold below)</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {(local.boldWords || []).map((w, i) => (
                <TextField key={i} size="small" value={w}
                  onChange={e => { const arr = [...(local.boldWords || [])]; arr[i] = e.target.value; setLocal({ ...local, boldWords: arr }); }}
                  sx={{ width: 120 }} />
              ))}
            </Stack>
          </Box>
          <TextField fullWidth multiline rows={3} label="Sub-text" value={local.subtitle || ''}
            onChange={e => setLocal({ ...local, subtitle: e.target.value })} />
          <TextField size="small" label="CTA Button Text" value={local.ctaText || ''}
            onChange={e => setLocal({ ...local, ctaText: e.target.value })} sx={{ width: 240 }} />
        </Stack>
        <SaveBar onSave={save} />
        <Snackbar open={ok} autoHideDuration={2500} onClose={() => setOk(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity="success" variant="filled">Hero updated on homepage!</Alert>
        </Snackbar>
      </AccordionDetails>
    </Accordion>
  );
}

function TeamEditor() {
  const { team, update } = useSiteData();
  const [local, setLocal] = useState(team.map(m => ({ ...m })));
  const [ok, setOk] = useState(false);
  const save = () => { update('team', local); setOk(true); };
  const add = () => setLocal([...local, { name: 'Dr. New Doctor', role: 'Therapist', img: '' }]);
  const remove = (i) => setLocal(local.filter((_, idx) => idx !== i));
  const change = (i, field, val) => { const arr = [...local]; arr[i] = { ...arr[i], [field]: val }; setLocal(arr); };
  return (
    <Accordion elevation={0} sx={{ mb: 2, borderRadius: '16px !important', border: '1px solid #eee', '&:before': { display: 'none' }, overflow: 'hidden' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <TeamIcon sx={{ mr: 2, color: '#f0c85d' }} />
        <Box>
          <Typography fontWeight={800}>Our Team <Chip label={`${local.length} members`} size="small" sx={{ ml: 1, fontSize: 11 }} /></Typography>
          <Typography variant="caption" color="text.secondary">Doctor profiles shown in the scrolling marquee</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 4 }}>
        <Grid container spacing={2}>
          {local.map((m, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Paper elevation={0} sx={{ p: 2.5, border: '1px solid #f0f0f0', borderRadius: 3, position: 'relative' }}>
                <Tooltip title="Remove member">
                  <IconButton size="small" onClick={() => remove(i)} sx={{ position: 'absolute', top: 8, right: 8, color: '#ef4444', '&:hover': { bgcolor: '#fef2f2' } }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Avatar src={m.img} sx={{ width: 52, height: 52, mx: 'auto', mb: 1.5, bgcolor: ACCENT }} />
                <Stack spacing={1}>
                  <TextField size="small" fullWidth label="Name" value={m.name} onChange={e => change(i, 'name', e.target.value)} />
                  <TextField size="small" fullWidth label="Role" value={m.role} onChange={e => change(i, 'role', e.target.value)} />
                </Stack>
              </Paper>
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={0} onClick={add}
              sx={{ p: 2.5, border: '2px dashed #e5e7eb', borderRadius: 3, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 160, '&:hover': { borderColor: ACCENT, bgcolor: '#f0f9ff' } }}>
              <AddIcon sx={{ color: ACCENT, fontSize: 32 }} />
              <Typography variant="caption" color="text.secondary" mt={1}>Add Team Member</Typography>
            </Paper>
          </Grid>
        </Grid>
        <SaveBar onSave={save} />
        <Snackbar open={ok} autoHideDuration={2500} onClose={() => setOk(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity="success" variant="filled">Team updated!</Alert>
        </Snackbar>
      </AccordionDetails>
    </Accordion>
  );
}

function ReviewsEditor() {
  const { reviews, update } = useSiteData();
  const [local, setLocal] = useState(reviews.map(r => ({ ...r })));
  const [ok, setOk] = useState(false);
  const save = () => { update('reviews', local); setOk(true); };
  const add = () => setLocal([...local, { id: Date.now(), name: 'New Reviewer', date: 'Jan 1, 2025', rating: 5, text: 'Review text here...' }]);
  const remove = (i) => setLocal(local.filter((_, idx) => idx !== i));
  const change = (i, field, val) => { const arr = [...local]; arr[i] = { ...arr[i], [field]: val }; setLocal(arr); };
  return (
    <Accordion elevation={0} sx={{ mb: 2, borderRadius: '16px !important', border: '1px solid #eee', '&:before': { display: 'none' }, overflow: 'hidden' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <ReviewIcon sx={{ mr: 2, color: '#f6a32b' }} />
        <Box>
          <Typography fontWeight={800}>Google Reviews <Chip label={`${local.length} reviews`} size="small" sx={{ ml: 1 }} /></Typography>
          <Typography variant="caption" color="text.secondary">"See how other parents found hope" section</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 4 }}>
        <Stack spacing={2}>
          {local.map((r, i) => (
            <Paper key={i} elevation={0} sx={{ p: 3, border: '1px solid #f0f0f0', borderRadius: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Typography variant="caption" fontWeight="bold" color="text.secondary">Review #{i + 1}</Typography>
                <Tooltip title="Delete review">
                  <IconButton size="small" onClick={() => remove(i)} sx={{ color: '#ef4444' }}><DeleteIcon fontSize="small" /></IconButton>
                </Tooltip>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}><TextField size="small" fullWidth label="Name" value={r.name} onChange={e => change(i, 'name', e.target.value)} /></Grid>
                <Grid item xs={12} sm={4}><TextField size="small" fullWidth label="Date" value={r.date} onChange={e => change(i, 'date', e.target.value)} /></Grid>
                <Grid item xs={12} sm={4}><TextField size="small" fullWidth type="number" label="Rating (1-5)" inputProps={{ min: 1, max: 5 }} value={r.rating} onChange={e => change(i, 'rating', Number(e.target.value))} /></Grid>
                <Grid item xs={12}><TextField fullWidth multiline rows={2} label="Review Text" value={r.text} onChange={e => change(i, 'text', e.target.value)} /></Grid>
              </Grid>
            </Paper>
          ))}
          <Button startIcon={<AddIcon />} variant="outlined" onClick={add} sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700, borderColor: ACCENT, color: ACCENT }}>
            Add Review
          </Button>
        </Stack>
        <SaveBar onSave={save} />
        <Snackbar open={ok} autoHideDuration={2500} onClose={() => setOk(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity="success" variant="filled">Reviews updated!</Alert>
        </Snackbar>
      </AccordionDetails>
    </Accordion>
  );
}

function TestimonialsEditor() {
  const { testimonials, update } = useSiteData();
  const [local, setLocal] = useState(testimonials.map(t => ({ ...t })));
  const [ok, setOk] = useState(false);
  const save = () => { update('testimonials', local); setOk(true); };
  const add = () => setLocal([...local, { name: 'New Parent', location: 'City, State, IND', text: 'Testimonial text here...' }]);
  const remove = (i) => setLocal(local.filter((_, idx) => idx !== i));
  const change = (i, field, val) => { const arr = [...local]; arr[i] = { ...arr[i], [field]: val }; setLocal(arr); };
  return (
    <Accordion elevation={0} sx={{ mb: 2, borderRadius: '16px !important', border: '1px solid #eee', '&:before': { display: 'none' }, overflow: 'hidden' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <TestiIcon sx={{ mr: 2, color: '#77bc52' }} />
        <Box>
          <Typography fontWeight={800}>Testimonials Carousel <Chip label={`${local.length}`} size="small" sx={{ ml: 1 }} /></Typography>
          <Typography variant="caption" color="text.secondary">Carousel cards in the testimonials section</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 4 }}>
        <Stack spacing={2}>
          {local.map((t, i) => (
            <Paper key={i} elevation={0} sx={{ p: 3, border: '1px solid #f0f0f0', borderRadius: 3 }}>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="caption" fontWeight="bold" color="text.secondary">Card #{i + 1}</Typography>
                <IconButton size="small" onClick={() => remove(i)} sx={{ color: '#ef4444' }}><DeleteIcon fontSize="small" /></IconButton>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={5}><TextField size="small" fullWidth label="Name" value={t.name} onChange={e => change(i, 'name', e.target.value)} /></Grid>
                <Grid item xs={12} sm={7}><TextField size="small" fullWidth label="Location" value={t.location} onChange={e => change(i, 'location', e.target.value)} /></Grid>
                <Grid item xs={12}><TextField fullWidth multiline rows={3} label="Testimonial Text" value={t.text} onChange={e => change(i, 'text', e.target.value)} /></Grid>
              </Grid>
            </Paper>
          ))}
          <Button startIcon={<AddIcon />} variant="outlined" onClick={add} sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700, borderColor: '#77bc52', color: '#77bc52' }}>
            Add Testimonial
          </Button>
        </Stack>
        <SaveBar onSave={save} />
        <Snackbar open={ok} autoHideDuration={2500} onClose={() => setOk(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity="success" variant="filled">Testimonials updated!</Alert>
        </Snackbar>
      </AccordionDetails>
    </Accordion>
  );
}

function HowWeWorkEditor() {
  const { howWeWork, update } = useSiteData();
  const [local, setLocal] = useState((howWeWork || []).map(s => ({ ...s })));
  const [ok, setOk] = useState(false);
  const save = () => { update('howWeWork', local); setOk(true); };
  const change = (i, field, val) => { const arr = [...local]; arr[i] = { ...arr[i], [field]: val }; setLocal(arr); };
  return (
    <Accordion elevation={0} sx={{ mb: 2, borderRadius: '16px !important', border: '1px solid #eee', '&:before': { display: 'none' }, overflow: 'hidden' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <WorkIcon sx={{ mr: 2, color: '#cdb8fe' }} />
        <Box>
          <Typography fontWeight={800}>How We Work</Typography>
          <Typography variant="caption" color="text.secondary">3-step process section on homepage</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 4 }}>
        <Stack spacing={3}>
          {local.map((s, i) => (
            <Paper key={i} elevation={0} sx={{ p: 3, border: '1px solid #f0f0f0', borderRadius: 3 }}>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: '#f5f7fa', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Typography fontWeight={900} color="text.secondary">{s.num}</Typography>
                </Box>
                <TextField size="small" label="Step Title" value={s.title} onChange={e => change(i, 'title', e.target.value)} sx={{ flex: 1 }} />
              </Box>
              <TextField fullWidth multiline rows={2} label="Description" value={s.desc} onChange={e => change(i, 'desc', e.target.value)} />
            </Paper>
          ))}
        </Stack>
        <SaveBar onSave={save} />
        <Snackbar open={ok} autoHideDuration={2500} onClose={() => setOk(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity="success" variant="filled">How We Work updated!</Alert>
        </Snackbar>
      </AccordionDetails>
    </Accordion>
  );
}

function FAQEditor() {
  const { faqItems, faqCats, update } = useSiteData();
  const [items, setItems] = useState((faqItems || []).map(f => ({ ...f })));
  const [cats, setCats] = useState([...(faqCats || [])]);
  const [ok, setOk] = useState(false);
  const save = () => { update('faqItems', items); update('faqCats', cats); setOk(true); };
  const addItem = () => setItems([...items, { q: 'New Question?', a: 'Answer here.' }]);
  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));
  const changeItem = (i, field, val) => { const arr = [...items]; arr[i] = { ...arr[i], [field]: val }; setItems(arr); };
  const addCat = () => setCats([...cats, 'New Category']);
  const removeCat = (i) => setCats(cats.filter((_, idx) => idx !== i));
  const changeCat = (i, val) => { const arr = [...cats]; arr[i] = val; setCats(arr); };
  return (
    <Accordion elevation={0} sx={{ mb: 2, borderRadius: '16px !important', border: '1px solid #eee', '&:before': { display: 'none' }, overflow: 'hidden' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ width: 28, height: 28, borderRadius: 1.5, bgcolor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2 }}>
          <Typography fontWeight={900} fontSize={14}>?</Typography>
        </Box>
        <Box>
          <Typography fontWeight={800}>FAQ <Chip label={`${items.length} Q&As`} size="small" sx={{ ml: 1 }} /></Typography>
          <Typography variant="caption" color="text.secondary">Questions and category tabs on homepage</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 4 }}>
        <Typography variant="subtitle2" fontWeight={800} mb={1}>Categories</Typography>
        <Stack direction="row" flexWrap="wrap" gap={1} mb={3}>
          {cats.map((c, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <TextField size="small" value={c} onChange={e => changeCat(i, e.target.value)} sx={{ width: 180 }} />
              <IconButton size="small" onClick={() => removeCat(i)} sx={{ color: '#ef4444' }}><DeleteIcon fontSize="small" /></IconButton>
            </Box>
          ))}
          <Button size="small" startIcon={<AddIcon />} onClick={addCat} sx={{ textTransform: 'none', fontWeight: 700, color: ACCENT }}>Add</Button>
        </Stack>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="subtitle2" fontWeight={800} mb={2}>Questions & Answers</Typography>
        <Stack spacing={2}>
          {items.map((item, i) => (
            <Paper key={i} elevation={0} sx={{ p: 3, border: '1px solid #f0f0f0', borderRadius: 3 }}>
              <Box display="flex" justifyContent="space-between" mb={1.5}>
                <Typography variant="caption" fontWeight="bold" color="text.secondary">Q{i + 1}</Typography>
                <IconButton size="small" onClick={() => removeItem(i)} sx={{ color: '#ef4444' }}><DeleteIcon fontSize="small" /></IconButton>
              </Box>
              <Stack spacing={1.5}>
                <TextField size="small" fullWidth label="Question" value={item.q} onChange={e => changeItem(i, 'q', e.target.value)} />
                <TextField fullWidth multiline rows={2} label="Answer" value={item.a} onChange={e => changeItem(i, 'a', e.target.value)} />
              </Stack>
            </Paper>
          ))}
          <Button startIcon={<AddIcon />} variant="outlined" onClick={addItem} sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700, borderColor: '#f6a32b', color: '#f6a32b' }}>
            Add FAQ
          </Button>
        </Stack>
        <SaveBar onSave={save} />
        <Snackbar open={ok} autoHideDuration={2500} onClose={() => setOk(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity="success" variant="filled">FAQ updated!</Alert>
        </Snackbar>
      </AccordionDetails>
    </Accordion>
  );
}

export default function HomeSettings() {
  return (
    <Box py={4}>
      <Typography variant="h4" fontWeight={900} sx={{ mb: 1, letterSpacing: '-0.02em' }}>Home Page Manager</Typography>
      <Typography color="text.secondary" mb={4}>
        Edit content below — click <strong>Save Changes</strong> in each section to apply it live on the website instantly.
      </Typography>
      <HeroEditor />
      <TeamEditor />
      <ReviewsEditor />
      <TestimonialsEditor />
      <HowWeWorkEditor />
      <FAQEditor />
    </Box>
  );
}

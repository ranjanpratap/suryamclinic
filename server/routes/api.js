import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import db from '../config/db.js' // Local PG
import { supabase } from '../config/supabase.js' // Optional
import { upload } from '../config/cloudinary.js'
import cloudinary from '../config/cloudinary.js'
import nodemailer from 'nodemailer'

const router = express.Router()

// ── Auth Middleware ──────────────────
const authenticate = (req, res, next) => {
  const token = req.header('x-auth-token')
  if (!token) return res.status(401).json({ error: 'No token, authorization denied' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' })
  }
}

// ── Local helpers for "One Table" logic ────────
const query = async (text, params) => {
  try { return await db.query(text, params) }
  catch (err) { console.error('DB ERROR:', err); throw err; }
}

// ── Auth Routes ──────────────────
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@suryamclinic.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'change_this'

  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' })
    return res.json({ token, user: { email } })
  }
  res.status(401).json({ error: 'Invalid credentials' })
})

// ── Settings / Home Management (Site Config) ─────
router.get('/settings/:key', async (req, res) => {
  const { key } = req.params
  try {
    const result = await query('SELECT content FROM site_data WHERE type=$1 AND key=$2', ['settings', key])
    res.json(result.rows[0]?.content || {})
  } catch (err) { res.status(500).json({ error: err.message }) }
})

router.post('/settings/:key', authenticate, async (req, res) => {
  const { key } = req.params
  const content = JSON.stringify(req.body)
  try {
    await query(`
      INSERT INTO site_data (type, key, content) VALUES ($1, $2, $3)
      ON CONFLICT (key) DO UPDATE SET content = EXCLUDED.content
    `, ['settings', key, content])
    res.json({ message: 'Saved successfully' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// ── Blog Management ───────────────
router.get('/blogs', async (req, res) => {
  try {
    const result = await query('SELECT id, content, created_at FROM site_data WHERE type=$1 ORDER BY created_at DESC', ['blog'])
    res.json(result.rows.map(row => ({ id: row.id, ...row.content, created_at: row.created_at })))
  } catch (err) { res.status(500).json({ error: err.message }) }
})

router.post('/blogs', authenticate, upload.single('image'), async (req, res) => {
  const blogContent = { ...req.body }
  if (req.file) blogContent.image = req.file.path

  try {
    await query('INSERT INTO site_data (type, content) VALUES ($1, $2)', ['blog', JSON.stringify(blogContent)])
    res.json({ message: 'Blog created' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

router.put('/blogs/:id', authenticate, upload.single('image'), async (req, res) => {
  const { id } = req.params
  const updateData = { ...req.body }
  if (req.file) updateData.image = req.file.path

  try {
    await query('UPDATE site_data SET content = $1 WHERE id = $2', [JSON.stringify(updateData), id])
    res.json({ message: 'Blog updated' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

router.delete('/blogs/:id', authenticate, async (req, res) => {
  const { id } = req.params
  try {
    await query('DELETE FROM site_data WHERE id = $1', [id])
    res.json({ message: 'Blog deleted' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// ── Sales / Submissions ───────────
router.get('/submissions', authenticate, async (req, res) => {
  try {
    const result = await query('SELECT id, content, created_at FROM site_data WHERE type=$1 ORDER BY created_at DESC', ['submission'])
    res.json(result.rows.map(row => ({ id: row.id, ...row.content, date: row.created_at })))
  } catch (err) { res.status(500).json({ error: err.message }) }
})

router.post('/submissions', async (req, res) => {
  try {
    const { name, email, mobile, message, type } = req.body
    await query('INSERT INTO site_data (type, content) VALUES ($1, $2)', ['submission', JSON.stringify(req.body)])

    // If it's a contact form, send an email notification using the same SMTP settings as leads
    if (type === 'contact_form') {
      const result = await query('SELECT content FROM site_data WHERE type=$1 AND key=$2', ['settings', 'leadSettings'])
      const settings = result.rows[0]?.content

      if (settings && settings.enabled && settings.smtp && settings.smtp.user) {
        const transporter = nodemailer.createTransport({
          host: settings.smtp.host,
          port: parseInt(settings.smtp.port),
          secure: parseInt(settings.smtp.port) === 465,
          auth: {
            user: settings.smtp.user,
            pass: settings.smtp.pass
          }
        });

        const mailOptions = {
          from: `"Sunshine Contact" <${settings.smtp.user}>`,
          to: settings.emailRecipient,
          subject: 'New Contact Message!',
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #1A2E6E;">New Contact Form Message</h2>
              <p>Someone reached out via your website contact form.</p>
              <hr />
              <p><b>Name:</b> ${name}</p>
              <p><b>Email:</b> ${email}</p>
              <p><b>Mobile:</b> ${mobile}</p>
              <p><b>Message:</b> ${message}</p>
              <hr />
              <p style="font-size: 12px; color: #666;">Generated by Sunshine Child Development Center Contact System</p>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
      }
    }

    res.json({ success: true, message: 'Form submitted' })
  } catch (err) {
    console.error('Submission error:', err)
    res.status(500).json({ error: err.message })
  }
})

router.post('/leads', async (req, res) => {
  const { name, phone } = req.body
  try {
    // 1. Save to DB
    await query('INSERT INTO site_data (type, content) VALUES ($1, $2)', ['submission', JSON.stringify({ name, phone, type: 'lead-popup' })])

    // 2. Fetch Lead Settings
    const result = await query('SELECT content FROM site_data WHERE type=$1 AND key=$2', ['settings', 'leadSettings'])
    const settings = result.rows[0]?.content

    if (settings && settings.enabled && settings.smtp && settings.smtp.user) {
      const transporter = nodemailer.createTransport({
        host: settings.smtp.host,
        port: parseInt(settings.smtp.port),
        secure: parseInt(settings.smtp.port) === 465,
        auth: {
          user: settings.smtp.user,
          pass: settings.smtp.pass
        }
      });

      const mailOptions = {
        from: `"Sunshine Lead" <${settings.smtp.user}>`,
        to: settings.emailRecipient,
        subject: 'New Consultation Request!',
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #1A2E6E;">New Potential Parent Inquiry</h2>
            <p>A new lead has been captured via the website popup.</p>
            <hr />
            <p><b>Name:</b> ${name}</p>
            <p><b>Phone:</b> ${phone}</p>
            <hr />
            <p style="font-size: 12px; color: #666;">Generated by Sunshine Child Development Center Lead System</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
    }

    res.json({ success: true })
  } catch (err) {
    console.error('Lead error:', err)
    res.status(500).json({ error: err.message })
  }
})

// ── Gallery Management ────────────
router.post('/gallery/upload', authenticate, upload.array('images', 10), async (req, res) => {
  const files = req.files
  const section = req.body.section || 'homepage'
  if (!files || files.length === 0) return res.status(400).json({ error: 'No files uploaded' })

  try {
    const values = files.map(file => {
      const content = { url: file.path, public_id: file.filename, section }
      return query('INSERT INTO site_data (type, content) VALUES ($1, $2)', ['gallery', JSON.stringify(content)])
    })
    await Promise.all(values)
    res.json({ message: 'Handled bulk upload' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

router.get('/gallery/:section', async (req, res) => {
  const { section } = req.params
  try {
    const result = await query('SELECT id, content FROM site_data WHERE type=$1', ['gallery'])
    const filtered = result.rows
      .filter(row => row.content.section === section)
      .map(row => ({ id: row.id, ...row.content }))
    res.json(filtered)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

router.delete('/gallery/:id', authenticate, async (req, res) => {
  const { id } = req.params
  try {
    const result = await query('SELECT content FROM site_data WHERE id = $1', [id])
    if (result.rows[0]?.content?.public_id) {
      await cloudinary.uploader.destroy(result.rows[0].content.public_id)
    }
    await query('DELETE FROM site_data WHERE id = $1', [id])
    res.json({ message: 'Deleted' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// ── Testimonials ──────────────────
router.get('/testimonials', async (req, res) => {
  try {
    const result = await query('SELECT id, content FROM site_data WHERE type=$1 ORDER BY created_at DESC', ['testimonial'])
    res.json(result.rows.map(row => ({ id: row.id, ...row.content })))
  } catch (err) { res.status(500).json({ error: err.message }) }
})

router.post('/testimonials', authenticate, async (req, res) => {
  try {
    await query('INSERT INTO site_data (type, content) VALUES ($1, $2)', ['testimonial', JSON.stringify(req.body)])
    res.json({ message: 'Added' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

router.delete('/testimonials/:id', authenticate, async (req, res) => {
  const { id } = req.params
  try {
    await query('DELETE FROM site_data WHERE id = $1', [id])
    res.json({ message: 'Testimonial deleted' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// ── Team Management ────────────────
router.get('/team', async (req, res) => {
  try {
    const result = await query('SELECT id, content FROM site_data WHERE type=$1 ORDER BY created_at ASC', ['team'])
    res.json(result.rows.map(row => ({ id: row.id, ...row.content })))
  } catch (err) { res.status(500).json({ error: err.message }) }
})

router.post('/team', authenticate, upload.single('image'), async (req, res) => {
  const teamContent = { ...req.body }
  if (req.file) teamContent.img = req.file.path
  
  try {
    await query('INSERT INTO site_data (type, content) VALUES ($1, $2)', ['team', JSON.stringify(teamContent)])
    res.json({ message: 'Team member added' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

router.put('/team/:id', authenticate, upload.single('image'), async (req, res) => {
  const { id } = req.params
  const updateData = { ...req.body }
  if (req.file) updateData.img = req.file.path

  try {
    await query('UPDATE site_data SET content = $1 WHERE id = $2', [JSON.stringify(updateData), id])
    res.json({ message: 'Team updated' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

router.delete('/team/:id', authenticate, async (req, res) => {
  const { id } = req.params
  try {
    await query('DELETE FROM site_data WHERE id = $1', [id])
    res.json({ message: 'Team member deleted' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// ── Resolve shortened Google Maps URLs ────
router.post('/resolve-maps-url', async (req, res) => {
  const { url } = req.body
  if (!url) return res.status(400).json({ error: 'URL is required' })

  try {
    // Follow redirects to get the final URL (use GET since some services don't redirect HEAD)
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MapResolver/1.0)'
      }
    })
    const finalUrl = response.url
    res.json({ resolvedUrl: finalUrl })
  } catch (err) {
    console.error('Error resolving maps URL:', err)
    res.status(500).json({ error: 'Could not resolve URL' })
  }
})

export default router

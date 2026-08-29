import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;
  const rootDir = process.cwd();

  // Middleware
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(express.json({ limit: '10mb' }));

  // Health endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      app: 'Fountain Top Physical Therapy',
      bookingSystem: 'Direct WhatsApp Booking Desk (+234 703 946 6804)'
    });
  });

  // Form Submission & Booking API Endpoint (Logging & WhatsApp sync)
  app.all(['/api.php', '/form_container/submit', '/api/submit'], async (req, res) => {
    console.log(`[API/Form] Received ${req.method} request:`, req.body);

    if (req.method === 'POST') {
      const data = req.body || {};
      const isAppointment = !!(data.preferredDate || data.serviceId || data.reference);
      const patientName = data.fullName || data.name || 'Website Visitor';
      const patientPhone = data.phoneNumber || data.phone || 'Not provided';
      const serviceRequested = data.serviceTitle || data.serviceId || 'Physical Therapy Consultation';
      const appointmentDate = data.preferredDate || 'To be scheduled';
      const appointmentTime = data.preferredTime || 'Standard Hours';
      const notes = data.conditionDetails || data.message || data.notes || 'None provided';
      const refCode = data.reference || `FT-${Date.now().toString().slice(-6)}`;

      console.log(`[Booking/Inquiry Logged] Type: ${isAppointment ? 'Appointment' : 'Inquiry'} | Ref: ${refCode} | Patient: ${patientName} (${patientPhone}) | Service: ${serviceRequested}`);

      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json({
        status: 'success',
        reference: refCode,
        message: 'Thank you! Your appointment request has been prepared for WhatsApp chat with our clinic reception.'
      });
    }

    res.setHeader('Content-Type', 'application/json');
    return res.json({ status: 'success', message: 'Fountain Top WhatsApp Booking API active' });
  });

  // Explicitly serve robots.txt and sitemap.xml
  app.get('/robots.txt', (_req, res) => {
    const robotsPath = path.join(rootDir, 'public', 'robots.txt');
    if (fs.existsSync(robotsPath)) {
      res.setHeader('Content-Type', 'text/plain');
      return res.sendFile(robotsPath);
    }
    res.type('text/plain').send("User-agent: *\nAllow: /\nSitemap: https://fountaintoppt.com/sitemap.xml\n");
  });

  app.get('/sitemap.xml', (_req, res) => {
    const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      res.setHeader('Content-Type', 'application/xml');
      return res.sendFile(sitemapPath);
    }
    res.status(404).send('Sitemap not found');
  });

  // Explicitly serve images directory with long-term cache headers
  app.use('/images', express.static(path.join(rootDir, 'images'), {
    maxAge: '30d',
    immutable: true
  }));

  // Vite development middleware or static production serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(rootDir, 'dist');
    app.use(express.static(distPath, {
      maxAge: '30d',
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        } else {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      }
    }));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fountain Top Physical Therapy server running on http://0.0.0.0:${PORT}`);
    console.log(`WhatsApp booking routing to: +234 703 946 6804`);
  });
}

startServer();

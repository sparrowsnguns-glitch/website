# 🔐 Müller IT-Sicherheit — Website + Backend API

Vollständiges Lead-Management-System für IT-Sicherheitsberatung. Website + Go API + Webhooks + SEO.

---

## 🚀 Quick Start (5 Min)

### 1️⃣ Repository clonen
```bash
git clone https://github.com/sparrowsnguns-glitch/website.git
cd website
git checkout feature/backend-webhook-seo
```

### 2️⃣ Docker starten
```bash
docker-compose up
```

Das war's! 
- Website: `http://localhost`
- API: `http://localhost:3000`
- Health: `http://localhost:3000/health`

---

## 📋 Features

### Frontend
✅ **SEO-optimiert:**
- Schema.org JSON-LD (LocalBusiness, FAQPage, BreadcrumbList)
- Meta-Tags & Open Graph
- `sitemap.xml` für Google
- Mobile-responsive Design

✅ **Kontakte klickbar:**
- ☎️ `+49 162 7029 699` → Telefonanruf
- 💬 WhatsApp Direct Link
- 📧 E-Mail öffnet Client

✅ **Interaktive Form:**
- Validierung
- POST zu `/api/leads`
- Live Feedback

### Backend (Go API)

#### 🎯 Lead-Scoring (Automatisch)
```
🔴 Score 3 (High)   = NIS-2 + Firma + Details
🟡 Score 2 (Medium) = Firma vorhanden oder Top-Topic
🟢 Score 1 (Low)    = Nur E-Mail
```

#### 🔗 Webhooks
Sende Leads zu deinem CRM/Tool:
- **n8n** (n8n.io)
- **Make** (make.com)
- **Slack** (Live-Benachrichtigungen)
- **Zapier**
- **Custom API**

#### 📊 Statistiken
```bash
curl http://localhost:3000/api/leads/stats | jq
```

---

## 🔧 Setup

### 1. Environment-Variablen

Kopiere `.env.example` zu `.env`:
```bash
cp .env.example .env
```

Und bearbeite:
```env
PORT=3000
WEBHOOK_SECRET=xxxxxxxx-random-32-chars-xxxxxxxx
WEBHOOK_URL=https://your-webhook-endpoint.com
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK
CONTACT_EMAIL=kontakt@mueller-itsicherheit.de
```

### 2. Webhooks konfigurieren

#### Slack
```
1. https://api.slack.com/apps → Create New App
2. Incoming Webhooks → Add New Webhook
3. Copy URL → Paste in .env
```

#### n8n (Self-Hosted oder Cloud)
```
1. Create Webhook Trigger
2. URL: https://your-n8n.io/webhook/leads
3. Auth: HMAC SHA256 mit WEBHOOK_SECRET
```

#### Custom API
```
POST /webhook/leads
Header: X-Webhook-Signature: <hmac-sha256>
Body: Lead JSON
```

---

## 📡 API Endpoints

### POST /api/leads
Neuen Lead speichern

**Request:**
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Max Mustermann",
    "company": "Acme GmbH",
    "email": "max@example.de",
    "topic": "NIS-2 Betroffenheitsprüfung",
    "message": "Wir haben 80 Mitarbeiter..."
  }'
```

**Response:**
```json
{
  "status": "success",
  "id": "lead_1234567890"
}
```

### GET /api/leads/stats
Statistiken abrufen

**Response:**
```json
{
  "total_leads": 42,
  "high_priority": 12,
  "medium_priority": 18,
  "low_priority": 12,
  "by_topic": {
    "NIS-2 Betroffenheitsprüfung": 20,
    "Sicherheitsaudit": 15,
    "Backup & Ransomware": 7
  },
  "last_24h": 5,
  "recent_leads": [...]
}
```

### GET /health
Health Check

**Response:**
```json
{ "status": "ok" }
```

---

## 🐳 Docker Compose

```yaml
services:
  api:
    build: .
    ports: ["3000:3000"]
    environment:
      - WEBHOOK_SECRET
      - WEBHOOK_URL
      - SLACK_WEBHOOK_URL
    healthcheck: ✅

  nginx:
    image: nginx:alpine
    ports: ["80:80"]
    volumes:
      - ./index.html
      - ./nginx.conf
    depends_on: [api]
```

### Starten
```bash
docker-compose up
```

### Stop
```bash
docker-compose down
```

### Logs
```bash
docker-compose logs -f api
docker-compose logs -f nginx
```

---

## 🔐 Sicherheit

- ✅ HMAC-Signatur auf Webhooks
- ✅ CORS-Headers
- ✅ Security Headers (X-Frame-Options, CSP, etc.)
- ✅ HTTPS-ready (Nginx)
- ✅ Secrets nicht in Git (`.env.example`)

### Webhook-Verifikation (Node.js)
```javascript
const crypto = require('crypto');
const secret = process.env.WEBHOOK_SECRET;

function verifySignature(payload, signature) {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  return hash === signature;
}
```

---

## 📊 Lead-Flow

```
1. User füllt Form aus
   ↓
2. Frontend POST /api/leads
   ↓
3. Go API: Validieren + Scoring
   ↓
4. Speichern + Async Notifications:
   ├─ Webhook an n8n/Make/Custom
   ├─ Slack Push 📱
   └─ Optional E-Mail
   ↓
5. Frontend: "✅ Vielen Dank"
```

---

## 🚀 Deployment

### Optionen

1. **Heroku** (einfach)
   ```bash
   heroku create your-app
   git push heroku main
   ```

2. **Railway.app** (kostenlos, schnell)
   ```bash
   railway init
   railway up
   ```

3. **Docker auf eigenem Server**
   ```bash
   docker-compose -f docker-compose.yml up -d
   ```

4. **GitHub Pages** (nur Static)
   - index.html + sitemap.xml
   - API woanders hosten

---

## 🔍 Monitoring

### Logs
```bash
docker-compose logs -f api
```

### Metrics
```bash
curl http://localhost:3000/api/leads/stats
```

### Health
```bash
curl http://localhost:3000/health
```

---

## 🛠️ Troubleshooting

### Port bereits in Benutzung
```bash
# Finde Process auf Port 3000
lsof -i :3000

# Kill Process
kill -9 <PID>
```

### Webhook sendet nicht
1. `WEBHOOK_SECRET` gesetzt?
2. `WEBHOOK_URL` erreichbar?
3. Logs prüfen: `docker-compose logs api`

### Slack zeigt keine Benachrichtigungen
1. `SLACK_WEBHOOK_URL` korrekt?
2. Lead mit Score 2+ eingereicht?
3. Logs: `docker-compose logs api | grep Slack`

---

## 📱 Kontakt

**Website:**
- ☎️ +49 162 7029 699
- 💬 WhatsApp: https://wa.me/491627029699
- 📧 kontakt@mueller-itsicherheit.de
- 🌍 https://mueller-itsicherheit.de

---

## 📄 Lizenz

MIT

---

## 🙏 Danke!

Gebaut mit ❤️ für deutsche KMU — sicher, schnell, transparent.

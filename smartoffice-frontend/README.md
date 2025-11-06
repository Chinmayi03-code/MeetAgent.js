# SmartOffice Core — Frontend

This is a Vite + React + Tailwind CSS frontend scaffold for the SmartOffice Core project (AI-Powered Meeting Scheduler).

Quick start (PowerShell):

```powershell
cd "C:\Users\chinm\OneDrive\Documents\hack ai\smartoffice-frontend"
npm install
npm run dev
```

Notes:
- The app expects placeholder API endpoints:
  - POST /api/agent
  - GET /api/logs
  - GET /api/approvals
- I did not create a backend — you said you'll handle that. The frontend uses fetch to those endpoints and falls back to dummy data where appropriate.
